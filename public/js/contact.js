let continuebtn = document.querySelector(".continue-btn-form")
let submitbtn = document.querySelector(".submit-btn-form")
let allCourses = document.querySelectorAll(".dropdown-content li a")
let allCoursesArray = []
let selectDom = document.querySelector(".option-inputs")
let verify_war = document.querySelector(".verify_war")
let otpBox = document.querySelector(".background");
let otpbtn = document.querySelector(".otp-btn");
let otpbutton = document.querySelector(".otp-btn-verify");
let inputs = document.querySelectorAll(".otpNumber input");
let userInputOtp =0;
let errorMsgBody = document.querySelector(".error-msg-span");


let isAutoVerifying = false;

function setContactOtpLoading(isLoading, message) {
  if (isLoading) {
    otpbutton.innerHTML = '<span class="otp-spinner"></span> ' + (message || 'Please wait...');
    otpbutton.disabled = true;
  } else {
    otpbutton.innerHTML = 'Verify OTP';
    otpbutton.disabled = false;
  }
}

inputs.forEach(input => {
    input.setAttribute("inputmode", "numeric");
    input.setAttribute("maxlength", "1");
});

inputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    const val = input.value;
    if (val.length > 1) {
      input.value = val.substring(val.length - 1);
    }
    if (!/^\d$/.test(input.value)) {
      input.value = "";
      return;
    }
    input.classList.add('filled');
    
    if (index < inputs.length - 1) {
        inputs[index + 1].removeAttribute("disabled");
        inputs[index + 1].focus();
    }

    checkAndAutoVerify();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
      input.value = "";
      input.classList.remove('verified', 'verifying', 'filled');
      if (index > 0) {
        inputs[index - 1].focus();
      }
      otpbutton.classList.remove("active");
    }
  });

  input.addEventListener("paste", (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData("text").trim();
    if (/^\d{6}$/.test(pasted)) {
      inputs.forEach((inp, idx) => {
        inp.removeAttribute("disabled");
        inp.value = pasted[idx];
        inp.classList.add('filled');
      });
      inputs[5].focus();
      checkAndAutoVerify();
    }
  });
});

function checkAndAutoVerify() {
    const allFilled = Array.from(inputs).every(i => /^\d$/.test(i.value));
    if (allFilled && !isAutoVerifying) {
        otpbutton.classList.add("active");
        inputs.forEach(i => i.classList.add("verifying"));
        isAutoVerifying = true;
        setTimeout(() => {
            otpbutton.click();
        }, 300);
    } else if (!allFilled) {
        otpbutton.classList.remove("active");
    }
}


const firebaseConfig = {
  apiKey: "AIzaSyA8sJcCZgr-s560FDQqJf2PZygw7UfikiY",
  authDomain: "otp-for-netcoder-website.firebaseapp.com",
  projectId: "otp-for-netcoder-website",
  storageBucket: "otp-for-netcoder-website.firebasestorage.app",
  messagingSenderId: "986300499230",
  appId: "1:986300499230:web:57c01bce30fe09c5f6350f",
  measurementId: "G-X4NBHP5WSR"
};
      if (typeof firebase !== 'undefined') {
        try {
          if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
          }
        } catch(e) {}
      }




function fetchCourse (){
    allCoursesArray.push(Array.from(allCourses).map((e)=>e.innerText))
    allCoursesArray =  allCoursesArray[0]
    appendCourse()
}

fetchCourse()


function appendCourse(){
    allCoursesArray.forEach((e)=>{
        let newEle = document.createElement("option")
        newEle.value = e
        newEle.innerText = e
        selectDom.appendChild(newEle)
    })
}




continuebtn.addEventListener("click",()=>{
    document.querySelector(".contact-form .slides:nth-child(1)").style.transform = "translateX(-20%)"
    document.querySelector(".contact-form .slides:nth-child(2)").style.transform = "translateX(50%)"
})



function shiftbox(){
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let number = document.querySelector("#number").value;
    
    let course = document.querySelector("#courses").value;
    let address = document.querySelector("#address").value;
    let message = document.querySelector("#message").value;
  
    emailjs.send("service_xukw6z4", "template_ny7v7la", {
      name,
      number,
      email,
      course,
      address,
      message,
    });
    document.querySelector(".contact-form .slides:nth-child(3)").style.transform = "translateX(-170%)"
    document.querySelector(".contact-form .slides:nth-child(4)").style.transform = "translateX(-150%)"
    let i = 5;
    function inter (){
        document.querySelector(".valReturn").innerText = i;
        i--
        if(i < 0 ){
            
            clearInterval(interval)
            document.location.href="/"
        }
    }
   let interval =  setInterval(inter,1000)
}

function phoneAuth() {
    var number = document.getElementById("number").value;
    number = '+91' + number;
    firebase
      .auth()
      .signInWithPhoneNumber(number, window.recaptchaVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        coderesult = confirmationResult;
        
      })
      .catch(function (error) {
        otpBox.style.display = "none";
        alert(error.message);
      });
  }

function verifyOtp(){
  // inputs[0].focus()
  document.querySelector(".contact-form .slides:nth-child(2)").style.transform = "translateX(-170%)"
  document.querySelector(".contact-form .slides:nth-child(3)").style.transform = "translateX(-50%)"
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container"
      );
      recaptchaVerifier.render();
      phoneAuth()
}

function verify(){
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let number = document.querySelector("#number").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; 
    const nameRegex = /^[a-zA-Z\s\-']+$/;
  
    const isValid = emailRegex.test(email) && phoneRegex.test(number.replace(/\D/g, '')) && nameRegex.test(name);
    
  
    isValid ? verifyOtp():verify_war.innerHTML="Enter Valid Input";
    

  }

  function codeverify() {

    coderesult
      .confirm(userInputOtp)
      .then(function () {
        inputs.forEach(input => input.classList.add('verified'));
        setTimeout(() => {
          shiftbox()
          isAutoVerifying = false;
        }, 1500);
        verify_war.innerHTML=""
        errorMsgBody.innerHTML = '<span class="otp-verified-msg">✓ Verified!</span>';
        setContactOtpLoading(false);
        otpbutton.innerHTML = 'Verified ✓';
      })
      .catch(function (err) {
        isAutoVerifying = false;
        inputs.forEach(input => input.classList.remove('verifying'));
        setContactOtpLoading(false);
        errorMsgBody.innerHTML = "Incorrect OTP";
        let otpPara = document.querySelector(".otpPara");
        if (otpPara) otpPara.innerHTML = "Please Re-Verify Captcha."
      });
  }

  otpbutton.addEventListener("click", (e) => {
    e.preventDefault();
    userInputOtp = Array.from(inputs).map((e) => parseInt(e.value.toString()[0])).join("");
    if (userInputOtp.length !== 6) {
      errorMsgBody.innerHTML = "Enter 6-digit OTP";
      isAutoVerifying = false;
    } else {
      errorMsgBody.innerHTML = "Verifying...";
      setContactOtpLoading(true, "Verifying...");
      codeverify();
    }
  });

  // Remove the duplicate empty listener
  

  submitbtn.addEventListener("click",(e)=>{
    e.preventDefault()
    verify();
    
  })
