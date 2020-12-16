var data = {
    token: null,
    isInsert: false
};

const beforeSendHeadersListener = ({url, requestHeaders}) => {
  if (data['isInsert'] && data['token']) {
    requestHeaders.push({
      name: 'Authorization',
      value: `Bearer ${data['token']}`
    });
  }
  return {requestHeaders};
};

chrome.webRequest.onBeforeSendHeaders.addListener(
    beforeSendHeadersListener,
    {urls: ['<all_urls>']},
    ['blocking', 'requestHeaders']
);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	if (sender.tab) {
      sendResponse({error: 'Not from extension'});
    }
    if ("token" in request) {
      data['token'] = request.token;
    }
    if ("isInsert" in request) {
      data['isInsert'] = request.isInsert;
    }

    // Send stored data
    sendResponse(data);
  }
);
