
const EMAILJS_PUBLIC_KEY = "KWfyzx9eYKtFBBsFI";
const EMAILJS_SERVICE_ID = "service_z9h61fa";
const EMAILJS_TEMPLATE_ID = "template_a9tmzua";

let emailJsInitialized = false;
function initEmailJS() {
    if (emailJsInitialized) return true;
    if (window.emailjs && typeof emailjs.init === "function") {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        emailJsInitialized = true;
        return true;
    }
    return false;
}

if (!initEmailJS()) {
    window.addEventListener("load", initEmailJS);
}

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".logo-track").forEach((track) => {
        if (track.dataset.loopReady === "true") return;

        const cards = Array.from(track.children);
        cards.forEach((card) => track.appendChild(card.cloneNode(true)));
        track.dataset.loopReady = "true";
    });

    // ================= MOBILE MENU =================
    const openMenu = document.getElementById("openMenu"); 
    const closeMenu = document.getElementById("closeMenu");
    const mobileMenu = document.getElementById("mobileMenu");
    const sideOverlay = document.getElementById("sideOverlay");

    if (openMenu && closeMenu && mobileMenu) {
        openMenu.addEventListener("click", () => {
            mobileMenu.classList.add("active");
            if (sideOverlay) sideOverlay.classList.add("active");
        });

        closeMenu.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            if (sideOverlay) sideOverlay.classList.remove("active");
        });

        if (sideOverlay) {
            sideOverlay.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
                sideOverlay.classList.remove("active");
            });
        }
    }

    // ================= MOBILE DROPDOWN (ACCORDION) =================
    const sideItems = document.querySelectorAll(".side-item");

    sideItems.forEach(item => {
        item.addEventListener("click", (e) => {

            // prevent closing when clicking links inside dropdown
            if (e.target.tagName === "A") return;

            // close other dropdowns
            sideItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove("active");
                }
            });

            // toggle current dropdown
            item.classList.toggle("active");
        });
    });

});
{/* end */ }
// addEventListener('resize', removeStyle)

var slides = document.querySelectorAll('.slide');
var btns = document.querySelectorAll('.btn');
let currentSlide = 1;


// //////    card slider
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const arrowBtns = document.querySelectorAll(".wrapper svg");
    const wrapper = document.querySelector(".wrapper");

    const firstCard = carousel ? carousel.querySelector(".card") : null;
    const firstCardWidth = firstCard ? firstCard.offsetWidth : 0;

    if (!carousel || !wrapper) return;

    let isDragging = false,
        startX,
        startScrollLeft,
        timeoutId;

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragging) return;

        const newScrollLeft = startScrollLeft - (e.pageX - startX);


        if (newScrollLeft <= 0 || newScrollLeft >=
            carousel.scrollWidth - carousel.offsetWidth) {


            isDragging = false;
            return;
        }


        carousel.scrollLeft = newScrollLeft;
    };

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    const autoPlay = () => {


        if (window.innerWidth < 800) return;


        const totalCardWidth = carousel.scrollWidth;


        const maxScrollLeft = totalCardWidth - carousel.offsetWidth;

        if (carousel.scrollLeft >= maxScrollLeft) return;


        timeoutId = setTimeout(() =>
            carousel.scrollLeft += firstCardWidth, 2500);
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    wrapper.addEventListener("mouseenter", () =>
        clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);

    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id === "left" ?
                -firstCardWidth : firstCardWidth;
        });
    });
});
// slider js
var slides = document.querySelectorAll('.slide');
var btns = document.querySelectorAll('.btn');
let sliderSlide = 1;

// Javascript for image slider manual navigation
var manualNav = function (manual) {
    slides.forEach((slide) => {
        slide.classList.remove('active');

        btns.forEach((btn) => {
            btn.classList.remove('active');
        });
    });

    if (slides[manual]) slides[manual].classList.add('active');
    if (btns[manual]) btns[manual].classList.add('active');
}

btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        manualNav(i);
        sliderSlide = i;
    });
});
// ===== AUTO PLAY SLIDER =====
let autoPlayInterval;

const autoPlaySlider = () => {
    autoPlayInterval = setInterval(() => {
        sliderSlide++;

        if (sliderSlide >= slides.length) {
            sliderSlide = 0;
        }

        manualNav(sliderSlide);
    }, 3000); // change time here (3 sec)
};

// start autoplay
autoPlaySlider();

// pause on hover (optional but better UX)
const sliderContainer = document.querySelector('.slider'); // parent of slides

if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", () => {
        clearInterval(autoPlayInterval);
    });

    sliderContainer.addEventListener("mouseleave", () => {
        autoPlaySlider();
    });
}

// ================= HOME CAREER HERO =================
document.addEventListener("DOMContentLoaded", () => {
    const home = document.querySelector(".index-page");
    if (!home) return;

    const heroSlides = home.querySelectorAll(".hero-slide");
    const heroDots = home.querySelectorAll(".hero-dot");
    const portfolioUrl = home.querySelector("#heroPortfolioUrl");
    const careerWord = home.querySelector("#heroCareerWord");
    const navbar = home.querySelector(".main-nav");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let currentIndex = 0;
    let autoplayId;
    let typewriterId;

    function typeCareerWord(word) {
        if (!careerWord) return;
        window.clearTimeout(typewriterId);

        if (reduceMotion) {
            careerWord.textContent = word;
            return;
        }

        careerWord.textContent = "";
        let characterIndex = 0;
        const typeNextCharacter = () => {
            careerWord.textContent = word.slice(0, characterIndex + 1);
            characterIndex += 1;
            if (characterIndex < word.length) {
                typewriterId = window.setTimeout(typeNextCharacter, 40);
            }
        };
        typeNextCharacter();
    }

    function showHeroSlide(index) {
        currentIndex = (index + heroSlides.length) % heroSlides.length;

        heroSlides.forEach((slide, slideIndex) => {
            slide.classList.toggle("is-active", slideIndex === currentIndex);
        });

        heroDots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === currentIndex;
            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-pressed", String(isActive));
        });

        const activeSlide = heroSlides[currentIndex];
        if (portfolioUrl && activeSlide) {
            portfolioUrl.innerHTML = '<i class="fa-solid fa-lock"></i> ' + activeSlide.dataset.url;
        }
        typeCareerWord(activeSlide?.dataset.headline || "Digital Career");
    }

    function stopHeroAutoplay() {
        window.clearInterval(autoplayId);
    }

    function startHeroAutoplay() {
        if (reduceMotion || heroSlides.length < 2) return;
        stopHeroAutoplay();
        autoplayId = window.setInterval(() => showHeroSlide(currentIndex + 1), 2800);
    }

    heroDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showHeroSlide(index);
            startHeroAutoplay();
        });
    });

    const hero = home.querySelector("#hero");
    if (hero) {
        hero.addEventListener("mouseenter", stopHeroAutoplay);
        hero.addEventListener("mouseleave", startHeroAutoplay);
        hero.addEventListener("focusin", stopHeroAutoplay);
        hero.addEventListener("focusout", startHeroAutoplay);
    }

    showHeroSlide(0);
    startHeroAutoplay();

    const counters = home.querySelectorAll(".trust-stat .num");
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target;
            const target = Number(element.dataset.count);
            const suffix = element.dataset.suffix || "";
            const duration = reduceMotion ? 0 : 1200;
            const start = performance.now();

            function animateCounter(now) {
                const progress = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - progress, 3);
                element.textContent = Math.round(target * eased) + suffix;
                if (progress < 1) window.requestAnimationFrame(animateCounter);
            }

            window.requestAnimationFrame(animateCounter);
            observer.unobserve(element);
        });
    }, { threshold: 0.4 });

    counters.forEach((counter) => counterObserver.observe(counter));
});

