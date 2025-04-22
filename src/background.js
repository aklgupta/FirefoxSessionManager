"use strict"

browser.browserAction.onClicked.addListener(() => {
	browser.tabs.create({
		url: browser.runtime.getURL("options.html")
	});
});

function UpdateTabCounter(){
	browser.tabs.query({}, tabs => {
		browser.browserAction.setBadgeText({text: tabs.length.toString()});
	})
}

browser.tabs.onCreated.addListener(UpdateTabCounter);
browser.tabs.onRemoved.addListener(UpdateTabCounter);

browser.browserAction.setBadgeBackgroundColor({ color: "#005f9e" });
UpdateTabCounter();
