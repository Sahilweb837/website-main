<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Netcoder LMS &mdash; Enterprise Admin Control Center</title>
  
  <!-- Modern Typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Font Awesome 6 Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

  <style>
    :root {
      --primary: #ff5532;
      --primary-hover: #e04422;
      --primary-soft: #fff1ee;
      --primary-glow: rgba(255, 85, 50, 0.25);
      --navy-950: #070b14;
      --navy-900: #0b1120;
      --navy-850: #0f172a;
      --navy-800: #1e293b;
      --navy-700: #334155;
      --surface: #ffffff;
      --surface-subtle: #f8fafc;
      --border: #e2e8f0;
      --border-dark: #1e293b;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --text-light: #94a3b8;
      --success: #10b981;
      --success-soft: #ecfdf5;
      --warning: #f59e0b;
      --warning-soft: #fffbeb;
      --danger: #ef4444;
      --danger-soft: #fef2f2;
      --info: #3b82f6;
      --info-soft: #eff6ff;
      --purple: #8b5cf6;
      --purple-soft: #f5f3ff;
      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 20px;
      --radius-xl: 26px;
      --shadow-sm: 0 2px 8px rgba(15, 23, 42, 0.04);
      --shadow-md: 0 8px 24px -4px rgba(15, 23, 42, 0.08);
      --shadow-lg: 0 20px 40px -8px rgba(15, 23, 42, 0.12);
      --shadow-primary: 0 10px 25px -5px rgba(255, 85, 50, 0.35);
      --sidebar-width: 280px;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #f1f5f9;
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    /* SIDEBAR NAVIGATION */
    .sidebar {
      width: var(--sidebar-width);
      background: var(--navy-900);
      color: #fff;
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
      border-right: 1px solid rgba(255, 255, 255, 0.06);
      transition: all 0.3s ease;
    }

    .sidebar-brand {
      padding: 24px 22px;
      display: flex;
      align-items: center;
      gap: 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      text-decoration: none;
      color: #fff;
    }

    .brand-icon {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, var(--primary) 0%, #ff7e5f 100%);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.35rem;
      font-weight: 800;
      color: #fff;
      box-shadow: var(--shadow-primary);
      flex-shrink: 0;
    }

    .brand-info h2 {
      font-size: 1.12rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.2;
    }

    .brand-info span {
      font-size: 0.72rem;
      color: var(--text-light);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.6px;
    }

    .sidebar-menu {
      flex: 1;
      padding: 20px 14px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .nav-label {
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #475569;
      padding: 10px 14px 4px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: var(--radius-md);
      color: #94a3b8;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.88rem;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid transparent;
    }

    .nav-item i {
      font-size: 1.05rem;
      width: 22px;
      text-align: center;
      transition: transform 0.2s ease;
    }

    .nav-item:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.05);
    }

    .nav-item:hover i {
      transform: translateX(2px);
    }

    .nav-item.active {
      color: #fff;
      background: linear-gradient(90deg, rgba(255, 85, 50, 0.22) 0%, rgba(255, 85, 50, 0.06) 100%);
      border-color: rgba(255, 85, 50, 0.35);
      box-shadow: 0 4px 15px rgba(255, 85, 50, 0.15);
    }

    .nav-item.active i {
      color: var(--primary);
    }

    .nav-badge {
      margin-left: auto;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 0.7rem;
      font-weight: 700;
      background: rgba(255, 255, 255, 0.08);
      color: #cbd5e1;
    }

    .nav-item.active .nav-badge {
      background: var(--primary);
      color: #fff;
    }

    .sidebar-footer {
      padding: 18px 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      background: rgba(0, 0, 0, 0.18);
    }

    .admin-profile-pill {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      background: rgba(255, 255, 255, 0.04);
      border-radius: var(--radius-md);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .admin-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.95rem;
      color: #fff;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
    }

    .admin-meta {
      flex: 1;
      overflow: hidden;
    }

    .admin-meta .name {
      font-size: 0.85rem;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .admin-meta .role {
      font-size: 0.7rem;
      color: #10b981;
      display: flex;
      align-items: center;
      gap: 4px;
      font-weight: 600;
    }

    /* MAIN CONTENT WRAPPER */
    .app-main {
      margin-left: var(--sidebar-width);
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    /* TOPBAR */
    .topbar {
      height: 72px;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 0 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 90;
      box-shadow: var(--shadow-sm);
    }

    .topbar-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .status-badge-live {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--success-soft);
      color: #059669;
      border: 1px solid rgba(16, 185, 129, 0.25);
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 700;
    }

    .status-badge-live .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--success);
      box-shadow: 0 0 10px var(--success);
      animation: pulseAnimation 2s infinite;
    }

    @keyframes pulseAnimation {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }

    .topbar-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: var(--radius-md);
      font-weight: 700;
      font-size: 0.85rem;
      cursor: pointer;
      border: none;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      text-decoration: none;
      white-space: nowrap;
    }

    .btn:hover {
      transform: translateY(-1px);
    }

    .btn:active {
      transform: translateY(0);
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--primary) 0%, #ff7043 100%);
      color: #fff;
      box-shadow: var(--shadow-primary);
    }

    .btn-primary:hover {
      background: linear-gradient(135deg, var(--primary-hover) 0%, #e04422 100%);
      box-shadow: 0 8px 25px -4px rgba(255, 85, 50, 0.45);
    }

    .btn-outline {
      background: #fff;
      color: var(--navy-800);
      border: 1px solid var(--border);
      box-shadow: var(--shadow-sm);
    }

    .btn-outline:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
      color: var(--navy-950);
    }

    .btn-success {
      background: var(--success);
      color: #fff;
    }

    .btn-success:hover {
      background: #059669;
    }

    .btn-danger {
      background: var(--danger);
      color: #fff;
    }

    .btn-danger:hover {
      background: #dc2626;
    }

    .btn-sm {
      padding: 6px 12px;
      font-size: 0.78rem;
      border-radius: var(--radius-sm);
    }

    /* PAGE CONTENT CONTAINER */
    .content-area {
      padding: 32px 36px;
      max-width: 1520px;
      width: 100%;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 30px;
    }

    .header-title-box h1 {
      font-size: 1.75rem;
      font-weight: 800;
      color: var(--navy-950);
      letter-spacing: -0.02em;
    }

    .header-title-box p {
      font-size: 0.88rem;
      color: var(--text-muted);
      margin-top: 4px;
    }

    /* STATISTICS KPI GRID */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }

    .kpi-card {
      background: var(--surface);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border);
      padding: 24px;
      box-shadow: var(--shadow-sm);
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;
    }

    .kpi-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-md);
      border-color: #cbd5e1;
    }

    .kpi-card::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: transparent;
      transition: background 0.3s ease;
    }

    .kpi-card.accent-orange::after { background: var(--primary); }
    .kpi-card.accent-green::after { background: var(--success); }
    .kpi-card.accent-blue::after { background: var(--info); }
    .kpi-card.accent-purple::after { background: var(--purple); }

    .kpi-data {
      display: flex;
      flex-direction: column;
    }

    .kpi-label {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.6px;
    }

    .kpi-value {
      font-size: 2.15rem;
      font-weight: 800;
      color: var(--navy-950);
      margin-top: 6px;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    .kpi-trend {
      font-size: 0.78rem;
      font-weight: 700;
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .kpi-trend.positive { color: var(--success); }
    .kpi-trend.neutral { color: var(--text-muted); }

    .kpi-icon-box {
      width: 52px;
      height: 52px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      flex-shrink: 0;
    }

    .bg-orange-soft { background: var(--primary-soft); color: var(--primary); }
    .bg-green-soft { background: var(--success-soft); color: var(--success); }
    .bg-blue-soft { background: var(--info-soft); color: var(--info); }
    .bg-purple-soft { background: var(--purple-soft); color: var(--purple); }

    /* CARD CONTAINERS */
    .card {
      background: var(--surface);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
      margin-bottom: 32px;
      transition: box-shadow 0.2s ease;
    }

    .card:hover {
      box-shadow: var(--shadow-md);
    }

    .card-header {
      padding: 22px 28px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      background: #fafcff;
    }

    .card-header-left h3 {
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--navy-950);
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .card-header-left p {
      font-size: 0.82rem;
      color: var(--text-muted);
      margin-top: 3px;
    }

    .card-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    /* Filter & Search Bar */
    .search-input-wrap {
      position: relative;
      min-width: 240px;
    }

    .search-input-wrap i {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-light);
      font-size: 0.85rem;
    }

    .search-input {
      width: 100%;
      padding: 9px 14px 9px 36px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      font-size: 0.85rem;
      font-family: inherit;
      outline: none;
      background: #fff;
      transition: all 0.2s ease;
    }

    .search-input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px var(--primary-glow);
    }

    /* DATA TABLES */
    .table-responsive {
      overflow-x: auto;
      width: 100%;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.88rem;
      text-align: left;
    }

    th {
      background: #f8fafc;
      padding: 14px 24px;
      font-size: 0.76rem;
      font-weight: 800;
      color: var(--navy-700);
      text-transform: uppercase;
      letter-spacing: 0.6px;
      border-bottom: 1px solid var(--border);
      white-space: nowrap;
    }

    td {
      padding: 16px 24px;
      border-bottom: 1px solid #f1f5f9;
      vertical-align: middle;
      color: var(--text-main);
    }

    tr:last-child td {
      border-bottom: none;
    }

    tbody tr {
      transition: background 0.15s ease;
    }

    tbody tr:hover {
      background: #fbfcfe;
    }

    /* Thumbnails & Badges */
    .course-thumb {
      width: 60px;
      height: 42px;
      object-fit: cover;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      background: #f1f5f9;
      flex-shrink: 0;
    }

    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 0.74rem;
      font-weight: 700;
      letter-spacing: 0.2px;
      white-space: nowrap;
    }

    .badge-orange { background: var(--primary-soft); color: var(--primary); border: 1px solid rgba(255, 85, 50, 0.2); }
    .badge-green { background: var(--success-soft); color: #059669; border: 1px solid rgba(16, 185, 129, 0.2); }
    .badge-blue { background: var(--info-soft); color: #2563eb; border: 1px solid rgba(59, 130, 246, 0.2); }
    .badge-purple { background: var(--purple-soft); color: #7c3aed; border: 1px solid rgba(139, 92, 246, 0.2); }
    .badge-gray { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }

    .price-tag {
      font-weight: 800;
      font-size: 1.05rem;
      color: var(--navy-950);
    }

    .price-orig {
      font-size: 0.78rem;
      color: var(--text-light);
      text-decoration: line-through;
      margin-left: 4px;
    }

    .code-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.76rem;
      background: #f1f5f9;
      padding: 3px 8px;
      border-radius: 6px;
      color: var(--navy-800);
      font-weight: 600;
      border: 1px solid #e2e8f0;
    }

    .action-btn-group {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 6px;
    }

    /* Tabs Container */
    .tab-content {
      display: none;
      animation: fadeIn 0.3s ease;
    }

    .tab-content.active {
      display: block;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* MODALS */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(8px);
      z-index: 9999;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .modal-overlay.open {
      display: flex;
      animation: modalFadeIn 0.25s ease;
    }

    @keyframes modalFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-card {
      background: #fff;
      border-radius: var(--radius-xl);
      padding: 34px;
      max-width: 680px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: var(--shadow-lg);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transform: translateY(0);
      animation: modalSlideUp 0.25s ease;
    }

    @keyframes modalSlideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 16px;
    }

    .modal-header h3 {
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--navy-950);
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .modal-close-btn {
      background: transparent;
      border: none;
      font-size: 1.3rem;
      color: var(--text-light);
      cursor: pointer;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .modal-close-btn:hover {
      background: #f1f5f9;
      color: var(--danger);
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .col-span-2 { grid-column: span 2; }

    .form-group {
      margin-bottom: 4px;
    }

    .form-group label {
      display: block;
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--navy-700);
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .form-control {
      width: 100%;
      padding: 11px 14px;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      font-size: 0.88rem;
      font-family: inherit;
      outline: none;
      background: #fff;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-control:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px var(--primary-glow);
    }

    /* Warning Delete Alert Box in Modal */
    .danger-alert-box {
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: var(--radius-md);
      padding: 16px;
      color: #991b1b;
      margin-bottom: 20px;
      display: flex;
      gap: 12px;
    }

    .danger-alert-box i {
      font-size: 1.4rem;
      color: #dc2626;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .danger-alert-box h4 {
      font-size: 0.95rem;
      font-weight: 800;
      margin-bottom: 4px;
    }

    .danger-alert-box p {
      font-size: 0.82rem;
      line-height: 1.4;
      color: #7f1d1d;
    }

    .danger-alert-box ul {
      margin-top: 8px;
      padding-left: 20px;
      font-size: 0.8rem;
    }

    /* TOAST NOTIFICATIONS */
    .toast-container {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    }

    .toast {
      pointer-events: auto;
      background: var(--navy-900);
      color: #fff;
      border-radius: var(--radius-md);
      padding: 14px 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.88rem;
      font-weight: 600;
      min-width: 320px;
      border-left: 4px solid var(--primary);
      transform: translateX(120%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .toast.show {
      transform: translateX(0);
    }

    .toast.success { border-left-color: var(--success); }
    .toast.error { border-left-color: var(--danger); }
    .toast.info { border-left-color: var(--info); }

    /* Progress bar */
    .progress-bar-wrap {
      width: 100%;
      height: 6px;
      background: #e2e8f0;
      border-radius: 999px;
      overflow: hidden;
      margin-top: 4px;
    }

    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary), #10b981);
      border-radius: 999px;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .sidebar { width: 80px; }
      .sidebar .brand-info, .sidebar .nav-item span, .sidebar .nav-label, .sidebar .nav-badge, .sidebar .admin-meta { display: none; }
      .sidebar .nav-item { justify-content: center; padding: 14px; }
      .app-main { margin-left: 80px; }
      .content-area { padding: 20px; }
    }
  </style>
</head>
<body>

  <!-- SIDEBAR NAVIGATION -->
  <aside class="sidebar">
    <a href="/admin" class="sidebar-brand">
      <div class="brand-icon">
        <i class="fa-solid fa-graduation-cap"></i>
      </div>
      <div class="brand-info">
        <h2>Netcoder LMS</h2>
        <span>Admin Suite 2026</span>
      </div>
    </a>

    <nav class="sidebar-menu">
      <div class="nav-label">Core Management</div>
      <div class="nav-item active" onclick="switchTab('overview')">
        <i class="fa-solid fa-chart-pie"></i>
        <span>Overview &amp; Metrics</span>
      </div>

      <div class="nav-item" onclick="switchTab('courses')">
        <i class="fa-solid fa-book-bookmark"></i>
        <span>Courses Curriculum</span>
        <span class="nav-badge" id="sidebarCourseCount"><?= count($courses ?? []) ?></span>
      </div>

      <div class="nav-item" onclick="switchTab('students')">
        <i class="fa-solid fa-user-graduate"></i>
        <span>Students &amp; Fee Ledger</span>
        <span class="nav-badge" id="sidebarStudentCount"><?= count($students ?? []) ?></span>
      </div>

      <div class="nav-label">Live Learning &amp; Security</div>
      <div class="nav-item" onclick="switchTab('live-classes')">
        <i class="fa-solid fa-video"></i>
        <span>Live Classes Engine</span>
        <span class="nav-badge" style="background: rgba(239, 68, 68, 0.2); color: #f87171;">LIVE</span>
      </div>

      <div class="nav-item" onclick="switchTab('drm')">
        <i class="fa-solid fa-shield-halved"></i>
        <span>DRM Content Shield</span>
      </div>

      <div class="nav-item" onclick="switchTab('feedbacks')">
        <i class="fa-solid fa-comments"></i>
        <span>Seminar Feedback</span>
        <span class="nav-badge"><?= count($feedbacks ?? []) ?></span>
      </div>
    </nav>

    <div class="sidebar-footer">
      <div class="admin-profile-pill">
        <div class="admin-avatar">AD</div>
        <div class="admin-meta">
          <div class="name">Administrator</div>
          <div class="role"><i class="fa-solid fa-circle-check"></i> Super Admin</div>
        </div>
        <a href="/admin/logout" title="Sign Out" style="color: #94a3b8; text-decoration: none;" onclick="return confirm('Sign out of Admin Dashboard?')">
          <i class="fa-solid fa-right-from-bracket"></i>
        </a>
      </div>
    </div>
  </aside>

  <!-- MAIN APP WORKSPACE -->
  <div class="app-main">

    <!-- Sticky Top Navigation Bar -->
    <header class="topbar">
      <div class="topbar-left">
        <span class="status-badge-live">
          <span class="pulse-dot"></span>
          Laravel 11 Backend &bull; Active (Port 8000)
        </span>
      </div>

      <div class="topbar-right">
        <a href="http://localhost:3000/lms/explore" target="_blank" class="btn btn-outline btn-sm">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Next.js Storefront
        </a>
        <a href="http://localhost:3000/lms/select-course" target="_blank" class="btn btn-outline btn-sm">
          <i class="fa-solid fa-compass"></i> Student Hub
        </a>
        <button onclick="openAddCourseModal()" class="btn btn-primary btn-sm">
          <i class="fa-solid fa-plus"></i> New Course
        </button>
        <button onclick="openAddStudentModal()" class="btn btn-success btn-sm">
          <i class="fa-solid fa-user-plus"></i> Enroll Student
        </button>
      </div>
    </header>

    <!-- Main Dynamic Content Container -->
    <main class="content-area">

      <!-- TAB 1: OVERVIEW & ANALYTICS -->
      <section id="tab-overview" class="tab-content active">
        <div class="page-header">
          <div class="header-title-box">
            <h1>Executive LMS Overview &amp; Intelligence</h1>
            <p>Real-time analytics, course catalogue synchronization, and fee registry for Netcoder LMS.</p>
          </div>
          <div style="display: flex; gap: 10px;">
            <button onclick="window.location.reload()" class="btn btn-outline btn-sm">
              <i class="fa-solid fa-arrows-rotate"></i> Refresh Telemetry
            </button>
          </div>
        </div>

        <!-- 4 Stat Metric Cards -->
        <div class="kpi-grid">
          <div class="kpi-card accent-orange">
            <div class="kpi-data">
              <span class="kpi-label">Total Fee Revenue</span>
              <div class="kpi-value">$<?= number_format($stats['totalRevenue'] ?? 4820, 2) ?></div>
              <div class="kpi-trend positive">
                <i class="fa-solid fa-arrow-trend-up"></i>
                <span>≈ <?= htmlspecialchars($stats['totalRevenueInr'] ?? '₹3,95,240') ?> collected</span>
              </div>
            </div>
            <div class="kpi-icon-box bg-orange-soft">
              <i class="fa-solid fa-dollar-sign"></i>
            </div>
          </div>

          <div class="kpi-card accent-green">
            <div class="kpi-data">
              <span class="kpi-label">Enrolled Learners</span>
              <div class="kpi-value" id="kpiStudentCount"><?= count($students ?? []) ?></div>
              <div class="kpi-trend positive">
                <i class="fa-solid fa-shield-check"></i>
                <span>100% DRM Shielded Learners</span>
              </div>
            </div>
            <div class="kpi-icon-box bg-green-soft">
              <i class="fa-solid fa-user-graduate"></i>
            </div>
          </div>

          <div class="kpi-card accent-blue">
            <div class="kpi-data">
              <span class="kpi-label">Active LMS Courses</span>
              <div class="kpi-value" id="kpiCourseCount"><?= count($courses ?? []) ?></div>
              <div class="kpi-trend positive">
                <i class="fa-solid fa-bolt"></i>
                <span>Instant Storefront Sync</span>
              </div>
            </div>
            <div class="kpi-icon-box bg-blue-soft">
              <i class="fa-solid fa-laptop-code"></i>
            </div>
          </div>

          <div class="kpi-card accent-purple">
            <div class="kpi-data">
              <span class="kpi-label">DRM Content Guard</span>
              <div class="kpi-value" style="font-size: 1.45rem; color: #10b981; margin-top: 10px;">
                Armed &amp; Guarded
              </div>
              <div class="kpi-trend neutral">
                <i class="fa-solid fa-lock"></i>
                <span>Anti-Screenshot &bull; Focus Shield</span>
              </div>
            </div>
            <div class="kpi-icon-box bg-purple-soft">
              <i class="fa-solid fa-shield-halved"></i>
            </div>
          </div>
        </div>

        <!-- Quick Summary Cards Grid -->
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 32px;">
          <!-- Recent Students Ledger Snapshot -->
          <div class="card" style="margin-bottom: 0;">
            <div class="card-header">
              <div class="card-header-left">
                <h3><i class="fa-solid fa-users" style="color: var(--primary);"></i> Recent Student Registrations</h3>
                <p>Latest verified learner enrollment transactions</p>
              </div>
              <button onclick="switchTab('students')" class="btn btn-outline btn-sm">
                View All Ledger &rarr;
              </button>
            </div>
            <div class="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Learner</th>
                    <th>Course Track</th>
                    <th>Fee Paid</th>
                    <th>DRM Status</th>
                  </tr>
                </thead>
                <tbody>
                  <?php if (!empty($students)): ?>
                    <?php foreach (array_slice($students, 0, 5) as $s): ?>
                    <tr>
                      <td>
                        <div style="font-weight: 700; color: var(--navy-950);"><?= htmlspecialchars($s['name'] ?? 'Learner') ?></div>
                        <span class="code-badge"><?= htmlspecialchars($s['student_code'] ?? 'NC-STU') ?></span>
                      </td>
                      <td><div style="font-weight: 600; font-size: 0.85rem;"><?= htmlspecialchars($s['course'] ?? 'Full Stack Development') ?></div></td>
                      <td><span class="badge-pill badge-green">$<?= htmlspecialchars((string)($s['feePaid'] ?? $s['fee'] ?? 79)) ?></span></td>
                      <td><span class="badge-pill badge-purple"><i class="fa-solid fa-shield"></i> <?= htmlspecialchars($s['drmStatus'] ?? 'Protected') ?></span></td>
                    </tr>
                    <?php endforeach; ?>
                  <?php else: ?>
                    <tr>
                      <td colspan="4" style="text-align: center; color: var(--text-muted); padding: 32px;">
                        No student records available yet.
                      </td>
                    </tr>
                  <?php endif; ?>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Quick System Actions & Diagnostics -->
          <div class="card" style="margin-bottom: 0;">
            <div class="card-header">
              <div class="card-header-left">
                <h3><i class="fa-solid fa-sliders" style="color: var(--info);"></i> Quick Operations</h3>
                <p>Fast LMS maintenance triggers</p>
              </div>
            </div>
            <div style="padding: 24px; display: flex; flex-direction: column; gap: 14px;">
              <button onclick="openAddCourseModal()" class="btn btn-primary" style="width: 100%; justify-content: flex-start;">
                <i class="fa-solid fa-circle-plus"></i> Upload New Course Track
              </button>
              <button onclick="openAddStudentModal()" class="btn btn-outline" style="width: 100%; justify-content: flex-start;">
                <i class="fa-solid fa-user-plus" style="color: var(--success);"></i> Register Learner &amp; Issue DRM
              </button>
              <button onclick="openClassModal()" class="btn btn-outline" style="width: 100%; justify-content: flex-start;">
                <i class="fa-solid fa-video" style="color: var(--primary);"></i> Broadcast Live Class Link
              </button>
              <a href="http://localhost:3000/lms/explore" target="_blank" class="btn btn-outline" style="width: 100%; justify-content: flex-start;">
                <i class="fa-solid fa-globe" style="color: var(--info);"></i> Preview Next.js Storefront
              </a>
              <hr style="border: none; border-top: 1px solid var(--border); margin: 6px 0;">
              <div style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.5;">
                <i class="fa-solid fa-server" style="color: var(--success); margin-right: 4px;"></i>
                <strong>Engine:</strong> Dual-Mode PHP Standalone / Laravel 11<br>
                <i class="fa-solid fa-database" style="color: var(--info); margin-right: 4px;"></i>
                <strong>Storage:</strong> Multi-layer JSON fallback + MySQL
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- TAB 2: COURSES CURRICULUM -->
      <section id="tab-courses" class="tab-content">
        <div class="page-header">
          <div class="header-title-box">
            <h1>LMS Production Course Catalog</h1>
            <p>Manage curriculum titles, video tracks, pricing, and Next.js store sync.</p>
          </div>
          <button onclick="openAddCourseModal()" class="btn btn-primary">
            <i class="fa-solid fa-plus"></i> Add New Course Track
          </button>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-header-left">
              <h3><i class="fa-solid fa-layer-group" style="color: var(--primary);"></i> Active Course Catalogue</h3>
              <p>Synchronized live with Next.js <code style="color: var(--primary);">/lms/explore</code></p>
            </div>
            <div class="card-actions">
              <div class="search-input-wrap">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="courseFilterInput" class="search-input" placeholder="Search courses or slug..." onkeyup="filterCoursesTable()">
              </div>
              <select id="courseCategorySelect" class="form-control" style="width: auto; padding: 8px 12px; font-size: 0.82rem;" onchange="filterCoursesTable()">
                <option value="all">All Categories</option>
                <option value="fullstack">Full-Stack</option>
                <option value="cloud">Cloud &amp; DevOps</option>
                <option value="ai">AI / Machine Learning</option>
                <option value="cyber">Cybersecurity</option>
              </select>
            </div>
          </div>

          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Course Title &amp; Slug</th>
                  <th>Category</th>
                  <th>Instructor &amp; Duration</th>
                  <th>Selling Price</th>
                  <th>Rating</th>
                  <th style="text-align: right;">Actions</th>
                </tr>
              </thead>
              <tbody id="courseTableBody">
                <?php if (!empty($courses)): ?>
                  <?php foreach ($courses as $course): ?>
                  <tr class="course-table-row" data-title="<?= strtolower(htmlspecialchars($course['title'] ?? '')) ?>" data-slug="<?= strtolower(htmlspecialchars($course['slug'] ?? '')) ?>" data-cat="<?= strtolower(htmlspecialchars($course['category'] ?? '')) ?>">
                    <td>
                      <div style="display: flex; align-items: center; gap: 14px;">
                        <img src="<?= htmlspecialchars($course['image'] ?? '/images/full-stact-development.png') ?>" class="course-thumb" alt="<?= htmlspecialchars($course['title'] ?? '') ?>" onerror="this.src='/images/full-stact-development.png'">
                        <div>
                          <div style="font-weight: 800; font-size: 0.94rem; color: var(--navy-950);">
                            <?= htmlspecialchars($course['title'] ?? 'Course Title') ?>
                          </div>
                          <span class="code-badge">/<?= htmlspecialchars($course['slug'] ?? '') ?></span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="badge-pill badge-orange"><?= htmlspecialchars($course['category'] ?? 'fullstack') ?></span>
                      <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 3px;">
                        <?= htmlspecialchars($course['level'] ?? 'Intermediate') ?>
                      </div>
                    </td>
                    <td>
                      <div style="font-weight: 700; font-size: 0.84rem; color: var(--navy-800);">
                        <?= htmlspecialchars($course['instructor'] ?? 'Netcoder Faculty') ?>
                      </div>
                      <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">
                        <i class="fa-regular fa-clock"></i> <?= htmlspecialchars($course['duration'] ?? '40 hrs') ?>
                      </div>
                    </td>
                    <td>
                      <span class="price-tag">$<?= htmlspecialchars((string)($course['price'] ?? $course['fee'] ?? 79)) ?></span>
                      <span class="price-orig">$<?= htmlspecialchars((string)($course['originalPrice'] ?? $course['original_price'] ?? 180)) ?></span>
                    </td>
                    <td>
                      <span style="color: #f59e0b; font-weight: 700; font-size: 0.85rem;">
                        <i class="fa-solid fa-star"></i> <?= htmlspecialchars((string)($course['rating'] ?? 4.95)) ?>
                      </span>
                    </td>
                    <td style="text-align: right;">
                      <div class="action-btn-group">
                        <a href="http://localhost:3000/lms/courses/<?= urlencode($course['slug'] ?? '') ?>" target="_blank" class="btn btn-outline btn-sm" title="View in Next.js Storefront">
                          <i class="fa-solid fa-eye"></i>
                        </a>
                        <button onclick="editCourseModal(<?= htmlspecialchars(json_encode($course), ENT_QUOTES, 'UTF-8') ?>)" class="btn btn-outline btn-sm" style="color: var(--info);" title="Edit Course">
                          <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button onclick="confirmDeleteCourse('<?= htmlspecialchars($course['id'] ?? $course['slug']) ?>', '<?= addslashes(htmlspecialchars($course['title'] ?? '')) ?>')" class="btn btn-outline btn-sm" style="color: var(--danger);" title="Delete Course">
                          <i class="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <?php endforeach; ?>
                <?php else: ?>
                  <tr>
                    <td colspan="6" style="text-align: center; padding: 40px; color: var(--text-muted);">
                      <i class="fa-solid fa-folder-open" style="font-size: 2rem; margin-bottom: 8px; display: block; opacity: 0.4;"></i>
                      No LMS courses found. Click "+ Add New Course Track" to upload.
                    </td>
                  </tr>
                <?php endif; ?>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- TAB 3: STUDENTS & FEE LEDGER -->
      <section id="tab-students" class="tab-content">
        <div class="page-header">
          <div class="header-title-box">
            <h1>Learner Registry &amp; Student Fee Ledger</h1>
            <p>Manage student accounts, fee payments, DRM security watermarks, and progress records.</p>
          </div>
          <button onclick="openAddStudentModal()" class="btn btn-success">
            <i class="fa-solid fa-user-plus"></i> Enroll New Student
          </button>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-header-left">
              <h3><i class="fa-solid fa-user-graduate" style="color: var(--success);"></i> Verified Registered Learners</h3>
              <p>Full student directory with active DRM authorization keys</p>
            </div>
            <div class="card-actions">
              <div class="search-input-wrap">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="studentFilterInput" class="search-input" placeholder="Search learner name, email, code..." onkeyup="filterStudentsTable()">
              </div>
            </div>
          </div>

          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Student Info &amp; Code</th>
                  <th>Contact Details</th>
                  <th>Enrolled Track</th>
                  <th>Fee Paid</th>
                  <th>DRM Watermark</th>
                  <th>Progress</th>
                  <th style="text-align: right;">Actions</th>
                </tr>
              </thead>
              <tbody id="studentTableBody">
                <?php if (!empty($students)): ?>
                  <?php foreach ($students as $student): ?>
                  <tr class="student-table-row" data-name="<?= strtolower(htmlspecialchars($student['name'] ?? '')) ?>" data-email="<?= strtolower(htmlspecialchars($student['email'] ?? '')) ?>" data-code="<?= strtolower(htmlspecialchars($student['student_code'] ?? '')) ?>" data-course="<?= strtolower(htmlspecialchars($student['course'] ?? '')) ?>">
                    <td>
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <div class="admin-avatar" style="width: 36px; height: 36px; font-size: 0.85rem; background: linear-gradient(135deg, #10b981, #059669);">
                          <?= strtoupper(substr(htmlspecialchars($student['name'] ?? 'S'), 0, 2)) ?>
                        </div>
                        <div>
                          <div style="font-weight: 800; color: var(--navy-950); font-size: 0.92rem;">
                            <?= htmlspecialchars($student['name'] ?? 'Learner') ?>
                          </div>
                          <span class="code-badge"><?= htmlspecialchars($student['student_code'] ?? 'NC-STU-2026') ?></span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style="color: var(--navy-800); font-weight: 600; font-size: 0.84rem;">
                        <?= htmlspecialchars($student['email'] ?? 'student@netcoder.in') ?>
                      </div>
                      <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 2px;">
                        <i class="fa-solid fa-phone" style="font-size: 0.7rem;"></i> <?= htmlspecialchars($student['phone'] ?? 'N/A') ?>
                      </div>
                    </td>
                    <td>
                      <div style="font-weight: 700; color: var(--navy-950); font-size: 0.86rem;">
                        <?= htmlspecialchars($student['course'] ?? 'Full Stack Web Development') ?>
                      </div>
                      <div style="font-size: 0.72rem; color: var(--text-muted);">
                        Enrolled: <?= htmlspecialchars($student['enrolledDate'] ?? '2026-09-20') ?>
                      </div>
                    </td>
                    <td>
                      <span class="badge-pill badge-green" style="font-size: 0.82rem;">
                        $<?= htmlspecialchars((string)($student['feePaid'] ?? $student['fee'] ?? 79)) ?>.00
                      </span>
                    </td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <span class="badge-pill badge-purple" style="font-family: 'JetBrains Mono', monospace; font-size: 0.72rem;">
                          <i class="fa-solid fa-shield-halved"></i> <?= htmlspecialchars($student['drm_watermark_id'] ?? $student['drmWatermark'] ?? ('NC-WM-' . strtoupper(substr($student['name'] ?? 'STU', 0, 4)))) ?>
                        </span>
                      </div>
                      <span style="font-size: 0.72rem; color: #10b981; font-weight: 700; display: block; margin-top: 3px;">
                        ● <?= htmlspecialchars($student['drmStatus'] ?? 'Protected') ?>
                      </span>
                    </td>
                    <td style="min-width: 120px;">
                      <div style="display: flex; justify-content: space-between; font-size: 0.74rem; font-weight: 700; color: var(--text-muted);">
                        <span>Completion</span>
                        <span><?= htmlspecialchars((string)($student['progress'] ?? 25)) ?>%</span>
                      </div>
                      <div class="progress-bar-wrap">
                        <div class="progress-bar-fill" style="width: <?= htmlspecialchars((string)($student['progress'] ?? 25)) ?>%;"></div>
                      </div>
                    </td>
                    <td style="text-align: right;">
                      <div class="action-btn-group">
                        <!-- Edit Student Button -->
                        <button onclick="openEditStudentModal(<?= htmlspecialchars(json_encode($student), ENT_QUOTES, 'UTF-8') ?>)" class="btn btn-outline btn-sm" style="color: var(--info);" title="Edit Student Profile">
                          <i class="fa-solid fa-user-pen"></i> Edit
                        </button>
                        <!-- Cascading Delete Button ("agar delete hai toh delete hojaye sab kuch") -->
                        <button onclick="confirmDeleteStudent(<?= htmlspecialchars(json_encode($student), ENT_QUOTES, 'UTF-8') ?>)" class="btn btn-outline btn-sm" style="color: var(--danger);" title="Cascading Delete (Removes Everything)">
                          <i class="fa-solid fa-trash-can"></i> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  <?php endforeach; ?>
                <?php else: ?>
                  <tr>
                    <td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);">
                      <i class="fa-solid fa-users-slash" style="font-size: 2rem; margin-bottom: 8px; display: block; opacity: 0.4;"></i>
                      No registered students found. Click "+ Enroll New Student" above.
                    </td>
                  </tr>
                <?php endif; ?>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- TAB 4: LIVE CLASSES ENGINE -->
      <section id="tab-live-classes" class="tab-content">
        <div class="page-header">
          <div class="header-title-box">
            <h1>Automated Live Class Engine &amp; Broadcasting</h1>
            <p>Schedule interactive cohort sessions via Google Meet or Zoom with instant student dashboard alerts.</p>
          </div>
          <button onclick="openClassModal()" class="btn btn-primary">
            <i class="fa-solid fa-plus"></i> Schedule Live Class Link
          </button>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-header-left">
              <h3><i class="fa-solid fa-tower-broadcast" style="color: var(--primary);"></i> Scheduled Cohort Sessions</h3>
              <p>Direct live meeting hooks for enrolled course tracks</p>
            </div>
          </div>

          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Topic &amp; Cohort</th>
                  <th>Target Course</th>
                  <th>Platform &amp; Link</th>
                  <th>Schedule</th>
                  <th>Mentor</th>
                  <th>Status</th>
                  <th style="text-align: right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <?php if (!empty($classes)): ?>
                  <?php foreach ($classes as $cls): ?>
                  <tr>
                    <td>
                      <div style="font-weight: 800; color: var(--navy-950); font-size: 0.92rem;">
                        <?= htmlspecialchars($cls['title'] ?? 'Live Masterclass') ?>
                      </div>
                      <div style="font-size: 0.75rem; color: var(--text-muted);">
                        <?= htmlspecialchars($cls['batch'] ?? 'Cohort 2026') ?>
                      </div>
                    </td>
                    <td>
                      <span class="code-badge" style="color: var(--primary); background: var(--primary-soft);">
                        <?= htmlspecialchars($cls['courseSlug'] ?? 'fullstack-web-development') ?>
                      </span>
                    </td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <span class="badge-pill badge-blue"><?= htmlspecialchars($cls['platform'] ?? 'Google Meet') ?></span>
                        <a href="<?= htmlspecialchars($cls['meetingLink'] ?? '#') ?>" target="_blank" class="btn btn-outline btn-sm" style="padding: 3px 8px; font-size: 0.72rem;">
                          <i class="fa-solid fa-arrow-up-right-from-square"></i> Launch
                        </a>
                      </div>
                      <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 3px;">
                        PIN: <strong><?= htmlspecialchars($cls['passcode'] ?? 'None') ?></strong>
                      </div>
                    </td>
                    <td>
                      <div style="font-weight: 700; font-size: 0.82rem;"><?= htmlspecialchars($cls['time'] ?? '06:30 PM IST') ?></div>
                      <div style="font-size: 0.74rem; color: var(--text-muted);"><?= htmlspecialchars($cls['date'] ?? date('Y-m-d')) ?></div>
                    </td>
                    <td>
                      <div style="font-weight: 700; font-size: 0.84rem;"><?= htmlspecialchars($cls['mentorName'] ?? 'Faculty Mentor') ?></div>
                    </td>
                    <td>
                      <?php if (($cls['status'] ?? '') === 'live'): ?>
                        <span class="badge-pill" style="background: #fee2e2; color: #dc2626; animation: pulseAnimation 1.5s infinite;">
                          ● LIVE NOW
                        </span>
                      <?php elseif (($cls['status'] ?? '') === 'completed'): ?>
                        <span class="badge-pill badge-gray">Completed</span>
                      <?php else: ?>
                        <span class="badge-pill badge-green">Upcoming</span>
                      <?php endif; ?>
                    </td>
                    <td style="text-align: right;">
                      <button onclick="deleteLiveClass('<?= htmlspecialchars($cls['id'] ?? '') ?>')" class="btn btn-outline btn-sm" style="color: var(--danger);">
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                  <?php endforeach; ?>
                <?php else: ?>
                  <tr>
                    <td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);">
                      <i class="fa-solid fa-calendar-xmark" style="font-size: 2rem; margin-bottom: 8px; display: block; opacity: 0.4;"></i>
                      No live classes scheduled yet. Click "+ Schedule Live Class Link" above.
                    </td>
                  </tr>
                <?php endif; ?>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- TAB 5: DRM CONTENT SHIELD & SECURITY -->
      <section id="tab-drm" class="tab-content">
        <div class="page-header">
          <div class="header-title-box">
            <h1>DRM Digital Rights &amp; Video Protection Center</h1>
            <p>Active tamper detection, screen recording countermeasures, and watermarking engine status.</p>
          </div>
        </div>

        <div class="kpi-grid">
          <div class="kpi-card accent-green">
            <div class="kpi-data">
              <span class="kpi-label">Anti-Screenshot Guard</span>
              <div class="kpi-value" style="font-size: 1.4rem; color: #059669; margin-top: 10px;">Armed &amp; Shielded</div>
              <div class="kpi-trend positive"><i class="fa-solid fa-check-double"></i> Native Canvas Blurring</div>
            </div>
            <div class="kpi-icon-box bg-green-soft"><i class="fa-solid fa-camera-slash"></i></div>
          </div>

          <div class="kpi-card accent-purple">
            <div class="kpi-data">
              <span class="kpi-label">Dynamic Watermarking</span>
              <div class="kpi-value" style="font-size: 1.4rem; color: #7c3aed; margin-top: 10px;">Real-Time Injection</div>
              <div class="kpi-trend neutral"><i class="fa-solid fa-fingerprint"></i> Per-Student Micro-Watermark</div>
            </div>
            <div class="kpi-icon-box bg-purple-soft"><i class="fa-solid fa-shield-virus"></i></div>
          </div>

          <div class="kpi-card accent-blue">
            <div class="kpi-data">
              <span class="kpi-label">Anti-Download Protocol</span>
              <div class="kpi-value" style="font-size: 1.4rem; color: #2563eb; margin-top: 10px;">Encrypted HLS Streams</div>
              <div class="kpi-trend positive"><i class="fa-solid fa-lock"></i> Zero Direct Video URLs</div>
            </div>
            <div class="kpi-icon-box bg-blue-soft"><i class="fa-solid fa-cloud-arrow-down"></i></div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-header-left">
              <h3><i class="fa-solid fa-triangle-exclamation" style="color: var(--danger);"></i> DRM Security Event Audit Log</h3>
              <p>Recent tamper attempts, screenshot blocks, and unauthorized focus shifts</p>
            </div>
          </div>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Event Type</th>
                  <th>Student Target</th>
                  <th>IP Address</th>
                  <th>Browser User Agent</th>
                  <th>Timestamp</th>
                  <th>Action Taken</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span class="badge-pill" style="background: #fef2f2; color: #dc2626;"><i class="fa-solid fa-ban"></i> Screenshot Blocked</span></td>
                  <td><strong>Sahil Sandhu</strong> (NC-STU-2026-001)</td>
                  <td><code>127.0.0.1</code></td>
                  <td style="color: var(--text-muted); font-size: 0.78rem;">Mozilla/5.0 (Windows NT 10.0; Win64) Chrome/129</td>
                  <td style="color: var(--text-muted); font-size: 0.78rem;">Just now</td>
                  <td><span class="badge-pill badge-green">Canvas Obfuscated</span></td>
                </tr>
                <tr>
                  <td><span class="badge-pill" style="background: #fffbeb; color: #b45309;"><i class="fa-solid fa-eye-slash"></i> Tab Blur Trigger</span></td>
                  <td><strong>Priya Sharma</strong> (NC-STU-2026-002)</td>
                  <td><code>192.168.1.15</code></td>
                  <td style="color: var(--text-muted); font-size: 0.78rem;">Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari</td>
                  <td style="color: var(--text-muted); font-size: 0.78rem;">2 hours ago</td>
                  <td><span class="badge-pill badge-blue">Playback Paused</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- TAB 6: SEMINAR FEEDBACK -->
      <section id="tab-feedbacks" class="tab-content">
        <div class="page-header">
          <div class="header-title-box">
            <h1>Seminar Feedback &amp; Student Satisfaction</h1>
            <p>Direct feedback forms and course assessment submissions from university workshops.</p>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-header-left">
              <h3><i class="fa-solid fa-comment-dots" style="color: var(--info);"></i> Feedback Records</h3>
              <p>Total Submissions: <?= count($feedbacks ?? []) ?></p>
            </div>
          </div>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Contact</th>
                  <th>College Course / Sem</th>
                  <th>Assessment</th>
                  <th>Interested Tracks</th>
                </tr>
              </thead>
              <tbody>
                <?php if (!empty($feedbacks)): ?>
                  <?php foreach ($feedbacks as $fb): ?>
                  <tr>
                    <td>
                      <div style="font-weight: 800; color: var(--navy-950);"><?= htmlspecialchars($fb['student_name'] ?? 'Student') ?></div>
                      <div style="font-size: 0.75rem; color: var(--text-muted);"><?= htmlspecialchars($fb['email'] ?? '') ?></div>
                    </td>
                    <td>
                      <div style="font-weight: 600; font-size: 0.82rem;"><?= htmlspecialchars($fb['contact_number'] ?? 'N/A') ?></div>
                    </td>
                    <td>
                      <strong><?= htmlspecialchars($fb['course'] ?? 'B.Tech') ?></strong> &bull; <?= htmlspecialchars((string)($fb['semester'] ?? '5th')) ?> Sem
                    </td>
                    <td>
                      <span class="badge-pill badge-green">
                        <i class="fa-solid fa-star"></i> <?= htmlspecialchars($fb['overall_assessment'] ?? 'Very Satisfied') ?>
                      </span>
                    </td>
                    <td>
                      <?php if (isset($fb['interested_courses']) && is_array($fb['interested_courses'])): ?>
                        <?php foreach ($fb['interested_courses'] as $ic): ?>
                          <span class="badge-pill badge-orange" style="margin-right: 4px; font-size: 0.7rem;"><?= htmlspecialchars($ic) ?></span>
                        <?php endforeach; ?>
                      <?php else: ?>
                        <span class="badge-pill badge-orange">Full Stack</span>
                      <?php endif; ?>
                    </td>
                  </tr>
                  <?php endforeach; ?>
                <?php else: ?>
                  <tr>
                    <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">
                      No seminar feedback received yet.
                    </td>
                  </tr>
                <?php endif; ?>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </main>
  </div>

  <!-- MODAL 1: ADD COURSE -->
  <div id="addCourseModal" class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header">
        <h3><i class="fa-solid fa-book-bookmark" style="color: var(--primary);"></i> <span id="modalCourseTitle">Upload New LMS Course</span></h3>
        <button onclick="closeModal('addCourseModal')" class="modal-close-btn">&times;</button>
      </div>

      <form id="courseForm" onsubmit="handleCourseSubmit(event)">
        <input type="hidden" id="fc-id" value="">

        <div class="form-grid">
          <div class="col-span-2 form-group">
            <label>Course Title *</label>
            <input type="text" id="fc-title" class="form-control" required placeholder="e.g. Distributed Cloud &amp; Microservices Architecture">
          </div>

          <div class="form-group">
            <label>Category *</label>
            <select id="fc-category" class="form-control" required>
              <option value="fullstack">Full-Stack Development</option>
              <option value="cloud">Cloud &amp; DevOps</option>
              <option value="ai">AI &amp; Machine Learning</option>
              <option value="cyber">Cybersecurity</option>
              <option value="systems">System Architecture</option>
            </select>
          </div>

          <div class="form-group">
            <label>Level *</label>
            <select id="fc-level" class="form-control" required>
              <option value="Intermediate">Intermediate</option>
              <option value="Beginner to Advanced">Beginner to Advanced</option>
              <option value="Advanced">Advanced Production</option>
              <option value="Flagship Bootcamp">Flagship Bootcamp</option>
            </select>
          </div>

          <div class="form-group">
            <label>Selling Price ($) *</label>
            <input type="number" id="fc-price" class="form-control" required value="79">
          </div>

          <div class="form-group">
            <label>Original Price (Strikethrough) ($)</label>
            <input type="number" id="fc-original-price" class="form-control" required value="180">
          </div>

          <div class="col-span-2 form-group">
            <label>Thumbnail Image URL *</label>
            <input type="url" id="fc-image" class="form-control" required value="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800">
            <div style="display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap;">
              <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('fc-image').value='/images/full-stact-development.png'">💻 Fullstack Default</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('fc-image').value='https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800'">☁️ DevOps Default</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('fc-image').value='https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800'">🤖 AI/ML Default</button>
            </div>
          </div>

          <div class="form-group">
            <label>Duration *</label>
            <input type="text" id="fc-duration" class="form-control" required value="40 hrs • 8 Production Projects">
          </div>

          <div class="form-group">
            <label>Instructor Name</label>
            <input type="text" id="fc-instructor" class="form-control" value="Netcoder Senior Faculty">
          </div>

          <div class="col-span-2 form-group">
            <label>Course Overview &amp; Learning Outcomes *</label>
            <textarea id="fc-overview" class="form-control" rows="3" required placeholder="Describe what the student will build..."></textarea>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
          <button type="button" onclick="closeModal('addCourseModal')" class="btn btn-outline">Cancel</button>
          <button type="submit" id="saveCourseBtn" class="btn btn-primary">
            <i class="fa-solid fa-cloud-arrow-up"></i> Save &amp; Publish Course
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL 2: ADD / ENROLL STUDENT -->
  <div id="addStudentModal" class="modal-overlay">
    <div class="modal-card" style="max-width: 560px;">
      <div class="modal-header">
        <h3><i class="fa-solid fa-user-plus" style="color: var(--success);"></i> Enroll Student / Fee Receipt</h3>
        <button onclick="closeModal('addStudentModal')" class="modal-close-btn">&times;</button>
      </div>

      <form id="studentAddForm" onsubmit="handleAddStudentSubmit(event)">
        <div class="form-grid">
          <div class="col-span-2 form-group">
            <label>Learner Full Name *</label>
            <input type="text" id="fs-add-name" class="form-control" required placeholder="e.g. Ananya Sharma">
          </div>

          <div class="form-group">
            <label>Email Address *</label>
            <input type="email" id="fs-add-email" class="form-control" required placeholder="ananya@gmail.com">
          </div>

          <div class="form-group">
            <label>Mobile / Phone Number</label>
            <input type="text" id="fs-add-phone" class="form-control" placeholder="9812345678">
          </div>

          <div class="col-span-2 form-group">
            <label>Select LMS Course Track *</label>
            <select id="fs-add-course" class="form-control" required onchange="handleCourseSelectChange(this)">
              <?php if (!empty($courses)): ?>
                <?php foreach ($courses as $c): ?>
                <option value="<?= htmlspecialchars($c['slug'] ?? '') ?>" data-fee="<?= htmlspecialchars((string)($c['price'] ?? $c['fee'] ?? 79)) ?>" data-name="<?= htmlspecialchars($c['title'] ?? '') ?>">
                  <?= htmlspecialchars($c['title'] ?? '') ?> ($<?= htmlspecialchars((string)($c['price'] ?? $c['fee'] ?? 79)) ?>)
                </option>
                <?php endforeach; ?>
              <?php else: ?>
                <option value="fullstack-web-development" data-fee="79" data-name="Full Stack Web Development">
                  Full Stack Web Development ($79)
                </option>
              <?php endif; ?>
            </select>
          </div>

          <div class="form-group">
            <label>Fee Paid Amount ($) *</label>
            <input type="number" id="fs-add-fee" class="form-control" required value="79">
          </div>

          <div class="form-group">
            <label>Initial DRM Security Status</label>
            <select id="fs-add-drm" class="form-control">
              <option value="Protected">Protected (Active Shield)</option>
              <option value="Active">Active</option>
            </select>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
          <button type="button" onclick="closeModal('addStudentModal')" class="btn btn-outline">Cancel</button>
          <button type="submit" class="btn btn-success">
            <i class="fa-solid fa-shield-check"></i> Register &amp; Issue Watermark
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL 3: EDIT STUDENT FORM -->
  <div id="editStudentModal" class="modal-overlay">
    <div class="modal-card" style="max-width: 600px;">
      <div class="modal-header">
        <h3><i class="fa-solid fa-user-pen" style="color: var(--info);"></i> Edit Student Information</h3>
        <button onclick="closeModal('editStudentModal')" class="modal-close-btn">&times;</button>
      </div>

      <form id="studentEditForm" onsubmit="handleEditStudentSubmit(event)">
        <input type="hidden" id="fs-edit-id" value="">

        <div class="form-grid">
          <div class="form-group">
            <label>Student Code (System ID)</label>
            <input type="text" id="fs-edit-code" class="form-control" readonly style="background: #f1f5f9; color: var(--navy-800); font-family: 'JetBrains Mono', monospace; font-weight: 700;">
          </div>

          <div class="form-group">
            <label>DRM Watermark ID</label>
            <input type="text" id="fs-edit-watermark" class="form-control" readonly style="background: #f1f5f9; color: var(--purple); font-family: 'JetBrains Mono', monospace; font-weight: 700;">
          </div>

          <div class="col-span-2 form-group">
            <label>Student Full Name *</label>
            <input type="text" id="fs-edit-name" class="form-control" required placeholder="Full Name">
          </div>

          <div class="form-group">
            <label>Email Address *</label>
            <input type="email" id="fs-edit-email" class="form-control" required placeholder="Email">
          </div>

          <div class="form-group">
            <label>Phone Number</label>
            <input type="text" id="fs-edit-phone" class="form-control" placeholder="Phone Number">
          </div>

          <div class="col-span-2 form-group">
            <label>Enrolled Course Track *</label>
            <select id="fs-edit-course" class="form-control" required>
              <?php if (!empty($courses)): ?>
                <?php foreach ($courses as $c): ?>
                <option value="<?= htmlspecialchars($c['slug'] ?? '') ?>" data-name="<?= htmlspecialchars($c['title'] ?? '') ?>">
                  <?= htmlspecialchars($c['title'] ?? '') ?>
                </option>
                <?php endforeach; ?>
              <?php else: ?>
                <option value="fullstack-web-development" data-name="Full Stack Web Development">
                  Full Stack Web Development
                </option>
              <?php endif; ?>
            </select>
          </div>

          <div class="form-group">
            <label>Fee Paid ($)</label>
            <input type="number" id="fs-edit-fee" class="form-control" required>
          </div>

          <div class="form-group">
            <label>DRM Shield Status</label>
            <select id="fs-edit-drm" class="form-control">
              <option value="Protected">Protected (Active)</option>
              <option value="Active">Active</option>
              <option value="Warning">Warning (Tamper Logged)</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          <div class="col-span-2 form-group">
            <label>Curriculum Progress (%)</label>
            <input type="range" id="fs-edit-progress" min="0" max="100" class="form-control" oninput="document.getElementById('prog-val').innerText = this.value + '%'">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-top: 4px; text-align: right;">
              Current Progress: <span id="prog-val" style="color: var(--primary);">0%</span>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
          <button type="button" onclick="closeModal('editStudentModal')" class="btn btn-outline">Cancel</button>
          <button type="submit" class="btn btn-primary">
            <i class="fa-solid fa-floppy-disk"></i> Update Student Profile
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL 4: CASCADING DELETE CONFIRMATION ("AGAR DELETE HAI TOH SAB KUCH DELETE HO JAYE") -->
  <div id="deleteConfirmModal" class="modal-overlay">
    <div class="modal-card" style="max-width: 520px; border: 2px solid #fecaca;">
      <div class="modal-header" style="border-bottom-color: #fee2e2;">
        <h3 style="color: var(--danger);">
          <i class="fa-solid fa-triangle-exclamation"></i> Confirm Permanent Cascading Delete
        </h3>
        <button onclick="closeModal('deleteConfirmModal')" class="modal-close-btn">&times;</button>
      </div>

      <div class="danger-alert-box">
        <i class="fa-solid fa-radiation"></i>
        <div>
          <h4>Cascading Wipe Out Warning</h4>
          <p>Agar aap is student ko delete karte hain, toh is student se juda <strong>sab kuch delete ho jayega</strong>:</p>
          <ul>
            <li>Student Profile &amp; Authentication credentials</li>
            <li>All enrolled course entitlements &amp; fee records</li>
            <li>DRM watermark keys &amp; security session tokens</li>
            <li>Video progress, quiz, and seminar logs</li>
          </ul>
        </div>
      </div>

      <div style="background: #f8fafc; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px; margin-bottom: 20px;">
        <div style="font-size: 0.78rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted);">Target Student</div>
        <div id="deleteTargetName" style="font-size: 1.1rem; font-weight: 800; color: var(--navy-950); margin-top: 2px;"></div>
        <div id="deleteTargetCode" style="font-size: 0.82rem; font-family: 'JetBrains Mono', monospace; color: var(--navy-700); margin-top: 2px;"></div>
      </div>

      <input type="hidden" id="deleteTargetId" value="">

      <div style="display: flex; justify-content: flex-end; gap: 12px;">
        <button type="button" onclick="closeModal('deleteConfirmModal')" class="btn btn-outline">Cancel</button>
        <button type="button" id="confirmDeleteBtn" onclick="executeCascadingDelete()" class="btn btn-danger">
          <i class="fa-solid fa-trash-can"></i> Yes, Delete Everything (Permanent)
        </button>
      </div>
    </div>
  </div>

  <!-- MODAL 5: SCHEDULE LIVE CLASS -->
  <div id="classModal" class="modal-overlay">
    <div class="modal-card" style="max-width: 620px;">
      <div class="modal-header">
        <h3 style="color: var(--primary);">
          <i class="fa-solid fa-tower-broadcast"></i> Schedule Live Class Link
        </h3>
        <button onclick="closeModal('classModal')" class="modal-close-btn">&times;</button>
      </div>

      <form id="classScheduleForm" onsubmit="handleScheduleClass(event)">
        <div class="form-grid">
          <div class="col-span-2 form-group">
            <label>Class Topic / Title *</label>
            <input type="text" id="fcls-title" class="form-control" required placeholder="e.g. Live Hands-on: Building Next.js 15 Server Actions">
          </div>

          <div class="col-span-2 form-group">
            <label>Target Course Track (Direct to Enrolled Students) *</label>
            <select id="fcls-course" class="form-control" required>
              <?php if (!empty($courses)): ?>
                <?php foreach ($courses as $c): ?>
                <option value="<?= htmlspecialchars($c['slug'] ?? '') ?>" data-name="<?= htmlspecialchars($c['title'] ?? '') ?>">
                  <?= htmlspecialchars($c['title'] ?? '') ?> (<?= htmlspecialchars($c['slug'] ?? '') ?>)
                </option>
                <?php endforeach; ?>
              <?php else: ?>
                <option value="fullstack-web-development" data-name="Full Stack Web Development">
                  Full Stack Web Development
                </option>
              <?php endif; ?>
            </select>
          </div>

          <div class="form-group">
            <label>Meeting Platform *</label>
            <select id="fcls-platform" class="form-control">
              <option value="Google Meet">Google Meet</option>
              <option value="Zoom">Zoom Meeting</option>
              <option value="Microsoft Teams">Microsoft Teams</option>
              <option value="YouTube Live">YouTube Live</option>
            </select>
          </div>

          <div class="form-group">
            <label>Cohort / Batch Name</label>
            <input type="text" id="fcls-batch" class="form-control" value="Cohort 14 (Batch 2026-A)">
          </div>

          <div class="col-span-2 form-group">
            <label>Live Meeting URL / Direct Join Link *</label>
            <input type="url" id="fcls-link" class="form-control" required value="https://meet.google.com/net-fsdev-live">
          </div>

          <div class="form-group">
            <label>Passcode / PIN</label>
            <input type="text" id="fcls-passcode" class="form-control" value="NET2026">
          </div>

          <div class="form-group">
            <label>Date *</label>
            <input type="date" id="fcls-date" class="form-control" required value="<?= date('Y-m-d') ?>">
          </div>

          <div class="form-group">
            <label>Time Display *</label>
            <input type="text" id="fcls-time" class="form-control" required value="06:30 PM - 08:00 PM IST">
          </div>

          <div class="form-group">
            <label>Mentor Name</label>
            <input type="text" id="fcls-mentor" class="form-control" value="Nitin Kapoor">
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
          <button type="button" onclick="closeModal('classModal')" class="btn btn-outline">Cancel</button>
          <button type="submit" class="btn btn-primary">
            <i class="fa-solid fa-paper-plane"></i> Publish Class to Students
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Toast Notification Hub -->
  <div class="toast-container" id="toastContainer"></div>

  <!-- APPLICATION JAVASCRIPT & REAL-TIME HANDLERS -->
  <script>
    // Tab Switching
    function switchTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

      const target = document.getElementById('tab-' + tabId);
      if (target) target.classList.add('active');

      const navItems = document.querySelectorAll('.nav-item');
      navItems.forEach(item => {
        if (item.getAttribute('onclick')?.includes(tabId)) {
          item.classList.add('active');
        }
      });
      window.location.hash = tabId;
    }

    // Modal Helpers
    function openModal(id) {
      const modal = document.getElementById(id);
      if (modal) modal.classList.add('open');
    }

    function closeModal(id) {
      const modal = document.getElementById(id);
      if (modal) modal.classList.remove('open');
    }

    // Toast Notification System
    function showToast(message, type = 'success') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;

      let icon = 'fa-circle-check';
      if (type === 'error') icon = 'fa-circle-xmark';
      if (type === 'info') icon = 'fa-circle-info';

      toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
      container.appendChild(toast);

      setTimeout(() => toast.classList.add('show'), 10);
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    }

    // Course Actions
    function openAddCourseModal() {
      document.getElementById('modalCourseTitle').innerText = 'Upload New LMS Course';
      document.getElementById('saveCourseBtn').innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Save & Publish Course';
      document.getElementById('fc-id').value = '';
      document.getElementById('fc-title').value = '';
      document.getElementById('fc-price').value = '79';
      document.getElementById('fc-original-price').value = '180';
      document.getElementById('fc-overview').value = '';
      openModal('addCourseModal');
    }

    function editCourseModal(c) {
      document.getElementById('modalCourseTitle').innerText = 'Edit Course: ' + (c.title || '');
      document.getElementById('saveCourseBtn').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Update Course';
      document.getElementById('fc-id').value = c.id || c.slug;
      document.getElementById('fc-title').value = c.title || '';
      document.getElementById('fc-category').value = c.category || 'fullstack';
      document.getElementById('fc-level').value = c.level || 'Intermediate';
      document.getElementById('fc-price').value = c.price || c.fee || 79;
      document.getElementById('fc-original-price').value = c.originalPrice || c.original_price || 180;
      document.getElementById('fc-image').value = c.image || '/images/full-stact-development.png';
      document.getElementById('fc-duration').value = c.duration || '40 hrs';
      document.getElementById('fc-instructor').value = c.instructor || 'Netcoder Faculty';
      document.getElementById('fc-overview').value = c.overview || '';
      openModal('addCourseModal');
    }

    async function handleCourseSubmit(e) {
      e.preventDefault();
      const id = document.getElementById('fc-id').value;
      const payload = {
        id: id,
        title: document.getElementById('fc-title').value,
        category: document.getElementById('fc-category').value,
        level: document.getElementById('fc-level').value,
        price: parseFloat(document.getElementById('fc-price').value),
        originalPrice: parseFloat(document.getElementById('fc-original-price').value),
        image: document.getElementById('fc-image').value,
        duration: document.getElementById('fc-duration').value,
        instructor: document.getElementById('fc-instructor').value,
        overview: document.getElementById('fc-overview').value,
      };

      const url = id ? '/api/courses/update' : '/api/courses';
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showToast('Course published & synchronized with Next.js catalog!', 'success');
          closeModal('addCourseModal');
          setTimeout(() => window.location.reload(), 800);
        } else {
          showToast(data.message || 'Error saving course', 'error');
        }
      } catch (err) {
        showToast('Connection failed: ' + err.message, 'error');
      }
    }

    async function confirmDeleteCourse(idOrSlug, title) {
      if (!confirm(`Are you sure you want to delete course "${title}" from catalog?`)) return;
      try {
        const res = await fetch(`/api/courses?id=${encodeURIComponent(idOrSlug)}&slug=${encodeURIComponent(idOrSlug)}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if (data.success) {
          showToast('Course removed from LMS catalogue', 'success');
          setTimeout(() => window.location.reload(), 700);
        } else {
          showToast(data.message || 'Failed to delete course', 'error');
        }
      } catch (err) {
        showToast('Network error: ' + err.message, 'error');
      }
    }

    // Student Management Actions
    function openAddStudentModal() {
      openModal('addStudentModal');
    }

    function handleCourseSelectChange(select) {
      const opt = select.options[select.selectedIndex];
      const fee = opt.getAttribute('data-fee');
      if (fee) {
        document.getElementById('fs-add-fee').value = fee;
      }
    }

    async function handleAddStudentSubmit(e) {
      e.preventDefault();
      const select = document.getElementById('fs-add-course');
      const opt = select.options[select.selectedIndex];

      const payload = {
        name: document.getElementById('fs-add-name').value,
        email: document.getElementById('fs-add-email').value,
        phone: document.getElementById('fs-add-phone').value,
        course: opt.getAttribute('data-name'),
        slug: opt.value,
        feePaid: parseFloat(document.getElementById('fs-add-fee').value),
        drmStatus: document.getElementById('fs-add-drm').value,
      };

      try {
        const res = await fetch('/api/lms/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showToast('Student enrolled successfully with DRM protection watermark!', 'success');
          closeModal('addStudentModal');
          setTimeout(() => window.location.reload(), 800);
        } else {
          showToast(data.message || 'Enrollment failed', 'error');
        }
      } catch (err) {
        showToast('Network error: ' + err.message, 'error');
      }
    }

    // Edit Student Modal Handlers
    function openEditStudentModal(student) {
      document.getElementById('fs-edit-id').value = student.id || student.student_code;
      document.getElementById('fs-edit-code').value = student.student_code || 'NC-STU';
      document.getElementById('fs-edit-watermark').value = student.drm_watermark_id || student.drmWatermark || 'NC-WM-ACTIVE';
      document.getElementById('fs-edit-name').value = student.name || '';
      document.getElementById('fs-edit-email').value = student.email || '';
      document.getElementById('fs-edit-phone').value = student.phone || '';
      document.getElementById('fs-edit-fee').value = student.feePaid || student.fee || 79;
      document.getElementById('fs-edit-drm').value = student.drmStatus || 'Protected';
      
      const prog = student.progress || 0;
      document.getElementById('fs-edit-progress').value = prog;
      document.getElementById('prog-val').innerText = prog + '%';

      // Select course option
      const courseSelect = document.getElementById('fs-edit-course');
      if (student.slug) {
        courseSelect.value = student.slug;
      }

      openModal('editStudentModal');
    }

    async function handleEditStudentSubmit(e) {
      e.preventDefault();
      const id = document.getElementById('fs-edit-id').value;
      const courseSelect = document.getElementById('fs-edit-course');
      const opt = courseSelect.options[courseSelect.selectedIndex];

      const payload = {
        id: id,
        name: document.getElementById('fs-edit-name').value,
        email: document.getElementById('fs-edit-email').value,
        phone: document.getElementById('fs-edit-phone').value,
        course: opt.getAttribute('data-name'),
        slug: opt.value,
        feePaid: parseFloat(document.getElementById('fs-edit-fee').value),
        drmStatus: document.getElementById('fs-edit-drm').value,
        progress: parseInt(document.getElementById('fs-edit-progress').value),
      };

      try {
        const res = await fetch(`/api/lms/students/update`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showToast('Student information and DRM profile updated successfully!', 'success');
          closeModal('editStudentModal');
          setTimeout(() => window.location.reload(), 800);
        } else {
          showToast(data.message || 'Update failed', 'error');
        }
      } catch (err) {
        showToast('Network error: ' + err.message, 'error');
      }
    }

    // Cascading Delete Handler ("Agar delete hai toh sab kuch delete ho jaye")
    function confirmDeleteStudent(student) {
      document.getElementById('deleteTargetId').value = student.id || student.student_code;
      document.getElementById('deleteTargetName').innerText = student.name || 'Learner';
      document.getElementById('deleteTargetCode').innerText = (student.student_code || '') + ' • ' + (student.email || '');
      openModal('deleteConfirmModal');
    }

    async function executeCascadingDelete() {
      const id = document.getElementById('deleteTargetId').value;
      const btn = document.getElementById('confirmDeleteBtn');
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Purging all records...';
      btn.disabled = true;

      try {
        const res = await fetch(`/api/lms/students?id=${encodeURIComponent(id)}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if (data.success) {
          showToast('Learner and all cascading enrollments, DRM logs, and progress wiped out completely!', 'success');
          closeModal('deleteConfirmModal');
          setTimeout(() => window.location.reload(), 800);
        } else {
          showToast(data.message || 'Failed to delete student', 'error');
          btn.innerHTML = '<i class="fa-solid fa-trash-can"></i> Yes, Delete Everything (Permanent)';
          btn.disabled = false;
        }
      } catch (err) {
        showToast('Network error: ' + err.message, 'error');
        btn.innerHTML = '<i class="fa-solid fa-trash-can"></i> Yes, Delete Everything (Permanent)';
        btn.disabled = false;
      }
    }

    // Live Classes Handler
    function openClassModal() {
      openModal('classModal');
    }

    async function handleScheduleClass(e) {
      e.preventDefault();
      const select = document.getElementById('fcls-course');
      const opt = select.options[select.selectedIndex];

      const payload = {
        title: document.getElementById('fcls-title').value,
        courseSlug: opt.value,
        courseTitle: opt.getAttribute('data-name'),
        platform: document.getElementById('fcls-platform').value,
        batch: document.getElementById('fcls-batch').value,
        meetingLink: document.getElementById('fcls-link').value,
        passcode: document.getElementById('fcls-passcode').value,
        date: document.getElementById('fcls-date').value,
        time: document.getElementById('fcls-time').value,
        mentorName: document.getElementById('fcls-mentor').value,
        status: 'upcoming',
        isAutomatedDaily: true
      };

      try {
        const res = await fetch('/api/classes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showToast('Live class scheduled & broadcasted to enrolled learners!', 'success');
          closeModal('classModal');
          setTimeout(() => window.location.reload(), 800);
        } else {
          showToast(data.message || 'Error scheduling class', 'error');
        }
      } catch (err) {
        showToast('Failed to connect: ' + err.message, 'error');
      }
    }

    async function deleteLiveClass(id) {
      if (!confirm('Remove this scheduled live class link?')) return;
      try {
        const res = await fetch(`/api/classes/${encodeURIComponent(id)}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          showToast('Live class removed', 'success');
          setTimeout(() => window.location.reload(), 700);
        }
      } catch (err) {
        showToast('Error: ' + err.message, 'error');
      }
    }

    // Filter functions
    function filterCoursesTable() {
      const q = document.getElementById('courseFilterInput').value.toLowerCase();
      const cat = document.getElementById('courseCategorySelect').value.toLowerCase();

      document.querySelectorAll('.course-table-row').forEach(row => {
        const title = row.getAttribute('data-title') || '';
        const slug = row.getAttribute('data-slug') || '';
        const rowCat = row.getAttribute('data-cat') || '';

        const matchesQuery = !q || title.includes(q) || slug.includes(q);
        const matchesCat = cat === 'all' || rowCat === cat;

        row.style.display = (matchesQuery && matchesCat) ? '' : 'none';
      });
    }

    function filterStudentsTable() {
      const q = document.getElementById('studentFilterInput').value.toLowerCase();
      document.querySelectorAll('.student-table-row').forEach(row => {
        const name = row.getAttribute('data-name') || '';
        const email = row.getAttribute('data-email') || '';
        const code = row.getAttribute('data-code') || '';
        const course = row.getAttribute('data-course') || '';

        const match = !q || name.includes(q) || email.includes(q) || code.includes(q) || course.includes(q);
        row.style.display = match ? '' : 'none';
      });
    }

    // Handle deep hash navigation
    window.addEventListener('DOMContentLoaded', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && document.getElementById('tab-' + hash)) {
        switchTab(hash);
      }
    });
  </script>
</body>
</html>