// ================= SHARED NAVBAR SCROLL STATE =================
const sharedNavbar = document.querySelector(".main-nav");
function updateSharedNavbar() {
    if (sharedNavbar) sharedNavbar.classList.toggle("is-scrolled", window.scrollY > 24);
}
updateSharedNavbar();
window.addEventListener("scroll", updateSharedNavbar, { passive: true });

// FAQs
const headers = document.querySelectorAll(".accordion-header");

headers.forEach(header => {
    header.addEventListener("click", () => {
        const openItem = document.querySelector(".accordion-header.active");


        if (openItem && openItem !== header) {
            openItem.classList.remove("active");
            openItem.nextElementSibling.style.maxHeight = null;
            openItem.nextElementSibling.classList.remove("show");
        }

        header.classList.toggle("active");
        const content = header.nextElementSibling;

        if (header.classList.contains("active")) {
            content.style.maxHeight = content.scrollHeight + "px";
            content.classList.add("show");
        } else {
            content.style.maxHeight = null;
            content.classList.remove("show");
        }
    });
});


const firstHeader = document.querySelector(".accordion-header.active");
if (firstHeader) {
    const firstContent = firstHeader.nextElementSibling;
    firstContent.style.maxHeight = firstContent.scrollHeight + "px";
    firstContent.classList.add("show");
}


// CHATBOT  


// Netcoder.in Data Extraction Helper
// Netcoder Data Extractor with proper icon handling
// class NetcoderDataExtractor {
//     constructor() {
//         this.baseUrl = 'https://netcoder.in';
//         this.cachedData = null;
//     }

//     async fetchData() {
//         try {
//             // Try to fetch actual data from netcoder.in
//             // Note: This requires CORS support or a proxy
//             const response = await fetch(this.baseUrl, {
//                 mode: 'cors',
//                 headers: {
//                     'Accept': 'text/html',
//                     'User-Agent': 'Netcoder-Chatbot/1.0'
//                 }
//             });

//             if (!response.ok) throw new Error('Failed to fetch');

//             const html = await response.text();
//             return this.parseHTML(html);

//         } catch (error) {
//             console.warn('Using fallback data:', error.message);
//             return this.getFallbackData();
//         }
//     }

//     parseHTML(html) {
//         // This is a simplified parser - in production you'd need more robust parsing
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');

//         // Extract courses (example selectors - adjust based on actual website)
//         const courses = [];
//         const courseElements = doc.querySelectorAll('.course, .course-item, [class*="course"]');

//         courseElements.forEach((el, index) => {
//             const title = el.querySelector('h3, h4, .title')?.textContent || `Course ${index + 1}`;
//             const description = el.querySelector('p, .desc, .description')?.textContent || '';
//             const price = el.querySelector('.price, .fee')?.textContent || '';

//             courses.push({
//                 id: index + 1,
//                 title: title.trim(),
//                 description: description.trim(),
//                 price: price.trim() || 'Contact for pricing',
//                 duration: 'Varies',
//                 icon: this.getCourseIcon(title)
//             });
//         });

//         // Extract services
//         const services = [];
//         const serviceElements = doc.querySelectorAll('.service, .service-item, [class*="service"]');

//         serviceElements.forEach((el, index) => {
//             const title = el.querySelector('h3, h4, .title')?.textContent || `Service ${index + 1}`;
//             const description = el.querySelector('p, .desc')?.textContent || '';

//             services.push({
//                 id: index + 1,
//                 title: title.trim(),
//                 description: description.trim(),
//                 icon: this.getServiceIcon(title),
//                 features: ['Custom Solution', 'Expert Team', 'Support']
//             });
//         });

//         return {
//             courses: courses.length > 0 ? courses : this.getFallbackData().courses,
//             services: services.length > 0 ? services : this.getFallbackData().services,
//             extractedAt: new Date().toISOString()
//         };
//     }

//     getCourseIcon(title) {
//         const lowerTitle = title.toLowerCase();
//         if (lowerTitle.includes('web') || lowerTitle.includes('full stack')) return 'fa-solid fa-code';
//         if (lowerTitle.includes('data') || lowerTitle.includes('ai')) return 'fa-solid fa-robot';
//         if (lowerTitle.includes('mobile')) return 'fa-solid fa-mobile-screen-button';
//         if (lowerTitle.includes('cloud')) return 'fa-solid fa-cloud';
//         if (lowerTitle.includes('design')) return 'fa-solid fa-paintbrush';
//         return 'fa-solid fa-graduation-cap';
//     }

//     getServiceIcon(title) {
//         const lowerTitle = title.toLowerCase();
//         if (lowerTitle.includes('web')) return 'fa-solid fa-laptop-code';
//         if (lowerTitle.includes('mobile')) return 'fa-solid fa-mobile-screen-button';
//         if (lowerTitle.includes('ai') || lowerTitle.includes('machine')) return 'fa-solid fa-brain';
//         if (lowerTitle.includes('cloud')) return 'fa-solid fa-server';
//         if (lowerTitle.includes('design')) return 'fa-solid fa-paintbrush';
//         return 'fa-solid fa-gears';
//     }

//     getFallbackData() {
//         return {
//             courses: [
//                 {
//                     id: 1,
//                     title: "Full Stack Development",
//                     description: "Learn complete web development with modern technologies",
//                     price: "₹35,000",
//                     duration: "6 Months",
//                     icon: "fa-solid fa-code"
//                 },
//                 {
//                     id: 2,
//                     title: "Data Science & AI",
//                     description: "Master data analysis and artificial intelligence",
//                     price: "₹45,000",
//                     duration: "8 Months",
//                     icon: "fa-solid fa-robot"
//                 }
//             ],
//             services: [
//                 {
//                     id: 1,
//                     title: "Web Development",
//                     description: "Custom web solutions for your business",
//                     icon: "fa-solid fa-laptop-code",
//                     features: ["React", "Node.js", "MongoDB", "AWS"]
//                 },
//                 {
//                     id: 2,
//                     title: "Mobile App Development",
//                     description: "iOS and Android applications",
//                     icon: "fa-solid fa-mobile-screen-button",
//                     features: ["React Native", "Flutter", "Firebase"]
//                 }
//             ]
//         };
//     }

//     async getData() {
//         if (this.cachedData) {
//             return this.cachedData;
//         }

//         this.cachedData = await this.fetchData();
//         return this.cachedData;
//     }
// }

// // Floating Right Side Chatbot with Tabs and Animations
// class FloatingRightChatbot {
//     constructor() {
//         this.isOpen = false;
//         this.currentTab = 'chat';
//         this.currentLanguage = 'en';
//         this.messages = [];
//         this.initialize();
//     }

//     initialize() {
//         this.createChatbot();
//         this.loadNetcoderData();
//         this.setupEventListeners();
//         this.showWelcomeMessage();
//         this.autoOpen();
//     }

//     createChatbot() {
//         // Create main container
//         const container = document.createElement('div');
//         container.className = 'floating-right-chatbot';
//         container.innerHTML = `
//             <div class="chatbot-float-btn">
//                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqzxnAkp2rwPtM9tLiY5fSEZKiiBu9qE-rpw&s" 
//                      alt="Netcoder Chatbot">
//                 <div class="float-notification">1</div>
//             </div>

