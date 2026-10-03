const fs = require('fs');
const path = require('path');

const LARAVEL_VIEWS_DIR = 'd:\\nodejs\\laravel-sahil\\resources\\views';
const NEXTJS_APP_DIR = 'd:\\nodejs\\netcoder-nextjs\\app';
const CONTENT_PAGES_DIR = 'd:\\nodejs\\netcoder-nextjs\\content\\pages';

if (!fs.existsSync(CONTENT_PAGES_DIR)) {
  fs.mkdirSync(CONTENT_PAGES_DIR, { recursive: true });
}

// Blog data for injection into pages with blog loops
const BLOGS_DATA = [
  {
    slug: 'graphics-trend-blog',
    title: 'Graphics Design Trends in 2026: The Rise of AI and 3D Visuals',
    image: '/images/Graphic-Design-Trend-2025-netcoder.jpg',
    excerpt: 'Explore the modern design movements shaping brand identities, generative AI visual tooling, spatial 3D elements, and hyper-minimalist typography in 2026.',
    author: 'Netcoder Team',
    date: 'Jan 15, 2026',
    readTime: 5,
    category: 'Design'
  },
  {
    slug: 'typography-blog',
    title: 'Typography in Modern Web Design: Fonts That Convert',
    image: '/images/typography.jpg',
    excerpt: 'How font pairings, variable typography, readability contrast, and fluid font scales dramatically improve user engagement and retention across mobile interfaces.',
    author: 'Netcoder Team',
    date: 'Feb 02, 2026',
    readTime: 4,
    category: 'UI/UX'
  },
  {
    slug: 'web-dev-blog',
    title: 'Full Stack Web Development in 2026: Roadmap and Key Skills',
    image: '/images/web-dev-blog.jpg',
    excerpt: 'A complete step-by-step developer roadmap covering Next.js App Router, TypeScript, server actions, PostgreSQL, microservices, and AI integrations.',
    author: 'Netcoder Team',
    date: 'Feb 20, 2026',
    readTime: 6,
    category: 'Development'
  }
];

function generateBlogCardsHtml() {
  return BLOGS_DATA.map(blog => `
    <article class="blog-card">
        <div class="blog-card-thumb">
            <a href="/${blog.slug}" title="${blog.title}">
                <img src="${blog.image}" alt="${blog.title}" loading="lazy" decoding="async">
            </a>
            <span class="blog-card-badge">${blog.category}</span>
        </div>
        <div class="blog-card-content">
            <div class="blog-card-meta">
                <span><i class="fa-regular fa-user"></i> ${blog.author}</span>
                <span><i class="fa-regular fa-calendar-days"></i> ${blog.date}</span>
                <span><i class="fa-regular fa-clock"></i> ${blog.readTime} min read</span>
            </div>
            <h3 class="blog-card-title">
                <a href="/${blog.slug}" title="${blog.title}">
                    ${blog.title}
                </a>
            </h3>
            <p class="blog-card-excerpt">
                ${blog.excerpt}
            </p>
            <div class="blog-card-footer">
                <a href="/${blog.slug}" class="blog-card-read" title="Read more: ${blog.title}">
                    <span>Read Article</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>
        </div>
    </article>
  `).join('\n');
}

function generateSimpleBlogCardsHtml() {
  return BLOGS_DATA.map(blog => `
    <div class="blog-card">
        <a href="/${blog.slug}">
            <img src="${blog.image}" alt="${blog.title}" loading="lazy" decoding="async">
        </a>
        <a href="/${blog.slug}">
            <h5>${blog.title}</h5>
        </a>
        <div>
            <small>#${blog.category}</small>
        </div>
    </div>
  `).join('\n');
}

