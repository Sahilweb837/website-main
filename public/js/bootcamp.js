
// =====================================================================
// bootcamp.js — defer script
// EmailJS loads dynamically so no blocking CDN script needed in HTML
// Uses ready() helper so JS runs correctly with or without refresh
// =====================================================================

'use strict';

// ===== DOM READY HELPER =====
// Runs fn immediately if DOM ready, else waits for DOMContentLoaded
function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn, { once: true });
}

// ===== HELPER =====
function qs(selector) { return document.querySelector(selector); }
function qsa(selector) { return document.querySelectorAll(selector); }

// ===== DYNAMIC EMAILJS LOADER =====
function loadEmailJS() {
  return new Promise((resolve) => {
    if (window.emailjs) { resolve(); return; }
    const s = document.createElement('script');
    s.src = 'https://cdn.emailjs.com/sdk/3.2.0/email.min.js';
    s.onload = resolve;
    s.onerror = resolve; // silently continue if CDN fails
    document.head.appendChild(s);
  });
}

async function init() {
  // Load emailjs before anything else
  await loadEmailJS();

  // ===== YEAR =====
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== EMAILJS INIT =====
  const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
  if (window.emailjs) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

      function sendEmail(form, button, successText) {
        if (!window.emailjs) {
          button.disabled = true;
          button.innerHTML = '<i class="fa-solid fa-check"></i> ' + successText;
          setTimeout(function() {
            button.innerHTML = button.dataset.original;
            button.disabled = false;
            form.reset();
          }, 1800);
          return;
        }

        button.disabled = true;
        button.dataset.original = button.dataset.original || button.innerHTML;
        var original = button.dataset.original;
        button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
          .then(function() {
            button.innerHTML = '<i class="fa-solid fa-check"></i> ' + successText;
            setTimeout(function() {
              button.innerHTML = original;
              button.disabled = false;
              form.reset();
            }, 1800);
          }, function(error) {
            console.error('EmailJS error:', error);
            button.innerHTML = original;
            button.disabled = false;
          });
      }

      // ===== NAV =====
      const nav = document.getElementById('nav');
      const toTopBtn = document.getElementById('toTop');
      window.addEventListener('scroll', function() {
        const scrolled = window.scrollY > 40;
        nav.classList.toggle('scrolled', scrolled);
        toTopBtn.classList.toggle('show', window.scrollY > 700);
      }, { passive: true });
      toTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      // ===== HERO SKILL BARS =====
      window.addEventListener('load', function() {
        setTimeout(function() {
          qsa('.bb-bar i').forEach(function(bar) {
            var w = bar.style.getPropertyValue('--w');
            bar.style.width = w;
          });
        }, 400);
      });

      // ===== HERO SLIDER =====
      var heroSlides = qsa('.hero-slide');
      var heroDots = qsa('.hero-dot');
      var heroPortfolioUrl = document.getElementById('heroPortfolioUrl');
      var heroCurrentIndex = 0;

      function updateHeroSlide(index) {
        if (!heroSlides.length) return;
        heroCurrentIndex = (index + heroSlides.length) % heroSlides.length;

        heroSlides.forEach(function(slide, i) {
          slide.classList.toggle('is-active', i === heroCurrentIndex);
        });

        heroDots.forEach(function(dot, i) {
          dot.classList.toggle('is-active', i === heroCurrentIndex);
          dot.setAttribute('aria-pressed', i === heroCurrentIndex ? 'true' : 'false');
        });

        var activeSlide = heroSlides[heroCurrentIndex];
        if (heroPortfolioUrl && activeSlide) {
          heroPortfolioUrl.innerHTML = '<i class="fa-solid fa-lock"></i> ' + (activeSlide.dataset.url || 'netcoder.in/portfolio/aditya');
        }
      }

      heroDots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
          updateHeroSlide(index);
        });
      });

      if (heroSlides.length > 1) {
        setInterval(function() {
          updateHeroSlide(heroCurrentIndex + 1);
        }, 3200);
      }

      // ===== SCROLL REVEAL =====
      var revealEls = qsa('.reveal');
      var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(function(el) { revealObserver.observe(el); });

      // ===== COUNTERS =====
      var counters = qsa('.trust-stat .num');
      var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseInt(el.dataset.count, 10);
          var suffix = el.dataset.suffix || '';
          var current = 0;
          var duration = 1400;
          var startTime = performance.now();
          function updateCounter(now) {
            var progress = Math.min(1, (now - startTime) / duration);
            var eased = 1 - Math.pow(1 - progress, 3);
            current = Math.round(target * eased);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(updateCounter);
          }
          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(el);
        });
      }, { threshold: 0.4 });
      counters.forEach(function(c) { counterObserver.observe(c); });

      // ===== DATA: PROGRAMS =====
      var programsData = [
        { icon: 'fa-code', name: 'Frontend Foundations', outcome: 'HTML & CSS Developer', duration: '6 Months',
          skills: ['Semantic HTML', 'CSS Layout', 'Responsive UI', 'Accessibility'], salary: '₹3 - 6 LPA' },
        { icon: 'fa-js', name: 'JavaScript Development', outcome: 'JavaScript Developer', duration: '6 Months',
          skills: ['ES6+', 'DOM', 'Async JS', 'REST APIs'], salary: '₹3 - 7 LPA' },
        { icon: 'fa-brands fa-react', name: 'React Application Development', outcome: 'React Developer', duration: '6 Months',
          skills: ['Components', 'Hooks', 'Routing', 'State'], salary: '₹4 - 8 LPA' },
        { icon: 'fa-pen-nib', name: 'UI Engineering', outcome: 'UI Developer', duration: '6 Months',
          skills: ['Design Systems', 'Figma Handoff', 'Motion', 'UX Basics'], salary: '₹3 - 7 LPA' },
        { icon: 'fa-git-alt', name: 'Frontend Project Workflow', outcome: 'Production-Ready Developer', duration: '6 Months',
          skills: ['Git', 'Testing', 'Deployment', 'Code Reviews'], salary: '₹4 - 8 LPA' },
        { icon: 'fa-id-card', name: 'Portfolio & Career Launch', outcome: 'Job-Ready Frontend Developer', duration: '6 Months',
          skills: ['Case Studies', 'Resume', 'Interviews', 'Freelancing'], salary: '₹3 - 8 LPA' }
      ];

      var programsGrid = document.getElementById('programsGrid');
      programsData.forEach(function(p, i) {
        var iconClass = p.icon;
        if (p.icon === 'fa-python') iconClass = 'fa-brands fa-python';
        else if (p.icon === 'fa-film') iconClass = 'fa-solid fa-film';
        else if (p.icon === 'fa-robot' && p.name.includes('Gen AI')) iconClass = 'fa-solid fa-robot';
        else if (p.icon === 'fa-brain') iconClass = 'fa-solid fa-brain';
        else if (p.icon === 'fa-chart-line') iconClass = 'fa-solid fa-chart-line';
        else if (p.icon === 'fa-chart-simple') iconClass = 'fa-solid fa-chart-simple';
        else if (p.icon === 'fa-bullhorn') iconClass = 'fa-solid fa-bullhorn';
        else iconClass = 'fa-solid ' + p.icon;

        var skillsHtml = p.skills.map(function(s) { return '<span>' + s + '</span>'; }).join('');
        var html = '<div class="prog-card card reveal" style="--i:' + (i % 3) + '">' +
          '<div class="prog-top"><div class="prog-ico"><i class="' + iconClass + '"></i></div><span class="prog-duration">' + p.duration + '</span></div>' +
          '<h4>' + p.name + '</h4><div class="outcome">' + p.outcome + '</div>' +
          '<div class="prog-skills">' + skillsHtml + '</div>' +
          '<div class="prog-foot"><div class="prog-salary">' + p.salary + '<span>Expected Salary</span></div><a href="#leadform" class="btn-text">Learn more <i class="fa-solid fa-arrow-right"></i></a></div>' +
          '</div>';
        programsGrid.insertAdjacentHTML('beforeend', html);
      });
      qsa('#programsGrid .reveal').forEach(function(el) { revealObserver.observe(el); });

      // ===== DATA: PROJECTS =====
      var projectsData = [
        { icon: 'fa-cart-shopping', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80', name: 'Conversion-Focused Storefront', tech: 'React - JavaScript - CSS',
          out: 'A responsive shop experience with filters, cart states, and a thoughtful checkout flow.' },
        { icon: 'fa-chart-line', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80', name: 'Analytics Dashboard', tech: 'React - REST APIs - Charts',
          out: 'A data-rich dashboard with reusable components, loading states, and accessible controls.' },
        { icon: 'fa-mobile-screen-button', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80', name: 'Mobile-First Product Landing Page', tech: 'HTML - CSS - JavaScript',
          out: 'A polished launch page that adapts beautifully from a small screen to a wide display.' },
        { icon: 'fa-calendar-check', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80', name: 'Event Booking Experience', tech: 'React - Forms - API Integration',
          out: 'Search, ticket selection, validation, and confirmation screens built as a complete user journey.' },
        { icon: 'fa-comments', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80', name: 'Team Collaboration Workspace', tech: 'React - State Management - Git',
          out: 'A multi-view workspace that demonstrates clean UI architecture and collaborative coding habits.' },
        { icon: 'fa-id-card', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=80', name: 'Developer Portfolio', tech: 'HTML - CSS - JavaScript',
          out: 'Your personal case-study site with project storytelling, motion, and a recruiter-friendly structure.' }
      ];
      var projectsGrid = document.getElementById('projectsGrid');
      projectsData.forEach(function(p, i) {
        var html = '<div class="proj-card card reveal" style="--i:' + (i % 3) + '">' +
          '<div class="proj-thumb"><img src="' + p.image + '" alt="' + p.name + '" loading="lazy" /><div class="badge-ico"><i class="fa-solid ' + p.icon + '"></i></div></div>' +
          '<div class="proj-body"><h4>' + p.name + '</h4><div class="tech">' + p.tech + '</div><p>' + p.out + '</p></div>' +
          '</div>';
        projectsGrid.insertAdjacentHTML('beforeend', html);
      });
      qsa('#projectsGrid .reveal').forEach(function(el) { revealObserver.observe(el); });

      // ===== TOOLS =====
      var toolsData = [
        ['fa-brands fa-html5', 'HTML5'], ['fa-brands fa-css3-alt', 'CSS3'], ['fa-brands fa-js', 'JavaScript'],
        ['fa-brands fa-bootstrap', 'Bootstrap'], ['fa-solid fa-wind', 'Tailwind CSS'], ['fa-brands fa-react', 'React'],
        ['fa-brands fa-node', 'Node.js'], ['fa-brands fa-php', 'PHP'], ['fa-brands fa-python', 'Python'],
        ['fa-solid fa-database', 'MySQL'], ['fa-solid fa-leaf', 'MongoDB'], ['fa-brands fa-git-alt', 'Git'],
        ['fa-brands fa-github', 'GitHub'], ['fa-brands fa-figma', 'Figma'], ['fa-solid fa-vector-square', 'Adobe XD'],
        ['fa-solid fa-paintbrush', 'Canva'], ['fa-solid fa-chart-column', 'Power BI'],
        ['fa-solid fa-network-wired', 'TensorFlow'], ['fa-solid fa-comments', 'ChatGPT'],
        ['fa-solid fa-wand-magic-sparkles', 'AI Tools'], ['fa-solid fa-film', 'Premiere Pro'],
        ['fa-solid fa-clapperboard', 'After Effects']
      ];
      var toolsTrack = document.getElementById('toolsTrack');
      var allTools = toolsData.concat(toolsData);
      allTools.forEach(function(tool) {
        toolsTrack.insertAdjacentHTML('beforeend',
          '<div class="tool-chip"><i class="' + tool[0] + '"></i>' + tool[1] + '</div>'
        );
      });

      // ===== MENTORS =====
      var mentorsData = [
        { name: 'Nitin Kapoor', role: 'Managing Director ', exp: 'Leadership & Creative Tech Mentor',
          photo: '', tags: ['Leadership', 'Frontend Careers', 'Portfolio Reviews'],
          color: 'linear-gradient(135deg,#ff5532,#e2431f)' },
        { name: 'Samar Kapoor', role: 'UI/UX & Video Editior', exp: 'Design & Media Trainer',
          photo: '', tags: ['UI Systems', 'Figma Handoff', 'Visual Design'], color: 'linear-gradient(135deg,#4b6bff,#3a4fd8)' },
        { name: 'Aman Dogra', role: 'AutoCAD Mentor', exp: 'CAD & Drafting Trainer',
          photo: '', tags: ['HTML/CSS', 'JavaScript', 'React'],
          color: 'linear-gradient(135deg,#18b47b,#0f9d67)' },
        { name: 'Prayerna Awasthi', role: 'Communication & Interview Prep', exp: 'Soft Skills & Interview Coach',
          photo: '', tags: ['Communication', 'Interview Prep', 'Personal Branding'],
          color: 'linear-gradient(135deg,#e2431f,#ff8a68)' },
        { name: 'Sanjeev Kapoor', role: 'Full Stack Developer', exp: 'Full Stack Trainer',
          photo: '', tags: ['React', 'JavaScript', 'Code Reviews'], color: 'linear-gradient(135deg,#ffb648,#e2431f)' },
        { name: 'Vivek Rathord', role: 'Full Stack Developer', exp: 'Full Stack Trainer',
          photo: '', tags: ['React', 'APIs', 'Deployment'], color: 'linear-gradient(135deg,#ffb648,#e2431f)' },
        { name: 'Sahil Sandhu', role: 'Full Stack Developer', exp: 'Full Stack & Cloud Trainer',
          photo: '', tags: ['JavaScript', 'Testing', 'Git'], color: 'linear-gradient(135deg,#8b5cf6,#5b3fd8)' },
        { name: 'Anuj Thakur', role: 'Motion Graphics & Graphic Designer', exp: 'Motion Design Trainer',
          photo: '', tags: ['Accessibility', 'UI Polish', 'Presentation'],
          color: 'linear-gradient(135deg,#4b6bff,#18b47b)' }
      ];
      var mentorsGrid = document.getElementById('mentorsGrid');
      mentorsData.forEach(function(m, i) {
        var initials = m.name.split(' ').map(function(w) { return w[0]; }).join('').slice(0, 2);
        var tagsHtml = m.tags.map(function(t) { return '<span>' + t + '</span>'; }).join('');
        var avatarHtml = '<div class="mentor-avatar" style="background:' + (m.photo ? 'transparent' : m.color) + '">' +
          (m.photo ? '<img src="' + m.photo + '" alt="' + m.name + '" />' : initials) +
          '</div>';
        var html = '<div class="mentor-card reveal" style="--i:' + i + '">' +
          avatarHtml +
          '<h4>' + m.name + '</h4><div class="role">' + m.role + '</div><div class="exp">' + m.exp + '</div>' +
          '<div class="mentor-tags">' + tagsHtml + '</div>' +
          '<a href="#" class="mentor-li" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>' +
          '</div>';
        mentorsGrid.insertAdjacentHTML('beforeend', html);
      });
      qsa('#mentorsGrid .reveal').forEach(function(el) { revealObserver.observe(el); });

      // ===== VIDEO TESTIMONIALS =====
      var videoData = [
        { name: 'Pallvi Sharma', videoId: 'pxlXyaw5Hag' },
        { name: 'Shivani', videoId: '9xIhO56gEsY' }
      ];
      var testimonialsGrid = document.getElementById('testimonialsGrid');
      var playIcon = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
      videoData.forEach(function(t) {
        var card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML =
          '<img src="https://img.youtube.com/vi/' + t.videoId + '/hqdefault.jpg" alt="' + t.name + ' testimonial video thumbnail" />' +
          '<div class="watch-row"><div class="play-badge">' + playIcon + '</div><span class="watch-label">Watch video</span></div>' +
          '<div class="card-footer"><p class="person-name">' + t.name + '</p></div>';
        card.addEventListener('click', function() { openVideoPopup(t.videoId, t.name); });
        testimonialsGrid.appendChild(card);
      });

      // ===== VIDEO POPUP =====
      var popupOverlay = document.getElementById('popupOverlay');
      var popupBox = document.getElementById('popupBox');
      var popupClose = document.getElementById('popupClose');
      function openVideoPopup(videoId, name) {
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&playsinline=1';
        iframe.title = name + ' testimonial video';
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        var existingIframes = popupBox.querySelectorAll('iframe, .popup-msg');
        existingIframes.forEach(function(el) { el.remove(); });
        popupBox.appendChild(iframe);
        popupOverlay.classList.add('open');
      }
      function closeVideoPopup() {
        popupOverlay.classList.remove('open');
        var existingContent = popupBox.querySelectorAll('iframe, .popup-msg');
        existingContent.forEach(function(el) { el.remove(); });
      }
      popupClose.addEventListener('click', closeVideoPopup);
      popupOverlay.addEventListener('click', function(e) { if (e.target === popupOverlay) closeVideoPopup(); });
      document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeVideoPopup(); });

      // ===== GOOGLE REVIEWS =====
      var GOOGLE_REVIEWS_URL =
        'https://www.google.com/search?q=netcoder&rlz=1C1CHBF_enIN1134IN1135&oq=netcoder&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MhAIAhAuGK8BGMcBGIAEGI4FMgYIAxBFGDwyBggEEEUYPDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYQdIBCDE4MDRqMGo0qAIAsAIB&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x391b5103c6cf2421:0x13d20e093af94db9,1,,,';
      var reviewsData = [
        { name: 'Muskan Choudhary', photo: './bootcampimages/muskan.png', prog: 'Web Designing & Graphic Designing', time: '2 months ago', rating: 5,
          text: 'I have been studying at Netcoder Technology for the last 12 months, and my experience has been excellent. The trainers are knowledgeable, supportive, and always ready to help. I learned Web Designing and Graphic Designing with practical training and real projects.',
          color: 'linear-gradient(135deg,#ff5532,#e2431f)' },
        { name: 'Arushi Dhiman', prog: 'Graphic Designing', time: '2 months ago', rating: 5,
          text: 'I completed a 6-month Graphic Designing course from Netcoder Technology. During the course, I learned industry-standard design tools such as Adobe Photoshop and Adobe Illustrator, along with branding, typography, logo design, and social media creatives.',
          color: 'linear-gradient(135deg,#4b6bff,#3a4fd8)' },
        { name: 'Elite Modeling agency', prog: 'Digital Marketing', time: '5 months ago', rating: 5,
          text: 'Had a great experience learning at Netcoder Technology, Dharamshala. The Digital Marketing Course is well-structured and covers important modules like SEO, PPC, Social Media Marketing, Content Marketing, and Google Analytics. The trainers were practical and supportive throughout the learning journey.',
          color: 'linear-gradient(135deg,#18b47b,#0f9d67)' },
        { name: 'Kritika Rihalia', photo: './bootcampimages/kritika.png', prog: 'Web & Graphic Designing', time: '2 months ago', rating: 5,
          text: 'I have been studying here for the past 11 months and have had a great experience. I am doing the Web and Graphic Designing course, and despite coming from a Humanities background, I found it easy to learn because of the supportive and structured teaching environment.',
          color: 'linear-gradient(135deg,#ffb648,#e2431f)' },
        { name: 'Abhishek', photo: './bootcampimages/abhishek.png', prog: 'Data Science', time: '6 months ago', rating: 5,
          text: 'I am currently pursuing the Data Science program at this institute, and my experience has been truly excellent. The course is well-structured and designed to build both strong theoretical foundations and practical, industry-ready skills.',
          color: 'linear-gradient(135deg,#8b5cf6,#5b3fd8)' }
      ];

      var sliderTrack = document.getElementById('testimonialsSliderTrack');
      reviewsData.forEach(function(t) {
        var initials = t.name.split(' ').map(function(w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
        var starsHtml = '';
        for (var i = 0; i < t.rating; i++) starsHtml += '<i class="fa-solid fa-star"></i>';
        for (var j = t.rating; j < 5; j++) starsHtml += '<i class="fa-regular fa-star"></i>';
        var slide = document.createElement('div');
        slide.className = 'testimonial-slide';
        var avatarHtml = t.photo
          ? '<img class="review-photo" src="' + t.photo + '" alt="' + t.name + '" />'
          : '<div class="avatar" style="background:' + t.color + '">' + initials + '</div>';
        slide.innerHTML =
          '<div class="stars"><span>' + starsHtml + '</span><i class="fa-brands fa-google g-badge" title="Google Review"></i></div>' +
          '<div class="text">"' + t.text + '"</div>' +
          '<div class="author">' + avatarHtml + '<div class="info"><b>' + t.name + '</b><span>' + t.prog + ' · ' + t.time + '</span></div></div>' +
          '<a class="readmore" href="' + GOOGLE_REVIEWS_URL +
          '" target="_blank" rel="noopener">Read full review on Google <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:10px;"></i></a>';
        sliderTrack.appendChild(slide);
      });

      // ===== SLIDER LOGIC (Auto-play, infinite) =====
      var slideIndex = 0;
      var track = sliderTrack;
      var slides = track.querySelectorAll('.testimonial-slide');
      var prevBtn = document.getElementById('testPrev');
      var nextBtn = document.getElementById('testNext');
      var autoSlideInterval;

      function getVisibleSlides() {
        if (window.innerWidth <= 640) return 1;
        if (window.innerWidth <= 980) return 2;
        return 3;
      }

      function getSlideWidth() {
        if (slides.length === 0) return 0;
        var gap = 24;
        return slides[0].getBoundingClientRect().width + gap;
      }

      function updateSlider() {
        var visible = getVisibleSlides();
        var maxIndex = Math.max(0, slides.length - visible);
        if (slideIndex > maxIndex) slideIndex = 0;
        if (slideIndex < 0) slideIndex = maxIndex;
        var slideWidth = getSlideWidth();
        track.style.transform = 'translateX(-' + (slideIndex * slideWidth) + 'px)';
      }

      function nextSlide() {
        var visible = getVisibleSlides();
        var maxIndex = Math.max(0, slides.length - visible);
        if (slideIndex < maxIndex) { slideIndex++; } else { slideIndex = 0; }
        updateSlider();
      }

      function prevSlide() {
        var visible = getVisibleSlides();
        var maxIndex = Math.max(0, slides.length - visible);
        if (slideIndex > 0) { slideIndex--; } else { slideIndex = maxIndex; }
        updateSlider();
      }

      function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
      }

      function stopAutoSlide() {
        if (autoSlideInterval) { clearInterval(autoSlideInterval);
          autoSlideInterval = null; }
      }

      nextBtn.addEventListener('click', function() { nextSlide();
        startAutoSlide(); });
      prevBtn.addEventListener('click', function() { prevSlide();
        startAutoSlide(); });

      window.addEventListener('resize', function() {
        slideIndex = 0;
        updateSlider();
        startAutoSlide();
      });

      // Pause on hover
      var sliderWrap = document.querySelector('.testimonials-slider-wrap');
      sliderWrap.addEventListener('mouseenter', stopAutoSlide);
      sliderWrap.addEventListener('mouseleave', startAutoSlide);

      setTimeout(function() {
        updateSlider();
        startAutoSlide();
      }, 300);

      // ===== FAQ =====
      var faqsData = [
        { q: 'Is this bootcamp beginner-friendly?', a: 'Yes. We start from the absolute basics and build up, so no prior coding experience is required to join.' },
        { q: 'Will I receive a certificate?', a: 'You will receive a Training Certificate and an Internship Certificate.' },
        { q: 'Are internships included?', a: 'Yes - every track includes a structured internship component with real company-style projects.' },
        { q: 'Will I work on live projects?', a: 'Absolutely. Every month includes hands-on builds, and you will ship a capstone project by month six.' },
        { q: 'Do you provide placement support?', a: 'Yes, including resume building, LinkedIn optimization, mock interviews, and placement assistance.' },
        { q: 'What if I have no coding experience?', a: 'That is the majority of our students. Month one is dedicated entirely to foundations.' },
        { q: 'Are classes online or offline?', a: 'We offer both online live sessions and offline batches depending on your location - ask your counsellor.' },
        { q: 'How do I enroll?', a: 'Fill out the "Get Free Career Roadmap" form on this page, or click Apply Now to start your application.' }
      ];
      var faqList = document.getElementById('faqList');
      faqsData.forEach(function(f) {
        var html = '<div class="faq-item"><button class="faq-q"><span>' + f.q + '</span><i class="fa-solid fa-plus"></i></button><div class="faq-a"><p>' + f.a + '</p></div></div>';
        faqList.insertAdjacentHTML('beforeend', html);
      });
      qsa('.faq-q').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var item = btn.parentElement;
          var answer = item.querySelector('.faq-a');
          var isOpen = item.classList.contains('open');
          qsa('.faq-item.open').forEach(function(openItem) {
            openItem.classList.remove('open');
            openItem.querySelector('.faq-a').style.maxHeight = null;
          });
          if (!isOpen) {
            item.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        });
      });

      // ===== TIMELINE =====
      var timelineFill = document.getElementById('timelineFill');
      var tlItems = qsa('.tl-item');
      var tlObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) entry.target.classList.add('in');
        });
      }, { threshold: 0.4 });
      tlItems.forEach(function(item) { tlObserver.observe(item); });

      function updateTimelineFill() {
        var timelineEl = document.getElementById('timeline');
        var rect = timelineEl.getBoundingClientRect();
        var vh = window.innerHeight;
        var total = rect.height;
        var progress = (vh * 0.75 - rect.top) / total;
        progress = Math.max(0, Math.min(1, progress));
        timelineFill.style.height = (progress * 100) + '%';
      }
      window.addEventListener('scroll', updateTimelineFill, { passive: true });
      window.addEventListener('resize', updateTimelineFill);
      updateTimelineFill();

      // ===== COUNTDOWN =====
      var targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 6);
      targetDate.setHours(23, 59, 59, 0);
      function updateCountdown() {
        var now = new Date();
        var diff = targetDate - now;
        if (diff < 0) diff = 0;
        document.getElementById('cd-d').textContent = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
        document.getElementById('cd-h').textContent = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        document.getElementById('cd-m').textContent = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
        document.getElementById('cd-s').textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
      }
      updateCountdown();
      setInterval(updateCountdown, 1000);

      // ===== LEAD FORM =====
      document.getElementById('contact').addEventListener('submit', function(e) {
        e.preventDefault();
        sendEmail(this, this.querySelector('button[type=submit]'), 'Roadmap Requested!');
      });

      // ===== APPLY POPUP =====
      var applyPopup = document.getElementById('applyPopup');
      var applyPopupClose = document.getElementById('applyPopupClose');
      var applyBtns = qsa('#applyNowBtn, #applyNowBtn2');

      function openApplyPopup() { applyPopup.classList.add('open');
        document.body.style.overflow = 'hidden'; }

      function closeApplyPopup() { applyPopup.classList.remove('open');
        document.body.style.overflow = ''; }

      applyBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) { e.preventDefault();
          openApplyPopup(); });
      });
      applyPopupClose.addEventListener('click', closeApplyPopup);
      applyPopup.addEventListener('click', function(e) { if (e.target === applyPopup) closeApplyPopup(); });
      document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeApplyPopup(); });

      // ===== APPLY FORM =====
      document.getElementById('applyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var form = this;
        var button = document.getElementById('applySubmit');
        sendEmail(form, button, 'Application Sent!');
          closeApplyPopup();
      });

} // end init()

// Bulletproof auto-run: runs immediately if DOM ready, else waits
ready(() => init());
