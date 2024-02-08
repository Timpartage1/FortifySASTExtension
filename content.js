// content.js
// content.js

chrome.runtime.connect({ name: "content" });


function saveCodeLocally(code) {
    // Check if the source code contains the <html> tag to determine if it's HTML
    const isHTML = code.toLowerCase().includes("<html>");
  
    // Determine the file extension based on the detected format
    const fileExtension = isHTML ? "html" : "txt";
  
    // Create a Blob from the source code
    const blob = new Blob([code], { type: "text/plain" });
  
    // Use chrome.runtime.getURL to obtain the URL of a file within your extension
    const url = chrome.runtime.getURL("dummy_file." + fileExtension);
  
    // Use the chrome.downloads API to initiate the download
    chrome.downloads.download({
      url: url,
      filename: "source_code." + fileExtension,
      saveAs: false
    }, function(downloadId) {
      console.log("Download started with ID:", downloadId);
  
      // Monitor download progress
      chrome.downloads.onChanged.addListener(function (delta) {
        if (delta.id === downloadId && delta.state) {
          const percentComplete = (delta.state.current / delta.state.total) * 100;
  
          // Send progress information to the popup.js script
          chrome.runtime.sendMessage({ action: "updateProgress", progress: percentComplete });
          
          // If the download is complete, remove the event listener
          if (delta.state.current === delta.state.total) {
            chrome.downloads.onChanged.removeListener();
          }
        }
      });
    });
  }
  
  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "saveCode") {
      // Call the saveCodeLocally function with the source code
      saveCodeLocally(message.sourceCode);
    }
  });
  