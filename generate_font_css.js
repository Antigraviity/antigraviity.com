const fs = require('fs');
const path = require('path');

const fontPath = path.join(__dirname, 'src', 'fonts', 'Croogla.ttf');
const cssPath = path.join(__dirname, 'src', 'fonts', 'Croogla.css');

try {
    if (!fs.existsSync(fontPath)) {
        console.error('Font file not found at:', fontPath);
        process.exit(1);
    }

    const fontBuffer = fs.readFileSync(fontPath);
    const base64Font = fontBuffer.toString('base64');

    const cssContent = `
@font-face {
  font-family: 'Croogla';
  src: url(data:font/ttf;base64,${base64Font}) format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Croogla';
  src: url(data:font/ttf;base64,${base64Font}) format('truetype');
  font-weight: bold;
  font-style: normal;
}
`;

    fs.writeFileSync(cssPath, cssContent);
    console.log('Successfully generated src/fonts/Croogla.css with Base64 font data.');
} catch (error) {
    console.error('Error generating font CSS:', error);
}
