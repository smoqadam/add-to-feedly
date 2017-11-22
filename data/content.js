function getRssLink(message, sender, sendResponse) {
	var links = document.getElementsByTagName('link');
	var rssLink = null;
	var flag = false;
	for (var i = 0; i < links.length ; ++i) {
		if (links[i].getAttribute('type') == 'application/rss+xml') {
			flag = true;
			rssLink = links[i].href;
			break;
		}
	}

	browser.runtime.sendMessage({
		'rssLink':rssLink,
		'flag':flag,
		'tab_id': message.tab_id
	});

}
browser.runtime.onMessage.addListener(getRssLink);
