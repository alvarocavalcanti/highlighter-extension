const fs = require('fs');
const archiver = require('archiver');
const manifest = require('../src/manifest.ts');

async function createZip(browser, version) {
  const output = fs.createWriteStream(`./packages/highlighter-${browser}-${version}.zip`);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
  });

  output.on('close', () => {
    console.log(`${browser} package created: ${archive.pointer()} bytes`);
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);

  // Add the appropriate dist folder to the zip
  archive.directory(`dist/${browser}/`, false);

  return archive.finalize();
}

async function package(version) {
  try {
    await Promise.all([
      createZip('chrome', version),
      createZip('firefox', version)
    ]);
    console.log(`\nPackaging complete! Created:\n- highlighter-chrome-${version}.zip\n- highlighter-firefox-${version}.zip`);
  } catch (error) {
    console.error('Error creating packages:', error);
    process.exit(1);
  }
}

package(manifest.default.version); 