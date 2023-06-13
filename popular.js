
// create cards
fetch('./popular.json')
    .then((response) => response.json())
    .then((json) => {
        const arr = json.popular

        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            const name = obj.name
            const count = obj.count
            const increase = obj.increase
            const percent = obj.percent
            const popular_link = document.createElement("tr")
            // issue.classList.add("issue")
            popular_link.innerHTML = 
                '<td>' + name + '</td><td class="align-right">' + count + '</td><td>' + percent + '% (+' + increase + ')</td>'
                    // .replaceAll(',', '</div><div>') + '</div>
            document.getElementById('popular_links').appendChild(popular_link)
        }
    });
