// This script runs on every page load

// Get the source code of the page
var pageSource = document.documentElement.outerHTML;

// Send the source code to the background script
chrome.runtime.sendMessage({ action: "saveCode", sourceCode: pageSource });
