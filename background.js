var alertError = function(arg) {
    if (arg.url.match(/https:\/\/crs\.upd\.edu\.ph\/preenlistment/) == null) {
        alert('You are not on the CRS preenlistment page! Iskoduler will automatically compute the probabilities when you open the CRS preenlistment page.');
    }
    else {
        window.location.hash = 'tbl_class-info';
    }
};
chrome.browserAction.onClicked.addListener(alertError);
chrome.tabs.onActivated.addListener(function(info) {
    chrome.tabs.get(info.tabId, function(change) {
        if (change.url == undefined) {
            chrome.browserAction.setIcon({
                path: 'icon-128-off.png',
                tabId: info.tabId
            });
            console.log('undefined');
        } else if (change.url.match(/https:\/\/crs\.upd\.edu\.ph\/preenlistment/) == null) {
            chrome.browserAction.setIcon({
                path: 'icon-128-off.png',
                tabId: info.tabId
            });
            console.log('not matching');
        } else if (change.url.match(/https:\/\/crs\.upd\.edu\.ph\/preenlistment\/subject_search*/) != null) {
            chrome.tabs.executeScript(tab.id, {file: "bookmarklet-tooltip.js"});
            chrome.browserAction.setIcon({
                path: 'icon-128.png',
                tabId: info.tabId
            });
            console.log('matched');
        } else {
            chrome.tabs.executeScript(tab.id, {file: "bookmarklet.js"});
            chrome.browserAction.setIcon({
                path: 'icon-128.png',
                tabId: info.tabId
            });
            console.log('matched');
        }
    });
});
chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
    if (tab.url == undefined) {
        return;
    } else if (tab.url.match(/https:\/\/crs\.upd\.edu\.ph\/preenlistment/) == null) {
        chrome.browserAction.setIcon({
            path: 'icon-128-off.png',
            tabId: tabId
        });
        console.log('not matching');
    } else if (change.url.match(/https:\/\/crs\.upd\.edu\.ph\/preenlistment\/subject_search*/) != null) {
        chrome.tabs.executeScript(tab.id, {file: "bookmarklet-tooltip.js"});
        chrome.browserAction.setIcon({
            path: 'icon-128.png',
            tabId: info.tabId
        });
        console.log('matched');
    } else {
        chrome.tabs.executeScript(tab.id, {file: "bookmarklet.js"});
        chrome.browserAction.setIcon({
            path: 'icon-128.png',
            tabId: tabId
        });
        console.log('matched');
    }
});
