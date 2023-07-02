function fetchTagsFromOrgs() {
    fetch('./orgs.json')
        .then((response) => response.json())
        .then((json) => {
            const arr = json.data
            const tag_list = []
            for (var i = 0; i < arr.length; i++) {
                var obj = arr[i];
                const tags = obj.tags
                if (tags) {
                    tags.forEach((tag) => tag_list.push(tag))
                }
            }
            const unique_tags = tag_list.filter((value, index, array) => array.indexOf(value) === index);
            console.log(unique_tags.sort())
            unique_tags.forEach((tag) => {
                const issue = document.createElement("div")
                issue.classList.add("issue")
                issue.innerHTML =
                    '<a href="/?tag=' + tag + '"><h3>#' + tag + '</h3></a>'
                // .replaceAll(',', '</div><div>') + '</div>
                document.getElementById('issues').appendChild(issue)
            });
        });
}
fetchTagsFromOrgs()


// function fetchIssuesFromJSON() {
//     fetch('./issues.json')
//         .then((response) => response.json())
//         .then((json) => {
//             const arr = json.issues

//             for (var i = 0; i < arr.length; i++) {
//                 var obj = arr[i];
//                 const issue_name = obj.issue_name
//                 const issue_count = obj.issue_count
//                 const issue = document.createElement("div")
//                 issue.classList.add("issue")
//                 issue.innerHTML =
//                     '<a href="' + issue_name.toLowerCase().replace(' ', '-') + '.html"><h3>' + issue_name + ' (' + issue_count + ')</h3></a>'
//                 // .replaceAll(',', '</div><div>') + '</div>
//                 document.getElementById('issues').appendChild(issue)
//             }
//         });
// }
// fetchIssuesFromJSON();


