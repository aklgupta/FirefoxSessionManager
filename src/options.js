"use strict"

const properties = [
    "id",
    "windowId",
    "groupId",
    "active",
    "pinned",
    "hidden",
    "discarded",
    "audible",
    "autoDiscardable",
    "autoDiscardable",
    "isInReaderMode",
    "successorTabId",
    "url",
    "title",
    "favIconUrl",
];

window.onload = () => {
    let header = document.getElementById("header");
    header.innerHTML += `<th>S. no.</th>`;
    properties.forEach(x => {
        header.innerHTML += `<th>${x}</th>`;
    });
    
    // TODO: Need to show live list
    browser.tabs.query({}, tabs => {
        let tbody = document.getElementById("tbody");
        let sno = 0;
        tabs.forEach(tab => {
            let row = document.createElement("tr");
            row.innerHTML = `<td>${++sno}</td>`;
            properties.forEach(x => {
                row.innerHTML += `<td>${tab[x]}</td>`;
            });
            tbody.appendChild(row);
        });
    });

    return;
    
    browser.storage.local.get().then(x => {
        document.body.innerText += ` =>
${JSON.stringify(x)}
`;
    }).catch(err => {
        document.body.innerText = ` ERR => ${JSON.stringify(err)}`;
    });

}