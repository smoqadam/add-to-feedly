self.port.on("getRssLink", function(){
	var links = document.getElementsByTagName('link'); 
	var flag = false;
	for (var i = 0; i < links.length ; ++i)
	{
		if (links[i].getAttribute('type') == 'application/rss+xml')
		{
			self.port.emit('setRssLink', links[i].href);
			flag = true;
			break;
		}
	}
	if(flag == false){
		self.port.emit('disableBtn');
	}
});

