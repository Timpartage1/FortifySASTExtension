let savedCode = ""; // Variable to store the source code

// Listen for messages from the content script or popup script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "saveCode") {
        // Save the source code
        savedCode = message.sourceCode;
        console.log("Saved source code:", savedCode);

        // Trigger download
        downloadCode(savedCode);

        // You can perform additional processing or saving logic here
    }
});

// Example: You might want to expose a function to retrieve the saved code
function getSavedCode() {
    return savedCode;
}

function downloadCode(code) {
    chrome.downloads.download({
        url: 'data:text/html;charset=utf-8,' + encodeURIComponent(code),
        filename: 'saved_code.html',
        saveAs: false
    }, function (downloadId) {
        // Handle download completion if needed
    });
}
