const http = require('http');

const routes = [
  { path: '/', label: 'Home Page' },
  { path: '/services', label: 'Services Page' },
  { path: '/lms', label: 'LMS Gateway' },
  { path: '/lms/dashboard', label: 'Student LMS Dashboard' },
  { path: '/lms/courses/fullstack-web-development', label: 'Protected Classroom (DRM Guard)' },
  { path: '/admin/login', label: 'Admin Login' },
  { path: '/admin/dashboard', label: 'Admin Dashboard with DRM Tab' },
];

function testRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${route.path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          path: route.path,
          label: route.label,
          statusCode: res.statusCode,
          length: data.length,
          hasLMS: data.includes('LMS') || data.includes('Netcoder') || data.includes('drm'),
          error: null
        });
      });
    }).on('error', (err) => {
      resolve({
        path: route.path,
        label: route.label,
        statusCode: 0,
        length: 0,
        hasLMS: false,
        error: err.message
      });
    });
  });
}

async function run() {
  console.log('Testing Netcoder LMS & DRM Security Routes on http://localhost:3000...\n');
  let allPass = true;
  for (const r of routes) {
    const res = await testRoute(r);
    const pass = res.statusCode === 200;
    if (!pass) allPass = false;
    console.log(`${pass ? '✅ [200 OK]' : '❌ [FAIL]'} ${r.label.padEnd(35)} -> ${r.path} (${res.length} bytes)`);
  }

  if (allPass) {
    console.log('\n🎉 ALL LMS & DRM SECURITY ROUTES RETURN HTTP 200 OK!');
    process.exit(0);
  } else {
    console.error('\n⚠️ Some routes failed verification.');
    process.exit(1);
  }
}

run();
