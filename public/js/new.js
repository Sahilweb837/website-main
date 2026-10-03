/**
 * Netcoder Technology - Contact Page Form Controller & Real Firebase Phone Authentication
 * Real SMS OTP via Firebase Phone Auth with WebOTP Auto-Fill, Auto-Verification & EmailJS Dispatch
 */
(function () {
  "use strict";

  // Prevent multiple executions if script is loaded more than once
  if (window.__contactFormScriptLoaded) return;
  window.__contactFormScriptLoaded = true;

  // ================= FIREBASE CONFIGURATIONS =================
  // Primary project: contactform-netcoder-website
  const contactFirebaseConfig = {
    apiKey: "AIzaSyDhOFNMp-SpfKo28_Dse2mNpSYigxyTwxU",
    authDomain: "contactform-netcoder-website.firebaseapp.com",
    projectId: "contactform-netcoder-website",
    storageBucket: "contactform-netcoder-website.firebasestorage.app",
    messagingSenderId: "121917397761",
    appId: "1:121917397761:web:2d75b1a46fd02f4d211900",
    measurementId: "G-7HQZTWRZJ4"
  };

  // Fallback project: demoform-netcoder-website (default app in layout)
  const fallbackFirebaseConfig = {
    apiKey: "AIzaSyBGHd5l5nLwqsK3tqZwZrfFkrsvQyxW6rk",
    authDomain: "demoform-netcoder-website.firebaseapp.com",
    projectId: "demoform-netcoder-website",
    storageBucket: "demoform-netcoder-website.firebasestorage.app",
    messagingSenderId: "755574278305",
    appId: "1:755574278305:web:d44565fdf35cc62202c8e0",
    measurementId: "G-BWFCRTJWQG"
  };

  let contactAuthApp = null;
  let fallbackAuthApp = null;

  function getContactAuth(useFallback) {
    if (typeof firebase === "undefined") return null;

    if (useFallback) {
      if (!fallbackAuthApp) {
        try {
          fallbackAuthApp = (firebase.apps && firebase.apps.find(function (a) { return a.name === "[DEFAULT]"; })) || firebase.app();
        } catch (e) {
          try {
            fallbackAuthApp = firebase.initializeApp(fallbackFirebaseConfig, "fallbackAuthApp");
          } catch (e2) {
            fallbackAuthApp = firebase.app();
          }
        }
      }
      return fallbackAuthApp ? fallbackAuthApp.auth() : (firebase.auth ? firebase.auth() : null);
    }

    if (!contactAuthApp) {
      try {
        contactAuthApp = firebase.initializeApp(contactFirebaseConfig, "contactAuthApp");
      } catch (e) {
        contactAuthApp = (firebase.apps && firebase.apps.find(function (a) { return a.name === "contactAuthApp"; })) || firebase.app();
      }
    }
    return contactAuthApp ? contactAuthApp.auth() : (firebase.auth ? firebase.auth() : null);
  }

  // ================= EMAILJS INIT =================
  function ensureEmailJS() {
    if (typeof emailjs !== "undefined" && typeof emailjs.init === "function") {
      try {
        emailjs.init("arbtZPAg8iH0kJRCt");
      } catch (e) {}
    }
  }

  // ================= STATE VARIABLES =================
  let selectedService = "";
  let confirmationResult = null;
  let otpSent = false;
  let isVerifying = false;
  let resendTimerInterval = null;
  let contactWebOtpAbortController = null;

  // Helper: set message with color
  function setMessage(el, msg, color) {
    if (!el) return;
    el.innerText = msg || "";
    if (color) {
      el.style.color = color;
    }
  }

  function setError(el, msg) {
    setMessage(el, msg, "#ef4444");
  }

  function setSuccess(el, msg) {
    setMessage(el, msg, "#22c55e");
  }

  // ================= SLIDE NAVIGATION =================
  window.goToSlide = function (num) {
    document.querySelectorAll(".form-slide").forEach(function (s) {
      s.classList.remove("active");
    });
    var target = document.getElementById("slide" + num);
    if (target) target.classList.add("active");

    if (num !== 3 && contactWebOtpAbortController) {
      try { contactWebOtpAbortController.abort(); } catch (e) {}
      contactWebOtpAbortController = null;
    }
  };

  // ================= VALIDATE SLIDE 1 =================
  window.validateSlide1 = function () {
    var educationType = document.getElementById("educationType");
    var typeError = document.getElementById("educationTypeError");
    var serviceError = document.getElementById("serviceError");
    setError(typeError, "");
    if (serviceError) setError(serviceError, "");

    var type = educationType ? educationType.value : "";
    if (!type) {
      setError(typeError, "Please select an option.");
      if (educationType) educationType.focus();
      return;
    }
    if (type === "services" && !selectedService) {
      if (serviceError) setError(serviceError, "Please select a service.");
      return;
    }
    window.goToSlide(2);
  };

  // ================= VALIDATE SLIDE 2 =================
  window.validateSlide2 = function () {
    var nameEl = document.getElementById("fullName");
    var phoneEl = document.getElementById("mobileNumber");
    var emailEl = document.getElementById("emailAddress");
    var nameErr = document.getElementById("fullNameError");
    var phoneErr = document.getElementById("mobileNumberError");
    var emailErr = document.getElementById("emailAddressError");

    setError(nameErr, "");
    setError(phoneErr, "");
    setError(emailErr, "");

    var name = nameEl ? nameEl.value.trim() : "";
    var phone = phoneEl ? phoneEl.value.trim().replace(/\D/g, "") : "";
    var email = emailEl ? emailEl.value.trim() : "";

    if (!name || name.length < 2) {
      setError(nameErr, "Please enter your full name.");
      if (nameEl) nameEl.focus();
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError(phoneErr, "Please enter a valid 10-digit mobile number.");
      if (phoneEl) phoneEl.focus();
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError(emailErr, "Please enter a valid email address.");
      if (emailEl) emailEl.focus();
      return;
    }

    // Reset OTP input fields
    otpSent = false;
    confirmationResult = null;
    isVerifying = false;
    var otpInputs = document.querySelectorAll(".otp-input");
    otpInputs.forEach(function (inp, idx) {
      inp.value = "";
      inp.disabled = false;
      inp.classList.remove("filled", "verifying", "verified", "otp-error");
      if (idx === 0) setTimeout(function () { inp.focus(); }, 400);
    });

    var sendBtn = document.getElementById("sendBtn");
    if (sendBtn) {
      sendBtn.disabled = false;
      sendBtn.innerHTML = sendBtn.getAttribute("data-label") || "Send OTP";
    }
    setError(document.getElementById("otpError"), "");

    window.goToSlide(3);
    // Allow Slide 3 DOM and reCAPTCHA container to be rendered before sending OTP
    setTimeout(function () {
      window.sendOTP();
    }, 250);
  };

  // ================= RECAPTCHA VERIFIER BUILDER =================
  function createRecaptchaVerifier(auth) {
    var container = document.getElementById("contact-recaptcha-container");
    if (!container) return Promise.reject(new Error("reCAPTCHA container missing"));

    if (window.contactRecaptchaVerifier) {
      try { window.contactRecaptchaVerifier.clear(); } catch (e) {}
      window.contactRecaptchaVerifier = null;
    }
    container.innerHTML = "";

    var targetApp = (auth && auth.app) ? auth.app : (contactAuthApp || (window.firebase && firebase.apps.length ? firebase.app() : null));

    try {
      window.contactRecaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "contact-recaptcha-container",
        {
          size: "invisible",
          callback: function () {},
          "expired-callback": function () {
            if (window.contactRecaptchaVerifier) {
              try { window.contactRecaptchaVerifier.clear(); } catch (e) {}
              window.contactRecaptchaVerifier = null;
            }
          }
        },
        targetApp
      );
      return window.contactRecaptchaVerifier.render().then(function () {
        return window.contactRecaptchaVerifier;
      });
    } catch (e) {
      console.warn("Invisible reCAPTCHA fallback to normal:", e);
      try {
        window.contactRecaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "contact-recaptcha-container",
          { size: "normal" },
          targetApp
        );
        return window.contactRecaptchaVerifier.render().then(function () {
          return window.contactRecaptchaVerifier;
        });
      } catch (err2) {
        return Promise.reject(err2);
      }
    }
  }

  // ================= DISPATCH FIREBASE OTP WITH FALLBACK =================
  function dispatchFirebasePhoneAuth(fullPhone, preferFallback) {
    var auth = getContactAuth(preferFallback);
    if (!auth) {
      return Promise.reject(new Error("Authentication service is loading. Please try again."));
    }

    return createRecaptchaVerifier(auth).then(function (verifier) {
      return auth.signInWithPhoneNumber(fullPhone, verifier);
    }).catch(function (err) {
      // If primary project encounters quota, 403, or project configuration error, try fallback project
      if (!preferFallback) {
        console.warn("Primary Firebase project error (" + (err.code || err.message) + "). Attempting fallback project...");
        return dispatchFirebasePhoneAuth(fullPhone, true);
      }
      throw err;
    });
  }

  // ================= SEND REAL FIREBASE OTP =================
  window.sendOTP = function () {
    var otpErrorEl = document.getElementById("otpError");
    var sendBtn = document.getElementById("sendBtn");
    setError(otpErrorEl, "");

    var phoneEl = document.getElementById("mobileNumber");
    var phone = phoneEl ? phoneEl.value.trim().replace(/\D/g, "") : "";

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError(otpErrorEl, "Please enter a valid 10-digit mobile number in slide 2.");
      return;
    }

    if (sendBtn) {
      sendBtn.disabled = true;
      sendBtn.innerHTML = '<span class="loading"></span> Sending OTP...';
    }
    setMessage(otpErrorEl, "Sending verification code to +91 " + phone + "...", "#64748b");

    dispatchFirebasePhoneAuth("+91" + phone, false)
      .then(function (result) {
        confirmationResult = result;
        otpSent = true;

        var otpInputs = document.querySelectorAll(".otp-input");
        otpInputs.forEach(function (inp, idx) {
          inp.disabled = false;
          inp.value = "";
          inp.classList.remove("filled", "verifying", "verified", "otp-error");
          if (idx === 0) inp.focus();
        });

        setSuccess(otpErrorEl, "✓ OTP sent to +91 " + phone + ". Enter the 6-digit code.");

        if (sendBtn) {
          sendBtn.disabled = false;
          sendBtn.innerHTML = "Resend OTP";
        }

        startResendTimer(30);
        startContactWebOTPListener();
      })
      .catch(function (err) {
        console.error("Firebase sendOTP error:", err);
        otpSent = false;
        confirmationResult = null;

        var msg = "Failed to send OTP. Please check the number and try again.";
        if (err && err.code) {
          switch (err.code) {
            case "auth/invalid-phone-number":
              msg = "Invalid phone number. Please enter a valid 10-digit mobile number.";
              break;
            case "auth/too-many-requests":
              msg = "SMS request limit reached for this number. Please wait a few minutes or enter your code.";
              break;
            case "auth/quota-exceeded":
              msg = "SMS service is temporarily busy. Please contact us directly or enter your code.";
              break;
            case "auth/captcha-check-failed":
              msg = "Security check could not be completed. Please refresh and try again.";
              break;
            default:
              msg = err.message || msg;
          }
        }
        setError(otpErrorEl, msg);

        var otpInputs = document.querySelectorAll(".otp-input");
        otpInputs.forEach(function (inp, idx) {
          inp.disabled = false;
          if (idx === 0) inp.focus();
        });

        if (sendBtn) {
          sendBtn.disabled = false;
          sendBtn.innerHTML = sendBtn.getAttribute("data-label") || "Send OTP";
        }

        if (window.contactRecaptchaVerifier) {
          try { window.contactRecaptchaVerifier.clear(); } catch (e) {}
          window.contactRecaptchaVerifier = null;
        }
      });
  };

  // ================= AUTO-VERIFY HELPER =================
  function checkAutoVerify() {
    if (isVerifying) return;
    var otpInputs = document.querySelectorAll(".otp-input");
    var allFilled = Array.prototype.every.call(otpInputs, function (inp) {
      return inp.value.trim().length === 1 && /^\d$/.test(inp.value.trim());
    });
    if (allFilled) {
      setTimeout(window.verifyOTP, 150);
    }
  }

  // ================= VERIFY OTP =================
  window.verifyOTP = function () {
    if (isVerifying) return;

    var otpErrorEl = document.getElementById("otpError");
    var verifyBtn = document.getElementById("verifyBtn");
    setError(otpErrorEl, "");

    var otpInputs = document.querySelectorAll(".otp-input");
    var otp = "";
    otpInputs.forEach(function (i) {
      otp += i.value.trim();
    });

    if (otp.length !== 6) {
      setError(otpErrorEl, "Please enter all 6 digits of the OTP.");
      return;
    }

    if (!confirmationResult) {
      setError(otpErrorEl, "Please click Send OTP first.");
      return;
    }

    isVerifying = true;
    otpInputs.forEach(function (inp) {
      inp.classList.add("verifying");
    });

    if (verifyBtn) {
      verifyBtn.disabled = true;
      verifyBtn.innerHTML = '<span class="loading"></span> Verifying...';
    }
    setMessage(otpErrorEl, "Verifying OTP...", "#64748b");

    confirmationResult.confirm(otp)
      .then(function () {
        isVerifying = false;
        otpInputs.forEach(function (inp) {
          inp.classList.remove("verifying");
          inp.classList.add("verified");
        });

        setSuccess(otpErrorEl, "✓ OTP Verified Successfully!");

        if (verifyBtn) {
          verifyBtn.disabled = false;
          verifyBtn.innerHTML = "✓ Verified";
        }

        if (contactWebOtpAbortController) {
          try { contactWebOtpAbortController.abort(); } catch (e) {}
          contactWebOtpAbortController = null;
        }

        if (window.contactRecaptchaVerifier) {
          try { window.contactRecaptchaVerifier.clear(); } catch (e) {}
          window.contactRecaptchaVerifier = null;
        }

        sendContactEmail();

        setTimeout(function () {
          window.goToSlide(4);
          startRedirect();
        }, 700);
      })
      .catch(function (err) {
        console.error("Firebase verifyOTP error:", err);
        isVerifying = false;

        otpInputs.forEach(function (inp) {
          inp.classList.remove("verifying");
          inp.classList.add("otp-error");
          inp.value = "";
        });
        if (otpInputs[0]) otpInputs[0].focus();

        var msg = "Invalid verification code. Please check and try again.";
        if (err && err.code === "auth/code-expired") {
          msg = "Verification code has expired. Please click Resend OTP.";
        }
        setError(otpErrorEl, msg);

        if (verifyBtn) {
          verifyBtn.disabled = false;
          verifyBtn.innerHTML = verifyBtn.getAttribute("data-label") || "Verify OTP";
        }

        setTimeout(function () {
          otpInputs.forEach(function (inp) {
            inp.classList.remove("otp-error");
          });
        }, 1000);
      });
  };

  // ================= WEBOTP AUTO-FILL LISTENER =================
  function startContactWebOTPListener() {
    if (!("OTPCredential" in window)) return;

    if (contactWebOtpAbortController) {
      try { contactWebOtpAbortController.abort(); } catch (e) {}
    }
    contactWebOtpAbortController = new AbortController();

    navigator.credentials
      .get({
        otp: { transport: ["sms"] },
        signal: contactWebOtpAbortController.signal
      })
      .then(function (otp) {
        var code = otp ? otp.code : null;
        if (code && code.length === 6) {
          var otpInputs = document.querySelectorAll(".otp-input");
          otpInputs.forEach(function (inp, idx) {
            inp.disabled = false;
            inp.value = code[idx] || "";
            inp.classList.add("filled");
          });
          var otpErrorEl = document.getElementById("otpError");
          setMessage(otpErrorEl, "Auto-filling from SMS...", "#ff5532");
          window.verifyOTP();
        }
      })
      .catch(function () {});
  }

  // ================= EMAILJS DISPATCH =================
  function sendContactEmail() {
    ensureEmailJS();
    if (typeof emailjs === "undefined") return;

    var data = {
      name: (document.getElementById("fullName") || {}).value || "",
      phone: (document.getElementById("mobileNumber") || {}).value || "",
      email: (document.getElementById("emailAddress") || {}).value || "",
      address: (document.getElementById("address") || {}).value || "",
      message: (document.getElementById("message") || {}).value || "",
      type: (document.getElementById("educationType") || {}).value || "",
      course: (document.getElementById("courseSelect") || {}).value || "",
      training_type: (document.getElementById("trainingType") || {}).value || "",
      training_tech: (document.getElementById("trainingTech") || {}).value || "",
      online_course: (document.getElementById("onlineCourseSelect") || {}).value || "",
      service: selectedService || ""
    };

    emailjs.send("service_fall03r", "template_xlpq3cw", data)
      .then(function () {
        console.log("Contact email sent successfully.");
      })
      .catch(function (err) {
        console.warn("EmailJS notification error:", err);
      });
  }

  // ================= RESEND OTP =================
  window.resendOTP = function () {
    confirmationResult = null;
    otpSent = false;
    isVerifying = false;
    window.sendOTP();
  };

  // ================= RESEND TIMER =================
  function startResendTimer(sec) {
    var timerWrap = document.getElementById("timerWrap");
    var resendWrap = document.getElementById("resendWrap");
    var timerEl = document.getElementById("timer");

    if (resendTimerInterval) clearInterval(resendTimerInterval);

    var t = sec;
    if (timerWrap) timerWrap.style.display = "inline";
    if (resendWrap) resendWrap.style.display = "none";
    if (timerEl) timerEl.textContent = t;

    resendTimerInterval = setInterval(function () {
      t--;
      if (timerEl) timerEl.textContent = t;
      if (t <= 0) {
        clearInterval(resendTimerInterval);
        if (timerWrap) timerWrap.style.display = "none";
        if (resendWrap) resendWrap.style.display = "inline";
      }
    }, 1000);
  }

  // ================= REDIRECT AFTER SUCCESS =================
  function startRedirect() {
    var time = 5;
    var el = document.querySelector(".countdown");
    var t = setInterval(function () {
      time--;
      if (el) el.textContent = time;
      if (time <= 0) {
        clearInterval(t);
        window.location.replace("/");
      }
    }, 1000);
  }

  // ================= INITIALIZE CONTACT FORM =================
  window.initContactForm = function () {
    var contactForm = document.querySelector(".contact-form-container");
    if (!contactForm) return;

    ensureEmailJS();
    selectedService = "";
    confirmationResult = null;
    otpSent = false;
    isVerifying = false;

    // Service Selection Buttons
    var serviceBtns = contactForm.querySelectorAll(".service-btn");
    serviceBtns.forEach(function (btn) {
      btn.onclick = function () {
        serviceBtns.forEach(function (b) {
          b.classList.remove("selected");
        });
        this.classList.add("selected");
        selectedService = this.dataset.service;
        setError(document.getElementById("serviceError"), "");
      };
    });

    // Education Type Switcher
    var educationType = document.getElementById("educationType");
    if (educationType) {
      educationType.onchange = function () {
        ["regularCoursesSection", "industrialSection", "servicesSection", "onlineCoursesSection"].forEach(function (id) {
          var el = document.getElementById(id);
          if (el) el.style.display = "none";
        });
        var map = {
          regular: "regularCoursesSection",
          industrial: "industrialSection",
          services: "servicesSection",
          online: "onlineCoursesSection"
        };
        var target = map[this.value];
        if (target) {
          var el = document.getElementById(target);
          if (el) el.style.display = "block";
        }
      };
    }

    // Mobile Number Input Sanitization
    var mobileInput = document.getElementById("mobileNumber");
    if (mobileInput) {
      mobileInput.oninput = function () {
        this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
      };
    }

    // OTP Digit Inputs Setup
    var otpInputs = contactForm.querySelectorAll(".otp-input");
    otpInputs.forEach(function (input, index) {
      input.oninput = function () {
        this.value = this.value.replace(/[^0-9]/g, "").slice(0, 1);
        if (this.value) {
          this.classList.add("filled");
          if (index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
          }
        } else {
          this.classList.remove("filled");
        }
        checkAutoVerify();
      };

      input.onkeydown = function (e) {
        if (e.key === "Backspace" && !this.value && index > 0) {
          otpInputs[index - 1].value = "";
          otpInputs[index - 1].classList.remove("filled");
          otpInputs[index - 1].focus();
        }
      };

      input.onpaste = function (e) {
        e.preventDefault();
        var pasted = (e.clipboardData || window.clipboardData)
          .getData("text")
          .replace(/[^0-9]/g, "")
          .slice(0, 6);
        pasted.split("").forEach(function (ch, i) {
          if (otpInputs[i]) {
            otpInputs[i].value = ch;
            otpInputs[i].classList.add("filled");
          }
        });
        var last = Math.min(pasted.length, otpInputs.length - 1);
        if (otpInputs[last]) otpInputs[last].focus();
        if (pasted.length === 6) {
          setTimeout(checkAutoVerify, 150);
        }
      };
    });
  };

  // Bootstrap on direct load, reload, or SPA navigation
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", window.initContactForm);
  } else {
    window.initContactForm();
  }
  document.addEventListener("spa:navigated", window.initContactForm);
})();
