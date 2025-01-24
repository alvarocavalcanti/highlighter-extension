const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

function zipDirectory(sourceDir, outPath) {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', err => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve());
    archive.finalize();
  });
}

async function packageExtensions() {
  const distPath = path.join(__dirname, '../dist');
  const packagesPath = path.join(__dirname, '../packages');

  // Create packages directory if it doesn't exist
  if (!fs.existsSync(packagesPath)) {
    fs.mkdirSync(packagesPath);
  }

  // Get all browser directories
  const browsers = fs.readdirSync(distPath).filter(
    file => fs.statSync(path.join(distPath, file)).isDirectory()
  );

  for (const browser of browsers) {
    const sourceDir = path.join(distPath, browser);
    const zipPath = path.join(packagesPath, `highlighter-${browser}.zip`);

    console.log(`Packaging ${browser}...`);
    await zipDirectory(sourceDir, zipPath);
    console.log(`Created ${zipPath}`);
  }
}

packageExtensions().catch(console.error); 