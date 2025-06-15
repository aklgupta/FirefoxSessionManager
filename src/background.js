"use strict"

browser.browserAction.onClicked.addListener(() => {
	browser.tabs.create({
		url: browser.runtime.getURL("options.html")
	});
});


/**
 * https://github.com/mdn/webextensions-examples/blob/main/tabs-tabs-tabs/background.js
 *      onRemoved fires too early and the count is one too many.
 *      see https://bugzilla.mozilla.org/show_bug.cgi?id=1396758
 */
function UpdateTabCounter(tabId, isOnRemoved){
	browser.tabs.query({})
		.then((tabs) => {
			let length = tabs.length;

			// onRemoved fires too early and the count is one too many.
			// see https://bugzilla.mozilla.org/show_bug.cgi?id=1396758
			if (isOnRemoved && tabId && tabs.map((t) => { return t.id; }).includes(tabId)) {
				length--;
			}
			browser.browserAction.setBadgeText({text: length.toString()});
		});
}



browser.tabs.onCreated.addListener(tabId => UpdateTabCounter(tabId, false));
browser.tabs.onRemoved.addListener(tabId => UpdateTabCounter(tabId, true));
browser.browserAction.setBadgeBackgroundColor({ color: "#005f9e" });
UpdateTabCounter(-1, false);




function UpdateSession(){

}

browser.tabs.onCreated.addListener((_,__) => UpdateSession());
browser.tabs.onRemoved.addListener((_,__) => UpdateSession());
browser.tabs.onActivated.addListener(_ => UpdateSession());
browser.tabs.onAttached.addListener((_,__) => UpdateSession());
browser.tabs.onDetached.addListener((_,__) => UpdateSession());
browser.tabs.onMoved.addListener((_,__) => UpdateSession());
browser.tabs.onReplaced.addListener((_,__) => UpdateSession());


function OnUpdate(tabId, changeInfo, tabInfo){
	
}

browser.tabs.onUpdated.addListener(
	OnUpdate,
	{
		"properties":[
			"pinned",
			"status",
			"url",
		]
	}
);

function OnSessionChanged(){
	
}

browser.sessions.onChanged.addListener(OnSessionChanged);