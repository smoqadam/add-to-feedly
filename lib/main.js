var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;
var browserWindows = require("sdk/windows").browserWindows;

var pageMod = require("sdk/page-mod");
var rss ;
pageMod.PageMod({
	include: "*",
	contentScriptFile: data.url("content.js"),
	onAttach : function (worker) {
		worker.port.emit("getRssLink");
		worker.port.on("setRssLink", function(elementContent) {
			rss = elementContent;
			button.disabled = false;
			button.icon = {
				"16": "./icon-16.png",
				"32": "./icon-32.png",
				"64": "./icon-64.png"
			};
		});
	}	
});

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

function handleClick(state) {
	if(rss != undefined ) browserWindows.open("http://feedly.com/#subscription/feed/"+rss, "mywindow","menubar=0,resizable=1,location=no,toolbar=no,width=350,height=250");
}
