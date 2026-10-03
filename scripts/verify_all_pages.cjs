const http = require('http');

const pagesToTest = [
  { url: '/', name: 'Home Page', checks: ['trustbar', 'nc-roadmap', 'testimonialsGrid', 'index-page'] },
  { url: '/services', name: 'Services Page', checks: ['service-offerings', 'serviceInquiryModal', 'svcSlide1'] },
  { url: '/bootcamp', name: 'Bootcamp Page', checks: ['hero', 'applyNowBtn', 'Frontend Developer Bootcamp'] },
  { url: '/contact', name: 'Contact Page', checks: ['educationType', 'slide1', 'slide2', 'slide3'] },
  { url: '/about', name: 'About Page', checks: ['About Us', 'about'] },
  { url: '/gallery', name: 'Gallery Page', checks: ['gallery', 'gallery-card'] },
  { url: '/career', name: 'Career Page', checks: ['career', 'creative-future'] },
  { url: '/industrial-training', name: 'Industrial Training Page', checks: ['industrial', 'training'] },
  { url: '/feedback', name: 'Feedback Page', checks: ['feedback', 'Seminar / Workshop'] },
  { url: '/on-campus-courses', name: 'On-Campus Courses', checks: ['courses', 'trust-stat'] },
  { url: '/fullstack-web-development', name: 'Fullstack Course', checks: ['Full Stack', 'course-single'] },
  { url: '/ui-ux', name: 'UI/UX Course', checks: ['UI & UX', 'course-single'] },
  { url: '/digital-marketing', name: 'Digital Marketing Course', checks: ['Digital Marketing'] },
  { url: '/ethical-hacking', name: 'Ethical Hacking Course', checks: ['Ethical Hacking'] },
  { url: '/data-science-machine-learning', name: 'Data Science Course', checks: ['Data Science'] }
];

let completed = 0;
let errors = 0;

console.log('🚀 Starting Comprehensive Verification of All Major Pages...\n');

pagesToTest.forEach((page) => {
  http.get('http://localhost:3000' + page.url, (res) => {
    let data = '';
    res.on('data', (chunk) => (data += chunk));
    res.on('end', () => {
      const is200 = res.statusCode === 200;
      let checkPass = true;
      const failedChecks = [];

      page.checks.forEach((chk) => {
        if (!data.toLowerCase().includes(chk.toLowerCase())) {
          checkPass = false;
          failedChecks.push(chk);
        }
      });

      if (is200 && checkPass) {
        console.log(`✅ [200 OK] ${page.name} (${page.url}) - ${data.length} bytes - All checks passed`);
      } else {
        errors++;
        console.log(`❌ [FAILED] ${page.name} (${page.url}) - Status: ${res.statusCode}, Missing: ${failedChecks.join(', ')}`);
      }

      completed++;
      if (completed === pagesToTest.length) {
        console.log(`\n========================================`);
        console.log(`Summary: ${completed - errors}/${completed} Pages Passed Successfully!`);
        console.log(`========================================\n`);
        process.exit(errors > 0 ? 1 : 0);
      }
    });
  }).on('error', (err) => {
    errors++;
    completed++;
    console.error(`❌ [ERROR] ${page.name} (${page.url}): ${err.message}`);
    if (completed === pagesToTest.length) {
      process.exit(1);
    }
  });
});