//             <div class="chatbot-popup-container">
//                 <!-- Header -->
//                 <div class="popup-header">
//                     <div class="header-left">
//                         <div class="header-avatar">
//                             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqzxnAkp2rwPtM9tLiY5fSEZKiiBu9qE-rpw&s" 
//                                  alt="Netcoder Logo">
//                         </div>
//                         <div class="header-info">
//                             <h3>Netcoder AI</h3>
//                             <p>
//                                 <span class="status-dot"></span>
//                                 Online • 24/7 Support
//                             </p>
//                         </div>
//                     </div>
//                     <div class="header-actions">
//                         <button class="header-btn" id="minimizeBtn">
//                             <i class="fa-solid fa-minus"></i>
//                         </button>
//                         <button class="header-btn" id="closePopupBtn">
//                             <i class="fa-solid fa-xmark"></i>
//                         </button>
//                     </div>
//                 </div>

//                 <!-- Tabs -->
//                 <div class="chatbot-tabs">
//                     <button class="tab-btn active" data-tab="chat">
//                         <i class="fa-regular fa-comment-dots"></i>
//                         Chat
//                     </button>
//                     <button class="tab-btn" data-tab="courses">
//                         <i class="fa-solid fa-graduation-cap"></i>
//                         Courses
//                     </button>
//                     <button class="tab-btn" data-tab="services">
//                         <i class="fa-solid fa-gears"></i>
//                         Services
//                     </button>
//                 </div>

//                 <!-- Tab Content -->
//                 <div class="tab-content">
//                     <!-- Chat Tab -->
//                     <div class="tab-pane active" id="chatTab">
//                         <div class="chat-messages" id="chatMessages">
//                             <!-- Messages will be added here -->
//                         </div>
//                         <div class="typing-container" id="typingContainer">
//                             <div class="typing-dots">
//                                 <div class="typing-dot"></div>
//                                 <div class="typing-dot"></div>
//                                 <div class="typing-dot"></div>
//                             </div>
//                             <div class="typing-text">Netcoder AI is typing...</div>
//                         </div>
//                     </div>

//                     <!-- Courses Tab -->
//                     <div class="tab-pane" id="coursesTab">
//                         <div class="courses-grid" id="coursesGrid">
//                             <!-- Courses will be loaded here -->
//                         </div>
//                     </div>

//                     <!-- Services Tab -->
//                     <div class="tab-pane" id="servicesTab">
//                         <div class="services-list" id="servicesList">
//                             <!-- Services will be loaded here -->
//                         </div>
//                     </div>
//                 </div>

//                 <!-- Chat Input -->
//                 <div class="chat-input-area">
//                     <div class="input-wrapper">
//                         <input type="text" class="chat-input" id="chatInput" 
//                                placeholder="Type your message here...">
//                         <button class="send-btn" id="sendBtn">
//                             <i class="fa-solid fa-paper-plane"></i>
//                         </button>
//                     </div>
//                     <div class="quick-suggestions">
//                         <button class="quick-suggestion" data-question="Tell me about Netcoder.in">
//                             About Us
//                         </button>
//                         <button class="quick-suggestion" data-question="What courses do you offer?">
//                             Courses
//                         </button>
//                         <button class="quick-suggestion" data-question="What services do you provide?">
//                             Services
//                         </button>
//                     </div>
//                 </div>

//                 <!-- Language Switcher -->
//                 <div class="language-switcher-bottom">
//                     <button class="lang-option active" data-lang="en">
//                         <i class="fa-solid fa-globe"></i> English
//                     </button>
//                     <button class="lang-option" data-lang="hi">
//                         <i class="fa-solid fa-globe"></i> हिंदी
//                     </button>
//                 </div>
//             </div>
//         `;

//         document.body.appendChild(container);
//         this.container = container;
//     }

//     async loadNetcoderData() {
//         // Load data using NetcoderDataExtractor
//         try {
//             const extractor = new NetcoderDataExtractor();
//             const extractedData = await extractor.getData();

//             // Merge extracted data with chatbot data
//             this.data = {
//                 en: {
//                     courses: extractedData.courses || [],
//                     services: extractedData.services || [],
//                     responses: {
//                         welcome: "Hello! I'm your Netcoder.in AI assistant. How can I help you today?",
//                         about: "Netcoder.in is a leading software development company offering cutting-edge solutions in web development, mobile apps, AI/ML, and cloud services. We've been transforming ideas into digital reality since 2018.",
//                         services: "We offer a wide range of services including Custom Web Development, Mobile App Development, AI Solutions, Cloud Services, and UI/UX Design.",
//                         courses: "We offer comprehensive courses in Full Stack Web Development, Data Science & AI, Mobile App Development, and Cloud Computing.",
//                         contact: "You can contact us at:\n📧 contact@netcoder.in\n📞 +91 98765 43210\n📍 Tech Park, Bangalore",
//                         default: "I can help you with information about our courses, services, or contact details. What would you like to know?"
//                     }
//                 },
//                 hi: {
//                     courses: [
//                         {
//                             id: 1,
//                             title: "फुल स्टैक वेब डेवलपमेंट",
//                             description: "React, Node.js, MongoDB और क्लाउड डिप्लॉयमेंट के साथ आधुनिक वेब डेवलपमेंट सीखें",
//                             price: "₹35,000",
//                             duration: "6 महीने",
//                             icon: "fa-solid fa-code"
//                         },
//                         {
//                             id: 2,
//                             title: "डेटा साइंस और एआई",
//                             description: "Python, मशीन लर्निंग, डीप लर्निंग और एआई एल्गोरिदम सीखें",
//                             price: "₹45,000",
//                             duration: "8 महीने",
//                             icon: "fa-solid fa-robot"
//                         }
//                     ],
//                     services: [
//                         {
//                             id: 1,
//                             title: "कस्टम वेब डेवलपमेंट",
//                             description: "आपके व्यवसाय के अनुरूप उत्तरदायी, स्केलेबल वेब अनुप्रयोग बनाएं",
//                             icon: "fa-solid fa-laptop-code",
//                             features: ["React/Next.js", "Node.js", "MongoDB", "AWS"]
//                         }
//                     ],
//                     responses: {
//                         welcome: "नमस्ते! मैं आपका Netcoder.in AI सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
//                         about: "Netcoder.in एक प्रमुख सॉफ्टवेयर डेवलपमेंट कंपनी है जो वेब डेवलपमेंट, मोबाइल ऐप्स, AI/ML और क्लाउड सेवाओं में अत्याधुनिक समाधान प्रदान करती है। हम 2018 से विचारों को डिजिटल वास्तविकता में बदल रहे हैं।",
//                         services: "हम कस्टम वेब डेवलपमेंट, मोबाइल ऐप डेवलपमेंट, एआई समाधान, क्लाउड सेवाएं और UI/UX डिजाइन सहित विस्तृत सेवाएं प्रदान करते हैं।",
//                         courses: "हम फुल स्टैक वेब डेवलपमेंट, डेटा साइंस एंड एआई, मोबाइल ऐप डेवलपमेंट और क्लाउड कंप्यूटिंग में व्यापक पाठ्यक्रम प्रदान करते हैं।",
//                         contact: "आप हमसे संपर्क कर सकते हैं:\n📧 contact@netcoder.in\n📞 +91 98765 43210\n📍 टेक पार्क, बैंगलोर",
//                         default: "मैं आपकी हमारे पाठ्यक्रमों, सेवाओं या संपर्क विवरण के बारे में जानकारी में मदद कर सकता हूं। आप क्या जानना चाहेंगे?"
//                     }
//                 }
//             };

