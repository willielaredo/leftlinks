let auth0Client = null;

const fetchAuthConfig = () => fetch("auth_config.json");

const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();
  
  auth0Client = await auth0.createAuth0Client({
    domain: config.domain,
    clientId: config.clientId,
    useRefreshTokens: true,
    cacheLocation: 'localstorage'
  });
    
};

window.onload = async () => {
  await configureClient();
    updateUI();
    const isAuthenticated = await auth0Client.isAuthenticated();

//   if (isAuthenticated) {
//     // show the gated content
//     return;
//   }

  // NEW - check for the code and state parameters
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {

    // Process the login state
    await auth0Client.handleRedirectCallback();
    
    updateUI();

    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");
  }
};

const updateUI = async () => {
  const isAuthenticated = await auth0Client.isAuthenticated();
    console.log(isAuthenticated);
    document.getElementById("login").style.display = isAuthenticated === false ? 'block' : 'none';
    document.getElementById("logout").style.display = !isAuthenticated === false ? 'block' : 'none';

    if (isAuthenticated) {
    document.getElementById("username").classList.remove("is-hidden");
    
    const userinfo = await auth0Client.getUser()
    document.getElementById("profile").textContent = userinfo.name;

  } else {
    document.getElementById("username").classList.add("hidden");
  }
};

const login = async () => {
  await auth0Client.loginWithRedirect({
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  });
};

const logout = () => {
  auth0Client.logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  });
};

document.getElementById("login").onclick = async () => {
    await login();

};
document.getElementById("logout").onclick = async () => {
    await logout();
};



