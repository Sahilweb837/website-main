/**
 * Netcoder Technology - Ultra-Fast SPA Navigation & Skeleton Loader Engine
 * 
 * Features:
 * 1. Single Page Application (SPA) navigation with smooth transitions
 * 2. Top Brand-Orange (#ff5532) Progress Bar
 * 3. Content-Accurate White & Orange Skeleton Loading Screen
 * 4. Hover Pre-fetching for 0ms instantaneous page loads
 * 5. Complete, robust, idempotent component re-initialization (Swiper, tabs, accordions, form, hero)
 * 6. Browser Back/Forward history (popstate) support
 * 7. Guaranteed non-blocking reload lifecycle with safety watchdogs
 */

(function () {
    'use strict';

    // In-memory HTML cache for instantaneous navigation
    const pageCache = new Map();
    let currentUrl = window.location.href;
    let isNavigating = false;
    let prefetchTimeout = null;

    // Elements
    let progressBar = null;
    let spaContainer = null;

    // Safe ReadyState listener helper
    function onReady(fn) {
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            setTimeout(fn, 0);
        } else {
            document.addEventListener('DOMContentLoaded', fn, { once: true });
        }
    }

    // Preloader controls
    function hidePreloader() {
        const preloader = document.getElementById('nc-skeleton-preloader');
        if (preloader) {
            preloader.classList.add('sk-hidden');
        }
    }

    function showPreloader() {
        const preloader = document.getElementById('nc-skeleton-preloader');
        if (preloader) {
            preloader.classList.remove('sk-hidden');
        }
    }

    // Top Brand-Orange progress bar
    function getProgressBar() {
        if (!progressBar) {
            progressBar = document.getElementById('spa-progress-bar');
            if (!progressBar) {
                progressBar = document.createElement('div');
                progressBar.id = 'spa-progress-bar';
                progressBar.className = 'spa-progress-bar';
                document.body.prepend(progressBar);
            }
        }
        return progressBar;
    }

    function startProgress() {
        const bar = getProgressBar();
        bar.style.transition = 'none';
        bar.style.width = '0%';
        bar.style.opacity = '1';
        bar.classList.add('active');

        // Force reflow
        void bar.offsetWidth;

        bar.style.transition = 'width 0.4s cubic-bezier(0.1, 0.9, 0.2, 1)';
        bar.style.width = '75%';
    }

    function finishProgress() {
        const bar = getProgressBar();
        bar.style.transition = 'width 0.2s ease, opacity 0.3s ease 0.15s';
        bar.style.width = '100%';
        bar.style.opacity = '0';

        setTimeout(() => {
            bar.classList.remove('active');
            bar.style.width = '0%';
        }, 400);
    }

    // Content-Accurate White & Orange Skeleton HTML Generator
    function getOrangeSkeletonHtml() {
        return `
            <div class="sk-page-layout">
                <!-- 1. Header Skeleton -->
                <div class="sk-header">
                    <div class="sk-header-logo sk-box"></div>
                    <div class="sk-header-nav">
                        <div class="sk-pill"></div>
                        <div class="sk-pill"></div>
                        <div class="sk-pill"></div>
                        <div class="sk-pill"></div>
                    </div>
                    <div class="sk-header-btn sk-btn"></div>
                </div>

                <!-- 2. Hero Section Skeleton -->
                <div class="sk-hero-grid">
                    <div class="sk-hero-copy">
                        <div class="sk-eyebrow sk-pill"></div>
                        <div class="sk-title-line-1 sk-line"></div>
                        <div class="sk-title-line-2 sk-line"></div>
                        <div class="sk-sub-1 sk-line"></div>
                        <div class="sk-sub-2 sk-line"></div>
                        <div class="sk-cta-row">
                            <div class="sk-cta-btn-primary sk-btn"></div>
                            <div class="sk-cta-btn-ghost sk-btn"></div>
                        </div>
                        <div class="sk-avatar-proof">
                            <div class="sk-avatar-stack">
                                <div class="sk-circle"></div>
                                <div class="sk-circle"></div>
                                <div class="sk-circle"></div>
                                <div class="sk-circle"></div>
                            </div>
                            <div class="sk-proof-text">
                                <div class="sk-line" style="width: 140px; height: 16px;"></div>
                                <div class="sk-line" style="width: 180px; height: 12px;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="sk-browser-mock">
                        <div class="sk-browser-dots">
                            <div class="sk-circle"></div>
                            <div class="sk-circle"></div>
                            <div class="sk-circle"></div>
                        </div>
                        <div class="sk-browser-banner sk-thumb"></div>
                    </div>
                </div>

                <!-- 3. Course Cards Grid Skeleton -->
                <div class="sk-cards-grid">
                    <div class="sk-course-card">
                        <div class="sk-card-image sk-thumb"></div>
                        <div class="sk-card-badge sk-pill"></div>
                        <div class="sk-card-title sk-line"></div>
                        <div class="sk-card-desc-1 sk-line"></div>
                    </div>
                    <div class="sk-course-card">
                        <div class="sk-card-image sk-thumb"></div>
                        <div class="sk-card-badge sk-pill"></div>
                        <div class="sk-card-title sk-line"></div>
                        <div class="sk-card-desc-1 sk-line"></div>
                    </div>
                    <div class="sk-course-card">
                        <div class="sk-card-image sk-thumb"></div>
                        <div class="sk-card-badge sk-pill"></div>
                        <div class="sk-card-title sk-line"></div>
                        <div class="sk-card-desc-1 sk-line"></div>
                    </div>
                </div>
            </div>
        `;
    }

    // Check if a URL should be handled by SPA
    function isSpaLink(anchor) {
        if (!anchor || anchor.tagName !== 'A') return false;
        const href = anchor.getAttribute('href');
        if (!href) return false;

        // Ignore hash anchors, mailto, tel, javascript
        if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
            return false;
        }

        // Ignore target="_blank" or download
        if (anchor.target === '_blank' || anchor.hasAttribute('download')) {
            return false;
        }

        // Resolve absolute URL
        let url;
        try {
            url = new URL(href, window.location.origin);
        } catch (e) {
            return false;
        }

        // Must match same origin
        if (url.origin !== window.location.origin) return false;

        // Skip admin and cache paths
        const pathname = url.pathname;
        if (pathname.startsWith('/admin') || pathname === '/clear-cache' || pathname === '/view-show-blade') {
            return false;
        }

        // Skip static file assets (.pdf, .zip, .png, etc.)
        if (/\.(pdf|zip|jpg|jpeg|png|gif|svg|webp|mp4|css|js)$/i.test(pathname)) {
            return false;
        }

        return true;
    }

    // Prefetch a page HTML into cache
    async function prefetchUrl(url) {
        if (pageCache.has(url)) return;
        try {
            const res = await fetch(url, {
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                priority: 'low'
            });
            if (res.ok) {
                const html = await res.text();
                pageCache.set(url, html);
            }
        } catch (err) {
            // Ignore background prefetch errors
        }
    }

    // Navigate to a target URL via SPA
    async function navigateTo(targetUrl, pushState = true) {
        if (isNavigating) return;
        if (targetUrl === window.location.href && !targetUrl.includes('#')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        isNavigating = true;
        startProgress();

        spaContainer = document.getElementById('spa-container');
        const preloader = document.getElementById('nc-skeleton-preloader');

        // Show Skeleton screen immediately
        if (preloader) {
            preloader.classList.remove('sk-hidden');
            window.scrollTo({ top: 0, behavior: 'instant' });
        } else if (spaContainer) {
            spaContainer.classList.add('spa-loading');
            spaContainer.innerHTML = getOrangeSkeletonHtml();
            window.scrollTo({ top: 0, behavior: 'instant' });
        }

        // Smooth minimum display duration for pleasant animation
        const minDelayPromise = new Promise(resolve => setTimeout(resolve, 350));

        // Background fetch promise
        const fetchPromise = (async () => {
            let html = pageCache.get(targetUrl);
            if (!html) {
                const response = await fetch(targetUrl, {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                });

                if (!response.ok) {
                    throw new Error('Network response not ok: ' + response.status);
                }
                html = await response.text();
                pageCache.set(targetUrl, html);
            }
            return html;
        })();

        try {
            // Wait for both animation and content
            const [_, html] = await Promise.all([minDelayPromise, fetchPromise]);

            // Parse incoming document
            const parser = new DOMParser();
            const newDoc = parser.parseFromString(html, 'text/html');
            const newSpaContainer = newDoc.getElementById('spa-container');

            if (!newSpaContainer) {
                window.location.href = targetUrl;
                return;
            }

            // Update page title & meta
            document.title = newDoc.title;
            updateMetaTags(newDoc);

            // Update active menu states
            updateActiveNavLinks(targetUrl);

            // Close mobile menu if open
            closeMobileMenu();

            // Load any new stylesheets from <head>
            loadNewStylesheets(newDoc);

            // Replace SPA content
            if (spaContainer) {
                spaContainer.classList.remove('spa-loading');
                spaContainer.innerHTML = newSpaContainer.innerHTML;
            }

            // Update URL in browser history
            if (pushState) {
                history.pushState({ url: targetUrl }, '', targetUrl);
            }
            currentUrl = targetUrl;

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'instant' });

            // Execute scripts inside the new page
            await executeIncomingScripts(newDoc);

            // Re-initialize all interactive components
            window.initPageComponents();

            // Dismiss preloader
            hidePreloader();

            // Dispatch global SPA navigated event
            document.dispatchEvent(new CustomEvent('spa:navigated', { detail: { url: targetUrl } }));

        } catch (err) {
            console.warn('SPA navigation fallback to native load:', err);
            window.location.href = targetUrl;
        } finally {
            hidePreloader();
            isNavigating = false;
            finishProgress();
        }
    }

    // Update meta tags from new document
    function updateMetaTags(newDoc) {
        const newDesc = newDoc.querySelector('meta[name="description"]');
        const currDesc = document.querySelector('meta[name="description"]');
        if (newDesc && currDesc) {
            currDesc.setAttribute('content', newDesc.getAttribute('content'));
        }

        const newCanonical = newDoc.querySelector('link[rel="canonical"]');
        let currCanonical = document.querySelector('link[rel="canonical"]');
        if (newCanonical) {
            if (!currCanonical) {
                currCanonical = document.createElement('link');
                currCanonical.setAttribute('rel', 'canonical');
                document.head.appendChild(currCanonical);
            }
            currCanonical.setAttribute('href', newCanonical.getAttribute('href'));
        }

        document.body.className = newDoc.body.className;
    }

    // Highlight active link in header and mobile drawer
    function updateActiveNavLinks(targetUrl) {
        const urlObj = new URL(targetUrl, window.location.origin);
        const path = urlObj.pathname.replace(/\/$/, '') || '/';

        document.querySelectorAll('.main-nav a, .side-links a').forEach(link => {
            const linkHref = link.getAttribute('href');
            if (!linkHref) return;
            try {
                const linkPath = new URL(linkHref, window.location.origin).pathname.replace(/\/$/, '') || '/';
                if (linkPath === path) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            } catch (e) {}
        });
    }

    // Close mobile drawer
    function closeMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const sideOverlay = document.getElementById('sideOverlay') || document.querySelector('.side-overlay');
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (sideOverlay) sideOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Load any new <link rel="stylesheet"> from new page <head>
    function loadNewStylesheets(newDoc) {
        const existingHrefs = new Set(
            Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.getAttribute('href'))
        );

        newDoc.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !existingHrefs.has(href)) {
                const newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = href;
                document.head.appendChild(newLink);
            }
        });
    }

    // Execute scripts belonging to the new page
    async function executeIncomingScripts(newDoc) {
        const scripts = Array.from(newDoc.querySelectorAll('#spa-container script, body script'));
        const externalScripts = [];
        const inlineScripts = [];
        
        scripts.forEach(oldScript => {
            const src = oldScript.getAttribute('src');
            if (src) {
                if (src.includes('firebase') || 
                    src.includes('emailjs') || 
                    src.includes('main.js') || 
                    src.includes('DemoClass.js') || 
                    src.includes('spa-router.js') ||
                    src.includes('swiper-bundle')) {
                    return;
                }
                externalScripts.push(oldScript);
            } else if (oldScript.textContent.trim()) {
                inlineScripts.push(oldScript);
            }
        });

        // 1. Sequentially load any external scripts
        for (const ext of externalScripts) {
            await new Promise(resolve => {
                const s = document.createElement('script');
                Array.from(ext.attributes).forEach(attr => s.setAttribute(attr.name, attr.value));
                s.onload = resolve;
                s.onerror = resolve;
                document.body.appendChild(s);
            });
        }

        // 2. Execute inline scripts safely
        inlineScripts.forEach(inl => {
            try {
                let code = inl.textContent;
                const unwrapped = code
                    .replace(/document\.addEventListener\s*\(\s*['"]DOMContentLoaded['"]\s*,\s*(?:function\s*\([^)]*\)|(?:\([^)]*\)|[a-zA-Z0-9_$]+)\s*=>)\s*\{/g, '(function() {')
                    .replace(/window\.addEventListener\s*\(\s*['"]load['"]\s*,\s*(?:function\s*\([^)]*\)|(?:\([^)]*\)|[a-zA-Z0-9_$]+)\s*=>)\s*\{/g, '(function() {');

                const s = document.createElement('script');
                Array.from(inl.attributes).forEach(attr => s.setAttribute(attr.name, attr.value));
                s.textContent = unwrapped;
                document.body.appendChild(s);
            } catch (err) {
                console.warn('Inline script execution error:', err);
            }
        });
    }

    // Global component re-initializer (Idempotent: safe to run on direct load, reload, and SPA transitions)
    window.initPageComponents = function () {
        // 1. Swipers (Career Alumni, Industrial Training, Course pages)
        if (typeof Swiper !== 'undefined') {
            document.querySelectorAll('.mySwiper').forEach(el => {
                if (el.swiper) {
                    try { el.swiper.destroy(true, true); } catch (e) {}
                }
                new Swiper(el, {
                    slidesPerView: 1,
                    spaceBetween: 16,
                    loop: true,
                    autoplay: {
                        delay: 2000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    },
                    pagination: {
                        el: el.querySelector('.swiper-pagination') || '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: el.querySelector('.swiper-button-next') || '.swiper-button-next',
                        prevEl: el.querySelector('.swiper-button-prev') || '.swiper-button-prev',
                    },
                    breakpoints: {
                        480: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 4, spaceBetween: 30 },
                        1024: { slidesPerView: 5, spaceBetween: 35 },
                        1280: { slidesPerView: 6, spaceBetween: 40 },
                    },
                });
            });
        }

        // 2. Tab switching for why-hub (Homepage)
        const hub = document.querySelector('.nc-why-hub');
        if (hub) {
            const buttons = hub.querySelectorAll('.nc-why-hub-toggle-btn');
            const panels = hub.querySelectorAll('.nc-why-hub-panel');
            buttons.forEach(button => {
                button.onclick = function () {
                    const target = button.dataset.target;
                    buttons.forEach(entry => {
                        const active = entry === button;
                        entry.classList.toggle('is-active', active);
                        entry.setAttribute('aria-selected', active ? 'true' : 'false');
                    });
                    panels.forEach(panel => {
                        const active = panel.id === target;
                        panel.classList.toggle('is-active', active);
                        panel.hidden = !active;
                    });
                };
            });
        }

        // 3. Course Milestones Accordion (Course pages)
        document.querySelectorAll('.milestone-container').forEach(container => {
            const header = container.querySelector('.milestone-header');
            const button = container.querySelector('.toggle-btn');
            const content = container.querySelector('.collapse');
            if (!content) return;

            function toggle() {
                const isOpen = content.classList.contains('show');
                const parent = container.parentElement;
                if (parent) {
                    parent.querySelectorAll('.milestone-container').forEach(other => {
                        if (other !== container) {
                            const otherC = other.querySelector('.collapse');
                            const otherB = other.querySelector('.toggle-btn');
                            if (otherC) { otherC.classList.remove('show'); otherC.style.maxHeight = '0px'; }
                            if (otherB) { otherB.classList.remove('active'); otherB.setAttribute('aria-expanded', 'false'); }
                        }
                    });
                }
                if (isOpen) {
                    content.classList.remove('show');
                    content.style.maxHeight = '0px';
                    if (button) { button.classList.remove('active'); button.setAttribute('aria-expanded', 'false'); }
                } else {
                    content.classList.add('show');
                    content.style.maxHeight = content.scrollHeight + 'px';
                    if (button) { button.classList.add('active'); button.setAttribute('aria-expanded', 'true'); }
                }
            }

            if (button) button.onclick = (e) => { e.stopPropagation(); toggle(); };
            if (header) header.onclick = (e) => { if (!button || !button.contains(e.target)) toggle(); };
        });

        // 4. Contact form re-init if contact page
        if (typeof window.initContactForm === 'function') {
            try { window.initContactForm(); } catch (e) {}
        }

        // 5. Image Lazy Loading with White & Orange Skeleton Shimmer
        initLazyImages();

        // 6. Logo track clone loop check
        document.querySelectorAll('.logo-track').forEach(track => {
            if (track.dataset.loopReady === 'true') return;
            const cards = Array.from(track.children);
            cards.forEach(card => track.appendChild(card.cloneNode(true)));
            track.dataset.loopReady = 'true';
        });

        // 7. Recalculate layout dimensions
        window.dispatchEvent(new Event('resize'));
    };

    // Image Lazy Loading & Skeleton Fade-In
    function initLazyImages() {
        const images = document.querySelectorAll('img[loading="lazy"]:not([data-lazy-bound])');
        images.forEach(img => {
            img.setAttribute('data-lazy-bound', 'true');

            if (img.complete && img.naturalWidth > 0) {
                img.classList.add('nc-loaded');
                return;
            }

            img.classList.add('nc-lazy');

            const handleDone = () => {
                img.classList.remove('nc-lazy');
                img.classList.add('nc-loaded');
                const parent = img.closest('.nc-img-skeleton');
                if (parent) parent.classList.add('loaded');
            };

            img.addEventListener('load', handleDone, { once: true });
            img.addEventListener('error', handleDone, { once: true });
        });
    }

    // Intercept clicks on links for SPA navigation
    document.addEventListener('click', function (e) {
        if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

        const anchor = e.target.closest('a');
        if (!anchor) return;

        if (isSpaLink(anchor)) {
            e.preventDefault();
            const targetUrl = anchor.href;
            navigateTo(targetUrl, true);
        }
    });

    // Hover & touch prefetch on links for instant response
    document.addEventListener('mouseover', function (e) {
        const anchor = e.target.closest('a');
        if (!anchor || !isSpaLink(anchor)) return;

        if (prefetchTimeout) clearTimeout(prefetchTimeout);
        prefetchTimeout = setTimeout(() => {
            prefetchUrl(anchor.href);
        }, 60);
    });

    document.addEventListener('touchstart', function (e) {
        const anchor = e.target.closest('a');
        if (!anchor || !isSpaLink(anchor)) return;
        prefetchUrl(anchor.href);
    }, { passive: true });

    // Handle browser Back / Forward buttons
    window.addEventListener('popstate', function () {
        navigateTo(window.location.href, false);
    });

    // Global Accordion Event Delegation (Works across all pages forever)
    document.addEventListener('click', function (e) {
        const header = e.target.closest('.accordion-header');
        if (!header) return;

        const openItem = document.querySelector('.accordion-header.active');
        if (openItem && openItem !== header) {
            openItem.classList.remove('active');
            if (openItem.nextElementSibling) {
                openItem.nextElementSibling.style.maxHeight = null;
                openItem.nextElementSibling.classList.remove('show');
            }
        }

        header.classList.toggle('active');
        const content = header.nextElementSibling;
        if (content) {
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.classList.add('show');
            } else {
                content.style.maxHeight = null;
                content.classList.remove('show');
            }
        }
    });

    // Initial page load setup (Guaranteed to execute whether readyState is loading, interactive, or complete)
    onReady(function () {
        try {
            pageCache.set(window.location.href, document.documentElement.outerHTML);
        } catch (e) {}

        // Run initial component setup
        window.initPageComponents();

        // Dismiss preloader smoothly
        setTimeout(hidePreloader, 500);
    });

    // Window load watchdog - guarantee preloader is hidden and components set
    window.addEventListener('load', function () {
        hidePreloader();
        window.initPageComponents();
    }, { once: true });

    // Safety fallback: if anything else fails, dismiss preloader after 1000ms max
    setTimeout(hidePreloader, 1000);

})();
