// Master Courses Data for Netcoder Technology

export const COURSE_CATEGORIES = [
  { id: "design-multimedia", name: "Design & Multimedia", icon: "fa-palette" },
  { id: "web-fullstack", name: "CMS & Web Technologies", icon: "fa-code" },
  { id: "digital-marketing", name: "Digital Marketing", icon: "fa-bullhorn" },
  { id: "data-ai-security", name: "Data Science, AI & Cyber Security", icon: "fa-shield-halved" },
  { id: "cs-devops", name: "Computer Science & DevOps", icon: "fa-server" },
  { id: "online-programs", name: "Online Professional Courses", icon: "fa-laptop" },
];

export const COURSES = [
  // DESIGN & MULTIMEDIA
  {
    slug: "foundation-graphic",
    title: "Graphic Designing Masterclass",
    category: "Design & Multimedia",
    categoryId: "design-multimedia",
    type: "on-campus",
    duration: "3 - 6 Months",
    level: "Beginner to Advanced",
    image: "/images/graphic-designing.png",
    overview: "Master Adobe Photoshop, Illustrator, InDesign, CorelDraw, and Canva to produce world-class branding, print media, social creatives, and packaging designs.",
    highlights: ["100% Practical Training", "Live Client Portfolio", "Placement Assistance", "Certificate of Completion"],
    syllabus: [
      { module: "Module 1", title: "Design Principles & Color Psychology", desc: "Understanding composition, typography, color theory, visual hierarchy, and branding." },
      { module: "Module 2", title: "Adobe Photoshop CC Mastery", desc: "Photo manipulation, retouching, poster design, social media assets, raster graphics." },
      { module: "Module 3", title: "Adobe Illustrator CC Vector Art", desc: "Logo design, vector illustrations, mascot creation, brand identity systems, typography." },
      { module: "Module 4", title: "CorelDraw & InDesign for Print", desc: "Brochures, magazines, packaging, business cards, prepress, multi-page publishing." }
    ],
    tools: ["Photoshop", "Illustrator", "CorelDraw", "InDesign", "Canva", "Figma"],
    careers: ["Graphic Designer", "Brand Identity Specialist", "Visual Content Creator", "Creative Art Director"]
  },
  {
    slug: "web-designing",
    title: "Professional Web Designing",
    category: "Design & Multimedia",
    categoryId: "design-multimedia",
    type: "on-campus",
    duration: "3 - 6 Months",
    level: "All Levels",
    image: "/images/web-designing.png",
    overview: "Create modern, responsive, mobile-first websites using HTML5, CSS3, JavaScript, Bootstrap, Tailwind, and interactive UI frameworks.",
    highlights: ["Mobile-First Design", "Responsive Layouts", "SEO Friendly Markup", "Live Website Deployment"],
    syllabus: [
      { module: "Module 1", title: "HTML5 Semantic Structure", desc: "Tags, forms, accessibility, audio/video, SEO meta tags." },
      { module: "Module 2", title: "CSS3 & Modern Flexbox/Grid", desc: "Responsive layout design, animations, transitions, CSS variables." },
      { module: "Module 3", title: "JavaScript for Web Interactivity", desc: "DOM manipulation, event handling, animations, form validation." },
      { module: "Module 4", title: "Bootstrap 5 & Tailwind CSS", desc: "Rapid responsive development, modern grid utilities, component libraries." }
    ],
    tools: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Tailwind CSS", "VS Code"],
    careers: ["Web Designer", "Front-End Developer", "UI Developer", "WordPress Site Builder"]
  },
  {
    slug: "ui-ux",
    title: "UI & UX Design Masterclass",
    category: "Design & Multimedia",
    categoryId: "design-multimedia",
    type: "on-campus",
    duration: "3 - 6 Months",
    level: "All Levels",
    image: "/images/ui-designing.png",
    overview: "Learn UX user research, wireframing, interactive prototyping, micro-interactions, and design system building using Figma and Adobe XD.",
    highlights: ["Figma Design Systems", "Real Client Case Studies", "Interactive Prototyping", "Design Portfolio on Behance & Dribbble"],
    syllabus: [
      { module: "Module 1", title: "UX Fundamentals & User Research", desc: "User personas, journey mapping, empathy maps, competitive analysis." },
      { module: "Module 2", title: "Wireframing & Information Architecture", desc: "Low-fidelity wireframes, user flows, site mapping, usability heuristics." },
      { module: "Module 3", title: "High-Fidelity UI Design in Figma", desc: "Component variants, auto layout, responsive constraints, typography scale." },
      { module: "Module 4", title: "Interactive Prototyping & Usability Testing", desc: "Smart animations, micro-interactions, user testing, handoff to developers." }
    ],
    tools: ["Figma", "Adobe XD", "Miro", "FigJam", "Balsamiq", "Notion"],
    careers: ["UI/UX Designer", "Product Designer", "Interaction Designer", "UX Researcher"]
  },
  {
    slug: "animation",
    title: "2D & 3D Animation Masterclass",
    category: "Design & Multimedia",
    categoryId: "design-multimedia",
    type: "on-campus",
    duration: "6 Months",
    level: "All Levels",
    image: "/images/2d3d-animation.png",
    overview: "Bring stories to life with industry-grade 2D and 3D animation, character rigging, modeling, texturing, lighting, and rendering.",
    highlights: ["Blender 3D & Maya Training", "Character Rigging", "Game Asset Creation", "Showreel Building"],
    syllabus: [
      { module: "Module 1", title: "Animation Principles", desc: "12 principles of animation, squash & stretch, anticipation, timing & spacing." },
      { module: "Module 2", title: "3D Modeling in Blender / Maya", desc: "Polygon modeling, sculpting, architectural visualization, props." },
      { module: "Module 3", title: "Texturing, Shading & Lighting", desc: "UV unwrapping, PBR materials, studio lighting, rendering engines." },
      { module: "Module 4", title: "Rigging & Character Animation", desc: "Bone systems, weight painting, walking cycles, facial expressions." }
    ],
    tools: ["Blender", "Autodesk Maya", "Adobe Animate", "Substance Painter"],
    careers: ["3D Animator", "3D Modeling Artist", "Game Asset Designer", "VFX Artist"]
  },
  {
    slug: "motion-graphics",
    title: "Motion Graphics & Visual Effects",
    category: "Design & Multimedia",
    categoryId: "design-multimedia",
    type: "on-campus",
    duration: "3 - 6 Months",
    level: "All Levels",
    image: "/images/motionGracphics.png",
    overview: "Craft cinematic visual effects, kinetic typography, promotional video ads, and broadcast titles with Adobe After Effects and Premiere Pro.",
    highlights: ["Cinematic Title Sequences", "Kinetic Typography", "Video Editing Mastery", "Social Media Ads Production"],
    syllabus: [
      { module: "Module 1", title: "Video Editing in Premiere Pro", desc: "Timeline editing, color grading, sound design, transitions, export settings." },
      { module: "Module 2", title: "After Effects Core Workflows", desc: "Keyframing, graph editor, speed ramps, masking, track mattes." },
      { module: "Module 3", title: "Kinetic Typography & Logo Animation", desc: "Dynamic text reveals, 2.5D camera animation, motion presets." },
      { module: "Module 4", title: "Visual Effects & Compositing", desc: "Chroma keying (green screen), rotoscoping, particle systems, motion tracking." }
    ],
    tools: ["After Effects", "Premiere Pro", "Audition", "Cinema 4D Lite"],
    careers: ["Motion Graphics Artist", "Video Editor", "Post-Production Specialist", "VFX Compositor"]
  },
  {
    slug: "graphic-and-web-designing",
    title: "Integrated Graphic & Web Designing",
    category: "Design & Multimedia",
    categoryId: "design-multimedia",
    type: "on-campus",
    duration: "6 Months",
    level: "All Levels",
    image: "/images/GracphicWebDesigning.png",
    overview: "The complete creative bundle: master visual graphic design tools paired with hands-on responsive frontend web design technologies.",
    highlights: ["Complete Design to Web Workflow", "Dual Certification", "Live Projects", "Portfolio Creation"],
    syllabus: [
      { module: "Module 1", title: "Graphic Design Suite", desc: "Photoshop, Illustrator, vector art, brand guidelines." },
      { module: "Module 2", title: "UI/UX & Web Prototyping", desc: "Figma wireframing, user flows, responsive layouts." },
      { module: "Module 3", title: "Frontend Web Coding", desc: "HTML5, CSS3, JavaScript, Flexbox, CSS Grid." },
      { module: "Module 4", title: "CMS & Real Projects", desc: "WordPress integration, responsive testing, hosting and domain launch." }
    ],
    tools: ["Photoshop", "Illustrator", "Figma", "HTML5", "CSS3", "JavaScript", "WordPress"],
    careers: ["Creative Designer & Developer", "Digital Brand Specialist", "Agency Web Designer"]
  },
  {
    slug: "digital-content-creator",
    title: "Digital Content Creator & Video Editing",
    category: "Design & Multimedia",
    categoryId: "design-multimedia",
    type: "on-campus",
    duration: "3 Months",
    level: "Beginner to Intermediate",
    image: "/images/digital-content creator.png",
    overview: "Learn high-impact video editing, YouTube strategy, Instagram Reels production, podcast editing, and storytelling for modern digital brands.",
    highlights: ["YouTube & Instagram Reels Workflows", "Audio Mastering", "Lighting & Camera Angles", "Viral Content Strategy"],
    syllabus: [
      { module: "Module 1", title: "Content Strategy & Scriptwriting", desc: "Hook formulation, narrative structures, audience retention tactics." },
      { module: "Module 2", title: "Video Filming & Studio Setup", desc: "Smartphone & DSLR videography, 3-point lighting, microphone techniques." },
      { module: "Module 3", title: "Fast-Paced Video Editing", desc: "CapCut Pro, Premiere Pro, sound effects, subtitles, trending transitions." },
      { module: "Module 4", title: "Distribution & Monetization", desc: "YouTube SEO, thumbnail design, algorithm optimization, brand sponsorships." }
    ],
    tools: ["Premiere Pro", "CapCut", "Canva", "Photoshop", "OBS Studio"],
    careers: ["YouTube Content Creator", "Social Media Video Editor", "Reels/Shorts Specialist"]
  },
  {
    slug: "autocad",
    title: "2D & 3D AutoCAD Architectural & Civil",
    category: "Design & Multimedia",
    categoryId: "design-multimedia",
    type: "on-campus",
    duration: "3 - 6 Months",
    level: "All Levels",
    image: "/images/auto-cad.png",
    overview: "Professional Computer-Aided Design (CAD) for civil engineers, architects, interior designers, and mechanical draftsmen.",
    highlights: ["2D Architectural Drafting", "3D Isometric Modeling", "Plotting & Blueprint Standards", "Industry Certification"],
    syllabus: [
      { module: "Module 1", title: "AutoCAD Workspace & 2D Drafting", desc: "Drawing coordinates, geometric tools, layers, dimensioning." },
      { module: "Module 2", title: "Architectural Floor Plans", desc: "Elevations, sections, structural doors/windows, furniture layouts." },
      { module: "Module 3", title: "3D Modeling & Solid Editing", desc: "Extrude, revolve, loft, sweep, boolean operations, materials." },
      { module: "Module 4", title: "Rendering, Layouts & Sheet Sets", desc: "Camera setup, sun studies, viewports, title blocks, plotting to PDF." }
    ],
    tools: ["AutoCAD 2D", "AutoCAD 3D", "Autodesk Revit", "SketchUp"],
    careers: ["CAD Drafter", "Architectural Designer", "Civil Layout Specialist", "Interior Draftsman"]
  },

  // CMS & WEB TECHNOLOGIES
  {
    slug: "fullstack-web-development",
    title: "Full Stack Web Development Masterclass",
    category: "CMS & Web Technologies",
    categoryId: "web-fullstack",
    type: "on-campus",
    duration: "6 Months",
    level: "Beginner to Advanced",
    image: "/images/full-stact-development.png",
    overview: "The flagship course at Netcoder Technology: master HTML5, CSS3, JavaScript, React.js, Next.js, Node.js, Express, MongoDB, and SQL with 100% placement support.",
    highlights: ["10+ Real Industry Projects", "MERN Stack + Next.js", "REST APIs & Databases", "Dedicated Placement Drive"],
    syllabus: [
      { module: "Module 1", title: "Frontend Engineering", desc: "HTML5, CSS3, Tailwind CSS, JavaScript ES6+, DOM manipulation." },
      { module: "Module 2", title: "React.js & Next.js", desc: "Components, hooks, state management, App Router, SSR, Tailwind." },
      { module: "Module 3", title: "Backend Architecture", desc: "Node.js, Express.js, RESTful API design, authentication, JWT." },
      { module: "Module 4", title: "Databases & Deployment", desc: "MongoDB, MySQL/PostgreSQL, Docker basics, AWS, Vercel CI/CD." }
    ],
    tools: ["React.js", "Next.js", "Node.js", "Express", "MongoDB", "MySQL", "Git & GitHub"],
    careers: ["Full Stack Developer", "Software Engineer", "Frontend Specialist", "Backend Engineer"]
  },
  {
    slug: "web-development",
    title: "Web Development Foundation",
    category: "CMS & Web Technologies",
    categoryId: "web-fullstack",
    type: "on-campus",
    duration: "3 - 4 Months",
    level: "Beginner",
    image: "/images/web-development.png",
    overview: "Build rock-solid programming foundations in web technologies, JavaScript logic building, interactive frontends, and dynamic databases.",
    highlights: ["Hands-on Coding Labs", "Logic Building", "Git Version Control", "Portfolio Websites"],
    syllabus: [
      { module: "Module 1", title: "Web Basics & Markup", desc: "Semantic HTML5, CSS3 styling, Flexbox layout." },
      { module: "Module 2", title: "Programming with JavaScript", desc: "Data types, functions, loops, arrays, objects, ES6 features." },
      { module: "Module 3", title: "Dynamic Web Applications", desc: "AJAX, Fetch API, JSON, third-party API integration." },
      { module: "Module 4", title: "Database Fundamentals", desc: "CRUD operations, relational database design, basic backend links." }
    ],
    tools: ["HTML5", "CSS3", "JavaScript", "Git", "VS Code"],
    careers: ["Junior Web Developer", "Frontend Developer", "Web Assistant"]
  },
  {
    slug: "mern-stack",
    title: "MERN Stack Development",
    category: "CMS & Web Technologies",
    categoryId: "web-fullstack",
    type: "on-campus",
    duration: "4 - 6 Months",
    level: "Intermediate",
    image: "/images/mern-stack.png",
    overview: "Build high-performance single page applications using MongoDB, Express.js, React.js, and Node.js with modern cloud deployments.",
    highlights: ["Pure JavaScript Stack", "Full Auth & Roles System", "Redux Toolkit & Context", "Real-Time WebSockets"],
    syllabus: [
      { module: "Module 1", title: "Modern React.js", desc: "Hooks, custom hooks, Redux Toolkit, React Router, UI libraries." },
      { module: "Module 2", title: "Node.js & Express.js", desc: "Asynchronous programming, routing, middleware, error handling." },
      { module: "Module 3", title: "MongoDB & Mongoose", desc: "Schema modeling, indexes, aggregation pipelines, data validation." },
      { module: "Module 4", title: "Production Application", desc: "E-Commerce portal, payment gateway integration, deployment." }
    ],
    tools: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux", "Postman"],
    careers: ["MERN Stack Engineer", "React Developer", "Node.js Developer"]
  },
  {
    slug: "mean-stack",
    title: "MEAN Stack Development",
    category: "CMS & Web Technologies",
    categoryId: "web-fullstack",
    type: "on-campus",
    duration: "4 - 6 Months",
    level: "Intermediate",
    image: "/images/mean-stack.png",
    overview: "Enterprise-grade web application development using MongoDB, Express.js, Angular, and Node.js with TypeScript.",
    highlights: ["TypeScript Mastery", "Angular Architecture", "Enterprise Best Practices", "RESTful Web Services"],
    syllabus: [
      { module: "Module 1", title: "TypeScript & Angular Core", desc: "Decorators, components, services, dependency injection, RxJS." },
      { module: "Module 2", title: "Angular Forms & Routing", desc: "Reactive forms, route guards, lazy loading, HTTP client." },
      { module: "Module 3", title: "Node.js & Express Services", desc: "Enterprise backend architecture, microservices concept." },
      { module: "Module 4", title: "MongoDB Cloud Setup", desc: "MongoDB Atlas, secure connections, transaction management." }
    ],
    tools: ["Angular", "TypeScript", "Node.js", "Express.js", "MongoDB"],
    careers: ["MEAN Stack Developer", "Angular Specialist", "Full Stack Engineer"]
  },
  {
    slug: "php-training",
    title: "PHP & Laravel Backend Training",
    category: "CMS & Web Technologies",
    categoryId: "web-fullstack",
    type: "on-campus",
    duration: "3 - 6 Months",
    level: "All Levels",
    image: "/images/php.png",
    overview: "Master object-oriented PHP 8+, MySQL databases, and the world's most popular PHP framework: Laravel 11.",
    highlights: ["Laravel MVC Architecture", "Eloquent ORM", "Blade Templating", "API Development"],
    syllabus: [
      { module: "Module 1", title: "Core & OOP PHP", desc: "Classes, objects, inheritance, interfaces, sessions, security." },
      { module: "Module 2", title: "MySQL Database Mastery", desc: "Complex queries, joins, indexes, foreign keys, transactions." },
      { module: "Module 3", title: "Laravel Framework Fundamentals", desc: "Artisan CLI, routing, controllers, Blade engine, migrations." },
      { module: "Module 4", title: "Advanced Laravel & APIs", desc: "Eloquent relationships, authentication, middleware, REST APIs." }
    ],
    tools: ["PHP 8", "Laravel 11", "MySQL", "Composer", "XAMPP", "Postman"],
    careers: ["PHP Developer", "Laravel Backend Engineer", "Web Application Developer"]
  },
  {
    slug: "wordpress",
    title: "WordPress Development & CMS",
    category: "CMS & Web Technologies",
    categoryId: "web-fullstack",
    type: "on-campus",
    duration: "2 - 3 Months",
    level: "Beginner to Intermediate",
    image: "/images/wordpress.png",
    overview: "Build custom themes, e-commerce stores with WooCommerce, elementor custom builds, and security-hardened CMS solutions without coding limits.",
    highlights: ["WooCommerce Store Setup", "Custom Theme Tweaks", "Speed Optimization", "Security Best Practices"],
    syllabus: [
      { module: "Module 1", title: "WordPress Architecture", desc: "Installation, dashboard, posts vs pages, taxonomies, plugins." },
      { module: "Module 2", title: "Page Builders & Design", desc: "Elementor Pro, header/footer builders, dynamic content." },
      { module: "Module 3", title: "WooCommerce E-Commerce", desc: "Product catalog, shipping classes, payment gateways, checkout." },
      { module: "Module 4", title: "Performance & Security", desc: "Caching, CDN setup, image optimization, automated backups." }
    ],
    tools: ["WordPress", "Elementor", "WooCommerce", "cPanel", "Yoast SEO"],
    careers: ["WordPress Developer", "E-Commerce Manager", "CMS Specialist", "Freelance Web Creator"]
  },

  // DIGITAL MARKETING
  {
    slug: "digital-marketing",
    title: "Advanced Digital Marketing Masterclass",
    category: "Digital Marketing",
    categoryId: "digital-marketing",
    type: "on-campus",
    duration: "3 - 6 Months",
    level: "All Levels",
    image: "/images/digital-marketing.png",
    overview: "Master full-funnel digital marketing: Search Engine Optimization (SEO), Google Ads (PPC), Meta Ads (Facebook & Instagram), Email Marketing, and Analytics.",
    highlights: ["Live Ad Budget Campaigns", "Google & Meta Certifications", "100% Practical Training", "Job Placement Support"],
    syllabus: [
      { module: "Module 1", title: "Search Engine Optimization (SEO)", desc: "Keyword research, On-Page, Technical SEO, Link building, Search Console." },
      { module: "Module 2", title: "Google Ads & PPC Campaigns", desc: "Search ads, Display network, Performance Max, YouTube video ads, ROAS." },
      { module: "Module 3", title: "Social Media Advertising (Meta Ads)", desc: "Ad manager, custom audiences, lookalikes, pixel tracking, lead generation." },
      { module: "Module 4", title: "Analytics & Growth Hacking", desc: "Google Analytics 4 (GA4), conversion tracking, copywriting, email funnels." }
    ],
    tools: ["Google Ads", "Meta Ads Manager", "Google Analytics 4", "SEMrush", "Ahrefs", "Mailchimp"],
    careers: ["Digital Marketing Executive", "SEO Specialist", "Performance Marketer", "Social Media Strategist"]
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing (SMM)",
    category: "Digital Marketing",
    categoryId: "digital-marketing",
    type: "on-campus",
    duration: "2 - 3 Months",
    level: "All Levels",
    image: "/images/social-media-marketing.png",
    overview: "Grow brands organically and through targeted paid ads across Instagram, Facebook, LinkedIn, YouTube, and Pinterest.",
    highlights: ["Viral Content Playbooks", "Influencer Marketing", "Social Media Calendar", "Paid Meta Ad Mastery"],
    syllabus: [
      { module: "Module 1", title: "Platform Algorithms & Strategy", desc: "Understanding algorithmic distribution, profile branding." },
      { module: "Module 2", title: "Organic Growth & Creative Production", desc: "Hooks, carousel creation, community engagement." },
      { module: "Module 3", title: "Meta Ads & Retargeting", desc: "Targeting high-intent demographics, A/B testing ad creatives." },
      { module: "Module 4", title: "Analytics & Client Reporting", desc: "Measuring CTR, CPA, ROAS, and generating ROI reports." }
    ],
    tools: ["Meta Business Suite", "Canva", "CapCut", "Hootsuite", "Buffer"],
    careers: ["Social Media Manager", "SMM Specialist", "Community Manager"]
  },
  {
    slug: "seo-course",
    title: "SEO (Search Engine Optimization)",
    category: "Digital Marketing",
    categoryId: "digital-marketing",
    type: "on-campus",
    duration: "2 - 3 Months",
    level: "All Levels",
    image: "/images/seo.png",
    overview: "Rank websites #1 on Google with On-Page SEO, Technical SEO, Off-Page Link Building, Local SEO, and AI Search Optimization.",
    highlights: ["Live Website Ranking Project", "Local SEO & Google Business Profile", "Backlink Strategies", "Core Web Vitals Optimization"],
    syllabus: [
      { module: "Module 1", title: "Keyword Research & Content Strategy", desc: "Search intent, keyword difficulty, long-tail clusters." },
      { module: "Module 2", title: "On-Page & Schema Markup", desc: "Title tags, meta descriptions, headings, structured data JSON-LD." },
      { module: "Module 3", title: "Technical SEO & Speed", desc: "Robots.txt, XML sitemaps, canonical tags, mobile responsiveness." },
      { module: "Module 4", title: "Link Building & Local SEO", desc: "Guest posting, digital PR, Google Maps ranking, citations." }
    ],
    tools: ["Google Search Console", "Google Analytics", "Ahrefs", "SEMrush", "Screaming Frog"],
    careers: ["SEO Specialist", "Technical SEO Analyst", "Search Growth Strategist"]
  },

  // DATA SCIENCE, AI & CYBER SECURITY
  {
    slug: "data-science-machine-learning",
    title: "Data Science & Machine Learning with Python",
    category: "Data Science & AI",
    categoryId: "data-ai-security",
    type: "on-campus",
    duration: "6 Months",
    level: "Intermediate to Advanced",
    image: "/images/DataScience-BusinessAnalytics.png",
    overview: "Master Python programming, NumPy, Pandas, Scikit-Learn, Machine Learning algorithms, Deep Learning, and AI model deployments in Dharamshala.",
    highlights: ["End-to-End AI Projects", "Statistical Modeling", "Neural Networks", "Placement Assistance"],
    syllabus: [
      { module: "Module 1", title: "Python for Data Science", desc: "NumPy arrays, Pandas dataframes, data cleaning, exploratory data analysis." },
      { module: "Module 2", title: "Data Visualization & Statistics", desc: "Matplotlib, Seaborn, hypothesis testing, probability distributions." },
      { module: "Module 3", title: "Supervised & Unsupervised ML", desc: "Regression, classification, decision trees, random forests, clustering." },
      { module: "Module 4", title: "Deep Learning & Model Deployment", desc: "Neural networks basics, TensorFlow, model deployment via Streamlit / FastAPI." }
    ],
    tools: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Jupyter", "TensorFlow", "FastAPI"],
    careers: ["Data Scientist", "Machine Learning Engineer", "AI Associate", "Data Analyst"]
  },
  {
    slug: "data-analytics",
    title: "Data Analytics (PowerBI, SQL, Excel, Python)",
    category: "Data Science & AI",
    categoryId: "data-ai-security",
    type: "on-campus",
    duration: "3 - 6 Months",
    level: "All Levels",
    image: "/images/Data analysis-pana.png",
    overview: "Turn raw datasets into business intelligence dashboards using Advanced Excel, SQL queries, Power BI, and Tableau.",
    highlights: ["Interactive Dashboard Portfolios", "Real Corporate Datasets", "DAX & Power Query", "Business Problem Solving"],
    syllabus: [
      { module: "Module 1", title: "Advanced Excel for Analytics", desc: "Pivot tables, VLOOKUP/XLOOKUP, index-match, conditional logic." },
      { module: "Module 2", title: "SQL for Data Querying", desc: "SELECT, GROUP BY, JOINs, subqueries, window functions, CTEs." },
      { module: "Module 3", title: "Power BI Business Intelligence", desc: "Data modeling, DAX formulas, interactive visualizations, reporting." },
      { module: "Module 4", title: "Tableau & Business Case Studies", desc: "Storytelling with data, dashboard publication, KPI monitoring." }
    ],
    tools: ["Power BI", "SQL", "Excel", "Tableau", "Python"],
    careers: ["Data Analyst", "Business Intelligence Analyst", "Reporting Specialist"]
  },
  {
    slug: "business-analytics",
    title: "Data Science & Business Analytics",
    category: "Data Science & AI",
    categoryId: "data-ai-security",
    type: "on-campus",
    duration: "4 - 6 Months",
    level: "All Levels",
    image: "/images/DataScience-BusinessAnalytics.png",
    overview: "Bridge the gap between technology and corporate decision-making through financial modeling, marketing metrics, and predictive business insights.",
    highlights: ["Managerial Dashboards", "Predictive Analytics", "Industry Case Studies", "Executive Presentation Skills"],
    syllabus: [
      { module: "Module 1", title: "Business Metrics & KPIs", desc: "Customer acquisition cost (CAC), LTV, churn rate, ROI modeling." },
      { module: "Module 2", title: "SQL & Relational Analytics", desc: "Querying transactional databases, customer segmentation." },
      { module: "Module 3", title: "Power BI & Tableau Dashboards", desc: "Executive KPI tracking, automated report refreshes." },
      { module: "Module 4", title: "Predictive Analytics in Business", desc: "Sales forecasting, risk assessment, market basket analysis." }
    ],
    tools: ["Power BI", "Excel", "SQL", "Tableau", "Python"],
    careers: ["Business Analyst", "Strategy Consultant", "Market Research Analyst"]
  },
  {
    slug: "cyber-security",
    title: "Complete Cyber Security Course",
    category: "Data Science & AI",
    categoryId: "data-ai-security",
    type: "on-campus",
    duration: "4 - 6 Months",
    level: "Intermediate",
    image: "/images/cyber-security.png",
    overview: "Learn defense strategies, network security, threat detection, firewall architectures, and incident response to protect digital infrastructures.",
    highlights: ["Hands-on Virtual Labs", "Network Packet Analysis", "Security Incident Handling", "Global Certification Prep"],
    syllabus: [
      { module: "Module 1", title: "Networking Fundamentals", desc: "OSI model, TCP/IP, DNS, DHCP, routers, switches, subnets." },
      { module: "Module 2", title: "System Administration & Linux", desc: "Linux command line, user permissions, bash scripting, SSH security." },
      { module: "Module 3", title: "Threats, Attacks & Vulnerabilities", desc: "Malware types, phishing, DDoS, social engineering, MITM attacks." },
      { module: "Module 4", title: "Defense & Incident Response", desc: "Firewalls, IDS/IPS, Wireshark packet capture, SIEM basics." }
    ],
    tools: ["Wireshark", "Nmap", "Kali Linux", "Snort", "Splunk", "Cisco Packet Tracer"],
    careers: ["Cyber Security Analyst", "SOC Analyst", "Network Security Engineer", "Information Security Officer"]
  },
  {
    slug: "ethical-hacking",
    title: "Ethical Hacking & Penetration Testing",
    category: "Data Science & AI",
    categoryId: "data-ai-security",
    type: "on-campus",
    duration: "4 - 6 Months",
    level: "Intermediate to Advanced",
    image: "/images/Cyber attack-pana.png",
    overview: "Become a white-hat hacker: find and fix security vulnerabilities in web applications, servers, and networks before malicious attackers do.",
    highlights: ["Hands-On Kali Linux Labs", "OWASP Top 10 Web Exploitation", "Metasploit & Burp Suite", "Ethical Hacking Certification Support"],
    syllabus: [
      { module: "Module 1", title: "Reconnaissance & Footprinting", desc: "OSINT techniques, WHOIS, DNS reconnaissance, active & passive scans." },
      { module: "Module 2", title: "Scanning & Enumeration", desc: "Nmap port scanning, banner grabbing, vulnerability assessment with Nessus." },
      { module: "Module 3", title: "Web Application Penetration Testing", desc: "OWASP Top 10: SQL Injection, XSS, CSRF, broken access control." },
      { module: "Module 4", title: "Exploitation & Privilege Escalation", desc: "Metasploit framework, password cracking, post-exploitation." }
    ],
    tools: ["Kali Linux", "Burp Suite", "Metasploit", "Nmap", "Wireshark", "John the Ripper"],
    careers: ["Ethical Hacker", "Penetration Tester", "Vulnerability Assessment Analyst", "Security Consultant"]
  },

  // COMPUTER SCIENCE & DEVOPS
  {
    slug: "software-engineering",
    title: "Software Engineering with Python",
    category: "Computer Science & DevOps",
    categoryId: "cs-devops",
    type: "on-campus",
    duration: "4 - 6 Months",
    level: "All Levels",
    image: "/images/software-engineering.png",
    overview: "Write clean, modular, scalable code in Python with Object-Oriented design, automated testing, and software design patterns.",
    highlights: ["Clean Code Principles", "Unit Testing & TDD", "API Building with FastAPI", "Design Patterns"],
    syllabus: [
      { module: "Module 1", title: "Python Core & Advanced Concepts", desc: "Decorators, generators, context managers, multithreading, async." },
      { module: "Module 2", title: "Object-Oriented Design & Patterns", desc: "SOLID principles, factory pattern, singleton, observer pattern." },
      { module: "Module 3", title: "Automated Testing & CI", desc: "Pytest, unit tests, mock objects, GitHub Actions integration." },
      { module: "Module 4", title: "API Development & Architecture", desc: "FastAPI, relational databases with SQLAlchemy, Docker containers." }
    ],
    tools: ["Python 3", "FastAPI", "Pytest", "Docker", "Git", "PostgreSQL"],
    careers: ["Software Engineer", "Python Developer", "Backend Developer"]
  },
  {
    slug: "system-design",
    title: "System Design & Operating Systems",
    category: "Computer Science & DevOps",
    categoryId: "cs-devops",
    type: "on-campus",
    duration: "3 - 4 Months",
    level: "Intermediate to Advanced",
    image: "/images/Operating-system.png",
    overview: "Learn how modern high-scale systems (like Uber, Netflix, WhatsApp) are architected for millions of concurrent users.",
    highlights: ["High-Scale Architecture", "Low-Level & High-Level Design", "Distributed Systems Concepts", "Interview Preparation"],
    syllabus: [
      { module: "Module 1", title: "OS Internals", desc: "Processes, threads, concurrency, deadlocks, memory management." },
      { module: "Module 2", title: "Scalability Pillars", desc: "Horizontal vs vertical scaling, load balancers, caching strategies (Redis)." },
      { module: "Module 3", title: "Database Sharding & Replication", desc: "SQL vs NoSQL, CAP theorem, indexing, data partitioning." },
      { module: "Module 4", title: "Real-World System Case Studies", desc: "Design a URL shortener, Instagram feed, distributed message queue." }
    ],
    tools: ["Redis", "Kafka", "Nginx", "PostgreSQL", "Docker"],
    careers: ["Senior Systems Engineer", "Backend Architect", "Tech Lead"]
  },
  {
    slug: "data-structures",
    title: "Algorithm & Data Structures (DSA) in Python",
    category: "Computer Science & DevOps",
    categoryId: "cs-devops",
    type: "on-campus",
    duration: "4 Months",
    level: "All Levels",
    image: "/images/Data-Structures.png",
    overview: "Crack coding interviews at top tech companies. Master logic building, arrays, linked lists, trees, graphs, and dynamic programming.",
    highlights: ["150+ LeetCode Questions Solved", "Time & Space Complexity", "Interview Problem Solving", "Mock Coding Interviews"],
    syllabus: [
      { module: "Module 1", title: "Complexity & Linear Structures", desc: "Big-O notation, arrays, strings, two-pointer approach, sliding window." },
      { module: "Module 2", title: "Stacks, Queues & Linked Lists", desc: "Single & double linked lists, monotonic stacks, queue implementations." },
      { module: "Module 3", title: "Non-Linear Structures: Trees & Graphs", desc: "Binary trees, BST, BFS, DFS, Dijkstra algorithm, topological sort." },
      { module: "Module 4", title: "Dynamic Programming & Greedy", desc: "Memoization, tabulation, knapsack problem, intervals, recursion." }
    ],
    tools: ["Python", "LeetCode", "HackerRank", "GitHub"],
    careers: ["Software Development Engineer (SDE)", "Competitive Programmer"]
  },
  {
    slug: "devops-course",
    title: "Cloud & DevOps Masterclass",
    category: "Computer Science & DevOps",
    categoryId: "cs-devops",
    type: "on-campus",
    duration: "4 - 6 Months",
    level: "Intermediate",
    image: "/images/future.png",
    overview: "Bridge development and IT operations with Docker containers, Kubernetes orchestration, CI/CD pipelines, and AWS cloud architecture.",
    highlights: ["Docker & Kubernetes Hands-On", "Automated CI/CD Pipelines", "AWS Cloud Services", "Infrastructure as Code"],
    syllabus: [
      { module: "Module 1", title: "Linux & Shell Scripting", desc: "Bash automation, cron jobs, network configuration, process monitoring." },
      { module: "Module 2", title: "Containerization with Docker", desc: "Dockerfiles, multi-stage builds, Docker Compose, container networking." },
      { module: "Module 3", title: "Kubernetes Orchestration", desc: "Pods, deployments, services, ingress controllers, Helm charts." },
      { module: "Module 4", title: "CI/CD & AWS Cloud", desc: "GitHub Actions, Jenkins, Terraform IaC, AWS EC2, S3, RDS, CloudWatch." }
    ],
    tools: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "Terraform", "Linux"],
    careers: ["DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer (SRE)"]
  },

  // ONLINE COURSES
  {
    slug: "web-app-online",
    title: "Online Full Stack & App Development",
    category: "Online Programs",
    categoryId: "online-programs",
    type: "online",
    duration: "6 Months",
    level: "All Levels",
    image: "/images/full-stact-development.png",
    overview: "Live instructor-led online training in Full Stack MERN development with interactive doubt clearing, real-time code reviews, and remote internship.",
    highlights: ["Live Weekend/Evening Batches", "Recorded Class Access", "Dedicated Mentor Support", "Virtual Placement Drive"],
    syllabus: [
      { module: "Module 1", title: "Modern JavaScript & React", desc: "Live coding sessions, React hooks, Tailwind CSS." },
      { module: "Module 2", title: "Node.js RESTful API Backend", desc: "Express server architecture, JWT authentication." },
      { module: "Module 3", title: "MongoDB Cloud Atlas", desc: "Cloud database setup, indexes, CRUD APIs." },
      { module: "Module 4", title: "Capstone Live Project", desc: "Production deployment on Vercel and AWS." }
    ],
    tools: ["React.js", "Node.js", "MongoDB", "Express", "GitHub", "Vercel"],
    careers: ["Remote Web Developer", "Full Stack Engineer", "Freelance Developer"]
  },
  {
    slug: "digital-marketing-online",
    title: "Online Digital Marketing Masterclass",
    category: "Online Programs",
    categoryId: "online-programs",
    type: "online",
    duration: "3 Months",
    level: "All Levels",
    image: "/images/digital-marketing.png",
    overview: "Learn high-ROI digital marketing from anywhere in India: SEO, Google Ads, Meta Ads, content marketing, and conversion optimization.",
    highlights: ["Live Screen Sharing Sessions", "Real Ad Account Access", "Google Certifications", "Freelancing Guidance"],
    syllabus: [
      { module: "Module 1", title: "SEO & Content Marketing", desc: "On-page, technical SEO, link building strategies." },
      { module: "Module 2", title: "Google Ads Campaigns", desc: "Search, display, and YouTube video ads setup." },
      { module: "Module 3", title: "Meta Ads & Social Media", desc: "Targeting high-intent audiences on Instagram & Facebook." },
      { module: "Module 4", title: "Analytics & Client Acquisition", desc: "GA4 reporting and closing freelancing clients." }
    ],
    tools: ["Google Ads", "Meta Ads", "Google Analytics 4", "Canva", "SEMrush"],
    careers: ["Remote Marketing Manager", "Freelance Media Buyer", "SEO Consultant"]
  },
  {
    slug: "data-science-online",
    title: "Online Data Science & AI Program",
    category: "Online Programs",
    categoryId: "online-programs",
    type: "online",
    duration: "6 Months",
    level: "Intermediate",
    image: "/images/DataScience-BusinessAnalytics.png",
    overview: "Interactive remote training in Python, statistics, Machine Learning algorithms, and generative AI models with hands-on assignments.",
    highlights: ["Live Virtual Coding Labs", "Kaggle Competitions Prep", "1-on-1 Mentorship", "Verified Certificate"],
    syllabus: [
      { module: "Module 1", title: "Python & Data Wrangling", desc: "NumPy, Pandas, data exploration, feature engineering." },
      { module: "Module 2", title: "Applied Machine Learning", desc: "Scikit-Learn algorithms, model evaluation, cross-validation." },
      { module: "Module 3", title: "Deep Learning Foundations", desc: "Neural networks, image classification with TensorFlow." },
      { module: "Module 4", title: "Cloud AI Deployment", desc: "Hosting models on HuggingFace and Streamlit Cloud." }
    ],
    tools: ["Python", "Pandas", "Scikit-Learn", "Jupyter", "TensorFlow"],
    careers: ["Data Scientist", "ML Engineer", "Data Consultant"]
  },
  {
    slug: "data-analytics-online",
    title: "Online Data Analytics with Power BI & SQL",
    category: "Online Programs",
    categoryId: "online-programs",
    type: "online",
    duration: "3 Months",
    level: "All Levels",
    image: "/images/Data analysis-pana.png",
    overview: "Master SQL queries, Advanced Excel, and Power BI interactive dashboards from home with real-world case studies.",
    highlights: ["Portfolio Dashboard Creation", "Live Doubt Resolution", "Corporate Case Studies", "Job Assistance"],
    syllabus: [
      { module: "Module 1", title: "Excel for Business", desc: "Formulas, pivot tables, data cleaning, lookups." },
      { module: "Module 2", title: "SQL Database Mastery", desc: "SELECT statements, joins, aggregations, views." },
      { module: "Module 3", title: "Power BI Visualization", desc: "Data modeling, DAX measures, interactive reporting." },
      { module: "Module 4", title: "Business Presentations", desc: "Executive KPI communication and resume building." }
    ],
    tools: ["Power BI", "SQL", "Excel", "Tableau"],
    careers: ["Remote Data Analyst", "BI Developer", "Operations Analyst"]
  },
  {
    slug: "ethical-hacking-online",
    title: "Online Ethical Hacking & Cyber Defense",
    category: "Online Programs",
    categoryId: "online-programs",
    type: "online",
    duration: "4 Months",
    level: "Intermediate",
    image: "/images/Cyber attack-pana.png",
    overview: "Live online penetration testing, vulnerability analysis, and network defense with hands-on browser labs and simulated capture-the-flag exercises.",
    highlights: ["Browser-Based Virtual Labs", "Real-World Attack Simulations", "Bug Bounty Intro", "Industry Certificate"],
    syllabus: [
      { module: "Module 1", title: "Network Reconnaissance", desc: "Port scanning, passive discovery, OSINT." },
      { module: "Module 2", title: "Web App Vulnerabilities", desc: "SQL injection, cross-site scripting, authentication bypass." },
      { module: "Module 3", title: "Metasploit & Exploitation", desc: "Payload generation, remote exploits, post-exploitation." },
      { module: "Module 4", title: "Remediation & Defense", desc: "Security patching, defensive hardening, report writing." }
    ],
    tools: ["Kali Linux", "Burp Suite", "Nmap", "Wireshark", "Metasploit"],
    careers: ["Ethical Hacker", "Security Researcher", "Penetration Tester"]
  },
  {
    slug: "production-kubernetes",
    title: "Production Kubernetes & Multi-Cloud Infrastructure",
    category: "Computer Science & DevOps",
    categoryId: "cs-devops",
    type: "online",
    duration: "42 Hours • 18 Labs",
    level: "Advanced",
    price: 89,
    originalPrice: 199,
    rating: 4.9,
    ratingCount: 3420,
    instructor: "Sarah Vance, Principal SRE @ CloudScale",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgCtoWeszgv6lujZQ73tVQ2LbVd7IxM8mS2Jx7I4HJtZLgA_7eJCwGF2wJgFOzK3aLIyWfi8MFOMntoDUwtJpjkpIIpCrug4RHnBOS9bH8DkYgdvi01L54ZTogmUG1YqirnMisaWReEBLGaGFxylbwWcC5fuHClDNczgRGTeEO4C691qOGd3k5PD4KmqiZTRi8WMLjJZogXs1ROZqOfMYjt3T80YUicvmWDPId1WTPp8H6C8_7O-2K",
    overview: "Deploy fault-tolerant clusters, implement service meshes using Istio, configure GitOps with ArgoCD, and manage zero-trust network policies in live cloud sandboxes.",
    highlights: ["18 Hands-On Cloud Labs", "Zero-Downtime Rolling Upgrades", "GitOps with ArgoCD", "Production Capstone Review"],
    syllabus: [
      { module: "Module 1", title: "Cluster Architecture & Control Plane Internals", desc: "etcd quorum, kube-apiserver, kube-scheduler, and custom resource definitions (CRDs)." },
      { module: "Module 2", title: "Storage, Ingress & Zero-Trust Mesh", desc: "Persistent Volumes, CSI drivers, Ingress NGINX, and Istio mTLS mutual authentication." },
      { module: "Module 3", title: "GitOps Pipelines & Helm Packaging", desc: "Automated sync with ArgoCD, sealed secrets, and chart releases across multiple environments." },
      { module: "Module 4", title: "Observability, Autoscaling & Chaos Testing", desc: "Prometheus operator, Grafana dashboards, HPA/KEDA metrics, and LitmusChaos injection." }
    ],
    tools: ["Kubernetes", "Docker", "Helm", "Istio", "ArgoCD", "Prometheus"],
    careers: ["Site Reliability Engineer", "Kubernetes Specialist", "Cloud Platform Engineer"]
  },
  {
    slug: "nextjs-fullstack",
    title: "Full-Stack Next.js 15, TypeScript & Distributed Microservices",
    category: "CMS & Web Technologies",
    categoryId: "web-fullstack",
    type: "online",
    duration: "38 Hours • 8 Projects",
    level: "Intermediate to Advanced",
    price: 79,
    originalPrice: 180,
    rating: 4.95,
    ratingCount: 4190,
    instructor: "Alex Chen, Ex-Staff Engineer @ Google",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7lelSjwP9qX18Kp7IPhs3NvDmxplRd70QTojRRvKdsxQiZidr0AOIxgJN_3IGVF-zbL-rQiaxdDJxY0TREGMUvt0GNHg-k5G7yzPT-9G1yg4FDdOBONTsnWpVZ21S2SYNR6-5pjjX6k8qSGQ-pr-nc8usjjw5s12d2PduuX7sajqnKbdA2E3v_DjUvF39gv_v8_8n1KSwOZKjdAsCRigaLOwQYXvBetST6CSiX-w2AhMeA_zD5tzo",
    overview: "Architect high-scale web apps with Server Components, Turborepo, Prisma ORM, Redis caching, and Stripe billing pipelines.",
    highlights: ["Next.js 15 App Router", "Server Actions & Streaming", "PostgreSQL + Redis Caching", "Stripe Subscription Billing"],
    syllabus: [
      { module: "Module 1", title: "Modern React 19 & Next.js 15 Fundamentals", desc: "Server Components vs Client Components, Suspense streaming, and Turbopack compiler." },
      { module: "Module 2", title: "State, Server Actions & Optimistic UI", desc: "Form validations with Zod, optimistic mutations with useOptimistic, and revalidation hooks." },
      { module: "Module 3", title: "Database Architecture with Prisma & Postgres", desc: "Relational data modeling, ACID transactions, migrations, and connection pooling with PgBouncer." },
      { module: "Module 4", title: "Production Deployment & High-Throughput Caching", desc: "Edge runtimes, Redis rate limiting, CDN caching, and automated CI/CD to AWS/Vercel." }
    ],
    tools: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Redis"],
    careers: ["Full-Stack Engineer", "Senior Front-End Architect", "Next.js Tech Lead"]
  },
  {
    slug: "genai-llm-systems",
    title: "Generative AI & LLM Systems Engineering with LangChain & PyTorch",
    category: "Data Science, AI & Cyber Security",
    categoryId: "data-ai-security",
    type: "online",
    duration: "46 Hours • 10 Apps",
    level: "Advanced",
    price: 99,
    originalPrice: 249,
    rating: 4.92,
    ratingCount: 2110,
    instructor: "Dr. Dev Patel, Lead AI Architect",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJuUfpQrkRi12ZcjG3xfnsXO4HhoSXt2PXmRA6sllis3P_M4f_gCW8vSYBrCh6ZdzW86-2ZwUJidk4P-jehtHyGaWUYqwx2X2PaHt00NghkC-k5_y8ExKeGnZxRtvkX5UvYCk82fPiIBgSTcewxm8h3VAGUr1cy-VVc6pFE-GfTyZv0-T6a2zxR2dH5bV-5l4B4Oal42khVkAeFpWmWLdwM7T_C_qXth8eWcvxYUL56-tcjA9MtIsT",
    overview: "Construct production RAG architectures, fine-tune open-weights models (Llama 3), build autonomous agents, and evaluate hallucination metrics.",
    highlights: ["Advanced RAG Architectures", "Fine-tuning Llama 3 with LoRA", "Vector DBs (Qdrant/Pinecone)", "Autonomous Multi-Agent Swarms"],
    syllabus: [
      { module: "Module 1", title: "Vector Embeddings & Semantic Search", desc: "Dense representations, cosine similarities, chunking strategies, and hybrid vector search." },
      { module: "Module 2", title: "Enterprise Retrieval-Augmented Generation (RAG)", desc: "Re-ranking with Cohere, self-reflective RAG, and hallucination reduction guardrails." },
      { module: "Module 3", title: "Model Fine-Tuning & Quantization", desc: "Parameter-Efficient Fine-Tuning (PEFT), QLoRA, GGUF quantization, and Ollama self-hosting." },
      { module: "Module 4", title: "Agentic Systems & Tool Calling", desc: "LangGraph stateful workflows, function calling, human-in-the-loop approvals, and production evaluation." }
    ],
    tools: ["Python", "PyTorch", "LangChain", "LangGraph", "Hugging Face", "Pinecone", "Qdrant"],
    careers: ["AI Engineer", "LLM Systems Specialist", "Machine Learning Architect"]
  },
  {
    slug: "cloud-security-devsecops",
    title: "Enterprise Cloud Security & AWS DevSecOps Mastery",
    category: "Data Science, AI & Cyber Security",
    categoryId: "data-ai-security",
    type: "online",
    duration: "35 Hours • 14 Labs",
    level: "Advanced",
    price: 89,
    originalPrice: 210,
    rating: 4.88,
    ratingCount: 1840,
    instructor: "Elena Rostova, CISO Advisor & SANS Author",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAejuX3eLpSPoufGBnQ8FgCfVYfPFT-6hLqgcRz-U747ORkayKLKOYlY268qcIeTbckNIsZLWXjRtEnSFu1IKjO6fZKByQd0oyyV09ITU6PRw3vvXatZZK4JxabEmrtoZmUvocuOlPOMzU587zG4wQxxJplO9Ptl33-1txzhyJYRQnXMZzFfFq-YjMIzcAQ3jAlg5zH80wzPY-v5uQsxLXMHLC2rr7u2f2RMjreihxmeWACU8XIVzS6",
    overview: "Implement automated SAST/DAST pipelines, cloud penetration audits, IAM least-privilege guardrails, and compliance-as-code automation.",
    highlights: ["Zero-Trust AWS Architecture", "Automated SAST/DAST in CI/CD", "AWS GuardDuty & SecurityHub", "SOC2 Compliance Automation"],
    syllabus: [
      { module: "Module 1", title: "AWS IAM Deep Dive & Least Privilege", desc: "Service control policies (SCPs), permission boundaries, STS assume role, and IAM Access Analyzer." },
      { module: "Module 2", title: "Vulnerability Scanning & Container Security", desc: "Trivy, Snyk, secret detection with Gitleaks, and signed container images with Cosign." },
      { module: "Module 3", title: "Cloud Detection & Incident Response", desc: "CloudTrail forensics, GuardDuty anomalies, VPC flow logs, and automated remediation with Lambda." },
      { module: "Module 4", title: "Infrastructure as Code Security & Compliance", desc: "Checkov, tfsec, OPA Gatekeeper policies, and automated audit trails." }
    ],
    tools: ["AWS Security", "Trivy", "Snyk", "Checkov", "Terraform", "Falco"],
    careers: ["DevSecOps Engineer", "Cloud Security Architect", "Cybersecurity Consultant"]
  },
  {
    slug: "golang-microservices",
    title: "Modern Backend with Go, gRPC, Redis & Distributed Systems",
    category: "Computer Science & DevOps",
    categoryId: "cs-devops",
    type: "online",
    duration: "40 Hours • 6 Microservices",
    level: "Advanced",
    price: 79,
    originalPrice: 190,
    rating: 4.94,
    ratingCount: 2830,
    instructor: "Marcus Brody, Principal Architect @ Uber",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDC8p2sRtpzEyUMlFsOniqxnPV-ctUugxjeZVDJylkpfAz-1Z_ZfM-o0Lqm-0F9NwuRkkQzMtU0w6XmmOdOUv-jPOunEK14MDmrT7hO6dT8i74rAagWBTDBc2JKain_btmUIyIjjVXWTgN2U0L4m_jPDWsNqpbPdK0WZYODG6EzR9u7stV6k4b-07c8oC5d3OlWaHurQctn1HvrwJLFVwM66fa61C-1baIqnfQEcgxHQfOF5QmX1Puk",
    overview: "Write concurrent, sub-millisecond backend microservices in Go. Master raft consensus, distributed locks, database sharding, and fault injection.",
    highlights: ["High-Throughput Goroutines", "gRPC & Protocol Buffers", "Distributed Redis Locks", "Event-Driven Sagas"],
    syllabus: [
      { module: "Module 1", title: "Go Concurrency & Memory Model", desc: "Channels, mutexes, sync.Pool, runtime scheduler, and lock contention profiling with pprof." },
      { module: "Module 2", title: "High-Performance RPC Communication", desc: "Protobuf schema evolution, streaming RPCs, interceptors, and client-side load balancing." },
      { module: "Module 3", title: "Distributed Caching & Transactional Outbox", desc: "Redis cluster clustering, cache-aside vs write-through, and PostgreSQL transactional outbox." },
      { module: "Module 4", title: "Resiliency, Circuit Breakers & Distributed Tracing", desc: "OpenTelemetry tracing, Prometheus exporter, exponential backoff, and circuit breakers." }
    ],
    tools: ["Go (Golang)", "gRPC", "Protobuf", "PostgreSQL", "Redis", "Docker"],
    careers: ["Backend Software Engineer", "Distributed Systems Engineer", "Go Specialist"]
  },
  {
    slug: "data-engineering-kafka",
    title: "Data Engineering Pipeline Mastery with Kafka, Spark & Snowflake",
    category: "Computer Science & DevOps",
    categoryId: "cs-devops",
    type: "online",
    duration: "44 Hours • 9 Pipelines",
    level: "Advanced",
    price: 89,
    originalPrice: 220,
    rating: 4.91,
    ratingCount: 1670,
    instructor: "Priya Nair, Staff Data Engineer @ Stripe",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAq1I5du0-memnpHQHfskXsBlHMSFz7O-09FMv3pO-L22MCKsht032sEfb9OdWvV4hBNBTfQwY_6xKH2pThxUfVEo_jrp8h8siRVQfTMOYSmmpQtMHuwMEVFuKUzzCT7l0_Fb28HscuOVtC_rJ3rQQ-BZNgrxy1zeQgbrR0azgp_5XhAaZ7KiWt8yX12i1Dlxk2CNSvsUcFWi4S11aPJJkdFIfYtqBElV2kuOaJfRPXCb6TIV4gLncE",
    overview: "Ingest billions of real-time events. Construct idempotent streaming pipelines using Apache Kafka, PySpark Structured Streaming, and modern dbt models.",
    highlights: ["Real-Time Event Ingestion", "PySpark Structured Streaming", "Idempotent Data Lakehouse", "Snowflake & dbt Modeling"],
    syllabus: [
      { module: "Module 1", title: "Kafka Architecture & Partitioning Strategies", desc: "Brokers, consumer groups, exactly-once semantics (EOS), and schema registry evolution." },
      { module: "Module 2", title: "Stream Processing with Apache Spark", desc: "Stateful streaming, watermarking, late data arrival, and Parquet/Delta Lake writing." },
      { module: "Module 3", title: "Modern Data Warehouse Modeling with dbt", desc: "Dimensional Kimball modeling, incremental tables, tests, and Snowflake clustering keys." },
      { module: "Module 4", title: "Data Quality & Orchestration with Airflow", desc: "DAG dependencies, Great Expectations data assertions, and pipeline backfilling." }
    ],
    tools: ["Apache Kafka", "Apache Spark", "Python", "Snowflake", "dbt", "Airflow"],
    careers: ["Data Engineer", "Streaming Systems Architect", "Big Data Developer"]
  },
  {
    slug: "devops-cloud-architect",
    title: "DevOps & Cloud Architect Career Track (AWS + Kubernetes + Terraform)",
    category: "Computer Science & DevOps",
    categoryId: "cs-devops",
    type: "online",
    duration: "6 Months • 12 Projects",
    level: "Flagship Career Track",
    price: 499,
    originalPrice: 999,
    rating: 4.98,
    ratingCount: 5280,
    instructor: "Netcoder Senior Engineering Faculty & FAANG Mentors",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgCtoWeszgv6lujZQ73tVQ2LbVd7IxM8mS2Jx7I4HJtZLgA_7eJCwGF2wJgFOzK3aLIyWfi8MFOMntoDUwtJpjkpIIpCrug4RHnBOS9bH8DkYgdvi01L54ZTogmUG1YqirnMisaWReEBLGaGFxylbwWcC5fuHClDNczgRGTeEO4C691qOGd3k5PD4KmqiZTRi8WMLjJZogXs1ROZqOfMYjt3T80YUicvmWDPId1WTPp8H6C8_7O-2K",
    overview: "Transition from software engineer or sysadmin to high-compensation Infrastructure Architect. Build zero-downtime multi-region clusters, GitOps pipelines with ArgoCD, and Infrastructure-as-Code setups ready for production.",
    highlights: ["12 Production Projects", "1-on-1 Senior Code Review", "Browser Cloud Sandboxes", "Guaranteed Job Assistance"],
    syllabus: [
      { module: "Module 1", title: "Linux & Container Internals", desc: "Namespaces, cgroups, layered storage drivers, and optimized multi-stage builds." },
      { module: "Module 2", title: "Production Kubernetes (K8s)", desc: "Multi-master high availability, ingress routing, stateful sets, and network policies." },
      { module: "Module 3", title: "Enterprise Terraform & AWS Cloud", desc: "Multi-tier VPCs, modular IaC architecture, remote state locking, and AWS EKS." },
      { module: "Module 4", title: "GitOps, Observability & Security", desc: "ArgoCD automation, Prometheus alerting, Grafana dashboards, and least-privilege security." }
    ],
    tools: ["AWS", "Kubernetes", "Terraform", "Docker", "ArgoCD", "Prometheus", "Linux"],
    careers: ["Cloud Architect", "Lead DevOps Engineer", "Principal Infrastructure Architect"]
  }
];

export function getCourseBySlug(slug) {
  // Normalize slug
  const cleanSlug = slug.toLowerCase().replace(/^\/+|\/+$/g, "");
  return COURSES.find(c => c.slug === cleanSlug) || null;
}
