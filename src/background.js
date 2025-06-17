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




function UpdateSession(msg){
	console.log(`[FSM] Update session - ${msg}`);
}

browser.tabs.onCreated.addListener((_,__) => UpdateSession("onCreate"));
browser.tabs.onRemoved.addListener((_,__) => UpdateSession("onRemove"));
browser.tabs.onActivated.addListener(_ => UpdateSession("onActivate"));
browser.tabs.onAttached.addListener((_,__) => UpdateSession("onAttached"));
browser.tabs.onDetached.addListener((_,__) => UpdateSession("onDetached"));
browser.tabs.onMoved.addListener((_,__) => UpdateSession("onMoved"));
browser.tabs.onReplaced.addListener((_,__) => UpdateSession("onReplaced"));


function OnUpdate(tabId, changeInfo, tabInfo){
	console.log(`[FSM] Update session - On Update - ${changeInfo.pinned}|${changeInfo.status}|${changeInfo.url}`);
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