let savedCode = ""; // Variable to store the source code

// Listen for messages from the content script or popup script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "saveCode") {
        // Convert the source code to a string
        const sourceCodeString = JSON.stringify(message.sourceCode);

        // Save the source code
        savedCode = String(sourceCodeString);
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
    console.log("Code for download:", code);

    chrome.downloads.download({
        url: 'data:text/html;charset=utf-8,' + encodeURIComponent(code),
        filename: 'saved_code.html',
        saveAs: false
    }, function (downloadId) {
        if (chrome.runtime.lastError) {
            console.error("Download error:", chrome.runtime.lastError);
        } else {
            console.log("Download successful. Download ID:", downloadId);
        }
    });
}
