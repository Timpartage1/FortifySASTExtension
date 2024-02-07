// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Find the button with the ID "saveCodeBtn" and add a click event listener
    document.getElementById("saveCodeBtn").addEventListener("click", function () {
      // Trigger the background script to save the code
      chrome.runtime.sendMessage({ action: "saveCode" });
    });
  });
  