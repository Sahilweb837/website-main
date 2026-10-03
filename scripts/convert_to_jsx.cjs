const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const LARAVEL_VIEWS_DIR = 'd:\\nodejs\\laravel-sahil\\resources\\views';
const NEXTJS_APP_DIR = 'd:\\nodejs\\netcoder-nextjs\\app';

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr',
  'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'stop', 'use'
]);

const SVG_TAG_CASING = {
  'lineargradient': 'linearGradient',
  'radialgradient': 'radialGradient',
  'clippath': 'clipPath',
  'foreignobject': 'foreignObject',
  'textpath': 'textPath'
};

const ATTR_MAP = {
  'class': 'className',
  'for': 'htmlFor',
  'tabindex': 'tabIndex',
  'autocomplete': 'autoComplete',
  'autofocus': 'autoFocus',
  'readonly': 'readOnly',
  'maxlength': 'maxLength',
  'minlength': 'minLength',
  'srcset': 'srcSet',
  'crossorigin': 'crossOrigin',
  'cellspacing': 'cellSpacing',
  'cellpadding': 'cellPadding',
  'rowspan': 'rowSpan',
  'colspan': 'colSpan',
  'charset': 'charSet',
  'itemscope': 'itemScope',
  'itemtype': 'itemType',
  'itemprop': 'itemProp',
  // SVG
  'viewbox': 'viewBox',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-opacity': 'strokeOpacity',
  'fill-rule': 'fillRule',
  'fill-opacity': 'fillOpacity',
  'clip-rule': 'clipRule',
  'clip-path': 'clipPath',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'xlink:href': 'xlinkHref',
  'xmlns:xlink': 'xmlnsXlink'
};

function parseStyle(styleStr) {
  if (!styleStr || typeof styleStr !== 'string') return null;
  const obj = {};
  const rules = styleStr.split(';').map(r => r.trim()).filter(Boolean);
  for (const rule of rules) {
    const colon = rule.indexOf(':');
    if (colon === -1) continue;
    const prop = rule.slice(0, colon).trim();
    const val = rule.slice(colon + 1).trim();
    if (!prop || !val) continue;
    let camelProp = prop;
    if (prop.startsWith('--')) {
      camelProp = prop;
    } else {
      camelProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    }
    obj[camelProp] = val;
  }
  return Object.keys(obj).length > 0 ? obj : null;
}

function serializeNodeToJsx(node, indent = 0) {
  const pad = '  '.repeat(indent);

  if (node.type === 'text') {
    const text = node.data;
    if (!text.trim()) return text.includes('\n') ? '\n' + pad : ' ';
    const escaped = text
      .replace(/\{/g, "{'{'}")
      .replace(/\}/g, "{'}'}")
      .replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[a-fA-F0-9]+);)/g, '&amp;');
    return escaped;
  }

  if (node.type === 'comment') {
    const cleanComment = node.data.trim().replace(/\*\//g, '* /');
    return `\n${pad}{/* ${cleanComment} */}\n`;
  }

  if (node.type === 'tag') {
    let tagName = node.name.toLowerCase();
    if (SVG_TAG_CASING[tagName]) {
      tagName = SVG_TAG_CASING[tagName];
    }

    if (tagName === 'style') {
      const css = (node.children || []).map(c => c.data || '').join('');
      return `\n${pad}<style dangerouslySetInnerHTML={{ __html: ${JSON.stringify(css)} }} />\n`;
    }

    if (tagName === 'script') {
      const code = (node.children || []).map(c => c.data || '').join('');
      const attribs = node.attribs || {};
      if (attribs.src) {
        return `${pad}<script src=${JSON.stringify(attribs.src)} ${attribs.defer !== undefined ? 'defer ' : ''}/>`;
      }
      return `${pad}<script dangerouslySetInnerHTML={{ __html: ${JSON.stringify(code)} }} />`;
    }

    const attrs = [];
    const attribs = node.attribs || {};

    for (const [rawKey, rawVal] of Object.entries(attribs)) {
      const lowerKey = rawKey.toLowerCase();

      if (lowerKey === 'style') {
        const styleObj = parseStyle(rawVal);
        if (styleObj) {
          attrs.push(`style={${JSON.stringify(styleObj)}}`);
        }
        continue;
      }

      if (lowerKey === 'onclick') {
        if (rawVal.includes('openBox') || rawVal.includes('openServiceModal')) {
          attrs.push('data-modal-trigger="demo"');
        } else if (rawVal.includes('closeSuccessModal')) {
          attrs.push('data-modal-close="success"');
        }
        continue;
      }

      if (lowerKey === 'onsubmit') {
        continue;
      }

      if (['disabled', 'required', 'readonly', 'autofocus'].includes(lowerKey)) {
        attrs.push(ATTR_MAP[lowerKey] || lowerKey);
        continue;
      }
      if (lowerKey === 'checked') {
        attrs.push('defaultChecked');
        continue;
      }

      const jsxKey = ATTR_MAP[lowerKey] || rawKey;
      attrs.push(`${jsxKey}=${JSON.stringify(rawVal)}`);
    }

    const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';
    const isVoid = VOID_ELEMENTS.has(tagName) && (!node.children || node.children.length === 0);

    if (isVoid) {
      return `${pad}<${tagName}${attrStr} />`;
    }

    const children = (node.children || [])
      .map(child => serializeNodeToJsx(child, indent + 1))
      .join('');

    return `${pad}<${tagName}${attrStr}>${children}</${tagName}>`;
  }

  return '';
}

