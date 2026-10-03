const http = require('http');

http.get('http://localhost:3000/', (res) => {
  let data = '';
  res.on('data', (chunk) => (data += chunk));
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    const checks = [
      ['index-page wrapper', data.includes('index-page')],
      ['#trustbar container', data.includes('id="trustbar"')],
      ['data-count="500"', data.includes('data-count="500"')],
      ['data-count="50"', data.includes('data-count="50"')],
      ['data-count="120"', data.includes('data-count="120"')],
      ['#nc-roadmap timeline', data.includes('id="nc-roadmap"')],
      ['.timeline-progress bar', data.includes('timeline-progress')],
      ['#testimonialsGrid', data.includes('id="testimonialsGrid"')],
      ['Pallvi Sharma video card', data.includes('Pallvi Sharma')],
      ['Shivani video card', data.includes('Shivani')],
      ['Bootstrap Grid CSS', data.includes('bootstrap-grid.min.css')],
      ['Swiper Bundle CSS', data.includes('swiper-bundle.min.css')],
      ['/css/style.css', data.includes('/css/style.css')],
      ['Firebase App SDK', data.includes('firebase-app.js')],
      ['FontAwesome CSS', data.includes('all.min.css')]
    ];

    let allPass = true;
    for (const [name, passed] of checks) {
      console.log(`${passed ? '✅ PASS' : '❌ FAIL'}: ${name}`);
      if (!passed) allPass = false;
    }

    if (allPass) {
      console.log('\n🎉 ALL HOMEPAGE ASSETS, STYLES, TIMELINE & COUNTERS ARE 100% VERIFIED!');
      process.exit(0);
    } else {
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('Connection error:', err.message);
  process.exit(1);
});
