var rssLink = null;

browser.browserAction.onClicked.addListener((tab) => {
  browser.tabs.create({
    url:"http://feedly.com/#subscription/feed/"+rssLink
  })
});

browser.tabs.onActivated.addListener(function(activeInfo){
  console.log('tab is ready')
  console.log(activeInfo)
  browser.tabs.sendMessage(activeInfo.tabId, {'tab_id':activeInfo.tabId});
});

browser.runtime.onMessage.addListener(function(message) {
   if (!message.flag){
     browser.browserAction.disable(message.tab_id)
     rssLink = null;
   } else {
     browser.browserAction.enable(message.tab_id)
     rssLink = message.rssLink;
   }
});
