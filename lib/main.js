var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;

/*
* store rss link from activated tab
*/
var rss ;

/**
 *  Create Feedly Button in toolbar :: default is Disabled
 */
var button = buttons.ActionButton({
	id: "add-to-feedly",
	label: "Add to Feedly",
	
	disabled : true,
	icon : {
		"16": "./icon-16-d.png",
		"32": "./icon-32-d.png",
		"64": "./icon-64-d.png"
	},
	onClick: handleClick
});

/** 
* On click Feedly Button open a new window and go the Feedly subscription page
*/
function handleClick(state) {
	if(rss != undefined ) browserWindows.open("http://feedly.com/#subscription/feed/"+rss, "mywindow","menubar=0,resizable=1,location=no,toolbar=no,width=350,height=250");
}

/**
* When a tab open and ready ContentScript add to the tab then call addBtn function
* 
*/
tabs.on('open',addContentScript);
function addContentScript (tab) {
	tab.on('ready',function (tab) {
		console.log('tab ready');
		tabworker =	tab.attach({
			contentScriptFile : data.url('content.js'),
		});
		addBtn(tabworker);
		
	})
}

/**
* ContentScript add to the activated tab
* 
*/
tabs.on('activate', function(tab) {
		tabworker = tab.attach({
			contentScriptFile : data.url('content.js'),
	});
		addBtn(tabworker);
});

/**
* This function give a worker from tabs.
* 
* getRssLink :: an event on ContnetScript (content.js) that get the rss link from the web page.
* setRssLink :: when contentScript find rss link on the web page then emit this event.this event set rss link and acivate button.
* disableBtn :: if contentScript doesn't find any rss link in web page set the button to disabed. 
*/
function addBtn (tabworker) {

	tabworker.port.emit("getRssLink");
	tabworker.port.on("setRssLink", function(elementContent) {
		console.log('setRssLink EMITTED');
		rss = elementContent;
		button.disabled = false;
		button.icon = {
			"16": "./icon-16.png",
			"32": "./icon-32.png",
			"64": "./icon-64.png"
		};
	});
	tabworker.port.on('disableBtn',function () {
		button.disabled = true;
		button.icon = {
		"16": "./icon-16-d.png",
		"32": "./icon-32-d.png",
		"64": "./icon-64-d.png"
		}
	});
}