const http = require('http');

http.get('http://localhost:3000/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    console.log('Header <header class="main-header">: ', data.includes('main-header'));
    console.log('Header <nav class="main-nav">: ', data.includes('main-nav'));
    console.log('Brand logo: ', data.includes('brand-logo'));
    console.log('Mega menu (.mega-box): ', data.includes('mega-box'));
    console.log('Mobile menu (#mobileMenu): ', data.includes('id="mobileMenu"'));
    console.log('Side overlay (#sideOverlay): ', data.includes('id="sideOverlay"'));
    console.log('Footer (<footer>): ', data.includes('<footer'));
    console.log('Newsletter (.newsletter): ', data.includes('newsletter'));
    console.log('Quick Links (.foot-links): ', data.includes('foot-links'));
    console.log('Copyright (.copyright): ', data.includes('copyright'));
  });
}).on('error', (e) => {
  console.error('Request error:', e.message);
});