//             // If no data was extracted, use fallback
//             if (this.data.en.courses.length === 0) {
//                 this.data.en.courses = new NetcoderDataExtractor().getFallbackData().courses;
//             }
//             if (this.data.en.services.length === 0) {
//                 this.data.en.services = new NetcoderDataExtractor().getFallbackData().services;
//             }

//         } catch (error) {
//             console.error('Error loading data:', error);
//             // Use fallback data
//             const fallback = new NetcoderDataExtractor().getFallbackData();
//             this.data = {
//                 en: {
//                     courses: fallback.courses,
//                     services: fallback.services,
//                     responses: {
//                         welcome: "Hello! I'm your Netcoder.in AI assistant. How can I help you today?",
//                         about: "Netcoder.in is a leading software development company offering cutting-edge solutions in web development, mobile apps, AI/ML, and cloud services.",
//                         services: "We offer a wide range of services including Web Development, Mobile App Development, AI Solutions, and Cloud Services.",
//                         courses: "We offer comprehensive courses in Full Stack Web Development, Data Science & AI, and Mobile App Development.",
//                         contact: "You can contact us at:\n📧 contact@netcoder.in\n📞 +91 98765 43210",
//                         default: "I can help you with information about our courses, services, or contact details."
//                     }
//                 },
//                 hi: {
//                     courses: [],
//                     services: [],
//                     responses: {
//                         welcome: "नमस्ते! मैं आपका Netcoder.in AI सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
//                         about: "Netcoder.in एक प्रमुख सॉफ्टवेयर डेवलपमेंट कंपनी है।",
//                         services: "हम कस्टम वेब डेवलपमेंट, मोबाइल ऐप डेवलपमेंट, एआई समाधान प्रदान करते हैं।",
//                         courses: "हम फुल स्टैक वेब डेवलपमेंट, डेटा साइंस एंड एआई में पाठ्यक्रम प्रदान करते हैं।",
//                         contact: "आप हमसे संपर्क कर सकते हैं:\n📧 contact@netcoder.in\n📞 +91 98765 43210",
//                         default: "मैं आपकी हमारे पाठ्यक्रमों, सेवाओं या संपर्क विवरण के बारे में जानकारी में मदद कर सकता हूं।"
//                     }
//                 }
//             };
//         }

//         this.renderCourses();
//         this.renderServices();
//     }

//     setupEventListeners() {
//         const floatBtn = this.container.querySelector('.chatbot-float-btn');
//         const closeBtn = this.container.querySelector('#closePopupBtn');
//         const minimizeBtn = this.container.querySelector('#minimizeBtn');
//         const sendBtn = this.container.querySelector('#sendBtn');
//         const chatInput = this.container.querySelector('#chatInput');
//         const tabBtns = this.container.querySelectorAll('.tab-btn');
//         const langOptions = this.container.querySelectorAll('.lang-option');
//         const quickSuggestions = this.container.querySelectorAll('.quick-suggestion');
//         const notification = this.container.querySelector('.float-notification');

//         // Toggle chatbot
//         floatBtn.addEventListener('click', () => this.toggleChatbot());
//         closeBtn.addEventListener('click', () => this.closeChatbot());
//         minimizeBtn.addEventListener('click', () => this.minimizeChatbot());

//         // Send message
//         sendBtn.addEventListener('click', () => this.sendMessage());
//         chatInput.addEventListener('keypress', (e) => {
//             if (e.key === 'Enter') this.sendMessage();
//         });

//         // Tab switching
//         tabBtns.forEach(btn => {
//             btn.addEventListener('click', () => {
//                 const tab = btn.dataset.tab;
//                 this.switchTab(tab);
//             });
//         });

//         // Language switching
//         langOptions.forEach(option => {
//             option.addEventListener('click', () => {
//                 const lang = option.dataset.lang;
//                 this.switchLanguage(lang);
//             });
//         });

//         // Quick suggestions
//         quickSuggestions.forEach(suggestion => {
//             suggestion.addEventListener('click', () => {
//                 const question = suggestion.dataset.question;
//                 chatInput.value = question;
//                 this.sendMessage();
//             });
//         });

//         // Hide notification when chatbot opens
//         floatBtn.addEventListener('click', () => {
//             notification.style.display = 'none';
//         });

//         // Close when clicking outside
//         document.addEventListener('click', (e) => {
//             if (this.isOpen && 
//                 !this.container.contains(e.target) && 
//                 !e.target.closest('.chatbot-float-btn')) {
//                 this.closeChatbot();
//             }
//         });
//     }

//     toggleChatbot() {
//         const popup = this.container.querySelector('.chatbot-popup-container');
//         const floatBtn = this.container.querySelector('.chatbot-float-btn');

//         this.isOpen = !this.isOpen;

//         if (this.isOpen) {
//             popup.classList.add('active');
//             floatBtn.classList.add('active');

//             // Focus on input after animation
//             setTimeout(() => {
//                 this.container.querySelector('#chatInput').focus();
//             }, 300);

//             // Scroll to bottom of messages
//             this.scrollToBottom();
//         } else {
//             popup.classList.remove('active');
//             floatBtn.classList.remove('active');
//         }
//     }

//     closeChatbot() {
//         this.container.querySelector('.chatbot-popup-container').classList.remove('active');
//         this.container.querySelector('.chatbot-float-btn').classList.remove('active');
//         this.isOpen = false;
//     }

//     minimizeChatbot() {
//         this.closeChatbot();
//     }

//     switchTab(tabName) {
//         this.currentTab = tabName;

//         // Update active tab button
//         const tabBtns = this.container.querySelectorAll('.tab-btn');
//         tabBtns.forEach(btn => {
//             btn.classList.toggle('active', btn.dataset.tab === tabName);
//         });

//         // Show active tab content
//         const tabPanes = this.container.querySelectorAll('.tab-pane');
//         tabPanes.forEach(pane => {
//             pane.classList.toggle('active', pane.id === `${tabName}Tab`);
//         });

//         // If switching to chat tab, focus input
//         if (tabName === 'chat') {
//             setTimeout(() => {
//                 this.container.querySelector('#chatInput').focus();
//             }, 300);
//         }
//     }

//     switchLanguage(lang) {
//         this.currentLanguage = lang;

//         // Update active language button
//         const langOptions = this.container.querySelectorAll('.lang-option');
//         langOptions.forEach(option => {
//             option.classList.toggle('active', option.dataset.lang === lang);
//         });

//         // Update content based on language
//         this.updateContentForLanguage(lang);

//         // Update input placeholder
//         const placeholder = lang === 'hi' 
//             ? 'अपना संदेश यहाँ लिखें...' 
//             : 'Type your message here...';
//         this.container.querySelector('#chatInput').placeholder = placeholder;
//     }

//     updateContentForLanguage(lang) {
//         // Update quick suggestions
//         const suggestions = this.container.querySelectorAll('.quick-suggestion');
//         if (lang === 'hi') {
//             suggestions[0].textContent = 'हमारे बारे में';
//             suggestions[1].textContent = 'पाठ्यक्रम';
//             suggestions[2].textContent = 'सेवाएं';
//         } else {
//             suggestions[0].textContent = 'About Us';
//             suggestions[1].textContent = 'Courses';
//             suggestions[2].textContent = 'Services';
//         }

//         // Re-render courses and services
//         this.renderCourses();
//         this.renderServices();
//     }

//     renderCourses() {
//         const coursesGrid = this.container.querySelector('#coursesGrid');
//         const courses = this.data[this.currentLanguage].courses;

