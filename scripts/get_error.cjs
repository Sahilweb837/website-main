const http = require('http');

http.get('http://localhost:3000/lms/dashboard', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const jsonMatch = data.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
      if (jsonMatch) {
        const json = JSON.parse(jsonMatch[1]);
        console.log('Error info:', JSON.stringify(json.err || json.props, null, 2));
      } else {
        console.log('No __NEXT_DATA__ script found, raw snippet:', data.substring(0, 1000));
      }
    } catch(e) {
      console.log('Parse error:', e.message, 'Raw length:', data.length);
      console.log(data);
    }
  });
}).on('error', err => console.error(err));
