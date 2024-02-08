// popup.js

// Wait for the DOM to be fully loaded
// document.addEventListener("DOMContentLoaded", function () {
//     // Find the button with the ID "saveCodeBtn" and add a click event listener
//     document.getElementById("saveCodeBtn").addEventListener("click", function () {
//         // Trigger the background script to save the code
//         chrome.runtime.sendMessage({ action: "saveCode" });
//     });
// });


// popup.js

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Find the button with the ID "saveCodeBtn" and add a click event listener
    document.getElementById("saveCodeBtn").addEventListener("click", function () {
        // Get the current active tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const activeTab = tabs[0];

            // Fetch the source code of the current active tab
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: function () {
                    return document.documentElement.outerHTML;
                },
            }, function (result) {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                } else {
                    // Send the source code to the background script
                    const sourceCode = result[0];
                    chrome.runtime.sendMessage({ action: "saveCode", sourceCode });
                }
            });
        });
    });
});

