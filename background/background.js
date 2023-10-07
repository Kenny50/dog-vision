// background.js
chrome.runtime.onInstalled.addListener(function() {

    chrome.contextMenus.create({
        type: 'normal',
        title: 'Simulate Dog Vision',
        id: 'simulateDogVision',
        contexts: ['image'],
    });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === 'simulateDogVision') {
        const imageUrl = info.srcUrl; // Get the URL of the clicked image
        chrome.tabs.sendMessage(tab.id, { action: "simulateDogVision", imageUrl: imageUrl })
        .then(() => {
            chrome.action.openPopup();
        })
        .catch(err => console)
    }
});
