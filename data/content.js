self.port.on("getRssLink", function(){
	var links = document.getElementsByTagName('link'); 
	for (var i = 0; i < links.length ; ++i)
	{
		if (links[i].getAttribute('type') == 'application/rss+xml')
		{
			self.port.emit('setRssLink',links[i].getAttribute('href'));
			break;
		}
	}
});

