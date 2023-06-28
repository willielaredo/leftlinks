
// create cards
fetch('./popular.json')
    .then((response) => response.json())
    .then((json) => {
        const arr = json.popular
        const start_date = arr[0].start_date
        document.getElementById('start_date').innerHTML = '<span>' + start_date + '</span>'
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            const name = obj.name
            const count = obj.count
            const increase = obj.increase
            const percent = obj.percent
            const url = obj.url
            const screen_name = obj.screen_name
            const popular_link = document.createElement("tr")
            // issue.classList.add("issue")
            popular_link.innerHTML = 
                '<td><a href="' + url + '">' + name + '</a></td><td class="align-right"><a href="https://twitter.com/' + screen_name + '">' + count + '</a></td><td>' + percent + '% (+' + increase + ')</td>'
                    // .replaceAll(',', '</div><div>') + '</div>
            document.getElementById('popular_links').appendChild(popular_link)
        }
    });
