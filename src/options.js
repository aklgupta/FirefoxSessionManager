"use strict"


window.onload = () => {
    browser.tabs.query({}, tabs => {
        tabs.forEach(tab => {
            document.body.innerText += "\n";
            document.body.innerText += "\n";
            document.body.innerText += "\n";
            document.body.innerText += JSON.stringify(tab, null, 4);
        });
    }).catch((error) => {
        console.error("Error fetching tabs: ", error);
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