//         if (!courses || courses.length === 0) {
//             coursesGrid.innerHTML = `
//                 <div class="no-data" style="text-align: center; padding: 40px 20px; color: #94a3b8;">
//                     <i class="fa-solid fa-book" style="font-size: 3rem; margin-bottom: 15px; color: #FF6B35;"></i>
//                     <p>${this.currentLanguage === 'hi' ? 'कोर्स जल्द ही उपलब्ध होंगे' : 'Courses coming soon'}</p>
//                 </div>
//             `;
//             return;
//         }

//         coursesGrid.innerHTML = courses.map((course, index) => `
//             <div class="course-card" style="animation-delay: ${index * 0.1}s">
//                 <div class="course-header">
//                     <div class="course-icon">
//                         <i class="${course.icon}"></i>
//                     </div>
//                     <div class="course-price">${course.price}</div>
//                 </div>
//                 <div class="course-title">${course.title}</div>
//                 <div class="course-desc">${course.description}</div>
//                 <div class="course-footer">
//                     <div class="course-duration">
//                         <i class="fa-regular fa-clock"></i> ${course.duration}
//                     </div>
//                     <button class="enroll-btn" data-course-id="${course.id}">
//                         ${this.currentLanguage === 'hi' ? 'दाखिला लें' : 'Enroll Now'}
//                     </button>
//                 </div>
//             </div>
//         `).join('');

//         // Add event listeners to enroll buttons
//         coursesGrid.querySelectorAll('.enroll-btn').forEach(btn => {
//             btn.addEventListener('click', (e) => {
//                 e.stopPropagation();
//                 const courseId = btn.dataset.courseId;
//                 this.showCourseDetails(courseId);
//             });
//         });
//     }

//     renderServices() {
//         const servicesList = this.container.querySelector('#servicesList');
//         const services = this.data[this.currentLanguage].services;

//         if (!services || services.length === 0) {
//             servicesList.innerHTML = `
//                 <div class="no-data" style="text-align: center; padding: 40px 20px; color: #94a3b8;">
//                     <i class="fa-solid fa-gears" style="font-size: 3rem; margin-bottom: 15px; color: #FF6B35;"></i>
//                     <p>${this.currentLanguage === 'hi' ? 'सेवाएं जल्द ही उपलब्ध होंगी' : 'Services coming soon'}</p>
//                 </div>
//             `;
//             return;
//         }

//         servicesList.innerHTML = services.map((service, index) => `
//             <div class="service-item" style="animation-delay: ${index * 0.1}s">
//                 <div class="service-icon">
//                     <i class="${service.icon}"></i>
//                 </div>
//                 <div class="service-title">${service.title}</div>
//                 <div class="service-desc">${service.description}</div>
//                 <div class="service-features">
//                     ${service.features.map(feature => `
//                         <span class="service-feature">${feature}</span>
//                     `).join('')}
//                 </div>
//             </div>
//         `).join('');
//     }

//     showCourseDetails(courseId) {
//         const course = this.data[this.currentLanguage].courses.find(c => c.id == courseId);
//         if (!course) return;

//         // Switch to chat tab and send course info
//         this.switchTab('chat');

//         const message = this.currentLanguage === 'hi'
//             ? `${course.title} के बारे में अधिक जानकारी चाहते हैं? यह ${course.duration} का कोर्स है और इसकी कीमत ${course.price} है।`
//             : `Interested in ${course.title}? This is a ${course.duration} course priced at ${course.price}.`;

//         this.addBotMessage(message);

//         // Ask if they want to enroll
//         setTimeout(() => {
//             const followUp = this.currentLanguage === 'hi'
//                 ? "क्या आप इस कोर्स में दाखिला लेना चाहेंगे? हम आपको विस्तृत जानकारी भेज सकते हैं।"
//                 : "Would you like to enroll in this course? We can send you more details.";

//             this.addBotMessage(followUp);
//         }, 1000);
//     }

//     showWelcomeMessage() {
//         const welcomeMsg = this.data[this.currentLanguage].responses.welcome;
//         this.addBotMessage(welcomeMsg);
//     }

//     addMessage(text, isUser = false) {
//         const chatMessages = this.container.querySelector('#chatMessages');
//         const messageDiv = document.createElement('div');
//         messageDiv.className = `chat-message ${isUser ? 'message-user' : 'message-bot'}`;

//         messageDiv.innerHTML = `
//             <div class="message-avatar">
//                 <i class="fa-solid ${isUser ? 'fa-user' : 'fa-robot'}"></i>
//             </div>
//             <div class="message-content">${text}</div>
//         `;

//         chatMessages.appendChild(messageDiv);
//         this.scrollToBottom();

//         // Add animation
//         setTimeout(() => {
//             messageDiv.style.opacity = '1';
//             messageDiv.style.transform = 'translateY(0)';
//         }, 10);
//     }

//     addUserMessage(text) {
//         this.addMessage(text, true);
//         this.messages.push({ text, isUser: true });
//     }

//     addBotMessage(text) {
//         this.addMessage(text, false);
//         this.messages.push({ text, isUser: false });
//     }

//     showTypingIndicator() {
//         const typingContainer = this.container.querySelector('#typingContainer');
//         typingContainer.classList.add('active');
//         this.scrollToBottom();
//     }

//     hideTypingIndicator() {
//         const typingContainer = this.container.querySelector('#typingContainer');
//         typingContainer.classList.remove('active');
//     }

//     async sendMessage() {
//         const input = this.container.querySelector('#chatInput');
//         const message = input.value.trim();

//         if (!message) return;

//         // Add user message
//         this.addUserMessage(message);
//         input.value = '';

//         // Show typing indicator
//         this.showTypingIndicator();

//         // Simulate AI processing
//         await this.simulateTyping();

//         // Generate response
//         const response = this.generateResponse(message);

//         // Hide typing and show response
//         this.hideTypingIndicator();
//         this.addBotMessage(response);

//         // Auto-scroll
//         this.scrollToBottom();
//     }

//     simulateTyping() {
//         return new Promise(resolve => {
//             const delay = 1000 + Math.random() * 1000; // 1-2 seconds
//             setTimeout(resolve, delay);
//         });
//     }

//     generateResponse(userMessage) {
//         const lang = this.currentLanguage;
//         const responses = this.data[lang].responses;
//         const message = userMessage.toLowerCase();

//         if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
//             return responses.welcome;
//         } else if (message.includes('about') || message.includes('what is netcoder')) {
//             return responses.about;
//         } else if (message.includes('service')) {
//             return responses.services;
//         } else if (message.includes('course')) {
//             return responses.courses;
//         } else if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
//             return responses.contact;
//         } else if (message.includes('thank')) {
//             return lang === 'hi' 
//                 ? "आपका धन्यवाद! यदि आपके और प्रश्न हैं तो बताएं।" 
//                 : "You're welcome! Let me know if you have more questions.";
//         } else if (message.includes('price') || message.includes('cost')) {
//             return lang === 'hi'
//                 ? "हमारे पाठ्यक्रम ₹20,000 से ₹45,000 तक हैं। सेवाओं की कीमत परियोजना आवश्यकताओं पर निर्भर करती है।"
//                 : "Our courses range from ₹20,000 to ₹45,000. Service pricing depends on project requirements.";
//         } else {
//             return responses.default;
//         }
//     }

//     scrollToBottom() {
//         const chatMessages = this.container.querySelector('#chatMessages');
//         if (chatMessages) {
//             setTimeout(() => {
//                 chatMessages.scrollTop = chatMessages.scrollHeight;
//             }, 100);
//         }
//     }

//     autoOpen() {
//         // Auto-open after 3 seconds on first visit
//         if (!sessionStorage.getItem('chatbotAutoOpened')) {
//             setTimeout(() => {
//                 this.toggleChatbot();
//                 sessionStorage.setItem('chatbotAutoOpened', 'true');
//             }, 3000);
//         }
//     }
// }

