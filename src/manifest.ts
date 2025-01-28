const isFirefox = process.env.BROWSER === "firefox";

const manifest = {
  manifest_version: 3,
  name: "Highlighter",
  version: "1.0.1",
  description: "A cross-browser extension for highlighting text",
  author: "Alvaro Cavalcanti",
  homepage_url: "https://memorablenaton.es/highlighter",
  permissions: [
    "storage",
    "activeTab",
    "contextMenus",
  ],
  action: {
    default_popup: "popup.html",
    default_icon: {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png",
    },
    default_title: "Highlighter Extension",
  },
  background: isFirefox
    ? {
        scripts: ["background.js"],
        type: "module",
      }
    : {
        service_worker: "background.js",
      },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["content.js"],
    },
  ],
  icons: {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png",
  },
  browser_specific_settings: {
    edge: {
      browser_action_next_to_address_bar: true, // Optional: controls icon placement
    },
    gecko: {
      id: "highlighter@memorablenaton.es" // Required for Firefox
    }
  },
  web_accessible_resources: [
    {
      resources: ["content/index.js"],
      matches: ["<all_urls>"]
    }
  ]
};

module.exports = { default: manifest };
