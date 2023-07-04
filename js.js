// show/hide filter options

// var button = document.getElementById('toggle-filters'); // Assumes element with id='button'

// button.onclick = function() {
//     var div = document.getElementById('filters');
//     if (div.style.display !== 'none') {
//         div.style.display = 'none';
//     }
//     else {
//         div.style.display = 'block';
//     }
// };

// create cards
fetch('./orgs.json')
    .then((response) => response.json())
    .then((json) => {
        const arr = json.data
        const countSpan = document.getElementById("count");
        const newText = document.createTextNode(arr.length);
        countSpan.appendChild(newText)
        function renderAllCards() {
            for (var i = 0; i < arr.length; i++) {
                var obj = arr[i];
                const name = obj.name
                const description = obj.short_description
                const slug = obj.slug
                const url = obj.url
                const profile_tags = obj.tags
                const screen_name = obj.screen_name
                const profile_tags_str = profile_tags.toString()
                const card = document.createElement("article")
                card.classList.add("card")
                if (profile_tags) { card.classList.add(...profile_tags) }
                const nameDiv = document.createElement("div")
                const imgDiv = document.createElement("div")
                const descDiv = document.createElement("div")
                const tagsDiv = document.createElement("div")
                const linksDiv = document.createElement("div")
                const websiteDiv = document.createElement("div")
                const twitterDiv = document.createElement("div")
                const newh2 = document.createElement("h2")
                const newimg = document.createElement("img")
                const website = document.createElement("a")
                const twitter = document.createElement("a")
                const newP = document.createElement("p")
                card.append(nameDiv, imgDiv, descDiv, tagsDiv, linksDiv)
                tagsDiv.classList.add("tags")
                nameDiv.appendChild(newh2).textContent += name
                newh2.classList.add("card-title")
                imgDiv.appendChild(newimg)
                imgDiv.classList.add("card-image")
                newimg.setAttribute("src", "./images/twit_pics/" + screen_name + ".jpeg")
                descDiv.appendChild(newP).textContent += description
                descDiv.classList.add("content")
                linksDiv.append(website, twitter)
                linksDiv.classList.add("links-container")
                website.setAttribute("href", url)
                website.appendChild(websiteDiv).textContent += "Website"
                websiteDiv.classList.add("links")
                twitter.appendChild(twitterDiv).textContent += "Twitter"
                twitter.setAttribute("href", "https://twitter.com/" + screen_name)
                twitterDiv.classList.add("links")
                profile_tags.forEach(element => {
                    if (element) { tagsDiv.innerHTML += '<a href="/?tag=' + element + '"><div class="tag">' + element + '</div></a>' }
                })
                document.getElementById('cards').appendChild(card)
            }
        }
        renderAllCards();
        function filterCards() {
            var params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
            });
            var tag = params.tag;
            if (tag) {
                const matching = document.getElementsByClassName(tag)
                for (let match of matching) { match.classList.remove("is-hidden") }
                const not_matching = document.querySelectorAll("article:not(." + CSS.escape(tag) + ")")
                for (let not_match of not_matching) { not_match.classList.add("is-hidden") }
            }
            else {
                const all_articles = getElementsByClassName("card")
                for (let article in all_articles) {article.classList.remove("is-hidden")}
            }
        }
        const search_input = document.getElementById('org_input')
        const org_list = document.getElementById('cards')
        // get matches to current text input
        function searchOrgs(searchText) {
            let matches = arr.filter(org => {
                const regex = new RegExp(`${searchText}`, 'gi');
                return org.name.match(regex) || org.short_description.match(regex)
                
            });
            
            if (searchText.length === 0) {
                matches = [];
                org_list.innerHTML = '';

            };
            outputHTML(matches);
        };
        
        const outputHTML = matches => {
            if (matches.length > 0) {
                const html = matches.map(match => 
                    `<article class="card"><div><h2 class="card-title">${match.name}</div><div class="card-image"><img src="./images/twit_pics/${match.screen_name}.jpeg"></div><div class="content"><p>${match.short_description}</p></div><div class="tags"></div><div class="links-container"><a href="${match.url}"><div class="links">Website</div></a><a href="https://twitter.com/${match.screen_name}"><div class="links">Twitter</div></a></div></article>`
                ).join('');

                org_list.innerHTML = html;
            }
        }
        search_input.addEventListener('input', () => searchOrgs(search_input.value))
        filterCards()
    });