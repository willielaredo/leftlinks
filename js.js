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
            card.innerHTML = 
                '<div><h2>' + name + '</h2></div> <div class="card-image"><img src="./images/twit_pics/' + screen_name + '.jpg" /></div> <div class="content"><p>' + description + '</p></div> <div class="tags"><div class="tag">' + profile_tags_str.replaceAll(",",'</div><div class="tag">') + '</div> </div><div class="links-container"> <a href="' + url + '"><div class="links"> <i class="fa-light fa-arrow-up-right-from-square"></i>Website </div></a> <a href="https://twitter.com/' + screen_name + '"</a><div class="links"> Twitter </div> </div>'
                    // .replaceAll(',', '</div><div>') + '</div>
            document.getElementById('cards').appendChild(card)
        }
    });
