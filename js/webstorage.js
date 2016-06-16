function readFrom(storage, result) {
    for(var i = 0; i < storage.length; ++i) {
        var key = storage.key(i);
        result.push({
            name: key,
            value: storage.getItem(key),
            type: storage === window.sessionStorage ? 'session' : 'local'
        });
    }
}

var result = [];

readFrom(window.localStorage, result);
readFrom(window.sessionStorage, result);

chrome.runtime.sendMessage({
    type: 'storage',
    tokens: result
}, function response(ignored) {

});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.type !== 'sessionSave' && message.type !== 'localSave') {
        return;
    }

    var storage = message.type === 'sessionSave' ?
        window.sessionStorage :
        window.localStorage;
    storage.setItem(message.name, message.value);
});
