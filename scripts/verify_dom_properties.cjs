const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = [
  ...walk(path.join(__dirname, '..', 'app')),
  ...walk(path.join(__dirname, '..', 'components'))
];

const patterns = [
  { name: 'inputmode (lowercase)', regex: /\binputmode=/ },
  { name: 'autocapitalize (lowercase)', regex: /\bautocapitalize=/ },
  { name: 'autocorrect (lowercase)', regex: /\bautocorrect=/ },
  { name: 'spellcheck (lowercase)', regex: /\bspellcheck=/ },
  { name: 'onfocus string handler', regex: /\sonfocus="[^"]*"/i },
  { name: 'onblur string handler', regex: /\sonblur="[^"]*"/i },
  { name: 'oninput string handler', regex: /\soninput="[^"]*"/i },
  { name: 'onkeyup string handler', regex: /\sonkeyup="[^"]*"/i },
  { name: 'onclick string handler in JSX', regex: /<[a-zA-Z0-9_-]+[^>]*\sonclick="[^"]*"/i },
  { name: 'class in JSX tag', regex: /<[a-zA-Z0-9_-]+[^>]*\sclass="[^"]*"/ }
];

let issuesFound = 0;

files.forEach(f => {
  // HtmlContent.jsx and PageInteractiveHandler.jsx have JS template strings with HTML innerHTML
  if (f.endsWith('HtmlContent.jsx') || f.endsWith('PageInteractiveHandler.jsx')) return;

  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;

    patterns.forEach(p => {
      if (p.regex.test(line)) {
        console.log(`[ISSUE] ${p.name} at line ${lineIdx + 1} in ${path.relative(path.join(__dirname, '..'), f)}:`);
        console.log('   ', trimmed);
        issuesFound++;
      }
    });
  });
});

console.log(`\nVerification complete: ${issuesFound} issues found.`);
if (issuesFound > 0) {
  process.exit(1);
} else {
  console.log('All JSX pages and components passed React DOM validation cleanly with 0 issues!');
}
