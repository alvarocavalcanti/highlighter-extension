const isFirefox = process.env.BROWSER === 'firefox';

const manifest = {
  manifest_version: 3,
  name: "Highlighter Extension",
  version: "1.0.0",
  description: "A cross-browser extension for highlighting text",
  permissions: ["storage", "activeTab"],
  action: {
    default_popup: "popup.html",
    default_icon: {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  background: isFirefox ? {
    scripts: ["background.js"],
    type: "module"
  } : {
    service_worker: "background.js"
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["content.js"]
    }
  ],
  icons: {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
};

module.exports = { default: manifest };
