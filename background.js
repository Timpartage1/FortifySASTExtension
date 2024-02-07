chrome.runtime.onInstalled.addListener(function () {
    console.log("Code Saver Extension Installed");
  });

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "saveCode") {
      // Save the source code locally (you can customize the saving logic here)
      saveCodeLocally(message.sourceCode);
    }
  });
  
  function saveCodeLocally(code) {
    // Implement your logic to save the code locally using Ajax, jQuery, or any other method
    // Example: You can use the 'chrome.storage.local' API to store the code
    chrome.storage.local.set({ savedCode: code }, function () {
      console.log("Code saved locally.");
    });
  }
  
  