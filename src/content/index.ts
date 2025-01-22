import { browserAPI } from '../utils/browser-api';

const HIGHLIGHT_COLOR = '#0F0';

interface Highlight {
  url: string;
  text: string;
}

interface HighlightMessage {
  type: string;
  text: string;
  url: string;
}

// Listen for messages from the background script
browserAPI.runtime.onMessage.addListener((message: HighlightMessage, sender, sendResponse) => {
  if (message.type === "highlight") {
    console.log("Received highlight message:", message);
    
    // Get all highlights
    browserAPI.storage.local.get({ highlights: [] })
      .then((result) => {
        console.log("Current stored highlights:", result);
        const highlights: Highlight[] = result.highlights || [];
        
        // Add new highlight
        highlights.push({
          url: message.url,
          text: message.text
        });
        
        console.log("Saving to storage:", { highlights });
        
        // Save back to storage
        return browserAPI.storage.local.set({ highlights });
      })
      .then(() => {
        // Verify the save
        return browserAPI.storage.local.get({ highlights: [] });
      })
      .then((savedResult) => {
        console.log("Verified saved data:", savedResult);
        
        // Highlight the selected text after successful storage
        const selection = window.getSelection();
        if (selection) {
          const range = selection.getRangeAt(0);
          const span = document.createElement('span');
          span.style.backgroundColor = HIGHLIGHT_COLOR;
          range.surroundContents(span);
        }
        sendResponse({ success: true });
      })
      .catch((error) => {
        console.error('Error in highlight process:', error);
        sendResponse({ success: false, error: error.message });
      });
    
    return true;
  }
  return false;
});

// Function to apply highlights
function applyHighlights() {
  console.log("Checking highlights for URL:", window.location.href);
  
  browserAPI.storage.local.get({ highlights: [] })
    .then((result) => {
      console.log("All stored highlights:", result);
      const urlHighlights = result.highlights
        .filter((h: Highlight) => h.url === window.location.href)
        .map((h: Highlight) => h.text);
      
      console.log("Highlights for current URL:", urlHighlights);
      
      if (urlHighlights.length === 0) {
        console.log("No highlights found for this page");
        return;
      }
      
      urlHighlights.forEach((textToHighlight: string) => {
        console.log("Found saved highlight: ", textToHighlight);
        // Find all text nodes in the document
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          null
        );

        let node;
        while (node = walker.nextNode()) {
          const text = node.textContent ?? '';
          const index = text.indexOf(textToHighlight);
          
          if (index >= 0) {
            const range = document.createRange();
            range.setStart(node, index);
            range.setEnd(node, index + textToHighlight.length);
            
            const span = document.createElement('span');
            span.style.backgroundColor = HIGHLIGHT_COLOR;
            range.surroundContents(span);
            
            // Skip the newly created span to avoid infinite loops
            walker.nextNode();
          }
        }
      });
    })
    .catch((error) => {
      console.error("Error loading highlights:", error);
    });
}

// Call applyHighlights immediately if document is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  applyHighlights();
} else {
  // Otherwise wait for DOMContentLoaded
  document.addEventListener('DOMContentLoaded', applyHighlights);
}

