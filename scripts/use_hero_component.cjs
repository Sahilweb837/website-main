const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '..', 'app', 'page.jsx');
let content = fs.readFileSync(pagePath, 'utf8');

const startTag = '<section id="hero" aria-label="Netcoder career programs">';
const endTag = '</section>';

const startIdx = content.indexOf(startTag);
const endIdx = content.indexOf(endTag, startIdx);

if (startIdx !== -1 && endIdx > startIdx) {
  const fullEndIdx = endIdx + endTag.length;
  content = content.slice(0, startIdx) + '<HeroSection />' + content.slice(fullEndIdx);
  fs.writeFileSync(pagePath, content, 'utf8');
  console.log('Successfully replaced hero section with <HeroSection /> in app/page.jsx');
} else {
  console.error('Could not find start or end tags.');
}
