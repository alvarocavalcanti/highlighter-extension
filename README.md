# Highlighter Extension

This is a simple extension that highlights text in web pages. It is compatible with Chrome, Firefox and Edge.

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

1. Install dependencies:

```bash
npm install
```

2. Development:

```bash
npm run dev
```

3. Build for production:

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

## Development

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
