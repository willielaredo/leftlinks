
// create cards
fetch('./issues.json')
    .then((response) => response.json())
    .then((json) => {
        const arr = json.issues

        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            const issue_name = obj.issue_name
            const issue_count = obj.issue_count
            const issue = document.createElement("div")
            issue.classList.add("issue")
            issue.innerHTML = 
                '<a href="'+ issue_name.toLowerCase().replace(' ','-') + '.html"><h2>' + issue_name + ' (' + issue_count + ')</h2></a>'
                    // .replaceAll(',', '</div><div>') + '</div>
            document.getElementById('issues').appendChild(issue)
        }
    });