// // Initialize chatbot when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     window.netcoderFloatingChatbot = new FloatingRightChatbot();
// });

// js for navbar training

const menuItems = document.querySelectorAll(".training-menu-item[data-tab]");
const tabs = document.querySelectorAll(".training-tab");

menuItems.forEach(item => {

    function activateTab() {

        menuItems.forEach(i => i.classList.remove("active"));
        tabs.forEach(t => t.classList.remove("active"));

        item.classList.add("active");

        document.getElementById(item.dataset.tab).classList.add("active");

    }

    item.addEventListener("mouseenter", activateTab); // desktop hover
    item.addEventListener("click", activateTab); // mobile tap

});





// timeline Of online courses

const items = document.querySelectorAll(".timeline-item");
const progress = document.querySelector(".timeline-progress");
const timeline = document.querySelector(".timeline");

let ticking = false;

function updateTimeline() {
    if (!progress || !timeline || items.length === 0) {
        ticking = false;
        return;
    }
    let section = document.querySelector(".some-class");

    if (section) {
        let top = section.offsetTop;
    }
    const scrollY = window.scrollY + window.innerHeight * 0.7;

    let progressHeight = 0;

    items.forEach((item, index) => {
        const itemTop = item.offsetTop + timeline.offsetTop;

        // RESET ALL (for reverse animation)
        item.classList.remove("active", "completed");

        if (scrollY > itemTop) {
            item.classList.add("active");

            // previous items = completed
            for (let i = 0; i < index; i++) {
                items[i].classList.add("completed");
            }

            // smooth line fill
            progressHeight = item.offsetTop + 50;
        }
    });

    progress.style.height = progressHeight + "px";

    ticking = false;
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(updateTimeline);
        ticking = true;
    }
});


// milestone cards
document.addEventListener("DOMContentLoaded", () => {

    const milestones = document.querySelectorAll(".milestone-container");

    milestones.forEach((container) => {
        const header = container.querySelector(".milestone-header");
        const button = container.querySelector(".toggle-btn");
        const content = container.querySelector(".collapse");

        // Initial state
        content.style.maxHeight = "0px";

        function openMilestone() {
            content.classList.add("show");
            content.style.maxHeight = content.scrollHeight + "px";
            button.classList.add("active");
            button.setAttribute("aria-expanded", "true");
        }

        function closeMilestone() {
            content.classList.remove("show");
            content.style.maxHeight = "0px";
            button.classList.remove("active");
            button.setAttribute("aria-expanded", "false");
        }

        function closeOthers() {
            milestones.forEach((item) => {
                if (item !== container) {
                    const otherContent = item.querySelector(".collapse");
                    const otherBtn = item.querySelector(".toggle-btn");

                    otherContent.classList.remove("show");
                    otherContent.style.maxHeight = "0px";
                    otherBtn.classList.remove("active");
                    otherBtn.setAttribute("aria-expanded", "false");
                }
            });
        }

        function toggleMilestone(e) {
            e.stopPropagation();

            if (content.classList.contains("show")) {
                closeMilestone();
            } else {
                closeOthers();
                openMilestone();
            }
        }

        // Button click
        button.addEventListener("click", toggleMilestone);

        // Header click (except button)
        header.addEventListener("click", (e) => {
            if (!button.contains(e.target)) {
                toggleMilestone(e);
            }
        });

    });

});

// call advisor function
function callAdvisor() {
    if (confirm("Call Advisor now?")) {
        window.location.href = "tel:9816132055";
    }
}

document.querySelectorAll(".course-single").forEach((courseHero) => {
    const courseContent = courseHero.children[1];
    const demoButton = courseContent?.querySelector(".color-btn");

    if (!courseContent || !demoButton || courseContent.querySelector(".advisor-btn")) {
        return;
    }

    const actions = document.createElement("div");
    actions.className = "campus-hero-actions";
    demoButton.parentNode.insertBefore(actions, demoButton);
    actions.append(demoButton);

    const isServicesPage = Boolean(document.querySelector(".services"));
    const advisorButton = document.createElement("button");
    advisorButton.className = "color-btn outline advisor-btn";
    advisorButton.type = "button";
    advisorButton.textContent = isServicesPage ? "Schedule an appointment" : "Talk to Advisor";
    advisorButton.addEventListener("click", callAdvisor);
    actions.append(advisorButton);

    const sourceStats = document.querySelectorAll(".stats-grid .stat-card");
    if (sourceStats.length && !courseContent.querySelector(".campus-hero-stats")) {
        const heroStats = document.createElement("div");
        heroStats.className = "campus-hero-stats";

        Array.from(sourceStats).slice(0, 3).forEach((sourceStat) => {
            const value = sourceStat.querySelector("h3")?.textContent.trim();
            const label = sourceStat.querySelector("p")?.textContent.trim();

            if (!value || !label) {
                return;
            }

            const heroStat = document.createElement("div");
            heroStat.className = "campus-hero-stat";
            heroStat.innerHTML = `<strong>${value}</strong><span>${label}</span>`;
            heroStats.append(heroStat);
        });

        if (heroStats.children.length) {
            courseContent.append(heroStats);
        }
    }
});

// ---------------------------------------------------------------
// brochure-form
const brochureForm = document.querySelector(".brochure-form");
const brochureSubmitBtn = brochureForm ? brochureForm.querySelector(".color-btn") : null;
let brochureConfirmationResult = null;
let brochureOtpVerified = false;
let brochureWebOtpAbortController = null;

function startBrochureWebOTPListener() {
    if (!('OTPCredential' in window)) {
        console.log('WebOTP API not supported in this browser.');
        return;
    }
    
    if (brochureWebOtpAbortController) {
        brochureWebOtpAbortController.abort();
    }
    
    brochureWebOtpAbortController = new AbortController();
    
    navigator.credentials.get({
        otp: { transport: ['sms'] },
        signal: brochureWebOtpAbortController.signal
    }).then(otp => {
        const code = otp.code;
        const otpInputs = brochureForm.querySelectorAll(".brochure-otp-input");
        if (code && code.length === 6 && otpInputs.length === 6) {
            otpInputs.forEach((inp, idx) => {
                inp.value = code[idx] || "";
                inp.classList.add('filled');
            });
            setBrochureStatus('<span class="otp-spinner"></span> Auto-filling from SMS...', 'info');
            verifyBrochureOtp();
        }
    }).catch(err => {
        console.log('Brochure WebOTP closed or failed:', err);
    });
}

const BROCHURE_FIREBASE_CONFIG = {
    apiKey: "AIzaSyDhOFNMp-SpfKo28_Dse2mNpSYigxyTwxU",
    authDomain: "contactform-netcoder-website.firebaseapp.com",
    projectId: "contactform-netcoder-website",
    storageBucket: "contactform-netcoder-website.firebasestorage.app",
    messagingSenderId: "121917397761",
    appId: "1:121917397761:web:2d75b1a46fd02f4d211900",
    measurementId: "G-7HQZTWRZJ4"
};

function getBrochureField(selector) {
    return brochureForm ? brochureForm.querySelector(selector) : null;
}

function showBrochureAlert(options) {
    if (window.Swal && typeof Swal.fire === "function") {
        Swal.fire(options);
        return;
    }

    alert(options.text || options.title || "");
}

function setBrochureStatus(message, type = "info") {
    const status = getBrochureField(".brochure-otp-status");
    if (!status) return;

    status.innerHTML = message || "";
    status.className = "brochure-otp-status otp-auto-status-indicator" + 
        (type === "error" ? "" : type === "success" ? " verified" : " verifying");
}

