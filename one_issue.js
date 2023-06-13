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

var this_url = window.location.href
console.log(this_url)
console.log(this_url.substring(0, 10))
if (this_url.substring(0, 10) == 'http://127') {
    var issue_type_file = this_url.split('/')[3].split('.')[0]
}
else {
    var issue_type_file = this_url.split('/')[4].split('.')[0]
}
// var issue_type_file = this_url.split('/')[4].split('.')[0]
var issue_type_display = issue_type_file.replace('-',' ').toLowerCase()
console.log(issue_type_file)
console.log(issue_type_display)

// create cards
fetch(`./${issue_type_file}.json`)
    .then((response) => response.json())
    .then((json) => {
        const arr = json.data
        console.log(arr)
        const countSpan = document.getElementById("count");
        const newText = document.createTextNode(arr.length);
        countSpan.appendChild(newText)

        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            const name = obj.name
            const description = obj.short_description
            const slug = obj.slug
            const profile_tags = obj.tags
            const screen_name = obj.screen_name
            const profile_tags_str = profile_tags.toString()
            const card = document.createElement("article")
            card.classList.add("card")
            card.innerHTML = 
                '<div><h2>' + name + '</h2></div><div class="card-image"><img src="./images/twit_pics/' + screen_name + '.jpg" /></div><div class="content"><p>' + description + '</p></div><footer><div class="tag">' + profile_tags_str.replaceAll(",",'</div><div class="tag">') + '</div></footer>'
                    // .replaceAll(',', '</div><div>') + '</div>
            document.getElementById('cards').appendChild(card)
        }
    });
