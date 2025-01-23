import { browserAPI } from "../utils/browser-api";

const HIGHLIGHT_COLOR = "#0F0";

interface Highlight {
  url: string;
  text: string;
  color: string;
}

interface HighlightMessage {
  type: string;
  text: string;
  url: string;
}

// Listen for messages from the background script
browserAPI.runtime.onMessage.addListener(
  (message: HighlightMessage, sender, sendResponse) => {
    if (message.type === "highlight") {
      console.log("Received highlight message:", message);

      // Get current highlights and default color
      browserAPI.storage.local
        .get(["highlights", "defaultColor"])
        .then((result) => {
          const highlights = result.highlights || [];
          const defaultColor = result.defaultColor || "#90EE90";

          // Add new highlight with current default color
          highlights.push({
            url: message.url,
            text: message.text,
            color: defaultColor,
          });

          console.log("Saving to storage:", { highlights });

          // Save back to storage
          browserAPI.storage.local.set({ highlights }).then(() => {
            const selection = window.getSelection();
            if (selection) {
              const range = selection.getRangeAt(0);
              const span = document.createElement("span");
              span.style.backgroundColor = defaultColor;
              range.surroundContents(span);
            }
            sendResponse({ success: true });
          });
        });

      return true;
    }
    return false;
  }
);

// Function to apply highlights
function applyHighlights() {
  console.log("Checking highlights for URL:", window.location.href);

  browserAPI.storage.local
    .get({ highlights: [] })
    .then((result) => {
      console.log("All stored highlights:", result);
      const urlHighlights = result.highlights.filter(
        (h: Highlight) => h.url === window.location.href
      );

      console.log("Highlights for current URL:", urlHighlights);

      if (urlHighlights.length === 0) {
        console.log("No highlights found for this page");
        return;
      }

      urlHighlights.forEach((highlight: Highlight) => {
        console.log("Found saved highlight: ", highlight);
        // Find all text nodes in the document
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          null
        );

        let node;
        while ((node = walker.nextNode())) {
          const text = node.textContent ?? "";
          const index = text.indexOf(highlight.text);

          if (index >= 0) {
            const range = document.createRange();
            range.setStart(node, index);
            range.setEnd(node, index + highlight.text.length);

            const span = document.createElement("span");
            span.style.backgroundColor = highlight.color;
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
if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  applyHighlights();
} else {
  // Otherwise wait for DOMContentLoaded
  document.addEventListener("DOMContentLoaded", applyHighlights);
}