function htmlToJsx(htmlString) {
  const $ = cheerio.load(htmlString, { xmlMode: false, decodeEntities: false });
  const root = $('body')[0] || $.root()[0];
  const children = root.children || [];
  return children.map(c => serializeNodeToJsx(c, 3)).join('\n');
}

// Blog data for injection into pages
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

  // Title
  let title = "Netcoder Technology | Best IT Training Institute in Dharamshala";
  const titleMatch = content.match(/@section\(['"]title['"],\s*['"]([^'"]+)['"]\)/) ||
                     content.match(/@section\(['"]title['"]\)([\s\S]*?)@endsection/) ||
                     content.match(/<title>([^<]+)<\/title>/);
  if (titleMatch) {
    title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  // Meta Description
  let description = "Professional IT training and digital services in Dharamshala at Netcoder Technology.";
  const descMatch = content.match(/@section\(['"]meta_description['"],\s*['"]([^'"]+)['"]\)/) ||
                    content.match(/@section\(['"]meta_description['"]\)([\s\S]*?)@endsection/) ||
                    content.match(/<meta name=["']description["'] content=["']([^"']+)["']/);
  if (descMatch) {
    description = descMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  // Canonical
  let canonical = "";
  const canonMatch = content.match(/<link rel=["']canonical["'] href=["']([^"']+)["']/);
  if (canonMatch) {
    canonical = canonMatch[1];
  }

  // JSON-LD Schema
  const schemas = [];
  const schemaRegex = /<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  let sMatch;
  while ((sMatch = schemaRegex.exec(content)) !== null) {
    let rawJson = sMatch[1].replace(/@verbatim/g, '').replace(/@endverbatim/g, '').trim();
    try {
      const parsed = JSON.parse(rawJson);
      schemas.push(parsed);
    } catch (e) {
      // ignore
    }
  }

  // Extract body/content
  let bodyHtml = "";
  if (isStandalone) {
    if (content.includes("<body")) {
      const bodyTagEnd = content.indexOf(">", content.indexOf("<body")) + 1;
      const endBodyIdx = content.lastIndexOf("</body>");
      bodyHtml = endBodyIdx > bodyTagEnd ? content.substring(bodyTagEnd, endBodyIdx) : content;

      const styleMatches = content.match(/<style[\s\S]*?<\/style>/gi);
      if (styleMatches) {
        bodyHtml = styleMatches.join('\n') + '\n' + bodyHtml;
      }
    } else {
      bodyHtml = content;
    }
  } else if (content.includes("@section('content')")) {
    const startIdx = content.indexOf("@section('content')") + "@section('content')".length;
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

  // Fix rogue closing tags
  bodyHtml = bodyHtml.replace(/<\/([a-zA-Z0-9]+)>>/g, '</$1>');

  // Clean form old/error blade directives
  bodyHtml = bodyHtml.replace(/\{\{\s*old\([^)]*\)[^}]*\}\}/g, '');
  bodyHtml = bodyHtml.replace(/\{\{\s*in_array\([^)]*\)[^}]*\}\}/g, '');
  bodyHtml = bodyHtml.replace(/\{\{\s*\$errors->[^}]*\}\}/g, '');
  bodyHtml = bodyHtml.replace(/@error\([^)]*\)[\s\S]*?@enderror/g, '');
  bodyHtml = bodyHtml.replace(/@if\s*\(\s*session\('error'\)\s*\)[\s\S]*?@endif/g, '');
  bodyHtml = bodyHtml.replace(/@if\s*\(\s*session\('success'\)\s*\)[\s\S]*?@endif/g, '');
  bodyHtml = bodyHtml.replace(/\{\{\s*session\([^)]*\)\s*\}\}/g, '');
  bodyHtml = bodyHtml.replace(/\{\{\s*csrf_token\(\)\s*\}\}/g, '');

  // Clean search filter bar in blogs/index
  bodyHtml = bodyHtml.replace(/@if\s*\(!empty\(\$search\)[\s\S]*?@endif/g, '');
  bodyHtml = bodyHtml.replace(/\{\{\s*\$search\s*\?\?\s*''\s*\}\}/g, '');

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

  return { title, description, canonical, schemas, bodyHtml };
}

// All views mapping
const views = [
  // Static Core Pages
  { file: 'index.blade.php', slug: 'home', dir: '', compName: 'HomePage', isHome: true },
  { file: 'about.blade.php', slug: 'about', dir: 'about', compName: 'AboutPage' },
  { file: 'contact.blade.php', slug: 'contact', dir: 'contact', compName: 'ContactPage' },
  { file: 'services.blade.php', slug: 'services', dir: 'services', compName: 'ServicesPage' },
  { file: 'career.blade.php', slug: 'career', dir: 'career', compName: 'CareerPage' },
  { file: 'gallery.blade.php', slug: 'gallery', dir: 'gallery', compName: 'GalleryPage' },
  { file: 'industrial-training.blade.php', slug: 'industrial-training', dir: 'industrial-training', compName: 'IndustrialTrainingPage' },
  { file: 'privacy-policy.blade.php', slug: 'privacy-policy', dir: 'privacy-policy', compName: 'PrivacyPolicyPage' },
  { file: 'on-campus-courses.blade.php', slug: 'on-campus-courses', dir: 'on-campus-courses', compName: 'OnCampusCoursesPage' },
  { file: 'bootcamp.blade.php', slug: 'bootcamp', dir: 'bootcamp', compName: 'BootcampPage', isStandalone: true },
  { file: 'feedback.blade.php', slug: 'feedback', dir: 'feedback', compName: 'FeedbackPage', isStandalone: true },
  { file: 'blogs/index.blade.php', slug: 'blog', dir: 'blog', compName: 'BlogArchivePage' },

  // On-Campus Courses (26)
  { file: 'animation.blade.php', slug: 'animation', dir: 'animation', compName: 'AnimationPage' },
  { file: 'autocad.blade.php', slug: 'autocad', dir: 'autocad', compName: 'AutocadPage' },
  { file: 'business-analytics.blade.php', slug: 'business-analytics', dir: 'business-analytics', compName: 'BusinessAnalyticsPage' },
  { file: 'cyber-security.blade.php', slug: 'cyber-security', dir: 'cyber-security', compName: 'CyberSecurityPage' },
  { file: 'data-analytics.blade.php', slug: 'data-analytics', dir: 'data-analytics', compName: 'DataAnalyticsPage' },
  { file: 'data-science-machine-learning.blade.php', slug: 'data-science-machine-learning', dir: 'data-science-machine-learning', compName: 'DataScienceMachineLearningPage' },
  { file: 'data-structures.blade.php', slug: 'data-structures', dir: 'data-structures', compName: 'DataStructuresPage' },
  { file: 'devops-course.blade.php', slug: 'devops-course', dir: 'devops-course', compName: 'DevopsCoursePage' },
  { file: 'digital-content-creator.blade.php', slug: 'digital-content-creator', dir: 'digital-content-creator', compName: 'DigitalContentCreatorPage' },
  { file: 'digital-marketing.blade.php', slug: 'digital-marketing', dir: 'digital-marketing', compName: 'DigitalMarketingPage' },
  { file: 'ethical-hacking.blade.php', slug: 'ethical-hacking', dir: 'ethical-hacking', compName: 'EthicalHackingPage' },
  { file: 'foundation-graphic.blade.php', slug: 'foundation-graphic', dir: 'foundation-graphic', compName: 'FoundationGraphicPage' },
  { file: 'fullstack-web-development.blade.php', slug: 'fullstack-web-development', dir: 'fullstack-web-development', compName: 'FullstackWebDevelopmentPage' },
  { file: 'graphic-and-web-designing.blade.php', slug: 'graphic-and-web-designing', dir: 'graphic-and-web-designing', compName: 'GraphicAndWebDesigningPage' },
  { file: 'mean-stack.blade.php', slug: 'mean-stack', dir: 'mean-stack', compName: 'MeanStackPage' },
  { file: 'mern-stack.blade.php', slug: 'mern-stack', dir: 'mern-stack', compName: 'MernStackPage' },
  { file: 'motion-graphics.blade.php', slug: 'motion-graphics', dir: 'motion-graphics', compName: 'MotionGraphicsPage' },
  { file: 'php-training.blade.php', slug: 'php-training', dir: 'php-training', compName: 'PhpTrainingPage' },
  { file: 'seo-course.blade.php', slug: 'seo-course', dir: 'seo-course', compName: 'SeoCoursePage' },
  { file: 'social-media-marketing.blade.php', slug: 'social-media-marketing', dir: 'social-media-marketing', compName: 'SocialMediaMarketingPage' },
  { file: 'software-engineering.blade.php', slug: 'software-engineering', dir: 'software-engineering', compName: 'SoftwareEngineeringPage' },
  { file: 'system-design.blade.php', slug: 'system-design', dir: 'system-design', compName: 'SystemDesignPage' },
  { file: 'ui-ux.blade.php', slug: 'ui-ux', dir: 'ui-ux', compName: 'UiUxPage' },
  { file: 'web-designing.blade.php', slug: 'web-designing', dir: 'web-designing', compName: 'WebDesigningPage' },
  { file: 'web-development.blade.php', slug: 'web-development', dir: 'web-development', compName: 'WebDevelopmentPage' },
  { file: 'wordpress.blade.php', slug: 'wordpress', dir: 'wordpress', compName: 'WordpressPage' },

  // Online Courses (5)
  { file: 'data-analytics-online.blade.php', slug: 'data-analytics-online', dir: 'data-analytics-online', compName: 'DataAnalyticsOnlinePage' },
  { file: 'data-science-online.blade.php', slug: 'data-science-online', dir: 'data-science-online', compName: 'DataScienceOnlinePage' },
  { file: 'digital-marketing-online.blade.php', slug: 'digital-marketing-online', dir: 'digital-marketing-online', compName: 'DigitalMarketingOnlinePage' },
  { file: 'ethical-hacking-online.blade.php', slug: 'ethical-hacking-online', dir: 'ethical-hacking-online', compName: 'EthicalHackingOnlinePage' },
  { file: 'web&app-online.blade.php', slug: 'web-app-online', dir: 'web-app-online', compName: 'WebAppOnlinePage' },

  // Static Blog Articles
  { file: 'graphics-trend-blog.blade.php', slug: 'graphics-trend-blog', dir: 'graphics-trend-blog', compName: 'GraphicsTrendBlogPage' },
  { file: 'typography-blog.blade.php', slug: 'typography-blog', dir: 'typography-blog', compName: 'TypographyBlogPage' },
  { file: 'web-dev-blog.blade.php', slug: 'web-dev-blog', dir: 'web-dev-blog', compName: 'WebDevBlogPage' },
  { file: 'blog-4.blade.php', slug: 'blog-4', dir: 'blog-4', compName: 'Blog4Page' },
];

console.log(`Starting conversion of ${views.length} views to clean Native JSX...`);

let successCount = 0;

for (const item of views) {
  const bladePath = path.join(LARAVEL_VIEWS_DIR, item.file);
  if (!fs.existsSync(bladePath)) {
    console.warn(`File not found: ${bladePath}`);
    continue;
  }

  const raw = fs.readFileSync(bladePath, 'utf-8');
  const { title, description, canonical, schemas, bodyHtml } = cleanBladeContent(raw, item.file, item.isStandalone);

  // Convert HTML to clean JSX
  const jsxBody = htmlToJsx(bodyHtml);

  // Ensure target dir exists
  const targetDir = item.dir ? path.join(NEXTJS_APP_DIR, item.dir) : NEXTJS_APP_DIR;
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Remove old page.js if exists to avoid conflicts with page.jsx
  const oldPageJs = path.join(targetDir, 'page.js');
  if (fs.existsSync(oldPageJs)) {
    fs.unlinkSync(oldPageJs);
  }

  const pageJsxPath = path.join(targetDir, 'page.jsx');

  const schemaScripts = schemas.map(s => `
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ${JSON.stringify(JSON.stringify(s))} }}
      />`).join('');

  const metadataObj = {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: canonical || `https://www.netcoder.in/${item.dir || ''}`,
      siteName: "Netcoder Technology",
      type: "website"
    }
  };

  if (canonical) {
    metadataObj.alternates = { canonical };
  }

  const pageJsxContent = `import Link from "next/link";
import PageInteractiveHandler from "@/components/PageInteractiveHandler";

export const metadata = ${JSON.stringify(metadataObj, null, 2)};

export default function ${item.compName}() {
  return (
    <>
      <PageInteractiveHandler pageSlug="${item.slug}" />
${schemaScripts}
${jsxBody}
    </>
  );
}
`;

  fs.writeFileSync(pageJsxPath, pageJsxContent, 'utf-8');
  successCount++;
  console.log(`[OK] Converted ${item.file} -> ${item.dir || 'app'}/page.jsx (${jsxBody.length} bytes JSX)`);
}

console.log(`Successfully converted ${successCount} views to pure JSX with full SEO!`);
