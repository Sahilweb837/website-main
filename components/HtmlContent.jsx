"use client";

import { useEffect } from "react";

export default function HtmlContent({ html, pageSlug }) {
  useEffect(() => {
    // 1. GLOBAL MODAL WIRE-UP
    if (typeof window !== "undefined") {
      window.openBox = function (e) {
        if (e && e.preventDefault) e.preventDefault();
        window.dispatchEvent(new CustomEvent("open-demo-modal"));
        return false;
      };
      window.openServiceModal = window.openBox;
      window.closeForm = function (e) {
        if (e && e.preventDefault) e.preventDefault();
        window.dispatchEvent(new CustomEvent("close-demo-modal"));
        return false;
      };
    }

    // 2. ACCORDION HANDLERS (Course syllabi, FAQs)
    const accordionHeaders = document.querySelectorAll(
      ".accordion-header, .accordion-title, .faq-header, .course-faq h4, .accordion h5, .accordion-item .accordion-header"
    );

    const accordionHandlers = [];
    accordionHeaders.forEach((header) => {
      header.style.cursor = "pointer";
      const handler = () => {
        header.classList.toggle("active");
        let content = header.nextElementSibling;
        if (!content && header.parentElement) {
          content = header.parentElement.querySelector(".accordion-content, .acc-content, p, div");
        }
        if (content) {
          content.classList.toggle("show");
          if (content.style.display === "block") {
            content.style.display = "none";
          } else {
            content.style.display = "block";
          }
        }
      };
      header.addEventListener("click", handler);
      accordionHandlers.push({ header, handler });
    });

    // 3. WHY HUB TABS (Homepage)
    const hub = document.querySelector(".nc-why-hub");
    if (hub) {
      const buttons = hub.querySelectorAll(".nc-why-hub-toggle-btn");
      const panels = hub.querySelectorAll(".nc-why-hub-panel");
      buttons.forEach((button) => {
        button.onclick = function () {
          const target = button.dataset.target;
          buttons.forEach((b) => {
            const active = b === button;
            b.classList.toggle("is-active", active);
            b.setAttribute("aria-selected", active ? "true" : "false");
          });
          panels.forEach((p) => {
            const active = p.id === target;
            p.classList.toggle("is-active", active);
            p.hidden = !active;
          });
        };
      });
    }

    // 4. HERO SLIDER & TYPEWRITER (Homepage)
    const heroSlides = document.querySelectorAll(".hero-slide");
    const heroDots = document.querySelectorAll(".hero-dot");
    const portfolioUrl = document.querySelector("#heroPortfolioUrl");
    const careerWord = document.querySelector("#heroCareerWord");
    let currentIndex = 0;
    let typewriterTimer = null;
    let autoplayTimer = null;

    function typeWord(word) {
      if (!careerWord) return;
      clearTimeout(typewriterTimer);
      careerWord.textContent = "";
      let charIdx = 0;
      const typeNext = () => {
        careerWord.textContent = word.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx < word.length) {
          typewriterTimer = setTimeout(typeNext, 40);
        }
      };
      typeNext();
    }

    function showSlide(idx) {
      if (!heroSlides.length) return;
      currentIndex = (idx + heroSlides.length) % heroSlides.length;
      heroSlides.forEach((slide, sIdx) => {
        slide.classList.toggle("is-active", sIdx === currentIndex);
      });
      heroDots.forEach((dot, dIdx) => {
        const isActive = dIdx === currentIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-pressed", String(isActive));
      });
      const activeSlide = heroSlides[currentIndex];
      if (portfolioUrl && activeSlide) {
        portfolioUrl.innerHTML = '<i className="fa-solid fa-lock"></i> ' + (activeSlide.dataset.url || "netcoder.in");
      }
      if (activeSlide && activeSlide.dataset.headline) {
        typeWord(activeSlide.dataset.headline);
      }
    }

    if (heroSlides.length > 0) {
      showSlide(0);
      autoplayTimer = setInterval(() => showSlide(currentIndex + 1), 3200);
      heroDots.forEach((dot, idx) => {
        dot.onclick = () => {
          clearInterval(autoplayTimer);
          showSlide(idx);
          autoplayTimer = setInterval(() => showSlide(currentIndex + 1), 3200);
        };
      });
    }

    // 5. CONTACT PAGE MULTI-STEP SLIDES
    const eduSelect = document.getElementById("educationType");
    const regSection = document.getElementById("regularCoursesSection");
    const indSection = document.getElementById("industrialSection");
    const srvSection = document.getElementById("servicesSection");
    const onlSection = document.getElementById("onlineCoursesSection");

    if (eduSelect) {
      eduSelect.onchange = (e) => {
        const val = e.target.value;
        if (regSection) regSection.style.display = val === "regular" ? "block" : "none";
        if (indSection) indSection.style.display = val === "industrial" ? "block" : "none";
        if (srvSection) srvSection.style.display = val === "services" ? "block" : "none";
        if (onlSection) onlSection.style.display = val === "online" ? "block" : "none";
      };

      // Service option button selections
      const srvButtons = document.querySelectorAll(".service-btn");
      srvButtons.forEach((btn) => {
        btn.onclick = () => {
          srvButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
        };
      });

      // Continue to Step 2
      const contBtn = document.querySelector(".continue-btn-form, .btn-next-step");
      const slide1 = document.getElementById("slide1");
      const slide2 = document.getElementById("slide2");
      if (contBtn && slide1 && slide2) {
        contBtn.onclick = (e) => {
          e.preventDefault();
          if (!eduSelect.value) {
            alert("Please choose what you are interested in.");
            return;
          }
          slide1.classList.remove("active");
          slide1.style.display = "none";
          slide2.classList.add("active");
          slide2.style.display = "block";
        };
      }
    }

    // 6. BOOTCAMP PAGE SCRIPTS
    if (pageSlug === "bootcamp") {
      const applyBtn = document.getElementById("applyNowBtn");
      const popup = document.getElementById("applyPopup");
      const closePopup = document.getElementById("applyPopupClose");
      const toTop = document.getElementById("toTop");

      if (applyBtn && popup) {
        applyBtn.onclick = (e) => {
          e.preventDefault();
          popup.style.display = "flex";
        };
      }
      if (closePopup && popup) {
        closePopup.onclick = () => {
          popup.style.display = "none";
        };
      }
      if (toTop) {
        window.addEventListener("scroll", () => {
          toTop.classList.toggle("show", window.scrollY > 500);
        });
        toTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
      }

      // Load external bootcamp.js if available
      const script = document.createElement("script");
      script.src = "/js/bootcamp.js";
      script.defer = true;
      document.body.appendChild(script);
    }

    // 7. FEEDBACK FORM SUBMISSION TO /api/feedback
    const feedbackForm = document.querySelector("form[action*='feedback']");
    if (feedbackForm) {
      feedbackForm.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(feedbackForm);
        const data = Object.fromEntries(formData.entries());

        // Get all selected interested courses
        const interestedCourses = Array.from(
          feedbackForm.querySelectorAll("input[name='interested_courses[]']:checked")
        ).map((cb) => cb.value);
        if (interestedCourses.length) {
          data.interested_courses = interestedCourses;
        }

        try {
          const submitBtn = feedbackForm.querySelector("button[type='submit']");
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting Feedback...";
          }

          const res = await fetch("/api/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          });

          const result = await res.json();
          if (res.ok && result.success) {
            // Show Success Modal
            let successModal = document.getElementById("successModal");
            if (!successModal) {
              successModal = document.createElement("div");
              successModal.className = "popup-overlay";
              successModal.id = "successModal";
              successModal.innerHTML = `
                <div class="popup-card">
                    <button type="button" class="popup-close-x close-feedback-btn">&times;</button>
                    <div class="popup-icon-wrap" style="color: #ff5532; margin-bottom: 15px; font-size: 40px;">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <h2 class="popup-title" style="color: #0f172a; margin-bottom: 10px;">Thank You!</h2>
                    <p class="popup-desc" style="color: #64748b; line-height: 1.6; margin-bottom: 20px;">
                        Your valuable feedback has been recorded successfully. We sincerely appreciate your participation!
                    </p>
                    <div class="popup-buttons">
                        <button type="button" class="btn-popup-primary close-feedback-btn">Close</button>
                        <a href="/" class="btn-popup-secondary" style="margin-left: 10px;">Visit Home</a>
                    </div>
                </div>
              `;
              successModal.querySelectorAll('.close-feedback-btn').forEach(btn => {
                btn.addEventListener('click', () => successModal.remove());
              });
              document.body.appendChild(successModal);
            } else {
              successModal.style.display = "flex";
            }
            feedbackForm.reset();
          } else {
            alert(result.error || "Failed to submit feedback. Please check required fields.");
          }
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Feedback";
          }
        } catch (err) {
          console.error(err);
          alert("Submission error. Please try again.");
        }
      };
    }

    return () => {
      accordionHandlers.forEach(({ header, handler }) => {
        header.removeEventListener("click", handler);
      });
      clearInterval(autoplayTimer);
      clearTimeout(typewriterTimer);
    };
  }, [html, pageSlug]);

  return (
    <div
      className="blade-converted-container"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
