const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const imgPath = path.join(rootDir, 'public', 'foto', 'Helmi.png');

if (!fs.existsSync(imgPath)) {
  console.error('Image not found at:', imgPath);
  process.exit(1);
}

const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/png;base64,' + imgBuffer.toString('base64');

// 1. Write public/favicon.png
fs.writeFileSync(path.join(rootDir, 'public', 'favicon.png'), imgBuffer);

// 2. Write public/favicon.ico (copy of PNG for legacy browser support)
fs.writeFileSync(path.join(rootDir, 'public', 'favicon.ico'), imgBuffer);

// 3. Write public/favicon.svg with embedded inline base64
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="circleClip">
      <circle cx="50" cy="50" r="47" />
    </clipPath>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#455CE9" />
      <stop offset="100%" stop-color="#00F0FF" />
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="49" fill="#0e0e11" stroke="url(#borderGrad)" stroke-width="3" />
  <g clip-path="url(#circleClip)">
    <rect width="100" height="100" fill="#141419" />
    <image href="${base64Img}" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" />
  </g>
</svg>`;

fs.writeFileSync(path.join(rootDir, 'public', 'favicon.svg'), svgContent);
console.log('Successfully generated favicon.png, favicon.ico, and favicon.svg with embedded portrait!');
