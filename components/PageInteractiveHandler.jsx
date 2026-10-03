"use client";

import { useEffect } from "react";

export default function PageInteractiveHandler({ pageSlug }) {
  useEffect(() => {
    // 1. BODY CLASS (Crucial for .index-page scoped CSS rules on homepage)
    if (pageSlug === "home") {
      document.body.classList.add("index-page");
    }

    // 2. COUNTER ANIMATION (Trust bar & statistics across homepage, courses, etc.)
    const counterElements = document.querySelectorAll(
      "#trustbar .num, .trust-stat .num, [data-count]"
    );
    let counterObserver = null;

    if (counterElements.length > 0 && typeof IntersectionObserver !== "undefined") {
      counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const target = parseInt(el.dataset.count, 10);
              if (isNaN(target)) return;

              const suffix = el.dataset.suffix || "";
              const duration = 1600;
              let startTime = null;

              function animateCounter(currentTime) {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // easeOutCubic
                const ease = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(ease * target);

                el.textContent = currentVal + suffix;

                if (progress < 1) {
                  requestAnimationFrame(animateCounter);
                } else {
                  el.textContent = target + suffix;
                }
              }

              requestAnimationFrame(animateCounter);
              counterObserver.unobserve(el);
            }
          });
        },
        { threshold: 0.15 }
      );

      counterElements.forEach((el) => counterObserver.observe(el));
    }

    // 3. TIMELINE / CAREER ROADMAP PROGRESS ANIMATION
    const timeline = document.querySelector(".timeline, .nc-home-roadmap");
    const timelineItems = document.querySelectorAll(".timeline-item");
    const timelineProgress = document.querySelector(".timeline-progress");
    let timelineTicking = false;

    function updateTimeline() {
      if (!timeline || !timelineProgress || timelineItems.length === 0) {
        timelineTicking = false;
        return;
      }

      const scrollTrigger = window.scrollY + window.innerHeight * 0.72;
      let progressHeight = 0;

      timelineItems.forEach((item, index) => {
        const itemTop = window.scrollY + item.getBoundingClientRect().top;

        // Reset state for reverse scrolling
        item.classList.remove("active", "completed");

        if (scrollTrigger > itemTop) {
          item.classList.add("active");

          for (let i = 0; i < index; i++) {
            timelineItems[i].classList.add("completed");
          }

          // Progress line tracks active item
          progressHeight = item.offsetTop + (item.offsetHeight / 2 || 35);
        }
      });

      timelineProgress.style.height = `${progressHeight}px`;
      timelineTicking = false;
    }

    function onScrollTimeline() {
      if (!timelineTicking) {
        requestAnimationFrame(updateTimeline);
        timelineTicking = true;
      }
    }

    if (timeline && timelineItems.length > 0) {
      window.addEventListener("scroll", onScrollTimeline, { passive: true });
      window.addEventListener("resize", onScrollTimeline, { passive: true });
      setTimeout(updateTimeline, 100);
    }

    // 4. POPULAR PROGRAMS CAROUSEL ARROWS & SCROLL
    const carousel = document.querySelector(".carousel");
    const leftBtn = document.querySelector("#left, .navigations #left");
    const rightBtn = document.querySelector("#right, .navigations #right");

    if (carousel) {
      const getCardWidth = () => {
        const card = carousel.querySelector(".card");
        return card ? card.offsetWidth + 24 : 330;
      };

      if (leftBtn) {
        leftBtn.onclick = (e) => {
          e.preventDefault();
          carousel.scrollBy({ left: -getCardWidth(), behavior: "smooth" });
        };
      }

      if (rightBtn) {
        rightBtn.onclick = (e) => {
          e.preventDefault();
          carousel.scrollBy({ left: getCardWidth(), behavior: "smooth" });
        };
      }

      let isDragging = false;
      let startX = 0;
      let startScrollLeft = 0;

      const onMouseDown = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
      };

      const onMouseMove = (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
      };

      const onMouseUp = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
      };

      carousel.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }

    // 5. HIRING PARTNERS INFINITE MARQUEE CLONING
    document.querySelectorAll(".logo-track").forEach((track) => {
      if (track.dataset.loopReady === "true") return;
      const cards = Array.from(track.children);
      cards.forEach((card) => track.appendChild(card.cloneNode(true)));
      track.dataset.loopReady = "true";
    });

    // 6. VIDEO TESTIMONIALS POPUP
    const popupOverlay = document.getElementById("popupOverlay");
    const popupBox = document.getElementById("popupBox");
    const popupClose = document.getElementById("popupClose");

    window.openTestimonialVideo = function (videoId, name) {
      if (!popupOverlay || !popupBox) return;
      popupBox.querySelectorAll("iframe, .popup-msg").forEach((el) => el.remove());

      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;
      iframe.title = `${name || "Student"} testimonial video`;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      popupBox.appendChild(iframe);
      popupOverlay.classList.add("open");
    };

    function closeVideoPopup() {
      if (!popupOverlay || !popupBox) return;
      popupOverlay.classList.remove("open");
      popupBox.querySelectorAll("iframe, .popup-msg").forEach((el) => el.remove());
    }

    if (popupClose) popupClose.onclick = closeVideoPopup;
    if (popupOverlay) {
      popupOverlay.onclick = (e) => {
        if (e.target === popupOverlay) closeVideoPopup();
      };
    }
    const onKeydown = (e) => {
      if (e.key === "Escape") closeVideoPopup();
    };
    window.addEventListener("keydown", onKeydown);

    // Wire up all video cards with data-video-id
    document.querySelectorAll(".video-card[data-video-id]").forEach((card) => {
      card.onclick = () => {
        window.openTestimonialVideo(card.dataset.videoId, card.dataset.videoName);
      };
    });

    // 7. HERO SLIDER & TYPEWRITER (Homepage)
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
          typewriterTimer = setTimeout(typeNext, 45);
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
        portfolioUrl.innerHTML =
          '<i className="fa-solid fa-lock"></i> ' +
          (activeSlide.dataset.url || "netcoder.in/programs");
      }
      if (activeSlide && activeSlide.dataset.headline) {
        typeWord(activeSlide.dataset.headline);
      }
    }

    if (heroSlides.length > 0) {
      showSlide(0);
      autoplayTimer = setInterval(() => showSlide(currentIndex + 1), 3500);
      heroDots.forEach((dot, idx) => {
        dot.onclick = () => {
          clearInterval(autoplayTimer);
          showSlide(idx);
          autoplayTimer = setInterval(() => showSlide(currentIndex + 1), 3500);
        };
      });
    }

    // 8. WHY HUB TABS (Homepage)
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

    // 9. ACCORDION HANDLERS (FAQs & Course Syllabi across all pages)
    const accordionHeaders = document.querySelectorAll(
      ".accordion-header, .accordion-title, .faq-header, .course-faq h4, .accordion h5"
    );
    const accordionHandlers = [];
    accordionHeaders.forEach((header) => {
      header.style.cursor = "pointer";
      const handler = () => {
        header.classList.toggle("active");
        let content = header.nextElementSibling;
        if (!content && header.parentElement) {
          content = header.parentElement.querySelector(
            ".accordion-content, .acc-content, p, div"
          );
        }
        if (content) {
          content.classList.toggle("show");
        }
      };
      header.addEventListener("click", handler);
      accordionHandlers.push({ header, handler });
    });

    // 10. SERVICES PAGE MODAL CONTROLLER (#serviceInquiryModal)
    const svcModal = document.getElementById("serviceInquiryModal");
    const svcCloseBtn = document.querySelector(".service-modal-close");
    const svcGetQuoteBtns = document.querySelectorAll(
      ".course-single .color-btn, [data-open-svc-modal], a[href*='openServiceModal']"
    );

    function goToSvcSlide(n) {
      if (!svcModal) return;
      svcModal.querySelectorAll(".form-slide").forEach((s) => s.classList.remove("active"));
      const target = document.getElementById("svcSlide" + n);
      if (target) target.classList.add("active");
    }

    window.openServiceModal = function (prefilledService) {
      if (!svcModal) {
        window.dispatchEvent(new CustomEvent("open-demo-modal"));
        return;
      }
      svcModal.style.display = "flex";
      document.body.style.overflow = "hidden";
      goToSvcSlide(1);

      if (prefilledService) {
        const sel = document.getElementById("svc_service");
        if (sel) {
          for (let i = 0; i < sel.options.length; i++) {
            if (
              sel.options[i].value.toLowerCase().includes(prefilledService.toLowerCase()) ||
              prefilledService.toLowerCase().includes(sel.options[i].value.toLowerCase())
            ) {
              sel.selectedIndex = i;
              break;
            }
          }
        }
      }
    };

    window.closeServiceModal = function () {
      if (!svcModal) return;
      svcModal.style.display = "none";
      document.body.style.overflow = "";
    };

    if (svcCloseBtn) svcCloseBtn.onclick = window.closeServiceModal;
    if (svcModal) {
      svcModal.onclick = (e) => {
        if (e.target === svcModal) window.closeServiceModal();
      };
    }

    svcGetQuoteBtns.forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        window.openServiceModal();
      };
    });

    // Slide 1 Continue
    const svcSlide1Next = document.querySelector("#svcSlide1 .continue-btn-form, #svcSlide1 .submit-btn-form");
    if (svcSlide1Next) {
      svcSlide1Next.onclick = (e) => {
        e.preventDefault();
        const svcSel = document.getElementById("svc_service");
        if (svcSel && !svcSel.value) {
          const err = document.getElementById("svcServiceError");
          if (err) err.textContent = "Please select a required service.";
          return;
        }
        goToSvcSlide(2);
      };
    }

    // Slide 2 Back & Send OTP
    const svcSlide2Back = document.querySelector("#svcSlide2 .btn-secondary");
    if (svcSlide2Back) {
      svcSlide2Back.onclick = (e) => {
        e.preventDefault();
        goToSvcSlide(1);
      };
    }

    const svcSendOtpBtn = document.getElementById("svcSendOtpBtn");
    if (svcSendOtpBtn) {
      svcSendOtpBtn.onclick = (e) => {
        e.preventDefault();
        const name = document.getElementById("svc_name")?.value.trim();
        const phone = document.getElementById("svc_number")?.value.trim();
        const email = document.getElementById("svc_email")?.value.trim();

        if (!name || name.length < 3) {
          const err = document.getElementById("svcNameError");
          if (err) err.textContent = "Please enter your full name.";
          return;
        }
        if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
          const err = document.getElementById("svcNumberError");
          if (err) err.textContent = "Please enter a valid 10-digit mobile number.";
          return;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          const err = document.getElementById("svcEmailError");
          if (err) err.textContent = "Please enter a valid email address.";
          return;
        }

        const prompt = document.getElementById("svcOtpPhonePrompt");
        if (prompt) prompt.textContent = `We sent a 6-digit verification code to +91 ${phone}.`;

        goToSvcSlide(3);
      };
    }

    // Slide 3 Back & Verify
    const svcSlide3Back = document.querySelector("#svcSlide3 .btn-secondary");
    if (svcSlide3Back) {
      svcSlide3Back.onclick = (e) => {
        e.preventDefault();
        goToSvcSlide(2);
      };
    }

    const svcVerifyBtn = document.getElementById("svcVerifyBtn");
    if (svcVerifyBtn) {
      svcVerifyBtn.onclick = (e) => {
        e.preventDefault();
        const name = document.getElementById("svc_name")?.value.trim();
        const phone = document.getElementById("svc_number")?.value.trim();
        const email = document.getElementById("svc_email")?.value.trim();
        const service = document.getElementById("svc_service")?.value;
        const budget = document.getElementById("svc_budget")?.value;
        const message = document.getElementById("svc_message")?.value.trim();

        if (typeof emailjs !== "undefined") {
          try {
            emailjs.send("service_xukw6z4", "template_ny7v7la", {
              name,
              number: phone,
              email,
              course: `Service Proposal: ${service} (${budget})`,
              address: "Website Services Consultation",
              message: message || "Service inquiry submitted from services page"
            });
          } catch(err){}
        }

        goToSvcSlide(4);
        const succName = document.getElementById("svcSuccessName");
        if (succName) succName.textContent = name;

        const waLink = document.getElementById("svcWhatsappLink");
        if (waLink) {
          const waMsg = encodeURIComponent(`Hi Netcoder, I just requested a proposal for ${service}. My name is ${name} (${phone}).`);
          waLink.href = `https://wa.me/919816732055?text=${waMsg}`;
        }
      };
    }

    // Slide 4 Close
    const svcSlide4Close = document.querySelector("#svcSlide4 .btn-secondary");
    if (svcSlide4Close) {
      svcSlide4Close.onclick = window.closeServiceModal;
    }

    // 11. CONTACT PAGE MULTI-STEP FORM CONTROLLER
    const eduSelect = document.getElementById("educationType");
    const regSection = document.getElementById("regularCoursesSection");
    const indSection = document.getElementById("industrialSection");
    const srvSection = document.getElementById("servicesSection");
    const onlSection = document.getElementById("onlineCoursesSection");

    function goToContactSlide(n) {
      document.querySelectorAll(".contact-form-container .form-slide").forEach((s) => s.classList.remove("active"));
      const target = document.getElementById("slide" + n);
      if (target) target.classList.add("active");
    }

    window.goToSlide = goToContactSlide;

    if (eduSelect) {
      eduSelect.onchange = (e) => {
        const val = e.target.value;
        if (regSection) regSection.style.display = val === "regular" ? "block" : "none";
        if (indSection) indSection.style.display = val === "industrial" ? "block" : "none";
        if (srvSection) srvSection.style.display = val === "services" ? "block" : "none";
        if (onlSection) onlSection.style.display = val === "online" ? "block" : "none";
      };

      const srvButtons = document.querySelectorAll(".service-btn");
      srvButtons.forEach((btn) => {
        btn.onclick = () => {
          srvButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
        };
      });

      // Slide 1 Continue
      const slide1Next = document.querySelector("#slide1 .submit-btn-form, #slide1 .btn-next");
      if (slide1Next) {
        slide1Next.onclick = (e) => {
          e.preventDefault();
          if (!eduSelect.value) {
            const err = document.getElementById("educationTypeError");
            if (err) err.textContent = "Please select what you are interested in.";
            return;
          }
          goToContactSlide(2);
        };
      }

      // Slide 2 Back
      const slide2Back = document.querySelector("#slide2 .btn-secondary");
      if (slide2Back) {
        slide2Back.onclick = (e) => {
          e.preventDefault();
          goToContactSlide(1);
        };
      }

      // Slide 2 Continue
      const slide2Next = document.querySelector("#slide2 .submit-btn-form");
      if (slide2Next) {
        slide2Next.onclick = (e) => {
          e.preventDefault();
          const name = document.getElementById("fullName")?.value.trim();
          const phone = document.getElementById("mobileNumber")?.value.trim();
          const email = document.getElementById("emailAddress")?.value.trim();

          if (!name || name.length < 3) {
            const err = document.getElementById("fullNameError");
            if (err) err.textContent = "Please enter your full name (minimum 3 characters).";
            return;
          }
          if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
            const err = document.getElementById("mobileNumberError");
            if (err) err.textContent = "Please enter a valid 10-digit mobile number.";
            return;
          }
          if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            const err = document.getElementById("emailAddressError");
            if (err) err.textContent = "Please enter a valid email address.";
            return;
          }

          goToContactSlide(3);
        };
      }

      // Slide 3 Back
      const slide3Back = document.querySelector("#slide3 .btn-secondary");
      if (slide3Back) {
        slide3Back.onclick = (e) => {
          e.preventDefault();
          goToContactSlide(2);
        };
      }

      // Slide 3 OTP Verification
      const verifyBtn = document.getElementById("verifyBtn");
      if (verifyBtn) {
        verifyBtn.onclick = (e) => {
          e.preventDefault();
          const name = document.getElementById("fullName")?.value.trim();
          const phone = document.getElementById("mobileNumber")?.value.trim();
          const email = document.getElementById("emailAddress")?.value.trim();
          const address = document.getElementById("address")?.value.trim();
          const message = document.getElementById("message")?.value.trim();

          if (typeof emailjs !== "undefined") {
            try {
              emailjs.send("service_xukw6z4", "template_ny7v7la", {
                name,
                phone,
                email,
                address,
                message
              });
            } catch(err){}
          }

          goToContactSlide(4);

          let countdown = 5;
          const cdEl = document.querySelector("#slide4 .countdown");
          const cdTimer = setInterval(() => {
            countdown--;
            if (cdEl) cdEl.textContent = countdown;
            if (countdown <= 0) {
              clearInterval(cdTimer);
              window.location.href = "/";
            }
          }, 1000);
        };
      }

      const contactOtpInputs = document.querySelectorAll("#slide3 .otp-input");
      contactOtpInputs.forEach((inp, i) => {
        inp.oninput = () => {
          if (inp.value.length >= 1 && i < contactOtpInputs.length - 1) {
            contactOtpInputs[i + 1].focus();
          }
        };
        inp.onkeydown = (e) => {
          if (e.key === "Backspace" && !inp.value && i > 0) {
            contactOtpInputs[i - 1].focus();
          }
        };
      });
    }

    // 12. BOOTCAMP PAGE APPLY POPUP CONTROLLER
    const applyNowBtn = document.getElementById("applyNowBtn");
    const applyPopup = document.getElementById("applyPopup");
    const applyPopupClose = document.getElementById("applyPopupClose");
    const toTopBtn = document.getElementById("toTop");

    if (applyNowBtn && applyPopup) {
      applyNowBtn.onclick = (e) => {
        e.preventDefault();
        applyPopup.style.display = "flex";
      };
    }
    if (applyPopupClose && applyPopup) {
      applyPopupClose.onclick = () => {
        applyPopup.style.display = "none";
      };
    }
    if (applyPopup) {
      applyPopup.onclick = (e) => {
        if (e.target === applyPopup) applyPopup.style.display = "none";
      };
    }
    if (toTopBtn) {
      window.addEventListener("scroll", () => {
        toTopBtn.classList.toggle("show", window.scrollY > 450);
      }, { passive: true });
      toTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // 13. FEEDBACK FORM SUBMISSION TO /api/feedback
    const feedbackForm = document.querySelector("form[action*='feedback']");
    if (feedbackForm) {
      feedbackForm.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(feedbackForm);
        const data = Object.fromEntries(formData.entries());

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
            body: JSON.stringify(data),
          });

          const result = await res.json();
          if (res.ok && result.success) {
            let successModal = document.getElementById("successModal");
            if (!successModal) {
              successModal = document.createElement("div");
              successModal.className = "popup-overlay";
              successModal.id = "successModal";
              successModal.style.display = "flex";
              successModal.innerHTML = `
                <div class="popup-card" style="background:#fff; padding:30px; border-radius:16px; text-align:center; max-width:440px; margin:auto;">
                    <div style="color: #ff5532; margin-bottom: 15px; font-size: 40px;">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <h2 style="color: #0f172a; margin-bottom: 10px;">Thank You!</h2>
                    <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px;">
                        Your valuable feedback has been recorded successfully. We sincerely appreciate your participation!
                    </p>
                    <button type="button" class="btn btn-primary close-feedback-btn">Close</button>
                </div>
              `;
              successModal.querySelector(".close-feedback-btn")?.addEventListener("click", () => successModal.remove());
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

    // 14. GLOBAL MODAL TRIGGERS
    window.openBox = function (e) {
      if (e && e.preventDefault) e.preventDefault();
      window.dispatchEvent(new CustomEvent("open-demo-modal"));
      return false;
    };
    window.closeForm = function (e) {
      if (e && e.preventDefault) e.preventDefault();
      window.dispatchEvent(new CustomEvent("close-demo-modal"));
      return false;
    };

    const modalTriggers = document.querySelectorAll(
      "[data-modal-trigger='demo'], .book-demo-btn, a[href*='openBox']"
    );
    modalTriggers.forEach((btn) => {
      btn.onclick = (e) => {
        if (btn.getAttribute("href") === "#") e.preventDefault();
        window.dispatchEvent(new CustomEvent("open-demo-modal"));
      };
    });

    // Cleanup
    return () => {
      if (pageSlug === "home") {
        document.body.classList.remove("index-page");
      }
      if (counterObserver) {
        counterObserver.disconnect();
      }
      window.removeEventListener("scroll", onScrollTimeline);
      window.removeEventListener("resize", onScrollTimeline);
      window.removeEventListener("keydown", onKeydown);
      accordionHandlers.forEach(({ header, handler }) => {
        header.removeEventListener("click", handler);
      });
      clearInterval(autoplayTimer);
      clearTimeout(typewriterTimer);
    };
  }, [pageSlug]);

  return null;
}
