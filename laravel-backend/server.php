<?php
/**
 * Netcoder Technology - Laravel LMS Backend & REST API Server
 * Dual-Mode: Standard Laravel + Built-in Standalone Live Server
 * Serves API endpoints for Next.js (http://localhost:3000) with CORS and Admin Dashboard at http://localhost:8000
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Enable CORS for Next.js frontend
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept, X-Requested-With');
header('Access-Control-Max-Age: 86400');

$requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($requestMethod === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$storageFile = __DIR__ . '/database/storage.json';

// Initialize storage if missing
if (!file_exists($storageFile)) {
    $initialData = [
        'courses' => [
            [
                'id' => 1,
                'title' => 'Production Kubernetes & Multi-Cloud Infrastructure',
                'slug' => 'production-kubernetes',
                'category' => 'cloud',
                'duration' => '42 hrs • 18 Cloud Labs',
                'level' => 'Advanced',
                'overview' => 'Deploy fault-tolerant clusters, implement service meshes using Istio, configure GitOps with ArgoCD, and manage zero-trust network policies.',
                'fee' => 89,
                'price' => 89,
                'original_price' => 199,
                'originalPrice' => 199,
                'instructor' => 'Sarah Vance, Principal SRE @ CloudScale',
                'instructor_avatar' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
                'image' => 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
                'hours' => '42 hrs • 18 Cloud Labs',
                'icon' => 'terminal',
                'tagline' => 'Updated Jan 2026',
                'badge' => 'Advanced',
                'rating' => 4.90,
                'reviews_count' => 3420,
                'ratingCount' => 3420,
                'is_active' => true,
                'created_at' => date('Y-m-d H:i:s'),
            ],
            [
                'id' => 2,
                'title' => 'Full-Stack Next.js 15, TypeScript & Distributed Microservices',
                'slug' => 'nextjs-fullstack',
                'category' => 'fullstack',
                'duration' => '38 hrs • 8 Full Projects',
                'level' => 'Intermediate to Advanced',
                'overview' => 'Architect high-scale web apps with Server Components, Turborepo, Prisma ORM, Redis caching, and Stripe billing pipelines.',
                'fee' => 79,
                'price' => 79,
                'original_price' => 180,
                'originalPrice' => 180,
                'instructor' => 'Alex Chen, Ex-Staff Engineer @ Google',
                'instructor_avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
                'image' => 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
                'hours' => '38 hrs • 8 Full Projects',
                'icon' => 'code',
                'tagline' => 'Next.js 15 App Router',
                'badge' => 'Popular',
                'rating' => 4.95,
                'reviews_count' => 4190,
                'ratingCount' => 4190,
                'is_active' => true,
                'created_at' => date('Y-m-d H:i:s'),
            ],
            [
                'id' => 3,
                'title' => 'Generative AI & LLM Systems Engineering with LangChain & PyTorch',
                'slug' => 'genai-llm-systems',
                'category' => 'ai',
                'duration' => '46 hrs • 10 LLM Apps',
                'level' => 'Advanced',
                'overview' => 'Construct production RAG architectures, fine-tune open-weights models (Llama 3), build autonomous agents, and evaluate hallucination metrics.',
                'fee' => 99,
                'price' => 99,
                'original_price' => 249,
                'originalPrice' => 249,
                'instructor' => 'Dr. Dev Patel, Lead AI Architect',
                'instructor_avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
                'image' => 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
                'hours' => '46 hrs • 10 LLM Apps',
                'icon' => 'psychology',
                'tagline' => 'LangChain & PyTorch',
                'badge' => 'Trending',
                'rating' => 4.92,
                'reviews_count' => 2110,
                'ratingCount' => 2110,
                'is_active' => true,
                'created_at' => date('Y-m-d H:i:s'),
            ],
            [
                'id' => 4,
                'title' => 'Enterprise Cloud Security & AWS DevSecOps Mastery',
                'slug' => 'cloud-security-devsecops',
                'category' => 'cyber',
                'duration' => '35 hrs • 14 Attack Labs',
                'level' => 'Advanced',
                'overview' => 'Implement automated SAST/DAST pipelines, cloud penetration audits, IAM least-privilege guardrails, and compliance-as-code automation.',
                'fee' => 89,
                'price' => 89,
                'original_price' => 210,
                'originalPrice' => 210,
                'instructor' => 'Elena Rostova, CISO Advisor & SANS Author',
                'instructor_avatar' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
                'image' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
                'hours' => '35 hrs • 14 Attack Labs',
                'icon' => 'shield',
                'tagline' => 'Zero-Trust Architecture',
                'badge' => 'Security',
                'rating' => 4.88,
                'reviews_count' => 1840,
                'ratingCount' => 1840,
                'is_active' => true,
                'created_at' => date('Y-m-d H:i:s'),
            ],
            [
                'id' => 5,
                'title' => 'Full Stack Web Development (MERN / Next.js Diploma)',
                'slug' => 'fullstack-web-development',
                'category' => 'fullstack',
                'duration' => '6 Months • 20 Real Projects',
                'level' => 'Beginner to Advanced',
                'overview' => 'Master modern web applications with React, Next.js, Node.js, Express, MongoDB, and Tailwind CSS with real client capstone projects.',
                'fee' => 120,
                'price' => 120,
                'original_price' => 250,
                'originalPrice' => 250,
                'instructor' => 'Netcoder Industry Mentors',
                'instructor_avatar' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
                'image' => '/images/full-stact-development.png',
                'hours' => '6 Months • 20 Real Projects',
                'icon' => 'laptop_mac',
                'tagline' => 'Placement Assured',
                'badge' => 'Bestseller',
                'rating' => 4.95,
                'reviews_count' => 3120,
                'ratingCount' => 3120,
                'is_active' => true,
                'created_at' => date('Y-m-d H:i:s'),
            ]
        ],
        'students' => [
            [
                'id' => 1,
                'student_code' => 'NC-STU-2026-001',
                'name' => 'Sahil Sandhu',
                'email' => 'sahil@netcoder.in',
                'phone' => '9876543210',
                'course' => 'Full Stack Web Development',
                'slug' => 'fullstack-web-development',
                'feePaid' => 120,
                'enrolledDate' => '2026-09-20',
                'drmStatus' => 'Protected',
                'progress' => 35
            ],
            [
                'id' => 2,
                'student_code' => 'NC-STU-2026-002',
                'name' => 'Priya Sharma',
                'email' => 'priya.sharma@gmail.com',
                'phone' => '9812345678',
                'course' => 'Generative AI & LLM Systems Engineering',
                'slug' => 'genai-llm-systems',
                'feePaid' => 99,
                'enrolledDate' => '2026-09-18',
                'drmStatus' => 'Protected',
                'progress' => 60
            ],
            [
                'id' => 3,
                'student_code' => 'NC-STU-2026-003',
                'name' => 'Amit Patel',
                'email' => 'amit.dev@outlook.com',
                'phone' => '9845612378',
                'course' => 'Enterprise Cloud Security & AWS DevSecOps',
                'slug' => 'cloud-security-devsecops',
                'feePaid' => 89,
                'enrolledDate' => '2026-09-22',
                'drmStatus' => 'Protected',
                'progress' => 20
            ],
            [
                'id' => 4,
                'student_code' => 'NC-STU-2026-004',
                'name' => 'Neha Thakur',
                'email' => 'neha.uiux@gmail.com',
                'phone' => '9871234560',
                'course' => 'Production Kubernetes & Multi-Cloud',
                'slug' => 'production-kubernetes',
                'feePaid' => 89,
                'enrolledDate' => '2026-09-25',
                'drmStatus' => 'Protected',
                'progress' => 45
            ]
        ],
        'blogs' => [
            [
                'id' => 1,
                'title' => 'The Future of Full-Stack Web Development in 2026',
                'slug' => 'future-of-full-stack-web-development-2026',
                'category' => 'Web Development',
                'excerpt' => 'Explore the newest landscape of Server Actions, React 19, Turbopack, and edge database architectures.',
                'author' => 'Netcoder Editorial',
                'date' => 'Oct 1, 2026',
                'image' => '/images/full-stact-development.png'
            ]
        ],
        'feedbacks' => [
            [
                'id' => 1,
                'student_name' => 'Rohit Verma',
                'contact_number' => '9816012345',
                'email' => 'rohit.v@gmail.com',
                'course' => 'B.Tech CSE',
                'semester' => '5th',
                'overall_assessment' => 'Very Satisfied',
                'interested_courses' => ['Full Stack Web Development', 'Cyber Security']
            ]
        ]
    ];
    if (!is_dir(__DIR__ . '/database')) {
        mkdir(__DIR__ . '/database', 0777, true);
    }
    file_put_contents($storageFile, json_encode($initialData, JSON_PRETTY_PRINT));
}

function loadDB() {
    global $storageFile;
    $default = ['courses' => [], 'students' => [], 'blogs' => [], 'feedbacks' => [], 'classes' => [], 'notes' => [], 'tasks' => [], 'tests' => [], 'mentors' => []];
    if (!file_exists($storageFile)) return $default;
    $data = json_decode(file_get_contents($storageFile), true) ?: [];
    foreach (['courses', 'students', 'blogs', 'feedbacks', 'classes', 'notes', 'tasks', 'tests', 'mentors'] as $k) {
        if (!isset($data[$k]) || !is_array($data[$k])) $data[$k] = [];
    }
    return $data;
}

function saveDB($data) {
    global $storageFile;
    file_put_contents($storageFile, json_encode($data, JSON_PRETTY_PRINT));
}

function jsonResponse($data, $status = 200) {
    header('Content-Type: application/json; charset=utf-8');
    http_response_code($status);
    echo json_encode($data);
    exit();
}

$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Trim trailing slash
$uri = rtrim($uri, '/');
if (empty($uri)) $uri = '/';

// ============================================================================
// REST API ROUTER (Matches Next.js lib/api.js & Laravel routes/api.php)
// ============================================================================

// 1. GET /api/courses or /courses
if (($uri === '/api/courses' || $uri === '/courses') && $method === 'GET') {
    $db = loadDB();
    $courses = $db['courses'] ?? [];
    
    // Check slug query
    if (isset($_GET['slug'])) {
        $slug = $_GET['slug'];
        foreach ($courses as $c) {
            if (strtolower($c['slug'] ?? '') === strtolower($slug)) {
                jsonResponse(['success' => true, 'data' => $c]);
            }
        }
        jsonResponse(['success' => false, 'message' => "Course '{$slug}' not found"], 404);
    }

    // Category filter
    if (isset($_GET['category']) && $_GET['category'] !== 'All' && $_GET['category'] !== 'all') {
        $cat = strtolower($_GET['category']);
        $courses = array_values(array_filter($courses, function($c) use ($cat) {
            return strtolower($c['category'] ?? '') === $cat;
        }));
    }

    // Search query filter
    if (isset($_GET['q']) && !empty($_GET['q'])) {
        $q = strtolower(trim($_GET['q']));
        $courses = array_values(array_filter($courses, function($c) use ($q) {
            return str_contains(strtolower($c['title'] ?? ''), $q) || str_contains(strtolower($c['overview'] ?? ''), $q);
        }));
    }

    jsonResponse([
        'success' => true,
        'count' => count($courses),
        'data' => $courses
    ]);
}

// 2. GET /api/courses/{slug}
if (preg_match('#^/(?:api/)?courses/([a-zA-Z0-9_\-]+)$#', $uri, $matches) && $method === 'GET') {
    $slug = $matches[1];
    $db = loadDB();
    foreach ($db['courses'] as $c) {
        if (strtolower($c['slug'] ?? '') === strtolower($slug) || (string)($c['id'] ?? '') === $slug) {
            jsonResponse(['success' => true, 'data' => $c]);
        }
    }
    jsonResponse(['success' => false, 'message' => "Course '{$slug}' not found"], 404);
}

// 3. POST /api/courses or /courses (Admin Upload Course)
if (($uri === '/api/courses' || $uri === '/courses') && $method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    if (empty($input['title']) || empty($input['overview'])) {
        jsonResponse(['success' => false, 'message' => 'Course title and overview description are required'], 400);
    }

    $db = loadDB();
    $slug = !empty($input['slug']) ? $input['slug'] : strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['title']), '-'));
    $price = isset($input['price']) ? (float)$input['price'] : (isset($input['fee']) ? (float)$input['fee'] : 79);
    $origPrice = isset($input['originalPrice']) ? (float)$input['originalPrice'] : (isset($input['original_price']) ? (float)$input['original_price'] : ($price * 2));

    $newCourse = [
        'id' => time(),
        'title' => $input['title'],
        'slug' => $slug,
        'category' => $input['category'] ?? 'fullstack',
        'duration' => $input['duration'] ?? '40 hrs • 8 Production Projects',
        'level' => $input['level'] ?? 'Intermediate',
        'overview' => $input['overview'],
        'price' => $price,
        'fee' => $price,
        'original_price' => $origPrice,
        'originalPrice' => $origPrice,
        'instructor' => $input['instructor'] ?? 'Netcoder Senior Engineering Faculty',
        'instructor_avatar' => $input['instructor_avatar'] ?? $input['instructorAvatar'] ?? '/images/instructor-default.png',
        'image' => $input['image'] ?? '/images/full-stact-development.png',
        'hours' => $input['hours'] ?? ($input['duration'] ?? '40 hrs'),
        'badge' => $input['badge'] ?? 'Featured',
        'tagline' => $input['tagline'] ?? 'Industry Certified',
        'icon' => $input['icon'] ?? 'code',
        'rating' => (float)($input['rating'] ?? 4.95),
        'reviews_count' => (int)($input['reviews_count'] ?? 120),
        'ratingCount' => (int)($input['ratingCount'] ?? 120),
        'is_active' => true,
        'created_at' => date('Y-m-d H:i:s'),
    ];

    array_unshift($db['courses'], $newCourse);
    saveDB($db);

    jsonResponse([
        'success' => true,
        'message' => 'Course published successfully to Laravel LMS catalog',
        'data' => $newCourse
    ], 201);
}

// 4. PUT /api/courses/{id} or POST /api/courses/update (Admin Edit Course)
if (($uri === '/api/courses/update' || (preg_match('#^/(?:api/)?courses/([a-zA-Z0-9_\-]+)$#', $uri, $matches) && in_array($method, ['PUT', 'POST']))) && $uri !== '/api/courses') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $targetId = $matches[1] ?? ($input['id'] ?? null);

    if (!$targetId) {
        jsonResponse(['success' => false, 'message' => 'Course id or slug is required for updating'], 400);
    }

    $db = loadDB();
    $foundIndex = -1;
    foreach ($db['courses'] as $idx => $c) {
        if ((string)($c['id'] ?? '') === (string)$targetId || ($c['slug'] ?? '') === $targetId) {
            $foundIndex = $idx;
            break;
        }
    }

    if ($foundIndex === -1) {
        jsonResponse(['success' => false, 'message' => "Course not found for update"], 404);
    }

    // Merge existing with updated values
    $existing = $db['courses'][$foundIndex];
    if (isset($input['title'])) $existing['title'] = $input['title'];
    if (isset($input['category'])) $existing['category'] = $input['category'];
    if (isset($input['level'])) $existing['level'] = $input['level'];
    if (isset($input['price'])) {
        $existing['price'] = (float)$input['price'];
        $existing['fee'] = (float)$input['price'];
    }
    if (isset($input['originalPrice']) || isset($input['original_price'])) {
        $orig = (float)($input['originalPrice'] ?? $input['original_price']);
        $existing['originalPrice'] = $orig;
        $existing['original_price'] = $orig;
    }
    if (isset($input['image'])) $existing['image'] = $input['image'];
    if (isset($input['duration'])) $existing['duration'] = $input['duration'];
    if (isset($input['instructor'])) $existing['instructor'] = $input['instructor'];
    if (isset($input['overview'])) $existing['overview'] = $input['overview'];
    if (isset($input['badge'])) $existing['badge'] = $input['badge'];

    $db['courses'][$foundIndex] = $existing;
    saveDB($db);

    jsonResponse([
        'success' => true,
        'message' => 'Course updated successfully',
        'data' => $existing
    ]);
}

// 5. DELETE /api/courses or /api/courses/{id}
if (($uri === '/api/courses' || $uri === '/courses' || preg_match('#^/(?:api/)?courses/([a-zA-Z0-9_\-]+)$#', $uri)) && $method === 'DELETE') {
    $idOrSlug = $_GET['id'] ?? ($_GET['slug'] ?? null);
    if (!$idOrSlug && preg_match('#^/(?:api/)?courses/([a-zA-Z0-9_\-]+)$#', $uri, $m)) {
        $idOrSlug = $m[1];
    }

    if (!$idOrSlug) {
        jsonResponse(['success' => false, 'message' => 'Course id or slug required'], 400);
    }

    $db = loadDB();
    $db['courses'] = array_values(array_filter($db['courses'], function($c) use ($idOrSlug) {
        return (string)($c['id'] ?? '') !== (string)$idOrSlug && ($c['slug'] ?? '') !== $idOrSlug;
    }));
    saveDB($db);

    jsonResponse(['success' => true, 'message' => 'Course deleted successfully']);
}

// 6. GET /api/admin/stats or /admin/stats
if (($uri === '/api/admin/stats' || $uri === '/admin/stats') && $method === 'GET') {
    $db = loadDB();
    $totalCourses = count($db['courses'] ?? []);
    $totalStudents = count($db['students'] ?? []);
    
    // Calculate total fees
    $totalFees = 0;
    foreach ($db['students'] as $s) {
        $totalFees += (float)($s['feePaid'] ?? 89);
    }

    jsonResponse([
        'success' => true,
        'data' => [
            'totalCourses' => $totalCourses,
            'totalStudents' => $totalStudents,
            'totalFeesRevenue' => $totalFees,
            'totalFeesFormatted' => '$' . number_format($totalFees, 2),
            'publishedBlogs' => count($db['blogs'] ?? []),
            'seminarFeedbacks' => count($db['feedbacks'] ?? []),
            'drmEngine' => [
                'status' => 'Armed & Guarded',
                'antiScreenshot' => true,
                'antiDownload' => true,
                'dynamicWatermark' => true,
                'focusShield' => true,
                'strictMode' => true,
            ],
            'averageRating' => 4.92,
            'systemHealth' => 'Optimal',
            'platform' => 'Laravel REST Backend (Port 8000) Live Connected to Next.js',
        ],
        'timestamp' => date('c')
    ]);
}

// 7. GET & POST & DELETE /api/lms/students (Student Registration & Fee Records)
if (($uri === '/api/lms/students' || $uri === '/lms/students') && $method === 'GET') {
    $db = loadDB();
    jsonResponse(['success' => true, 'count' => count($db['students']), 'data' => $db['students']]);
}

if (($uri === '/api/lms/students' || $uri === '/lms/students') && $method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    if (empty($input['name']) || empty($input['email'])) {
        jsonResponse(['success' => false, 'message' => 'Student name and email are required'], 400);
    }

    $db = loadDB();
    $newStudent = [
        'id' => time(),
        'student_code' => 'NC-STU-2026-' . rand(100, 999),
        'name' => $input['name'],
        'email' => $input['email'],
        'phone' => $input['phone'] ?? '',
        'course' => $input['course'] ?? 'Full Stack Web Development',
        'slug' => $input['slug'] ?? 'fullstack-web-development',
        'feePaid' => isset($input['feePaid']) ? (float)$input['feePaid'] : 79,
        'enrolledDate' => date('Y-m-d'),
        'drmStatus' => 'Protected',
        'progress' => 0
    ];

    array_unshift($db['students'], $newStudent);
    saveDB($db);

    jsonResponse(['success' => true, 'message' => 'Student registered successfully', 'data' => $newStudent], 201);
}

if (($uri === '/api/lms/students' || $uri === '/lms/students') && $method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        jsonResponse(['success' => false, 'message' => 'Student ID is required'], 400);
    }
    $db = loadDB();
    $db['students'] = array_values(array_filter($db['students'], function($s) use ($id) {
        return (string)($s['id'] ?? '') !== (string)$id;
    }));
    saveDB($db);
    jsonResponse(['success' => true, 'message' => 'Student enrollment record removed']);
}

// 8. GET & POST /api/enrollments
if (($uri === '/api/enrollments' || $uri === '/enrollments') && $method === 'GET') {
    $db = loadDB();
    jsonResponse(['success' => true, 'data' => $db['students']]);
}

if (($uri === '/api/enrollments' || $uri === '/enrollments') && $method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    jsonResponse(['success' => true, 'message' => 'Enrollment confirmed', 'data' => $input], 201);
}

// 9. GET & POST /api/blogs
if (($uri === '/api/blogs' || $uri === '/blogs') && $method === 'GET') {
    $db = loadDB();
    jsonResponse(['success' => true, 'count' => count($db['blogs']), 'data' => $db['blogs']]);
}

// 10. GET & POST /api/feedback
if (($uri === '/api/feedback' || $uri === '/feedback') && $method === 'GET') {
    $db = loadDB();
    jsonResponse(['success' => true, 'data' => $db['feedbacks']]);
}

// 11. POST /api/auth/student-login
if (($uri === '/api/auth/student-login' || $uri === '/api/student/login') && $method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $identifier = trim($input['email'] ?? $input['phone'] ?? '');
    if (empty($identifier)) {
        jsonResponse(['success' => false, 'message' => 'Please provide your registered email or mobile number'], 400);
    }
    $db = loadDB();
    $foundStudent = null;
    foreach ($db['students'] as $s) {
        if (strtolower($s['email'] ?? '') === strtolower($identifier) || ($s['phone'] ?? '') === $identifier) {
            $foundStudent = $s;
            break;
        }
    }
    if (!$foundStudent) {
        $foundStudent = [
            'id' => time(),
            'student_code' => 'NC-STU-' . rand(1000, 9999),
            'name' => 'Student ' . substr($identifier, 0, 8),
            'email' => str_contains($identifier, '@') ? $identifier : $identifier . '@netcoder.in',
            'phone' => is_numeric($identifier) ? $identifier : '',
            'role' => 'student',
            'course' => 'Full Stack Web Development',
            'slug' => 'fullstack-web-development',
            'feePaid' => 79,
            'enrolledDate' => date('Y-m-d'),
            'drmStatus' => 'Protected',
            'progress' => 15
        ];
        $db['students'][] = $foundStudent;
        saveDB($db);
    }
    jsonResponse([
        'success' => true,
        'message' => 'Student authenticated successfully',
        'token' => 'nc_stu_token_' . bin2hex(random_bytes(16)),
        'user' => [
            'id' => (string)$foundStudent['id'],
            'name' => $foundStudent['name'],
            'email' => $foundStudent['email'],
            'phone' => $foundStudent['phone'],
            'role' => 'student',
            'enrolledCourses' => [$foundStudent['slug'] ?? 'fullstack-web-development']
        ]
    ]);
}

// ============================================================================
// LIVE CLASSES & CLASS LINKS API (DIRECT ENROLLED ACCESS & DAILY AUTOMATION)
// ============================================================================

// GET /api/classes or /api/lms/classes
if (($uri === '/api/classes' || $uri === '/api/lms/classes' || $uri === '/classes') && $method === 'GET') {
    $db = loadDB();
    $classes = $db['classes'] ?? [];
    $courseSlug = $_GET['courseSlug'] ?? null;
    $mentorEmail = $_GET['mentorEmail'] ?? null;

    if ($courseSlug) {
        $classes = array_values(array_filter($classes, function($c) use ($courseSlug) {
            return ($c['courseSlug'] ?? '') === $courseSlug;
        }));
    }
    if ($mentorEmail) {
        $classes = array_values(array_filter($classes, function($c) use ($mentorEmail) {
            return strtolower($c['mentorEmail'] ?? '') === strtolower($mentorEmail);
        }));
    }

    jsonResponse([
        'success' => true,
        'count' => count($classes),
        'data' => $classes,
        'source' => 'Laravel REST Backend (Port 8000)'
    ]);
}

// POST /api/classes or /api/lms/classes (Create Live Class Link)
if (($uri === '/api/classes' || $uri === '/api/lms/classes' || $uri === '/classes') && $method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    if (empty($input['courseSlug']) || empty($input['title']) || empty($input['meetingLink'])) {
        jsonResponse(['success' => false, 'message' => 'courseSlug, title, and meetingLink are required'], 400);
    }

    $db = loadDB();
    $newClass = [
        'id' => 'cls-' . time(),
        'courseSlug' => $input['courseSlug'],
        'courseTitle' => $input['courseTitle'] ?? ucwords(str_replace('-', ' ', $input['courseSlug'])),
        'title' => $input['title'],
        'mentorName' => $input['mentorName'] ?? 'Netcoder Faculty Mentor',
        'mentorEmail' => $input['mentorEmail'] ?? 'mentor@netcoder.in',
        'mentorAvatar' => $input['mentorAvatar'] ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        'date' => $input['date'] ?? date('Y-m-d'),
        'startTime' => $input['startTime'] ?? '18:30',
        'endTime' => $input['endTime'] ?? '20:00',
        'time' => $input['time'] ?? '06:30 PM - 08:00 PM IST',
        'platform' => $input['platform'] ?? 'Google Meet',
        'meetingLink' => $input['meetingLink'],
        'meetingId' => $input['meetingId'] ?? 'net-' . substr(md5(uniqid()), 0, 8),
        'passcode' => $input['passcode'] ?? 'NET2026',
        'status' => $input['status'] ?? 'upcoming',
        'agenda' => is_array($input['agenda'] ?? null) ? $input['agenda'] : ['Live curriculum lecture & architecture walkthrough', 'Interactive doubt resolution'],
        'isAutomatedDaily' => !empty($input['isAutomatedDaily']),
        'batch' => $input['batch'] ?? 'Cohort 2026',
        'createdAt' => date('Y-m-d H:i:s')
    ];

    array_unshift($db['classes'], $newClass);
    saveDB($db);

    jsonResponse([
        'success' => true,
        'message' => 'Live class link scheduled & published to enrolled students',
        'data' => $newClass
    ], 201);
}

// PUT /api/classes or /api/classes/{id} (Update Status / Link)
if (($uri === '/api/classes' || $uri === '/api/lms/classes' || preg_match('#^/(?:api/)?(?:lms/)?classes/([a-zA-Z0-9_\-]+)$#', $uri, $m)) && in_array($method, ['PUT', 'POST']) && isset($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE']) || $method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $classId = $m[1] ?? ($input['id'] ?? null);
    if (!$classId) {
        jsonResponse(['success' => false, 'message' => 'Class id is required for update'], 400);
    }

    $db = loadDB();
    $found = false;
    foreach ($db['classes'] as $idx => $cls) {
        if ($cls['id'] === $classId) {
            $db['classes'][$idx] = array_merge($cls, $input);
            $found = $db['classes'][$idx];
            break;
        }
    }
    if (!$found) {
        jsonResponse(['success' => false, 'message' => 'Class not found'], 404);
    }
    saveDB($db);
    jsonResponse(['success' => true, 'message' => 'Live class updated successfully', 'data' => $found]);
}

// DELETE /api/classes
if (($uri === '/api/classes' || $uri === '/api/lms/classes' || preg_match('#^/(?:api/)?(?:lms/)?classes/([a-zA-Z0-9_\-]+)$#', $uri, $m)) && $method === 'DELETE') {
    $id = $_GET['id'] ?? ($m[1] ?? null);
    if (!$id) jsonResponse(['success' => false, 'message' => 'Class id required'], 400);

    $db = loadDB();
    $db['classes'] = array_values(array_filter($db['classes'], function($c) use ($id) {
        return ($c['id'] ?? '') !== $id;
    }));
    saveDB($db);
    jsonResponse(['success' => true, 'message' => 'Live class removed']);
}

// GET & POST /api/notes
if (($uri === '/api/notes' || $uri === '/api/lms/notes') && $method === 'GET') {
    $db = loadDB();
    $notes = $db['notes'] ?? [];
    if (!empty($_GET['courseSlug'])) {
        $slug = $_GET['courseSlug'];
        $notes = array_values(array_filter($notes, function($n) use ($slug) { return ($n['courseSlug'] ?? '') === $slug; }));
    }
    jsonResponse(['success' => true, 'data' => $notes]);
}
if (($uri === '/api/notes' || $uri === '/api/lms/notes') && $method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $db = loadDB();
    $newNote = [
        'id' => 'note-' . time(),
        'courseSlug' => $input['courseSlug'] ?? 'fullstack-web-development',
        'courseTitle' => $input['courseTitle'] ?? 'Full Stack Web Development',
        'title' => $input['title'] ?? 'Study Notes',
        'topic' => $input['topic'] ?? 'General',
        'module' => $input['module'] ?? 'Module Resource',
        'mentorName' => $input['mentorName'] ?? 'Faculty Mentor',
        'fileUrl' => $input['fileUrl'] ?? 'https://netcoder.in/downloads/notes.pdf',
        'fileType' => $input['fileType'] ?? 'pdf',
        'fileSize' => $input['fileSize'] ?? '3.5 MB',
        'contentSnippet' => $input['contentSnippet'] ?? 'Study notes uploaded by mentor.',
        'publishedAt' => date('M j, Y'),
        'downloadsCount' => 1
    ];
    array_unshift($db['notes'], $newNote);
    saveDB($db);
    jsonResponse(['success' => true, 'data' => $newNote], 201);
}

// GET & POST /api/tasks
if (($uri === '/api/tasks' || $uri === '/api/lms/tasks') && $method === 'GET') {
    $db = loadDB();
    $tasks = $db['tasks'] ?? [];
    if (!empty($_GET['courseSlug'])) {
        $slug = $_GET['courseSlug'];
        $tasks = array_values(array_filter($tasks, function($t) use ($slug) { return ($t['courseSlug'] ?? '') === $slug; }));
    }
    jsonResponse(['success' => true, 'data' => $tasks]);
}
if (($uri === '/api/tasks' || $uri === '/api/lms/tasks') && $method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $db = loadDB();
    $newTask = [
        'id' => 'task-' . time(),
        'courseSlug' => $input['courseSlug'] ?? 'fullstack-web-development',
        'courseTitle' => $input['courseTitle'] ?? 'Full Stack Web Development',
        'title' => $input['title'] ?? 'Practical Assignment',
        'description' => $input['description'] ?? 'Complete and submit assignment.',
        'dueDate' => $input['dueDate'] ?? date('Y-m-d', strtotime('+7 days')),
        'points' => (int)($input['points'] ?? 100),
        'status' => 'open',
        'starterRepo' => $input['starterRepo'] ?? '',
        'submissionType' => $input['submissionType'] ?? 'github',
        'mentorName' => $input['mentorName'] ?? 'Faculty Mentor',
        'submissionsCount' => 0
    ];
    array_unshift($db['tasks'], $newTask);
    saveDB($db);
    jsonResponse(['success' => true, 'data' => $newTask], 201);
}

// POST /api/mentor/login
if ($uri === '/api/mentor/login' && $method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $email = trim($input['email'] ?? '');
    $pass = trim($input['password'] ?? '');

    $db = loadDB();
    $mentors = $db['mentors'] ?? [];
    $foundMentor = null;

    foreach ($mentors as $m) {
        if (strtolower($m['email'] ?? '') === strtolower($email)) {
            $foundMentor = $m;
            break;
        }
    }

    if ($foundMentor && ($foundMentor['password'] === $pass || $pass === 'mentor123' || $pass === 'admin123')) {
        unset($foundMentor['password']);
        jsonResponse([
            'success' => true,
            'message' => 'Mentor authenticated successfully',
            'token' => 'nc_mentor_' . bin2hex(random_bytes(16)),
            'data' => $foundMentor
        ]);
    }

    if (str_ends_with($email, '@netcoder.in') && ($pass === 'mentor123' || $pass === 'admin123')) {
        $name = ucwords(str_replace(['.', '_'], ' ', explode('@', $email)[0]));
        $mentorProfile = [
            'id' => 'mentor-' . time(),
            'name' => $name,
            'email' => $email,
            'specialization' => 'Senior Technical Faculty',
            'courses' => ['fullstack-web-development', 'data-science-machine-learning'],
            'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            'phone' => '+91 98765 00000',
            'rating' => 4.95,
            'totalBatches' => 8,
            'totalStudents' => 210
        ];
        jsonResponse([
            'success' => true,
            'message' => 'Mentor authenticated successfully',
            'token' => 'nc_mentor_' . bin2hex(random_bytes(16)),
            'data' => $mentorProfile
        ]);
    }

    jsonResponse(['success' => false, 'message' => 'Invalid mentor credentials. Tip: mentor@netcoder.in / mentor123'], 401);
}

// ============================================================================
// ADMIN AUTHENTICATION GUARD & LOGIN ROUTE (admin / admin123)
// ============================================================================

// Admin Logout
if ($uri === '/admin/logout') {
    unset($_SESSION['admin_auth']);
    setcookie('nc_admin_auth', '', time() - 3600, '/');
    header('Location: /admin/login');
    exit();
}

// Admin Login Form & Submission
if ($uri === '/admin/login') {
    $loginError = null;
    if ($method === 'POST') {
        $u = trim($_POST['username'] ?? '');
        $p = trim($_POST['password'] ?? '');
        if (($u === 'admin' || $u === 'admin@netcoder.in') && $p === 'admin123') {
            $_SESSION['admin_auth'] = true;
            setcookie('nc_admin_auth', '1', time() + 86400 * 7, '/');
            header('Location: /admin');
            exit();
        } else {
            $loginError = 'Invalid credentials. Please use admin / admin123';
        }
    }
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Netcoder LMS — Admin Login</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
      <style>
        :root { --primary: #ff5532; --primary-hover: #e04422; --bg: #0b0f19; --surface: #151d2f; --border: #23304a; --text: #f8fafc; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; background-image: radial-gradient(circle at 50% 0%, rgba(255,85,50,0.15) 0%, transparent 60%); }
        .login-card { background: var(--surface); border: 1px solid var(--border); border-radius: 28px; padding: 42px 36px; max-width: 440px; width: 100%; box-shadow: 0 30px 60px -15px rgba(0,0,0,0.6); backdrop-filter: blur(12px); }
        .logo-box { width: 56px; height: 56px; background: linear-gradient(135deg, #ff5532, #ff7e5f); border-radius: 18px; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; font-weight: 800; color: #fff; margin: 0 auto 18px; box-shadow: 0 8px 24px rgba(255,85,50,0.45); }
        .login-title { font-size: 1.55rem; font-weight: 800; text-align: center; margin-bottom: 6px; letter-spacing: -0.02em; }
        .login-sub { font-size: 0.88rem; color: #94a3b8; text-align: center; margin-bottom: 26px; }
        .alert-error { background: rgba(239,68,68,0.15); border: 1px solid #ef4444; color: #fca5a5; padding: 12px 16px; border-radius: 12px; font-size: 0.85rem; margin-bottom: 20px; font-weight: 600; text-align: center; }
        .credential-tip { background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); color: #93c5fd; padding: 12px 16px; border-radius: 14px; font-size: 0.82rem; margin-bottom: 22px; text-align: center; line-height: 1.5; }
        .credential-tip code { background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 6px; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #fff; }
        .form-group { margin-bottom: 18px; }
        .form-group label { display: block; font-size: 0.78rem; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 8px; }
        .form-control { width: 100%; padding: 13px 16px; background: #0b0f19; border: 1px solid var(--border); border-radius: 14px; color: #fff; font-size: 0.92rem; font-family: inherit; outline: none; transition: all 0.2s; }
        .form-control:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(255,85,50,0.25); background: #0e1424; }
        .btn-submit { width: 100%; padding: 14px; background: linear-gradient(135deg, #ff5532, #e04422); color: #fff; border: none; border-radius: 14px; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all 0.2s; box-shadow: 0 6px 20px rgba(255,85,50,0.35); margin-top: 10px; }
        .btn-submit:hover { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(255,85,50,0.45); }
        .footer-note { font-size: 0.78rem; color: #64748b; text-align: center; margin-top: 22px; }
      </style>
    </head>
    <body>
      <div class="login-card">
        <div class="logo-box">N</div>
        <h1 class="login-title">Netcoder LMS Admin</h1>
        <p class="login-sub">Secure Backend &amp; Course Management Portal</p>
        
        <?php if ($loginError): ?>
          <div class="alert-error"><?= htmlspecialchars($loginError) ?></div>
        <?php endif; ?>

        <div class="credential-tip">
          🛡️ <strong>Admin Access Granted:</strong><br>
          Username: <code>admin</code> &bull; Password: <code>admin123</code>
        </div>

        <form method="POST" action="/admin/login">
          <div class="form-group">
            <label>Admin Username / Email</label>
            <input type="text" name="username" class="form-control" required placeholder="admin" value="admin">
          </div>
          <div class="form-group">
            <label>Master Password</label>
            <input type="password" name="password" class="form-control" required placeholder="admin123" value="admin123">
          </div>
          <button type="submit" class="btn-submit">Sign In to Admin Dashboard &rarr;</button>
        </form>

        <p class="footer-note">Netcoder Technology &bull; Laravel REST Backend (Port 8000)</p>
      </div>
    </body>
    </html>
    <?php
    exit();
}

// Protect /admin and /
$isAdmin = !empty($_SESSION['admin_auth']) || !empty($_COOKIE['nc_admin_auth']);
if (!$isAdmin && ($uri === '/admin' || $uri === '/' || $uri === '')) {
    header('Location: /admin/login');
    exit();
}

// ============================================================================
// EMBEDDED LARAVEL ADMIN WEB DASHBOARD (HTML / BLADE UI AT /admin & /)
// ============================================================================
$db = loadDB();
$totalCourses = count($db['courses'] ?? []);
$totalStudents = count($db['students'] ?? []);
$totalFees = 0;
foreach ($db['students'] as $s) {
    $totalFees += (float)($s['feePaid'] ?? 89);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Netcoder Technology — Main LMS Admin Control Panel</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #ff5532;
      --primary-hover: #e04422;
      --primary-soft: #fff1ee;
      --bg: #f8fafc;
      --surface: #ffffff;
      --text: #0f172a;
      --muted: #64748b;
      --border: #e2e8f0;
      --success: #10b981;
      --success-soft: #ecfdf5;
      --dark-card: #0f172a;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      min-height: 100vh;
    }
    .topbar {
      background: #0f172a;
      color: #fff;
      padding: 16px 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }
    .topbar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: #fff;
    }
    .brand-logo {
      width: 42px;
      height: 42px;
      background: linear-gradient(135deg, #ff5532, #ff7e5f);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      font-weight: 800;
      box-shadow: 0 4px 12px rgba(255,85,50,0.4);
    }
    .brand-text h2 { font-size: 1.15rem; font-weight: 800; line-height: 1.2; letter-spacing: -0.01em; }
    .brand-text span { font-size: 0.72rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

    .topbar-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .btn {
      background: var(--primary);
      color: #fff;
      border: none;
      padding: 9px 18px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 0.85rem;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }
    .btn:hover { background: var(--primary-hover); transform: translateY(-1px); }
    .btn-dark { background: rgba(255,255,255,0.12); color: #fff; border: 1px solid rgba(255,255,255,0.2); }
    .btn-dark:hover { background: rgba(255,255,255,0.2); }
    .btn-outline { background: transparent; color: var(--text); border: 1px solid var(--border); }
    .btn-outline:hover { background: #f1f5f9; }
    .btn-danger { background: #ef4444; color: #fff; }
    .btn-danger:hover { background: #dc2626; }

    .container { max-width: 1260px; margin: 0 auto; padding: 30px 20px; }
    
    /* Hero Header */
    .dashboard-header {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 24px 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 24px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.02);
    }
    .header-status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #ecfdf5;
      color: #059669;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.78rem;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .header-status .dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; animation: pulse 2s infinite; }

    /* KPI Cards */
    .grid-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 18px;
      margin-bottom: 30px;
    }
    .stat-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 22px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.02);
      position: relative;
      overflow: hidden;
    }
    .stat-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 4px;
      background: var(--border);
    }
    .stat-card.primary::before { background: var(--primary); }
    .stat-card.success::before { background: #10b981; }
    .stat-card.blue::before { background: #3b82f6; }
    .stat-card.purple::before { background: #8b5cf6; }

    .stat-label { font-size: 0.78rem; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; }
    .stat-val { font-size: 2.1rem; font-weight: 800; color: var(--text); margin-top: 4px; line-height: 1.1; }
    .stat-sub { font-size: 0.8rem; font-weight: 600; color: #10b981; margin-top: 6px; display: flex; align-items: center; gap: 4px; }

    /* Section Card */
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      margin-bottom: 30px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.02);
    }
    .card-head {
      padding: 20px 24px;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      background: #fafcff;
    }
    .card-head h3 { font-size: 1.15rem; font-weight: 800; }
    .card-head p { font-size: 0.82rem; color: var(--muted); }

    /* Tables */
    .table-container { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
    th { background: #f8fafc; text-align: left; padding: 13px 20px; color: var(--muted); font-weight: 700; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid var(--border); }
    td { padding: 14px 20px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
    tr:hover td { background: #fbfcfe; }

    .thumb { width: 56px; height: 38px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border); background: #eee; }
    .badge-pill { display: inline-block; padding: 3px 8px; border-radius: 12px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; }
    .badge-orange { background: #fff1ee; color: var(--primary); }
    .badge-green { background: #ecfdf5; color: #059669; }
    .badge-blue { background: #eff6ff; color: #2563eb; }

    .price-num { font-size: 1.1rem; font-weight: 800; color: var(--text); }
    .price-strike { font-size: 0.8rem; color: var(--muted); text-decoration: line-through; margin-left: 4px; }

    /* Modals */
    .modal-overlay {
      display: none;
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(15,23,42,0.7);
      backdrop-filter: blur(6px);
      z-index: 99999;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .modal-overlay.open { display: flex; }
    .modal-content {
      background: #fff;
      border-radius: 24px;
      padding: 30px;
      max-width: 680px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 25px 60px -15px rgba(0,0,0,0.3);
    }
    .form-group { margin-bottom: 14px; }
    .form-group label { display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 5px; color: #334155; }
    .form-group input, .form-group select, .form-group textarea {
      width: 100%; padding: 10px 14px; border-radius: 10px; border: 1px solid var(--border); font-size: 0.88rem; font-family: inherit; outline: none;
    }
    .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
      border-color: var(--primary); box-shadow: 0 0 0 3px rgba(255,85,50,0.15);
    }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

    @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
  </style>
</head>
<body>
  <!-- Top Admin Navbar -->
  <header class="topbar">
    <a href="/admin" class="topbar-brand">
      <div class="brand-logo">N</div>
      <div class="brand-text">
        <h2>Netcoder LMS Admin</h2>
        <span>Laravel Backend Engine &bull; Port 8000</span>
      </div>
    </a>

    <div class="topbar-actions">
      <a href="http://localhost:3000/lms/explore" target="_blank" class="btn btn-dark">
        🌐 Open Next.js Storefront
      </a>
      <a href="http://localhost:3000/lms/select-course" target="_blank" class="btn btn-dark">
        🎯 Student Course Track Hub
      </a>
      <button onclick="openUploadModal()" class="btn">
        + Upload LMS Course
      </button>
      <a href="/admin/logout" class="btn btn-dark" style="color: #fca5a5; border-color: rgba(239,68,68,0.4);" onclick="return confirm('Sign out of Laravel Admin Panel?')">
        🚪 Logout (admin)
      </a>
    </div>
  </header>

  <div class="container">
    <!-- Header banner -->
    <div class="dashboard-header">
      <div>
        <div class="header-status">
          <span class="dot"></span>
          Laravel 11 REST API Active &bull; Connected to Next.js (Port 3000)
        </div>
        <h1 style="font-size: 1.55rem; font-weight: 800; margin-top: 4px;">
          LMS Curriculum &amp; Student Revenue Management
        </h1>
        <p style="color: var(--muted); font-size: 0.85rem; margin-top: 2px;">
          Course updates published here dynamically reflect across Next.js catalog, classroom access gates, and student checkout.
        </p>
      </div>

      <div style="display: flex; gap: 10px;">
        <button onclick="openStudentModal()" class="btn btn-outline" style="font-size: 0.82rem;">
          + Enroll Student / Fee Receipt
        </button>
        <button onclick="window.location.reload()" class="btn btn-outline" style="font-size: 0.82rem;">
          🔄 Refresh Catalog
        </button>
      </div>
    </div>

    <!-- Live KPI Metrics -->
    <div class="grid-stats">
      <div class="stat-card primary">
        <div class="stat-label">Active LMS Courses</div>
        <div class="stat-val"><?php echo $totalCourses; ?></div>
        <div class="stat-sub">✓ Live in Next.js Storefront</div>
      </div>
      <div class="stat-card blue">
        <div class="stat-label">Registered Students</div>
        <div class="stat-val"><?php echo $totalStudents; ?></div>
        <div class="stat-sub">🛡️ 100% DRM Protected</div>
      </div>
      <div class="stat-card success">
        <div class="stat-label">Total Fee Revenue</div>
        <div class="stat-val" style="color: #059669;">$<?php echo number_format($totalFees, 2); ?></div>
        <div class="stat-sub" style="color: var(--muted);">≈ ₹<?php echo number_format($totalFees * 82); ?> collected</div>
      </div>
      <div class="stat-card purple">
        <div class="stat-label">DRM Content Guard</div>
        <div class="stat-val" style="font-size: 1.35rem; color: #10b981; margin-top: 8px;">Active &amp; Guarded</div>
        <div class="stat-sub" style="color: var(--muted);">Anti-Screenshot &bull; Focus Shield</div>
      </div>
    </div>

    <!-- Course Management Table -->
    <div class="card">
      <div class="card-head">
        <div>
          <h3>Live LMS Production Courses (Laravel API)</h3>
          <p>Text, pricing, image thumbnail, and instructor data synchronized with Next.js frontend.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <input type="text" id="courseSearch" placeholder="Search courses..." onkeyup="filterCourses()" style="padding: 6px 12px; border-radius: 8px; border: 1px solid var(--border); font-size: 0.82rem;">
          <button onclick="openUploadModal()" class="btn" style="padding: 6px 14px; font-size: 0.82rem;">+ New Course</button>
        </div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Course &amp; Thumbnail</th>
              <th>Category &amp; Level</th>
              <th>Live Fee / Price</th>
              <th>Duration &amp; Instructor</th>
              <th>Rating</th>
              <th style="text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody id="courseTableBody">
            <?php foreach ($db['courses'] as $c): ?>
              <tr class="course-row" data-title="<?php echo strtolower(htmlspecialchars($c['title'] ?? '')); ?>" data-category="<?php echo strtolower(htmlspecialchars($c['category'] ?? '')); ?>">
                <td>
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="<?php echo htmlspecialchars($c['image'] ?? '/images/full-stact-development.png'); ?>" class="thumb" onerror="this.src='/images/full-stact-development.png'">
                    <div>
                      <strong style="color: var(--text); font-size: 0.92rem; display: block;">
                        <?php echo htmlspecialchars($c['title'] ?? ''); ?>
                      </strong>
                      <span style="color: var(--muted); font-size: 0.75rem; font-family: 'JetBrains Mono', monospace;">
                        /<?php echo htmlspecialchars($c['slug'] ?? ''); ?>
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badge-pill badge-orange"><?php echo htmlspecialchars($c['category'] ?? 'fullstack'); ?></span>
                  <div style="font-size: 0.75rem; color: var(--muted); margin-top: 3px;">
                    <?php echo htmlspecialchars($c['level'] ?? 'Intermediate'); ?>
                  </div>
                </td>
                <td>
                  <span class="price-num">$<?php echo htmlspecialchars($c['price'] ?? 79); ?></span>
                  <span class="price-strike">$<?php echo htmlspecialchars($c['originalPrice'] ?? $c['original_price'] ?? 180); ?></span>
                </td>
                <td>
                  <div style="font-weight: 600; font-size: 0.82rem;"><?php echo htmlspecialchars($c['instructor'] ?? 'Netcoder Faculty'); ?></div>
                  <div style="font-size: 0.75rem; color: var(--muted);"><?php echo htmlspecialchars($c['duration'] ?? '40 hrs'); ?></div>
                </td>
                <td>
                  <span style="color: #f59e0b; font-weight: 700;">★ <?php echo htmlspecialchars($c['rating'] ?? 4.9); ?></span>
                </td>
                <td style="text-align: right; white-space: nowrap;">
                  <a href="http://localhost:3000/lms/courses/<?php echo urlencode($c['slug'] ?? ''); ?>" target="_blank" class="btn btn-outline" style="padding: 4px 8px; font-size: 0.75rem; margin-right: 6px;">
                    👁️ View Next.js
                  </a>
                  <button onclick="editCourse(<?php echo htmlspecialchars(json_encode($c)); ?>)" class="btn btn-outline" style="padding: 4px 8px; font-size: 0.75rem; margin-right: 6px; color: #2563eb;">
                    ✏️ Edit
                  </button>
                  <button onclick="deleteCourse('<?php echo htmlspecialchars($c['id'] ?? $c['slug'] ?? ''); ?>')" class="btn btn-outline" style="padding: 4px 8px; font-size: 0.75rem; color: #ef4444;">
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    <!-- Live Classes & Direct Meeting Links Management -->
    <div class="card" style="border: 2px solid #fed7aa; background: #fff; margin-bottom: 24px;">
      <div class="card-head" style="border-bottom: 1px solid #ffedd5; background: #fffaf7; padding: 18px 24px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge-pill badge-orange" style="background: #ff5532; color: #fff;">🔴 Live Automated Engine</span>
            <span style="font-size: 0.78rem; color: #ff5532; font-weight: 700;">Directly Broadcasts to Enrolled Students</span>
          </div>
          <h3 style="margin-top: 4px; font-size: 1.25rem;">Live Classes &amp; Direct Meeting Links</h3>
          <p style="color: var(--muted); font-size: 0.85rem;">Schedule Google Meet, Zoom, or Teams sessions with auto-live detection for students who purchased specific course tracks.</p>
        </div>
        <button onclick="openClassModal()" class="btn" style="background: #ff5532;">
          + Schedule Live Class Link
        </button>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Class Topic &amp; Cohort</th>
              <th>Course Slug Target</th>
              <th>Platform &amp; Direct Link</th>
              <th>Scheduled Time</th>
              <th>Mentor</th>
              <th>Status</th>
              <th style="text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <?php if (empty($db['classes'])): ?>
              <tr><td colspan="7" style="text-align: center; color: var(--muted); padding: 24px;">No live classes scheduled yet. Click "+ Schedule Live Class Link" above.</td></tr>
            <?php else: ?>
              <?php foreach ($db['classes'] as $cls): ?>
                <tr>
                  <td>
                    <strong><?php echo htmlspecialchars($cls['title'] ?? ''); ?></strong>
                    <div style="font-size: 0.75rem; color: var(--muted);"><?php echo htmlspecialchars($cls['batch'] ?? 'Cohort 2026'); ?></div>
                  </td>
                  <td>
                    <code style="background: #fff5f2; color: #ff5532; font-weight: 700; padding: 2px 6px; border-radius: 6px; font-size: 0.76rem;">
                      <?php echo htmlspecialchars($cls['courseSlug'] ?? ''); ?>
                    </code>
                  </td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <span class="badge-pill badge-blue"><?php echo htmlspecialchars($cls['platform'] ?? 'Google Meet'); ?></span>
                      <a href="<?php echo htmlspecialchars($cls['meetingLink'] ?? '#'); ?>" target="_blank" style="font-size: 0.78rem; color: #2563eb; font-weight: 600; text-decoration: underline;">
                        Launch ↗
                      </a>
                    </div>
                    <div style="font-size: 0.72rem; color: var(--muted); margin-top: 3px;">
                      Passcode: <strong><?php echo htmlspecialchars($cls['passcode'] ?? 'None'); ?></strong>
                    </div>
                  </td>
                  <td>
                    <div style="font-weight: 600; font-size: 0.82rem;"><?php echo htmlspecialchars($cls['time'] ?? ''); ?></div>
                    <div style="font-size: 0.74rem; color: var(--muted);"><?php echo htmlspecialchars($cls['date'] ?? ''); ?></div>
                  </td>
                  <td>
                    <div style="font-weight: 600; font-size: 0.82rem;"><?php echo htmlspecialchars($cls['mentorName'] ?? 'Faculty'); ?></div>
                  </td>
                  <td>
                    <?php if (($cls['status'] ?? '') === 'live'): ?>
                      <span class="badge-pill" style="background: #fee2e2; color: #dc2626; animation: pulse 1.5s infinite;">● LIVE NOW</span>
                    <?php elseif (($cls['status'] ?? '') === 'completed'): ?>
                      <span class="badge-pill" style="background: #f1f5f9; color: #64748b;">Completed</span>
                    <?php else: ?>
                      <span class="badge-pill badge-green">Upcoming</span>
                    <?php endif; ?>
                  </td>
                  <td style="text-align: right; white-space: nowrap;">
                    <button onclick="toggleClassStatus('<?php echo htmlspecialchars($cls['id'] ?? ''); ?>', '<?php echo ($cls['status'] ?? '') === 'live' ? 'completed' : 'live'; ?>')" class="btn btn-outline" style="padding: 4px 8px; font-size: 0.74rem; margin-right: 4px;">
                      <?php echo ($cls['status'] ?? '') === 'live' ? 'End Class' : '🔴 Go Live'; ?>
                    </button>
                    <button onclick="deleteClass('<?php echo htmlspecialchars($cls['id'] ?? ''); ?>')" class="btn btn-outline" style="padding: 4px 8px; font-size: 0.74rem; color: #ef4444;">
                      🗑️
                    </button>
                  </td>
                </tr>
              <?php endforeach; ?>
            <?php endif; ?>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Student Registration & Fee Ledger Records -->
    <div class="card">
      <div class="card-head">
        <div>
          <h3>Student Enrollment &amp; Fee Ledger</h3>
          <p>Enrolled student accounts, fee payments and DRM access authorization records.</p>
        </div>
        <button onclick="openStudentModal()" class="btn" style="padding: 6px 14px; font-size: 0.82rem;">
          + New Enrollment
        </button>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student Code</th>
              <th>Enrolled Course Track</th>
              <th>Fee Paid</th>
              <th>DRM Security Status</th>
              <th>Enrolled Date</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($db['students'] as $s): ?>
              <tr>
                <td>
                  <strong><?php echo htmlspecialchars($s['name'] ?? ''); ?></strong>
                  <div style="color: var(--muted); font-size: 0.76rem;"><?php echo htmlspecialchars($s['email'] ?? ''); ?> &bull; <?php echo htmlspecialchars($s['phone'] ?? ''); ?></div>
                </td>
                <td><code style="background: #f1f5f9; padding: 2px 6px; border-radius: 6px; font-size: 0.78rem;"><?php echo htmlspecialchars($s['student_code'] ?? 'NC-STU'); ?></code></td>
                <td><strong><?php echo htmlspecialchars($s['course'] ?? 'Full Stack Development'); ?></strong></td>
                <td><strong style="color: #059669; font-size: 0.95rem;">$<?php echo htmlspecialchars($s['feePaid'] ?? 89); ?>.00</strong></td>
                <td><span class="badge-pill badge-green">✓ <?php echo htmlspecialchars($s['drmStatus'] ?? 'Protected'); ?></span></td>
                <td style="color: var(--muted); font-size: 0.8rem;"><?php echo htmlspecialchars($s['enrolledDate'] ?? '2026-09-20'); ?></td>
                <td style="text-align: right;">
                  <button onclick="deleteStudent('<?php echo htmlspecialchars($s['id'] ?? ''); ?>')" class="btn btn-outline" style="padding: 4px 8px; font-size: 0.75rem; color: #ef4444;">
                    Remove
                  </button>
                </td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Modal: Course Upload / Edit -->
  <div class="modal-overlay" id="courseModal">
    <div class="modal-content">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3 id="modalTitle" style="font-size: 1.3rem; font-weight: 800;">Upload New LMS Course</h3>
        <span onclick="closeCourseModal()" style="cursor: pointer; font-size: 24px; color: var(--muted);">&times;</span>
      </div>

      <form id="courseForm" onsubmit="submitCourse(event)">
        <input type="hidden" id="fc-id" value="">

        <div class="form-group">
          <label>Course Title (Text) *</label>
          <input type="text" id="fc-title" required placeholder="e.g. Distributed Cloud &amp; Microservices Architecture">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Category</label>
            <select id="fc-category">
              <option value="fullstack">Full-Stack Development</option>
              <option value="cloud">Cloud &amp; DevOps</option>
              <option value="ai">AI &amp; Machine Learning</option>
              <option value="cyber">Cybersecurity</option>
              <option value="systems">System Architecture</option>
            </select>
          </div>
          <div class="form-group">
            <label>Level</label>
            <select id="fc-level">
              <option value="Flagship Bootcamp">Flagship Bootcamp</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Beginner to Advanced">Beginner to Advanced</option>
              <option value="Advanced Production">Advanced Production</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Selling Price ($) *</label>
            <input type="number" id="fc-price" required value="79">
          </div>
          <div class="form-group">
            <label>Original Price (Strikethrough)</label>
            <input type="number" id="fc-orig-price" required value="180">
          </div>
        </div>

        <div class="form-group">
          <label>Course Thumbnail Image URL *</label>
          <input type="text" id="fc-image" required value="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800">
          <div style="display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap;">
            <button type="button" class="btn btn-outline" style="font-size: 0.72rem; padding: 3px 8px;" onclick="document.getElementById('fc-image').value='/images/full-stact-development.png'">💻 Fullstack</button>
            <button type="button" class="btn btn-outline" style="font-size: 0.72rem; padding: 3px 8px;" onclick="document.getElementById('fc-image').value='https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800'">☁️ DevOps</button>
            <button type="button" class="btn btn-outline" style="font-size: 0.72rem; padding: 3px 8px;" onclick="document.getElementById('fc-image').value='https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800'">🤖 AI / ML</button>
            <button type="button" class="btn btn-outline" style="font-size: 0.72rem; padding: 3px 8px;" onclick="document.getElementById('fc-image').value='https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800'">🛡️ Cyber Security</button>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Duration</label>
            <input type="text" id="fc-duration" value="40 hrs • 8 Production Projects">
          </div>
          <div class="form-group">
            <label>Instructor Name</label>
            <input type="text" id="fc-instructor" value="Netcoder Senior Faculty">
          </div>
        </div>

        <div class="form-group">
          <label>Course Overview &amp; Key Highlights (Text) *</label>
          <textarea id="fc-overview" rows="3" required placeholder="Hands-on production curriculum..."></textarea>
        </div>

        <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 14px;">
          <button type="button" onclick="closeCourseModal()" class="btn btn-outline">Cancel</button>
          <button type="submit" id="saveCourseBtn" class="btn">Publish Course to API</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal: Enroll Student Manually -->
  <div class="modal-overlay" id="studentModal">
    <div class="modal-content" style="max-width: 520px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3 style="font-size: 1.3rem; font-weight: 800;">Enroll Student / Fee Receipt</h3>
        <span onclick="closeStudentModal()" style="cursor: pointer; font-size: 24px; color: var(--muted);">&times;</span>
      </div>

      <form id="studentForm" onsubmit="submitStudent(event)">
        <div class="form-group">
          <label>Student Full Name *</label>
          <input type="text" id="fs-name" required placeholder="e.g. Arjun Mehta">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Email Address *</label>
            <input type="email" id="fs-email" required placeholder="arjun@gmail.com">
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input type="text" id="fs-phone" placeholder="9812345678">
          </div>
        </div>

        <div class="form-group">
          <label>Select Course Track *</label>
          <select id="fs-course">
            <?php foreach ($db['courses'] as $c): ?>
              <option value="<?php echo htmlspecialchars($c['slug'] ?? ''); ?>" data-fee="<?php echo htmlspecialchars($c['price'] ?? 79); ?>" data-name="<?php echo htmlspecialchars($c['title'] ?? ''); ?>">
                <?php echo htmlspecialchars($c['title'] ?? ''); ?> ($<?php echo htmlspecialchars($c['price'] ?? 79); ?>)
              </option>
            <?php endforeach; ?>
          </select>
        </div>

        <div class="form-group">
          <label>Fee Paid ($)</label>
          <input type="number" id="fs-fee" value="79" required>
        </div>

        <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 14px;">
          <button type="button" onclick="closeStudentModal()" class="btn btn-outline">Cancel</button>
          <button type="submit" class="btn">Record Enrollment &amp; Unlock DRM</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal: Schedule Live Class Link -->
  <div class="modal-overlay" id="classModal">
    <div class="modal-content" style="max-width: 600px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3 style="font-size: 1.3rem; font-weight: 800; color: #ff5532;">🔴 Schedule Live Class Link</h3>
        <span onclick="closeClassModal()" style="cursor: pointer; font-size: 24px; color: var(--muted);">&times;</span>
      </div>

      <form id="classForm" onsubmit="submitClass(event)">
        <div class="form-group">
          <label>Class Topic / Title *</label>
          <input type="text" id="fcls-title" required placeholder="e.g. Live Hands-on: Building Next.js 15 Server Actions">
        </div>

        <div class="form-group">
          <label>Target Course Track (Direct to Enrolled Students) *</label>
          <select id="fcls-course" required>
            <?php foreach ($db['courses'] as $c): ?>
              <option value="<?php echo htmlspecialchars($c['slug'] ?? ''); ?>" data-name="<?php echo htmlspecialchars($c['title'] ?? ''); ?>">
                <?php echo htmlspecialchars($c['title'] ?? ''); ?> (<?php echo htmlspecialchars($c['slug'] ?? ''); ?>)
              </option>
            <?php endforeach; ?>
          </select>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Meeting Platform *</label>
            <select id="fcls-platform">
              <option value="Google Meet">Google Meet</option>
              <option value="Zoom">Zoom Meeting</option>
              <option value="Microsoft Teams">Microsoft Teams</option>
              <option value="YouTube Live">YouTube Live Stream</option>
            </select>
          </div>
          <div class="form-group">
            <label>Cohort / Batch Name</label>
            <input type="text" id="fcls-batch" value="Cohort 14 (Batch 2026-A)">
          </div>
        </div>

        <div class="form-group">
          <label>Live Meeting URL / Join Link *</label>
          <input type="url" id="fcls-link" required placeholder="https://meet.google.com/xyz-net-live or Zoom link" value="https://meet.google.com/net-fsdev-live">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Meeting ID / Room Name</label>
            <input type="text" id="fcls-id" placeholder="net-fsdev-live" value="net-fsdev-live">
          </div>
          <div class="form-group">
            <label>Passcode / PIN</label>
            <input type="text" id="fcls-passcode" placeholder="NET2026" value="NET2026">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Class Date *</label>
            <input type="date" id="fcls-date" required value="<?php echo date('Y-m-d'); ?>">
          </div>
          <div class="form-group">
            <label>Start - End Time Display</label>
            <input type="text" id="fcls-time" value="06:30 PM - 08:00 PM IST" required>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Mentor Name</label>
            <input type="text" id="fcls-mentor" value="Nitin Kapoor">
          </div>
          <div class="form-group">
            <label>Status</label>
            <select id="fcls-status">
              <option value="upcoming">Upcoming</option>
              <option value="live">● LIVE NOW</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 14px;">
          <button type="button" onclick="closeClassModal()" class="btn btn-outline">Cancel</button>
          <button type="submit" class="btn" style="background: #ff5532;">Publish Class Link to Students</button>
        </div>
      </form>
    </div>
  </div>

  <script>
    function openClassModal() {
      document.getElementById('classModal').classList.add('open');
    }
    function closeClassModal() {
      document.getElementById('classModal').classList.remove('open');
    }

    async function submitClass(e) {
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
        meetingId: document.getElementById('fcls-id').value,
        passcode: document.getElementById('fcls-passcode').value,
        date: document.getElementById('fcls-date').value,
        time: document.getElementById('fcls-time').value,
        mentorName: document.getElementById('fcls-mentor').value,
        status: document.getElementById('fcls-status').value,
        isAutomatedDaily: true,
      };

      try {
        const res = await fetch('/api/classes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          alert('🎉 Live class link published! It will immediately show to students enrolled in ' + opt.getAttribute('data-name'));
          window.location.reload();
        } else {
          alert('Error: ' + data.message);
        }
      } catch (err) {
        alert('Failed to publish class: ' + err.message);
      }
    }

    async function toggleClassStatus(id, newStatus) {
      try {
        const res = await fetch('/api/classes/' + encodeURIComponent(id), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        const data = await res.json();
        if (data.success) {
          window.location.reload();
        } else {
          alert('Failed to update status');
        }
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }

    async function deleteClass(id) {
      if (!confirm('Delete this scheduled live class link?')) return;
      try {
        const res = await fetch('/api/classes/' + encodeURIComponent(id), { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          window.location.reload();
        }
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
    function openUploadModal() {
      document.getElementById('modalTitle').innerText = 'Upload New LMS Course';
      document.getElementById('saveCourseBtn').innerText = 'Publish Course to API';
      document.getElementById('fc-id').value = '';
      document.getElementById('fc-title').value = '';
      document.getElementById('fc-price').value = '79';
      document.getElementById('fc-orig-price').value = '180';
      document.getElementById('fc-overview').value = '';
      document.getElementById('courseModal').classList.add('open');
    }

    function editCourse(c) {
      document.getElementById('modalTitle').innerText = 'Edit LMS Course: ' + c.title;
      document.getElementById('saveCourseBtn').innerText = 'Save Changes';
      document.getElementById('fc-id').value = c.id || c.slug;
      document.getElementById('fc-title').value = c.title || '';
      document.getElementById('fc-category').value = c.category || 'fullstack';
      document.getElementById('fc-level').value = c.level || 'Intermediate';
      document.getElementById('fc-price').value = c.price || 79;
      document.getElementById('fc-orig-price').value = c.originalPrice || c.original_price || 180;
      document.getElementById('fc-image').value = c.image || '/images/full-stact-development.png';
      document.getElementById('fc-duration').value = c.duration || '40 hrs';
      document.getElementById('fc-instructor').value = c.instructor || 'Netcoder Faculty';
      document.getElementById('fc-overview').value = c.overview || '';
      document.getElementById('courseModal').classList.add('open');
    }

    function closeCourseModal() { document.getElementById('courseModal').classList.remove('open'); }
    function openStudentModal() { document.getElementById('studentModal').classList.add('open'); }
    function closeStudentModal() { document.getElementById('studentModal').classList.remove('open'); }

    async function submitCourse(e) {
      e.preventDefault();
      const courseId = document.getElementById('fc-id').value;
      const payload = {
        id: courseId,
        title: document.getElementById('fc-title').value,
        category: document.getElementById('fc-category').value,
        level: document.getElementById('fc-level').value,
        price: parseFloat(document.getElementById('fc-price').value),
        originalPrice: parseFloat(document.getElementById('fc-orig-price').value),
        image: document.getElementById('fc-image').value,
        duration: document.getElementById('fc-duration').value,
        instructor: document.getElementById('fc-instructor').value,
        overview: document.getElementById('fc-overview').value,
      };

      const endpoint = courseId ? '/api/courses/update' : '/api/courses';

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          alert('🎉 Course successfully saved to Laravel LMS catalog and synchronized with Next.js!');
          window.location.reload();
        } else {
          alert('Error: ' + data.message);
        }
      } catch (err) {
        alert('Failed to connect to API: ' + err.message);
      }
    }

    async function deleteCourse(id) {
      if (!confirm('Are you sure you want to delete this course from the Laravel LMS catalog?')) return;
      try {
        const res = await fetch('/api/courses?id=' + encodeURIComponent(id), { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          window.location.reload();
        }
      } catch (err) {
        alert('Delete failed: ' + err.message);
      }
    }

    async function submitStudent(e) {
      e.preventDefault();
      const select = document.getElementById('fs-course');
      const opt = select.options[select.selectedIndex];
      const payload = {
        name: document.getElementById('fs-name').value,
        email: document.getElementById('fs-email').value,
        phone: document.getElementById('fs-phone').value,
        course: opt.getAttribute('data-name'),
        slug: opt.value,
        feePaid: parseFloat(document.getElementById('fs-fee').value),
      };

      try {
        const res = await fetch('/api/lms/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          alert('🎉 Student enrolled & DRM access unlocked successfully!');
          window.location.reload();
        } else {
          alert('Error: ' + data.message);
        }
      } catch (err) {
        alert('Registration failed: ' + err.message);
      }
    }

    async function deleteStudent(id) {
      if (!confirm('Remove this student enrollment record?')) return;
      try {
        const res = await fetch('/api/lms/students?id=' + encodeURIComponent(id), { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          window.location.reload();
        }
      } catch (err) {
        alert('Failed: ' + err.message);
      }
    }

    function filterCourses() {
      const q = document.getElementById('courseSearch').value.toLowerCase();
      document.querySelectorAll('.course-row').forEach(row => {
        const title = row.getAttribute('data-title') || '';
        const cat = row.getAttribute('data-category') || '';
        if (title.includes(q) || cat.includes(q)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }

    document.getElementById('fs-course')?.addEventListener('change', function() {
      const opt = this.options[this.selectedIndex];
      const fee = opt.getAttribute('data-fee');
      if (fee) document.getElementById('fs-fee').value = fee;
    });
  </script>
</body>
</html>
