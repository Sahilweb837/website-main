const http = require('http');

http.get('http://localhost:3000/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    console.log('Book Demo Modal (.book-demo):', data.includes('book-demo'));
    console.log('Book Demo Backdrop (.book-demo-backdrop):', data.includes('book-demo-backdrop'));
    console.log('Main Inputs (.main-inputs):', data.includes('main-inputs'));
    console.log('Morning & Evening Buttons:', data.includes('id="morningBtn"') && data.includes('id="eveningBtn"'));
    console.log('Slot Warning (#slotWarning):', data.includes('id="slotWarning"'));
    console.log('OTP Modal (.background#otpModal):', data.includes('id="otpModal"'));
    console.log('OTP Split Layout (.otp.split-layout):', data.includes('split-layout'));
    console.log('OTP Illustration (otp-illustration.png):', data.includes('otp-illustration.png'));
    console.log('OTP 6 Input boxes (.otpNumber):', data.includes('otpNumber'));
    console.log('Success Modal (.success-overlay#successModal):', data.includes('id="successModal"'));
    console.log('Success Card (.success-card):', data.includes('success-card'));
    console.log('Confetti Container (#confettiContainer):', data.includes('id="confettiContainer"'));
  });
}).on('error', (e) => console.error('Error:', e.message));
