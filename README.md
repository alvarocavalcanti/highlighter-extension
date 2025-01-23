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
