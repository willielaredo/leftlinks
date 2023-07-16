// create cards
fetch('./orgs.json')
    .then((response) => response.json())
    .then((json) => {
        const arr = json.data
        const countSpan = document.getElementById("count");
        const newText = document.createTextNode(arr.length);
        const cards = document.getElementById('cards')
        const issues_list = document.getElementById('issues')
        countSpan.appendChild(newText)
        // function renderAllCards() {
        //     for (var i = 0; i < arr.length; i++) {
        //         var obj = arr[i];
        //         const name = obj.name
        //         const description = obj.short_description
        //         const slug = obj.slug
        //         const url = obj.url
        //         const profile_tags = obj.tags
        //         const screen_name = obj.screen_name
        //         const profile_tags_str = profile_tags.toString()
        //         const card = document.createElement("article")
        //         card.classList.add("card")
        //         if (profile_tags) { card.classList.add(...profile_tags) }
        //         const nameDiv = document.createElement("div")
        //         const imgDiv = document.createElement("div")
        //         const descDiv = document.createElement("div")
        //         const tagsDiv = document.createElement("div")
        //         const linksDiv = document.createElement("div")
        //         const websiteDiv = document.createElement("div")
        //         const twitterDiv = document.createElement("div")
        //         const newh2 = document.createElement("h2")
        //         const newimg = document.createElement("img")
        //         const website = document.createElement("a")
        //         const twitter = document.createElement("a")
        //         const newP = document.createElement("p")
        //         card.append(nameDiv, imgDiv, descDiv, tagsDiv, linksDiv)
        //         tagsDiv.classList.add("tags")
        //         nameDiv.appendChild(newh2).textContent += name
        //         newh2.classList.add("card-title")
        //         imgDiv.appendChild(newimg)
        //         imgDiv.classList.add("card-image")
        //         newimg.setAttribute("src", "./images/twit_pics/" + screen_name + ".jpeg")
        //         descDiv.appendChild(newP).textContent += description
        //         descDiv.classList.add("content")
        //         linksDiv.append(website, twitter)
        //         linksDiv.classList.add("links-container")
        //         website.setAttribute("href", url)
        //         website.appendChild(websiteDiv).textContent += "Website"
        //         websiteDiv.classList.add("links")
        //         twitter.appendChild(twitterDiv).textContent += "Twitter"
        //         twitter.setAttribute("href", "https://twitter.com/" + screen_name)
        //         twitterDiv.classList.add("links")
        //         profile_tags.forEach(element => {
        //             if (element) { tagsDiv.innerHTML += '<a href="/?tag=' + element + '"><div class="tag">' + element + '</div></a>' }
        //         })
        //         document.getElementById('cards').appendChild(card)
        //     }
        // }
        // renderAllCards();
        
        
        // render all unique tags
        function fetchTagsFromOrgs() {
            const tag_list = []
            for (var i = 0; i < arr.length; i++) {
                var obj = arr[i];
                const tags = obj.tags
                if (tags) {
                    tags.forEach(
                        (tag) => {
                            if (tag !== null) {
                                tag_list.push(tag)
                            }
                        }
                )}
            }
            const unique_tags = tag_list.filter((value, index, array) => array.indexOf(value) === index);
            issues_list.innerHTML = ''
            unique_tags.sort().forEach((tag) => {
                const issue = document.createElement("div")
                issue.classList.add("issue")
                issue.innerHTML =
                    '<a href="/?tag=' + tag + '"><h3>' +
                    
                tag.replaceAll("-"," ").replace(
                    /\w\S*/g,
                    function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    })
                + '</h3></a>'
                issues_list.appendChild(issue)
            });
        };
        fetchTagsFromOrgs()

        // render cards filtered by tag
        function filterCards() {
            var params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
            });
            var tag = params.tag;
            if (tag) {
                function filterByTag(org) {
                    if (org.tags.includes(tag)) {
                        return true
                    }
                }
                const orgsFiltered = arr.filter(filterByTag)
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
                cards.innerHTML = html
                document.getElementById('filter-context').innerHTML = '<span id="filtered-by">Filtered by: </span>#' + tag + '<span class="remove-filter"><a href="/">remove</a></span>'
            }
        }

        // search box
        const search_input = document.getElementById('org_input')
        const clear_search = document.getElementById('clear-search')
  
        function searchOrgs(searchText) {
            console.log(searchText.length)
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
                fetchTagsFromOrgs()
                
            }
            else {
                window.history.replaceState({}, document.title, "/")
            };
            console.log(matches);
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
                fetchTagsFromOrgs()
            cards.innerHTML = '';
            document.getElementById("filter-context").innerHTML = ''
        })
        
        
        filterCards()
    });



    