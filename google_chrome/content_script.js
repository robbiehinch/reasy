// Object to hold information about the current page
var pageInfo = {
    "selected_text": window.getSelection().toString()
};

// Send the information back to the extension
chrome.extension.sendRequest(pageInfo);