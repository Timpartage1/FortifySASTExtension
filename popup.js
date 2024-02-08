// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Find the button with the ID "saveCodeBtn" and add a click event listener
    document.getElementById("saveCodeBtn").addEventListener("click", function () {
      // Trigger the background script to save the code
      chrome.runtime.sendMessage({ action: "saveCode" });
    });





// Add this inside the event listener or wherever appropriate
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "updateProgress") {
      // Update the progress bar in the popup
      updateProgressBar(message.progress);
    }
  });
  
  function updateProgressBar(progress) {
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = progress + '%';
  }
  


  });
  