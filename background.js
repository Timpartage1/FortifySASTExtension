// background.js

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(message) {
      if (message.action === "saveCode") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          if (tabs && tabs.length > 0 && tabs[0].id) {
            console.log("Found active tab with ID:", tabs[0].id);
  
            // Send the message directly to the content script using port
            chrome.tabs.sendMessage(tabs[0].id, { action: "saveCode", sourceCode: message.sourceCode });
            console.log("I am receiving the message");
          } else {
            console.error("Unable to find an active tab to send the message.");
          }
        });
      }
    });
  });
  