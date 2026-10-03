const http = require('http');

http.get('http://localhost:3000/lms/dashboard', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/href="(\/_next\/static\/chunks\/[^"]+\.css)"/);
    if (!match) {
      console.log('No Next.js css chunk match!');
      return;
    }
    const cssPath = match[1];
    console.log('Fetching CSS chunk:', cssPath);
    http.get(`http://localhost:3000${cssPath}`, (cssRes) => {
      let css = '';
      cssRes.on('data', c => css += c);
      cssRes.on('end', () => {
        console.log('CSS length:', css.length);
        console.log('Has .flex:', css.includes('.flex'));
        console.log('Has bg-slate-50:', css.includes('bg-slate-50'));
        console.log('Has min-h-screen:', css.includes('min-h-screen'));
        console.log('Has w-64:', css.includes('.w-64') || css.includes('w-64'));
        console.log('First 600 chars of CSS:\n', css.slice(0, 600));
        console.log('\nLast 600 chars of CSS:\n', css.slice(-600));
      });
    });
  });
});