function ensureBrochureOtpUi() {
    if (!brochureForm || getBrochureField(".brochure-otp-wrap")) return;

    const formBody = brochureSubmitBtn ? brochureSubmitBtn.parentElement : brochureForm.querySelector("form > div");
    if (!formBody) return;

    const otpHtml = `
        <div class="brochure-otp-wrap" style="display:none; margin-top:12px;">
            <div class="brochure-otp-inputs" style="display:flex; gap:8px; justify-content:center; margin-bottom:10px;">
                <input type="text" class="brochure-otp-input" maxlength="1" inputmode="numeric" autocomplete="one-time-code" style="width:38px; height:38px; text-align:center;">
                <input type="text" class="brochure-otp-input" maxlength="1" inputmode="numeric" style="width:38px; height:38px; text-align:center;">
                <input type="text" class="brochure-otp-input" maxlength="1" inputmode="numeric" style="width:38px; height:38px; text-align:center;">
                <input type="text" class="brochure-otp-input" maxlength="1" inputmode="numeric" style="width:38px; height:38px; text-align:center;">
                <input type="text" class="brochure-otp-input" maxlength="1" inputmode="numeric" style="width:38px; height:38px; text-align:center;">
                <input type="text" class="brochure-otp-input" maxlength="1" inputmode="numeric" style="width:38px; height:38px; text-align:center;">
            </div>
            <div id="brochure-recaptcha-container"></div>
           <div class="brochure-otp-actions" 
     style="display:none; 
            display:grid; 
            grid-template-columns:repeat(1, minmax(50px, 1fr)); 
            justify-items:center;  /*  THIS centers buttons */
            gap:8px; 
            margin-top:12px;">

    <button type="button" class="color-btn brochure-verify-btn" 
            style="width:140px; margin:0; min-height:20px;">
        Verify OTP
    </button>

    <button type="button" class="color-btn brochure-resend-btn" 
            style="width:140px; margin:0; min-height:20px;">
        Resend OTP
    </button>
</div>
            <p class="brochure-otp-status" style="min-height:18px; margin-top:8px; font-size:13px; text-align:center;"></p>
        </div>`;

    brochureSubmitBtn.insertAdjacentHTML("afterend", otpHtml);

    const otpInputs = brochureForm.querySelectorAll(".brochure-otp-input");
    let isBrochureAutoVerifying = false;

    function checkAndAutoVerifyBrochure() {
        const allFilled = Array.from(otpInputs).every(i => /^\d$/.test(i.value));
        const verifyBtn = getBrochureField(".brochure-verify-btn");
        if (allFilled && !isBrochureAutoVerifying) {
            isBrochureAutoVerifying = true;
            otpInputs.forEach(i => i.classList.add("verifying"));
            setTimeout(() => {
                if (verifyBtn) verifyBtn.click();
            }, 300);
        } else if (!allFilled) {
            isBrochureAutoVerifying = false;
        }
    }

    otpInputs.forEach((input, index) => {
        input.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9]/g, "");
            if (this.value) {
                this.classList.add('filled');
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
                checkAndAutoVerifyBrochure();
            }
        });

        input.addEventListener("keydown", function (event) {
            if (event.key === "Backspace") {
                this.value = "";
                this.classList.remove('verified', 'verifying', 'filled');
                if (index > 0) {
                    otpInputs[index - 1].focus();
                }
                isBrochureAutoVerifying = false;
            }
        });

        input.addEventListener("paste", function (event) {
            event.preventDefault();
            const pasted = (event.clipboardData || window.clipboardData).getData("text").trim();
            if (/^\d{6}$/.test(pasted)) {
                otpInputs.forEach((inp, idx) => {
                    inp.value = pasted[idx];
                    inp.classList.add('filled');
                });
                otpInputs[5].focus();
                checkAndAutoVerifyBrochure();
            }
        });
    });

    const verifyBtn = getBrochureField(".brochure-verify-btn");
    if (verifyBtn) {
        verifyBtn.addEventListener("click", verifyBrochureOtp);
    }

    const resendBtn = getBrochureField(".brochure-resend-btn");
    if (resendBtn) {
        resendBtn.addEventListener("click", sendBrochureOtp);
    }
}

function initBrochureFirebase() {
    if (!window.firebase || !firebase.auth) {
        showBrochureAlert({
            title: "OTP service unavailable",
            text: "Firebase is not loaded on this page.",
            icon: "error"
        });
        return false;
    }

    if (!firebase.apps.length) {
        firebase.initializeApp(BROCHURE_FIREBASE_CONFIG);
    }

    return true;
}

// function to validate form
function valiDateForm() {
    const nameEl = getBrochureField("#name");
    const numberEl = getBrochureField("#number");
    const emailEl = getBrochureField("#email");

    if (!nameEl || !numberEl || !emailEl) {
        console.error("Brochure form fields not found.");
        return false;
    }

    const name = nameEl.value.trim();
    const number = numberEl.value.trim();
    const email = emailEl.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    const isValid = emailRegex.test(email) && phoneRegex.test(number.replace(/\D/g, '')) && nameRegex.test(name);

    if (isValid) {
        return true;
    } else {
        showBrochureAlert({
            title: "Invalid input",
            text: "Please enter a valid name, phone number, and email.",
            icon: "warning"
        });
        return false;
    }





}
// end

function sendBrochureOtp() {
    if (!valiDateForm() || !initBrochureFirebase()) return;

    ensureBrochureOtpUi();

    const numberEl = getBrochureField("#number");
    const phone = "+91" + numberEl.value.trim().replace(/\D/g, "");
    const otpWrap = getBrochureField(".brochure-otp-wrap");
    const otpActions = getBrochureField(".brochure-otp-actions");
    const resendBtn = getBrochureField(".brochure-resend-btn");

    if (otpWrap) otpWrap.style.display = "block";
    if (otpActions) otpActions.style.display = "none";
    if (resendBtn) resendBtn.disabled = true;
    brochureSubmitBtn.disabled = true;
    brochureSubmitBtn.textContent = "Sending OTP...";
    setBrochureStatus("");

    if (!window.brochureRecaptchaVerifier) {
        window.brochureRecaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "brochure-recaptcha-container",
            { size: "invisible" }
        );
    }

    firebase.auth().signInWithPhoneNumber(phone, window.brochureRecaptchaVerifier)
        .then(result => {
            brochureConfirmationResult = result;
            brochureSubmitBtn.disabled = false;
            brochureSubmitBtn.textContent = "Download Brochure";
            if (otpActions) otpActions.style.display = "grid";
            if (resendBtn) resendBtn.disabled = false;
            setBrochureStatus("OTP sent successfully. Enter the 6-digit code.", "success");

            // Start brochure WebOTP SMS receiver
            startBrochureWebOTPListener();

            const firstInput = getBrochureField(".brochure-otp-input");
            if (firstInput) firstInput.focus();
        })
        .catch(error => {
            console.error("Brochure OTP error:", error);
            brochureSubmitBtn.disabled = false;
            brochureSubmitBtn.textContent = "Download Brochure";
            if (otpActions) otpActions.style.display = "grid";
            if (resendBtn) resendBtn.disabled = false;
            setBrochureStatus(error.message || "Failed to send OTP. Please try again.", "error");

            if (window.brochureRecaptchaVerifier) {
                window.brochureRecaptchaVerifier.clear();
                window.brochureRecaptchaVerifier = null;
            }
        });
}

