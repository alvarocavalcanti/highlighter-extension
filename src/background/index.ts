import { browserAPI } from '../utils/browser-api';

// Create context menu item when the extension is installed
browserAPI.runtime.onInstalled.addListener(() => {
  browserAPI.contextMenus.create({
    id: "highlightSelection",
    title: "Highlight Selection",
    contexts: ["selection"],  // Only shows when text is selected
  });
});

// Handle context menu clicks
browserAPI.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "highlightSelection" && tab?.id && tab.url) {
    console.log("Sending highlight message:", {
      type: "highlight",
      text: info.selectionText,
      url: tab.url
    });
    
    browserAPI.tabs.sendMessage(tab.id, {
      type: "highlight",
      text: info.selectionText,
      url: tab.url
    }).then(response => {
      console.log("Highlight response:", response);
    }).catch(error => {
      console.error("Error highlighting:", error);
    });
  }
});
