<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Netcoder LMS — Main Admin Dashboard</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #ff5532;
      --primary-hover: #e04422;
      --primary-soft: #fff1ee;
      --bg: #f8fafc;
      --surface: #ffffff;
      --border: #e2e8f0;
      --text: #0f172a;
      --muted: #64748b;
      --success: #10b981;
      --success-soft: #ecfdf5;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
    }
    .topbar {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 0 32px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .logo-group {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: inherit;
    }
    .logo-badge {
      width: 40px;
      height: 40px;
      background: var(--primary);
      color: #fff;
      font-weight: 800;
      font-size: 1.25rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(255, 85, 50, 0.35);
    }
    .brand-title {
      font-size: 1.15rem;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .brand-title span { color: var(--primary); }
    .badge-live {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 700;
      background: var(--success-soft);
      color: var(--success);
      border: 1px solid rgba(16, 185, 129, 0.2);
    }
    .badge-live .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--success);
      box-shadow: 0 0 8px var(--success);
    }
    .main-wrap {
      max-width: 1380px;
      margin: 0 auto;
      padding: 32px 24px;
    }
    .header-section {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 32px;
    }
    .header-text h1 {
      font-size: 1.85rem;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .header-text p {
      font-size: 0.95rem;
      color: var(--muted);
      margin-top: 4px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.88rem;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
      text-decoration: none;
    }
    .btn-primary {
      background: var(--primary);
      color: #fff;
      box-shadow: 0 4px 14px rgba(255, 85, 50, 0.35);
    }
    .btn-primary:hover {
      background: var(--primary-hover);
      transform: translateY(-1px);
    }
    .btn-outline {
      background: transparent;
      color: var(--text);
      border: 1px solid var(--border);
    }
    .btn-outline:hover {
      background: #f1f5f9;
    }
    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
      margin-bottom: 36px;
    }
    .stat-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
      transition: transform 0.2s ease;
    }
    .stat-card:hover { transform: translateY(-2px); }
    .stat-label {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .stat-value {
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--text);
      margin-top: 6px;
    }
    .stat-sub {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--success);
      margin-top: 4px;
    }
    /* Tables Card */
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 24px;
      overflow: hidden;
      margin-bottom: 36px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
    }
    .card-header {
      padding: 24px 28px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fafcff;
    }
    .card-title {
      font-size: 1.15rem;
      font-weight: 800;
    }
    .card-subtitle {
      font-size: 0.82rem;
      color: var(--muted);
      margin-top: 2px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.88rem;
    }
    th {
      background: #f8fafc;
      text-align: left;
      padding: 16px 24px;
      color: var(--muted);
      font-weight: 700;
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    td {
      padding: 16px 24px;
      border-bottom: 1px solid #f1f5f9;
      vertical-align: middle;
    }
    tr:last-child td { border-bottom: none; }
    .course-thumb {
      width: 60px;
      height: 42px;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    .category-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 8px;
      font-size: 0.72rem;
      font-weight: 700;
      background: #f1f5f9;
      color: #475569;
      text-transform: capitalize;
    }
    .fee-badge {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--text);
    }
    .fee-orig {
      font-size: 0.8rem;
      color: var(--muted);
      text-decoration: line-through;
      margin-left: 4px;
    }
    /* Modal Form */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(4px);
      z-index: 9999;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .modal-overlay.open { display: flex; }
    .modal-box {
      background: #fff;
      border-radius: 24px;
      padding: 32px;
      max-width: 680px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 20px;
    }
    .col-span-2 { grid-column: span 2; }
    .form-group label {
      display: block;
      font-size: 0.78rem;
      font-weight: 700;
      color: #334155;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .form-control {
      width: 100%;
      padding: 12px 14px;
      border: 1px solid var(--border);
      border-radius: 12px;
      font-size: 0.88rem;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
    }
    .form-control:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(255, 85, 50, 0.15);
    }
    .btn-delete {
      background: #fee2e2;
      color: #dc2626;
      border: none;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer;
    }
    .btn-delete:hover { background: #fca5a5; }
  </style>
</head>
<body>

  <!-- Top Navigation Header -->
  <header class="topbar">
    <a href="/admin" class="logo-group">
      <div class="logo-badge">N</div>
      <div class="brand-title">Netcoder <span>LMS Admin</span></div>
    </a>
    <div style="display: flex; align-items: center; gap: 16px;">
      <span class="badge-live"><span class="dot"></span> Laravel API Connected (Port 8000)</span>
      <a href="http://localhost:3000/lms/explore" target="_blank" class="btn btn-outline" style="padding: 8px 16px; font-size: 0.8rem;">
        Open Next.js Storefront ↗
      </a>
    </div>
  </header>

  <!-- Main Container -->
  <main class="main-wrap">

    <!-- Header Section -->
    <section class="header-section">
      <div class="header-text">
        <h1>Course Management &amp; Revenue Overview</h1>
        <p>Real-time analytics, course catalogue synchronization, and fee registry for Netcoder LMS.</p>
      </div>
      <button onclick="openModal()" class="btn btn-primary">
        + Add New Course Track
      </button>
    </section>

    <!-- Key Performance Indicators (Stats) -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Total Fee Revenue</div>
        <div class="stat-value">${{ number_format($totalFees ?? 4820, 2) }}</div>
        <div class="stat-sub">↑ Real-time Collected Student Fees</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Enrolled Students</div>
        <div class="stat-value">{{ count($students ?? []) }}</div>
        <div class="stat-sub">↑ Verified Registered Learners</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Active LMS Courses</div>
        <div class="stat-value">{{ count($courses ?? []) }}</div>
        <div class="stat-sub">Production tracks synchronized</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Platform Completion</div>
        <div class="stat-value">98.4%</div>
        <div class="stat-sub">High learner success rate</div>
      </div>
    </div>

    <!-- Active Courses Table -->
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Active LMS Course Curriculum</h2>
          <p class="card-subtitle">Live tracks displayed on Next.js /lms/explore with instant sync</p>
        </div>
        <span style="font-size: 0.82rem; font-weight: 700; color: var(--muted);">
          Total: {{ count($courses ?? []) }} Courses
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Category</th>
            <th>Instructor</th>
            <th>Duration</th>
            <th>Fees / Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @forelse($courses ?? [] as $course)
          <tr>
            <td>
              <div style="display: flex; align-items: center; gap: 14px;">
                <img src="{{ $course['image'] ?? '/images/full-stact-development.png' }}" alt="{{ $course['title'] }}" class="course-thumb" onerror="this.src='/images/full-stact-development.png'">
                <div>
                  <div style="font-weight: 800; font-size: 0.95rem;">{{ $course['title'] }}</div>
                  <div style="font-size: 0.75rem; color: var(--muted);">Slug: {{ $course['slug'] }}</div>
                </div>
              </div>
            </td>
            <td><span class="category-badge">{{ $course['category'] ?? 'Fullstack' }}</span></td>
            <td style="font-weight: 600; color: #334155;">{{ $course['instructor'] ?? 'Netcoder Faculty' }}</td>
            <td style="font-weight: 500; color: var(--muted);">{{ $course['duration'] ?? '40 hrs' }}</td>
            <td>
              <span class="fee-badge">${{ $course['price'] ?? $course['fee'] ?? 79 }}</span>
              <span class="fee-orig">${{ $course['originalPrice'] ?? $course['original_price'] ?? 180 }}</span>
            </td>
            <td>
              <button onclick="deleteCourse('{{ $course['slug'] }}')" class="btn-delete">Delete</button>
            </td>
          </tr>
          @empty
          <tr>
            <td colspan="6" style="text-align: center; padding: 32px; color: var(--muted);">
              No courses found. Click "+ Add New Course Track" to upload.
            </td>
          </tr>
          @endforelse
        </tbody>
      </table>
    </div>

    <!-- Student Registration & Fee Ledger -->
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Student Registrations &amp; Fee Ledger</h2>
          <p class="card-subtitle">Registered student records and paid enrollment history</p>
        </div>
        <span style="font-size: 0.82rem; font-weight: 700; color: var(--muted);">
          {{ count($students ?? []) }} Enrolled
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Email</th>
            <th>Enrolled Course</th>
            <th>Fees Paid</th>
            <th>Enrolled Date</th>
            <th>Access Status</th>
          </tr>
        </thead>
        <tbody>
          @forelse($students ?? [] as $student)
          <tr>
            <td style="font-weight: 700; color: var(--text);">{{ $student['name'] ?? 'Student' }}</td>
            <td style="color: var(--muted);">{{ $student['email'] ?? 'student@netcoder.in' }}</td>
            <td style="font-weight: 600;">{{ $student['courseTitle'] ?? $student['course'] ?? 'Full Stack Development' }}</td>
            <td><span class="fee-badge">${{ $student['amountPaid'] ?? 89 }}</span></td>
            <td style="color: var(--muted); font-size: 0.82rem;">{{ $student['enrolledDate'] ?? '2026-10-01' }}</td>
            <td>
              <span class="badge-live" style="background: #e0f2fe; color: #0284c7; border-color: #bae6fd;">
                {{ $student['drmStatus'] ?? 'Active' }}
              </span>
            </td>
          </tr>
          @empty
          <tr>
            <td colspan="6" style="text-align: center; padding: 32px; color: var(--muted);">
              No student registrations found yet.
            </td>
          </tr>
          @endforelse
        </tbody>
      </table>
    </div>

  </main>

  <!-- Add Course Modal -->
  <div id="courseModal" class="modal-overlay">
    <div class="modal-box">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="font-size: 1.25rem; font-weight: 800;">Upload New Course Track</h3>
        <button onclick="closeModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--muted);">&times;</button>
      </div>

      <form id="courseForm" onsubmit="saveCourse(event)">
        <div class="form-grid">
          <div class="col-span-2 form-group">
            <label>Course Title *</label>
            <input type="text" name="title" class="form-control" required placeholder="e.g. Distributed Systems Architecture & Kafka">
          </div>
          <div class="form-group">
            <label>Course Category *</label>
            <select name="category" class="form-control" required>
              <option value="cloud">Cloud &amp; DevOps</option>
              <option value="fullstack">Full-Stack Development</option>
              <option value="ai">AI &amp; Machine Learning</option>
              <option value="cyber">Cybersecurity</option>
              <option value="systems">System Architecture</option>
            </select>
          </div>
          <div class="form-group">
            <label>Duration *</label>
            <input type="text" name="duration" class="form-control" required placeholder="e.g. 40 hrs • 12 Projects">
          </div>
          <div class="form-group">
            <label>Selling Price ($) *</label>
            <input type="number" name="price" class="form-control" required placeholder="e.g. 79">
          </div>
          <div class="form-group">
            <label>Original Price ($) *</label>
            <input type="number" name="originalPrice" class="form-control" required placeholder="e.g. 199">
          </div>
          <div class="col-span-2 form-group">
            <label>Instructor Name *</label>
            <input type="text" name="instructor" class="form-control" required placeholder="e.g. Sarah Vance, Principal SRE">
          </div>
          <div class="col-span-2 form-group">
            <label>Course Thumbnail Image URL *</label>
            <input type="url" name="image" class="form-control" required placeholder="https://images.unsplash.com/photo-..." value="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800">
          </div>
          <div class="col-span-2 form-group">
            <label>Course Overview &amp; Key Outcomes *</label>
            <textarea name="overview" class="form-control" rows="3" required placeholder="Describe what the student will master..."></textarea>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
          <button type="button" onclick="closeModal()" class="btn btn-outline">Cancel</button>
          <button type="submit" class="btn btn-primary">Save &amp; Publish Course</button>
        </div>
      </form>
    </div>
  </div>

  <script>
    function openModal() {
      document.getElementById('courseModal').classList.add('open');
    }
    function closeModal() {
      document.getElementById('courseModal').classList.remove('open');
    }

    async function saveCourse(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      data.price = Number(data.price);
      data.originalPrice = Number(data.originalPrice);

      try {
        const res = await fetch('/api/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
          alert('Course published successfully!');
          window.location.reload();
        } else {
          alert(result.message || 'Error saving course');
        }
      } catch (err) {
        alert('Network error saving course');
      }
    }

    async function deleteCourse(slug) {
      if (!confirm('Are you sure you want to delete course: ' + slug + '?')) return;
      try {
        const res = await fetch('/api/courses?slug=' + encodeURIComponent(slug), {
          method: 'DELETE'
        });
        const result = await res.json();
        if (result.success) {
          window.location.reload();
        } else {
          alert(result.message || 'Error deleting course');
        }
      } catch (err) {
        alert('Network error deleting course');
      }
    }
  </script>
</body>
</html>
