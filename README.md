# Highlighter Extension

A cross-browser extension for highlighting and saving text across web pages.

## Features

- Highlight text on any webpage using right-click context menu
- Customizable highlight colors:
  - Green (default)
  - Yellow
  - Salmon
  - Baby Blue
- Persistent storage of highlights across browser sessions
- Popup interface to:
  - View all highlights
  - Filter highlights by current page
  - Customize default highlight color
  - Remove highlights
  - Adjust items per page (5 or 10)
  - Click on URLs to revisit highlighted pages
- Cross-browser support:
  - Chrome
  - Firefox
  - Edge

## Project Structure

```bash
/
├── src/
│ ├── components/
│ ├── background/
│ ├── content/
│ ├── popup/
│ └── manifest.ts
├── public/
│ └── icons/
├── dist/
├── package.json
├── tsconfig.json
├── webpack.config.js
└── README.md
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Development

```bash
npm run dev
```

### 3 Build for production

```bash
npm run build
```

## Key Features

- Text highlighting functionality
- Persistent storage of highlights
- Cross-browser compatibility
- React-based popup interface
- TypeScript for type safety

## Tech Stack

- React 18
- TypeScript
- Webpack 5
- CSS Modules
- Jest for testing

## Browser Compatibility

- Chrome 88+
- Firefox 78+
- Edge 88+

### Prerequisites

- Node.js 16+
- npm 7+

### Getting Started

1. Clone this repository
2. Install dependencies using `npm install`
3. Start development server using `npm run dev`
4. Load the extension:
   - Chrome: Go to `chrome://extensions/`, enable Developer mode, click "Load unpacked" and select the `dist` folder
   - Firefox: Go to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on" and select any file in the `dist` folder
   - Edge: Go to `edge://extensions/`, enable Developer mode, click "Load unpacked" and select the `dist` folder

## Building for Production

Run `npm run build` to create production-ready builds for all supported browsers in the `dist` folder.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Usage

1. Select text on any webpage
2. Right-click and choose "Highlight Selection"
3. Click the extension icon to:
   - View your highlights
   - Change default highlight color
   - Manage saved highlights

## Development

```bash
# Watch mode for development
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### From Store

- Chrome Web Store: [link]
- Firefox Add-ons: [link]
- Edge Add-ons: [link]

## Publishing Instructions

### Chrome Web Store

1. Create a [Chrome Developer account](https://chrome.google.com/webstore/devconsole) ($5 one-time fee)
2. Build extension: `npm run build`
3. Zip contents of `dist` folder
4. Go to Chrome Developer Dashboard
5. Click "New Item"
6. Upload the zip file
7. Fill required fields:
   - Description
   - Screenshots (1280x800 or 640x400)
   - Store icon (128x128)
   - Promotional images (optional)
8. Submit for review (typically 24-48 hours)

### Firefox Add-ons

1. Create [Firefox Add-ons account](https://addons.mozilla.org/developers/)
2. Build extension: `npm run build:firefox`
3. Zip contents of `dist` folder
4. Go to Firefox Add-ons Developer Hub
5. Click "Submit a New Add-on"
6. Choose "On this site"
7. Upload the zip file
8. Fill required fields:
   - Description
   - Screenshots (1280x800)
   - Icon (128x128)
9. Submit for review (typically 1-7 days)

### Edge Add-ons

1. Create [Partner Center account](https://partner.microsoft.com/dashboard/microsoftedge/)
2. Build extension: `npm run build:chrome`
3. Zip contents of `dist` folder
4. Go to Edge Add-ons Dashboard
5. Click "Submit new extension"
6. Upload the zip file
7. Fill required fields:
   - Description
   - Screenshots (1280x800)
   - Store listings
   - Icon (128x128)
8. Submit for review (typically 24-72 hours)

### Required Assets for All Stores

- Icon: 128x128 PNG
- Screenshots: 1280x800 or 640x400
- Description: Short (132 chars) and long versions
- Privacy Policy URL
- Website URL
- Source code URL (if open source)

### Pricing

- Chrome: $5 one-time fee
- Firefox: Free
- Edge: Free
- Safari: $99/year Apple Developer Program

Note: Review times are approximate and may vary.
