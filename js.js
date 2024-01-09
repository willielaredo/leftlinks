// create cards
const fetchOrgs = () => fetch("./orgs.json");
const fetchTags = () => fetch("./tags.json");

const orgCount = async () => {
    const response_orgs = await fetchOrgs();
    const orgs = await response_orgs.json();
    const arr_orgs = orgs.data
    const countSpan = document.getElementById("count");
    const newText = document.createTextNode(arr_orgs.length);
    countSpan.appendChild(newText)
};

orgCount();

const displayTags = async () => {
    const response_tags = await fetchTags();
    const tags = await response_tags.json();
    const arr_tags = tags.data
    const issues_list = document.getElementById('issues')
    issues_list.innerHTML = ''
    arr_tags.forEach((tag) => {
        const issue = document.createElement("div")
        issue.classList.add("issue")
        issue.innerHTML =
            '<a href="/?tag=' + tag.tag_name + '"><h3>' + tag.tag_display + ' (' + tag.tag_count + ')</h3></a>'
        issues_list.appendChild(issue)
    });
};

displayTags();

const filterCards = async () => {
    const response_orgs = await fetchOrgs();
    const orgs = await response_orgs.json();
    const arr_orgs = orgs.data
    const issues_list = document.getElementById('issues')
    var params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
    });
    const tag = params.tag;
    if (tag) {
        function filterByTag(org) {
            if (org.tags.includes(tag)) {
                return true
            }
        }
        const orgsFiltered = arr_orgs.filter(filterByTag)
        console.log(orgsFiltered)
        const html = orgsFiltered.map(match =>
            `<article class="card"><div><h2 class="card-title">${match.name}</div><div class="card-image"><img src="./images/twit_pics/` +
            (match.image_file_name !== null ? `${match.image_file_name}` : `placeholder.png`) +
            `"></div><div class="content"><p>` +
            
            (match.description_short !== null ? `${ match.description_short }` : ``) + `</p></div><div class="tags">` +
            
            match.tags.map(tag => `<a href="/?tag=${tag}"><div class="tag">${tag}</div></a>`).join('')
            + `</div > <div class="links-container">` +
            (match.url !== null ? `<a href="${match.url}"><div class="links">Website</div></a>` : ``) +
            (match.screen_name !== null ? `<a href="https://twitter.com/${match.screen_name}"><div class="links">Twitter</div></a>` : ``)
                    +
            `</div ></article >`
        ).join('');
        issues_list.innerHTML = ''
        console.log("blank issues list")
        cards.innerHTML = html
        document.getElementById('filter-context').innerHTML = '<span id="filtered-by">Filtered by: </span>#' + tag + '<span class="remove-filter"><a href="/">remove</a></span>'
    }
};

filterCards();


fetch('./orgs.json')
    .then((response) => response.json())
    .then((json) => {
        const arr = json.data

        // search box
        const search_input = document.getElementById('org_input')
        const clear_search = document.getElementById('clear-search')
  
        function searchOrgs(searchText) {
            // console.log(searchText.length)
            var matches = arr.filter(org => {
                const regex = new RegExp(`${searchText}`, 'gi');
                if (org.description_short !== null) {
                    return org.name.match(regex) || org.description_short.match(regex)
                }
                else {return org.name.match(regex)}
            });
           
            if (searchText.length === 0 || searchText == null) {
                matches = [];
                cards.innerHTML = '';
                window.history.replaceState({}, document.title, "/")
                displayTags();
                
            }
            else {
                window.history.replaceState({}, document.title, "/")
            };
            // console.log(matches);
            outputHTML(matches);
        };
        
        const outputHTML = matches => {
            if (matches.length > 0) {
                const issues_div = document.getElementById('issues')
                const html = matches.map(match => 
                    `<article class="card"><div><h2 class="card-title">${match.name}</div><div class="card-image"><img src="./images/twit_pics/` +
                    (match.image_file_name !== null ? `${match.image_file_name}` : `placeholder.png`) +
                    `"></div><div class="content"><p>` +
                    
                    (match.description_short !== null ? `${ match.description_short }` : ``) + `</p></div><div class="tags">` +
                    
                    match.tags.map(tag => `<a href="/?tag=${tag}"><div class="tag">${tag}</div></a>`).join('')
                    + `</div > <div class="links-container">` +
                    (match.url !== null ? `<a href="${match.url}"><div class="links">Website</div></a>` : ``) +
                    (match.screen_name !== null ? `<a href="https://twitter.com/${match.screen_name}"><div class="links">Twitter</div></a>` : ``)
                         +
                    `</div ></article >`
                
                ).join('');
                issues_div.innerHTML = ''
                cards.innerHTML = html;
                document.getElementById('filter-context').innerHTML = ''
            }
            else  {
                cards.innerHTML = ''
            }
        }
        search_input.addEventListener('input', () => searchOrgs(search_input.value))
        clear_search.addEventListener('click', () => {
            search_input.value = '';
            displayTags()
            cards.innerHTML = '';
            document.getElementById("filter-context").innerHTML = ''
        })
    });



    