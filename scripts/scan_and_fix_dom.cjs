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

let totalChanges = 0;
let modifiedFiles = [];

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Remove inline placeholder clear/restore hacks
  content = content.replace(/\s+onfocus=["']this\.placeholder\s*=\s*['"]\s*['"]\s*["']/gi, '');
  content = content.replace(/\s+onblur=["']this\.placeholder\s*=\s*['"][^'"]*['"]\s*["']/gi, '');

  // 2. React DOM camelCase attributes
  content = content.replace(/\binputmode=/g, 'inputMode=');
  content = content.replace(/\bautocapitalize=/g, 'autoCapitalize=');
  content = content.replace(/\bautocorrect=/g, 'autoCorrect=');
  content = content.replace(/\bspellcheck=/g, 'spellCheck=');
  content = content.replace(/\bautocomplete=/g, 'autoComplete=');

  // 3. Fix onkeyup string handler in JSX (e.g. on-campus-courses search)
  content = content.replace(/\s+onkeyup=["'][^'"]*["']/gi, '');

  // 4. Fix oninput string handler in JSX (e.g. feedback page)
  content = content.replace(/\s+oninput=["'][^'"]*["']/gi, '');

  // 5. Fix any stray class= in JSX tags (careful not to match inside strings/comments)
  // Check specifically for <tag ... class="..."
  content = content.replace(/(<[a-zA-Z0-9_-]+[^>]*?)\s+class="([^"]*)"/g, '$1 className="$2"');

  // 6. Fix for="..." in JSX tags (htmlFor)
  content = content.replace(/(<label[^>]*?)\s+for="([^"]*)"/g, '$1 htmlFor="$2"');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedFiles.push(path.relative(path.join(__dirname, '..'), filePath));
    totalChanges++;
  }
});

console.log(`Updated ${totalChanges} files.`);
modifiedFiles.forEach(f => console.log(' - ' + f));