function cleanBladeContent(rawContent, filename, isStandalone = false) {
  let content = rawContent;

  // Extract Title
  let title = "Netcoder Technology | Best IT Training Institute in Dharamshala";
  const titleMatch = content.match(/@section\(['"]title['"],\s*['"]([^'"]+)['"]\)/) ||
                     content.match(/@section\(['"]title['"]\)([\s\S]*?)@endsection/) ||
                     content.match(/<title>([^<]+)<\/title>/);
  if (titleMatch) {
    title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  // Extract Meta Description
  let description = "Professional IT training and digital services in Dharamshala at Netcoder Technology.";
  const descMatch = content.match(/@section\(['"]meta_description['"],\s*['"]([^'"]+)['"]\)/) ||
                    content.match(/@section\(['"]meta_description['"]\)([\s\S]*?)@endsection/) ||
                    content.match(/<meta name=["']description["'] content=["']([^"']+)["']/);
  if (descMatch) {
    description = descMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  // Extract body/content
  let bodyHtml = "";
  if (isStandalone) {
    // For standalone full HTML pages like bootcamp.blade.php or feedback.blade.php
    if (content.includes("<body")) {
      const bodyTagEnd = content.indexOf(">", content.indexOf("<body")) + 1;
      const endBodyIdx = content.lastIndexOf("</body>");
      bodyHtml = endBodyIdx > bodyTagEnd ? content.substring(bodyTagEnd, endBodyIdx) : content;

      // Also extract any <style> from head if present (like in feedback)
      const styleMatches = content.match(/<style[\s\S]*?<\/style>/gi);
      if (styleMatches) {
        bodyHtml = styleMatches.join('\n') + '\n' + bodyHtml;
      }
    } else {
      bodyHtml = content;
    }
  } else if (content.includes("@section('content')")) {
    const startIdx = content.indexOf("@section('content')") + "@section('content')".length;
    // Find the FIRST @endsection or @stop after @section('content')
    let endIdx = content.indexOf("@endsection", startIdx);
    const stopIdx = content.indexOf("@stop", startIdx);
    if (endIdx === -1 || (stopIdx !== -1 && stopIdx < endIdx)) {
      endIdx = stopIdx;
    }
    if (endIdx !== -1) {
      bodyHtml = content.substring(startIdx, endIdx);
    } else {
      bodyHtml = content.substring(startIdx);
    }
  } else {
    bodyHtml = content;
  }

  // Strip duplicate bottom popup modal if present in course pages
  const bookDemoIdx = bodyHtml.indexOf('<div class="book-demo">');
  const popupCommentIdx = bodyHtml.indexOf('<!-- PopUp Form Start -->');
  const otpModalIdx = bodyHtml.indexOf('<div class="background" id="otpModal">');

  let cutIdx = -1;
  if (popupCommentIdx !== -1) {
    cutIdx = popupCommentIdx;
  } else if (bookDemoIdx !== -1) {
    cutIdx = bookDemoIdx;
  } else if (otpModalIdx !== -1) {
    cutIdx = otpModalIdx;
  }

  if (cutIdx !== -1) {
    bodyHtml = bodyHtml.substring(0, cutIdx).trim();
  }

  // Replace Asset paths
  bodyHtml = bodyHtml.replace(/\{\{\s*asset\(['"]images\/([^'"]+)['"]\)\s*\}\}/g, '/images/$1');
  bodyHtml = bodyHtml.replace(/\{\{\s*asset\(['"]bootcampimages['"]\)\s*\}\}/g, '/bootcampimages');
  bodyHtml = bodyHtml.replace(/\{\{\s*asset\(['"]bootcampimages\/([^'"]+)['"]\)\s*\}\}/g, '/bootcampimages/$1');
  bodyHtml = bodyHtml.replace(/\{\{\s*asset\(['"]css\/([^'"]+)['"]\)\s*\}\}/g, '/css/$1');
  bodyHtml = bodyHtml.replace(/\{\{\s*asset\(['"]js\/([^'"]+)['"]\)\s*\}\}/g, '/js/$1');
  bodyHtml = bodyHtml.replace(/\{\{\s*asset\(['"]([^'"]+)['"]\)\s*\}\}/g, '/$1');
  bodyHtml = bodyHtml.replace(/\{\{\s*url\(['"]\/([^'"]+)['"]\)\s*\}\}/g, '/$1');
  bodyHtml = bodyHtml.replace(/\{\{\s*url\(['"]\/['"]\)\s*\}\}/g, '/');
  bodyHtml = bodyHtml.replace(/\{\{\s*url\(['"]([^'"]+)['"]\)\s*\}\}/g, '/$1');

  // Replace Blade Directives
  bodyHtml = bodyHtml.replace(/@verbatim/g, '').replace(/@endverbatim/g, '');
  bodyHtml = bodyHtml.replace(/@csrf/g, '');
  bodyHtml = bodyHtml.replace(/\{\{\s*now\(\)->year\s*\}\}/g, '2026');

  // Replace PHP blog loops on homepage
  if (bodyHtml.includes('@if(isset($blogs)')) {
    bodyHtml = bodyHtml.replace(
      /@if\(isset\(\$blogs\)[\s\S]*?@endif/g,
      `<div class="blog-col">\n${generateBlogCardsHtml()}\n</div>\n<div class="button"><a href="/blog" class="color-btn">Read All Blogs</a></div>`
    );
  }

  // Replace PHP blog loops in online courses
  if (bodyHtml.includes('<?php if (!empty($blogs)): ?>')) {
    bodyHtml = bodyHtml.replace(
      /<\?php if \(!empty\(\$blogs\)\): \?>[\s\S]*?<\?php endif; \?>/g,
      generateSimpleBlogCardsHtml()
    );
  }

  // Replace PHP blog loops in blogs/index
  if (bodyHtml.includes('@if (isset($blogs)')) {
    bodyHtml = bodyHtml.replace(
      /@if \(isset\(\$blogs\)[\s\S]*?@endif\s*@else[\s\S]*?@endif/g,
      `<div class="blog-col">\n${generateBlogCardsHtml()}\n</div>`
    );
  }

  // Replace categories loop in blogs/index
  if (bodyHtml.includes('@if(isset($categories)')) {
    bodyHtml = bodyHtml.replace(
      /@if\(isset\(\$categories\)[\s\S]*?@endif/g,
      `<div class="sidebar-widget">
          <h4><i class="fa-solid fa-folder-open" style="color: #ff5532;"></i> Categories</h4>
          <ul class="category-list">
              <li><a href="/blog" class="active"><span>All Categories</span><i class="fa-solid fa-chevron-right" style="font-size: 0.75rem;"></i></a></li>
              <li><a href="/blog"><span>Development</span><i class="fa-solid fa-chevron-right" style="font-size: 0.75rem;"></i></a></li>
              <li><a href="/blog"><span>UI/UX Design</span><i class="fa-solid fa-chevron-right" style="font-size: 0.75rem;"></i></a></li>
              <li><a href="/blog"><span>Data Science</span><i class="fa-solid fa-chevron-right" style="font-size: 0.75rem;"></i></a></li>
              <li><a href="/blog"><span>Cyber Security</span><i class="fa-solid fa-chevron-right" style="font-size: 0.75rem;"></i></a></li>
              <li><a href="/blog"><span>Digital Marketing</span><i class="fa-solid fa-chevron-right" style="font-size: 0.75rem;"></i></a></li>
          </ul>
      </div>`
    );
  }

  // Replace recent posts loop in blogs/index
  if (bodyHtml.includes('@if(isset($recentBlogs)')) {
    const recentPostsHtml = BLOGS_DATA.map(b => `
      <div class="recent-post-item">
          <div class="recent-post-thumb">
              <a href="/${b.slug}"><img src="${b.image}" alt="${b.title}" loading="lazy" decoding="async"></a>
          </div>
          <div>
              <h5 class="recent-post-title"><a href="/${b.slug}">${b.title}</a></h5>
              <span class="recent-post-date"><i class="fa-regular fa-calendar-days"></i> ${b.date}</span>
          </div>
      </div>
    `).join('\n');

    bodyHtml = bodyHtml.replace(
      /@if\(isset\(\$recentBlogs\)[\s\S]*?@endif/g,
      `<div class="sidebar-widget">
          <h4><i class="fa-solid fa-fire" style="color: #ff5532;"></i> Recent Articles</h4>
          <div class="recent-posts-list">
              ${recentPostsHtml}
          </div>
      </div>`
    );
  }

  // Remove any remaining raw PHP tags
  bodyHtml = bodyHtml.replace(/<\?php[\s\S]*?\?>/g, '');

  return { title, description, bodyHtml };
}

// All views mapping
const views = [
  // Static Core Pages
  { file: 'index.blade.php', slug: 'home', dir: '', isHome: true },
  { file: 'about.blade.php', slug: 'about', dir: 'about' },
  { file: 'contact.blade.php', slug: 'contact', dir: 'contact' },
  { file: 'services.blade.php', slug: 'services', dir: 'services' },
  { file: 'career.blade.php', slug: 'career', dir: 'career' },
  { file: 'gallery.blade.php', slug: 'gallery', dir: 'gallery' },
  { file: 'industrial-training.blade.php', slug: 'industrial-training', dir: 'industrial-training' },
  { file: 'privacy-policy.blade.php', slug: 'privacy-policy', dir: 'privacy-policy' },
  { file: 'on-campus-courses.blade.php', slug: 'on-campus-courses', dir: 'on-campus-courses' },
  { file: 'bootcamp.blade.php', slug: 'bootcamp', dir: 'bootcamp', isStandalone: true },
  { file: 'feedback.blade.php', slug: 'feedback', dir: 'feedback', isStandalone: true },
  { file: 'blogs/index.blade.php', slug: 'blog', dir: 'blog' },

  // On-Campus Courses (26)
  { file: 'animation.blade.php', slug: 'animation', dir: 'animation' },
  { file: 'autocad.blade.php', slug: 'autocad', dir: 'autocad' },
  { file: 'business-analytics.blade.php', slug: 'business-analytics', dir: 'business-analytics' },
  { file: 'cyber-security.blade.php', slug: 'cyber-security', dir: 'cyber-security' },
  { file: 'data-analytics.blade.php', slug: 'data-analytics', dir: 'data-analytics' },
  { file: 'data-science-machine-learning.blade.php', slug: 'data-science-machine-learning', dir: 'data-science-machine-learning' },
  { file: 'data-structures.blade.php', slug: 'data-structures', dir: 'data-structures' },
  { file: 'devops-course.blade.php', slug: 'devops-course', dir: 'devops-course' },
  { file: 'digital-content-creator.blade.php', slug: 'digital-content-creator', dir: 'digital-content-creator' },
  { file: 'digital-marketing.blade.php', slug: 'digital-marketing', dir: 'digital-marketing' },
  { file: 'ethical-hacking.blade.php', slug: 'ethical-hacking', dir: 'ethical-hacking' },
  { file: 'foundation-graphic.blade.php', slug: 'foundation-graphic', dir: 'foundation-graphic' },
  { file: 'fullstack-web-development.blade.php', slug: 'fullstack-web-development', dir: 'fullstack-web-development' },
  { file: 'graphic-and-web-designing.blade.php', slug: 'graphic-and-web-designing', dir: 'graphic-and-web-designing' },
  { file: 'mean-stack.blade.php', slug: 'mean-stack', dir: 'mean-stack' },
  { file: 'mern-stack.blade.php', slug: 'mern-stack', dir: 'mern-stack' },
  { file: 'motion-graphics.blade.php', slug: 'motion-graphics', dir: 'motion-graphics' },
  { file: 'php-training.blade.php', slug: 'php-training', dir: 'php-training' },
  { file: 'seo-course.blade.php', slug: 'seo-course', dir: 'seo-course' },
  { file: 'social-media-marketing.blade.php', slug: 'social-media-marketing', dir: 'social-media-marketing' },
  { file: 'software-engineering.blade.php', slug: 'software-engineering', dir: 'software-engineering' },
  { file: 'system-design.blade.php', slug: 'system-design', dir: 'system-design' },
  { file: 'ui-ux.blade.php', slug: 'ui-ux', dir: 'ui-ux' },
  { file: 'web-designing.blade.php', slug: 'web-designing', dir: 'web-designing' },
  { file: 'web-development.blade.php', slug: 'web-development', dir: 'web-development' },
  { file: 'wordpress.blade.php', slug: 'wordpress', dir: 'wordpress' },

  // Online Courses (5)
  { file: 'data-analytics-online.blade.php', slug: 'data-analytics-online', dir: 'data-analytics-online' },
  { file: 'data-science-online.blade.php', slug: 'data-science-online', dir: 'data-science-online' },
  { file: 'digital-marketing-online.blade.php', slug: 'digital-marketing-online', dir: 'digital-marketing-online' },
  { file: 'ethical-hacking-online.blade.php', slug: 'ethical-hacking-online', dir: 'ethical-hacking-online' },
  { file: 'web&app-online.blade.php', slug: 'web-app-online', dir: 'web-app-online' },

  // Static Blog Articles
  { file: 'graphics-trend-blog.blade.php', slug: 'graphics-trend-blog', dir: 'graphics-trend-blog' },
  { file: 'typography-blog.blade.php', slug: 'typography-blog', dir: 'typography-blog' },
  { file: 'web-dev-blog.blade.php', slug: 'web-dev-blog', dir: 'web-dev-blog' },
  { file: 'blog-4.blade.php', slug: 'blog-4', dir: 'blog-4' },
];

console.log(`Starting conversion of ${views.length} views from Laravel to Next.js...`);

let successCount = 0;

for (const item of views) {
  const bladePath = path.join(LARAVEL_VIEWS_DIR, item.file);
  if (!fs.existsSync(bladePath)) {
    console.warn(`File not found: ${bladePath}`);
    continue;
  }

  const raw = fs.readFileSync(bladePath, 'utf-8');
  const { title, description, bodyHtml } = cleanBladeContent(raw, item.file, item.isStandalone);

  // Write content HTML file
  const htmlFilePath = path.join(CONTENT_PAGES_DIR, `${item.slug}.html`);
  fs.writeFileSync(htmlFilePath, bodyHtml.trim(), 'utf-8');

  // Ensure page dir exists
  const targetDir = item.dir ? path.join(NEXTJS_APP_DIR, item.dir) : NEXTJS_APP_DIR;
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Generate page.js
  const pageJsPath = path.join(targetDir, 'page.js');
  const pageJsContent = `import fs from "fs";
import path from "path";
import HtmlContent from "@/components/HtmlContent";

export const metadata = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)}
};

export default function Page() {
  const filePath = path.join(process.cwd(), "content/pages", "${item.slug}.html");
  const html = fs.readFileSync(filePath, "utf-8");
  return <HtmlContent html={html} pageSlug="${item.slug}" />;
}
`;

  fs.writeFileSync(pageJsPath, pageJsContent, 'utf-8');
  successCount++;
  console.log(`[OK] Converted ${item.file} -> content/pages/${item.slug}.html & ${item.dir || 'app'}/page.js`);
}

console.log(`Successfully converted ${successCount} pages!`);