function verifyBrochureOtp(event) {
    if (event) event.preventDefault();

    const otpInputs = brochureForm.querySelectorAll(".brochure-otp-input");
    const otp = Array.from(otpInputs).map(input => input.value.trim()).join("");
    const verifyBtn = getBrochureField(".brochure-verify-btn");

    if (otp.length !== 6) {
        setBrochureStatus("Enter complete 6-digit OTP.", "error");
        return;
    }

    if (!brochureConfirmationResult) {
        setBrochureStatus("Please send OTP first.", "error");
        return;
    }

    if (verifyBtn) {
        verifyBtn.disabled = true;
        verifyBtn.innerHTML = '<span class="otp-spinner"></span> Verifying...';
    }
    setBrochureStatus('<span class="otp-spinner"></span> Verifying OTP...', "info");

    brochureConfirmationResult.confirm(otp)
        .then(() => {
            brochureOtpVerified = true;
            otpInputs.forEach(i => {
                i.classList.remove('verifying');
                i.classList.add('verified');
            });
            if (verifyBtn) {
                verifyBtn.innerHTML = 'Verified ✓';
            }
            
            if (brochureWebOtpAbortController) {
                brochureWebOtpAbortController.abort();
                brochureWebOtpAbortController = null;
            }

            setBrochureStatus("✓ OTP verified successfully. Downloading brochure...", "success");
            setTimeout(() => {
                sendFormData();
            }, 1200);
        })
        .catch(error => {
            console.error("Brochure OTP verify error:", error);
            brochureOtpVerified = false;
            otpInputs.forEach(i => i.classList.remove('verifying'));
            if (verifyBtn) {
                verifyBtn.disabled = false;
                verifyBtn.textContent = "Verify OTP";
            }
            setBrochureStatus("✗ Invalid or expired OTP. Please try again.", "error");
        });
}

// function to send from data of brochure form
function sendFormData() {
    if (!brochureOtpVerified) {
        sendBrochureOtp();
        return;
    }

    if (!window.emailjs) {
        showBrochureAlert({
            title: "Email service unavailable",
            text: "Unable to send brochure request right now. Please try again later.",
            icon: "error"
        });
        console.error("EmailJS is not loaded.");
        return;
    }

    const nameEl = getBrochureField("#name");
    const numberEl = getBrochureField("#number");
    const emailEl = getBrochureField("#email");

    if (!nameEl || !numberEl || !emailEl) {
        showBrochureAlert({
            title: "Form error",
            text: "Brochure form fields could not be found.",
            icon: "error"
        });
        console.error("Brochure form fields missing when sending data.");
        return;
    }

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const number = numberEl.value.trim();
    const courseTitle = (document.querySelector("h1, .page-title div, .banner h1, .course-heading")?.textContent || document.title || "Brochure").trim();

    const params = {
        name: name,
        user_name: name,
        from_name: name,
        fullName: name,
        email: email,
        user_email: email,
        from_email: email,
        number: number,
        phone: number,
        mobile: number,
        mobile_number: number,
        phone_number: number,
        course: courseTitle,
        page: document.title,
        subject: "Brochure Request"
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
        .then(function (res) {
            showBrochureAlert({
                title: "Great Job!",
                text: "Submission Successful! Your form has been received, and the brochure will be sent to your email soon.",
                icon: "success",
                confirmButtonColor: "#FF5532",
                customClass: {
                    popup: 'custom-swal-popup',
                    icon: 'custom-swal-icon'
                }
            });

            brochureOtpVerified = false;
            brochureConfirmationResult = null;
            if (brochureSubmitBtn) brochureSubmitBtn.textContent = "Download Brochure";

            const verifyBtn = getBrochureField(".brochure-verify-btn");
            const otpWrap = getBrochureField(".brochure-otp-wrap");
            const otpActions = getBrochureField(".brochure-otp-actions");
            if (verifyBtn) {
                verifyBtn.disabled = false;
                verifyBtn.textContent = "Verify OTP";
            }
            if (otpActions) otpActions.style.display = "none";
            if (otpWrap) otpWrap.style.display = "none";
            brochureForm.querySelectorAll(".brochure-otp-input").forEach(input => {
                input.value = "";
            });
        })
        .catch(function (error) {
            showBrochureAlert({
                title: "Something went wrong",
                text: "Submission Unsuccessful. Please try again later!",
                icon: "error"
            });
            console.error("EmailJS error:", error, "service:", EMAILJS_SERVICE_ID, "template:", EMAILJS_TEMPLATE_ID);
        });
}

// end

if (brochureSubmitBtn) {
    ensureBrochureOtpUi();

    brochureSubmitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        sendBrochureOtp();
    });
}

// end

// new css google reviews

const ncSlider = document.querySelector('.nc-slider');
const ncCards = document.querySelectorAll('.nc-card');

let ncIndex = 0;

function ncVisibleCards(){
    if(window.innerWidth <= 767) return 1;
    if(window.innerWidth <= 991) return 2;
    return 3;
}

function ncSlide(){
    if (!ncSlider || !ncCards.length) return;
    const cardWidth = ncCards[0].offsetWidth + 24;
    const maxIndex = ncCards.length - ncVisibleCards();

    ncIndex++;

    if(ncIndex > maxIndex){
        ncIndex = 0;
    }

    ncSlider.style.transform =
    `translateX(-${ncIndex * cardWidth}px)`;
}

if (ncSlider && ncCards.length) {
    setInterval(ncSlide, 3500);
}

window.addEventListener('resize',()=>{
    if (!ncSlider || !ncCards.length) return;
    ncIndex = 0;
    ncSlider.style.transform = 'translateX(0)';
});

// 
// ----- 3. Success stories (video testimonials) -----
    const testimonials = [
      { name: "Pallvi Sharma", videoId: "pxlXyaw5Hag" },
      { name: "Shivani", videoId: "9xIhO56gEsY" }
    ];
    const grid = document.getElementById('testimonialsGrid');
    const playIcon = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;

    if (grid) {
        testimonials.forEach(t => {
          const card = document.createElement('div');
          card.className = 'video-card';
          card.innerHTML = `
            <img src="https://img.youtube.com/vi/${t.videoId}/hqdefault.jpg" alt="${t.name} testimonial video thumbnail">
            <div class="watch-row">
              <div class="play-badge">${playIcon}</div>
              <span class="watch-label">Watch video</span>
            </div>
            <div class="card-footer">
              <p class="person-name">${t.name}</p>
            </div>
          `;
          card.addEventListener('click', () => openPopup(t.videoId, t.name));
          grid.appendChild(card);
        });
    }

    // popup
    const popupOverlay = document.getElementById('popupOverlay');
    const popupBox = document.getElementById('popupBox');
    const popupClose = document.getElementById('popupClose');

    function openPopup(videoId, name) {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;
      iframe.title = name + ' testimonial video';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.onerror = () => showPopupError(name);

      popupBox.querySelectorAll('iframe, .popup-msg').forEach(el => el.remove());
      popupBox.appendChild(iframe);
      popupOverlay.classList.add('open');
    }

    function showPopupError(name) {
      popupBox.querySelectorAll('iframe').forEach(el => el.remove());
      const msg = document.createElement('p');
      msg.className = 'popup-msg';
      msg.textContent = name + "'s video is currently unavailable.";
      popupBox.appendChild(msg);
    }

    function closePopup() {
      popupOverlay.classList.remove('open');
      popupBox.querySelectorAll('iframe, .popup-msg').forEach(el => el.remove());
    }

    popupClose.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', (e) => {
      if (e.target === popupOverlay) closePopup();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePopup();
    });
