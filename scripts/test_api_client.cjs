const http = require('http');

const endpoints = [
  '/api/courses',
  '/api/courses?slug=fullstack-web-development',
  '/api/blogs',
  '/api/feedback',
  '/api/admin/stats',
  '/api/lms/students',
  '/api/enrollments?userId=demo-001',
];

function fetchEndpoint(path) {
  return new Promise((resolve) => {
    http.get(`http://127.0.0.1:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ path, status: res.statusCode, success: json.success, count: json.count || (json.data ? (Array.isArray(json.data) ? json.data.length : 1) : 0) });
        } catch(e) {
          resolve({ path, status: res.statusCode, success: false, error: e.message });
        }
      });
    }).on('error', err => {
      console.error('Request error for', path, ':', err.message);
      resolve({ path, status: 0, success: false, error: err.message });
    });
  });
}

async function run() {
  console.log('Testing unified API routes on http://localhost:3000...\n');
  for (const ep of endpoints) {
    const r = await fetchEndpoint(ep);
    console.log(`${r.status === 200 && r.success ? '✅ PASS' : '❌ FAIL'} [${r.status}] ${ep.padEnd(45)} -> items: ${r.count}`);
  }
}

run();
