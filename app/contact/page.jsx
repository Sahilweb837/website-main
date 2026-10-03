import Link from "next/link";
import PageInteractiveHandler from "@/components/PageInteractiveHandler";

export const metadata = {
  "title": "Contact Us | Netcoder Technology - Reach Out for IT Training Inquiries",
  "description": "Get in touch with Netcoder Technology for any inquiries about our IT training programs, courses, and internships. We",
  "openGraph": {
    "title": "Contact Us | Netcoder Technology - Reach Out for IT Training Inquiries",
    "description": "Get in touch with Netcoder Technology for any inquiries about our IT training programs, courses, and internships. We",
    "url": "https://www.netcoder.in/contact",
    "siteName": "Netcoder Technology",
    "type": "website"
  },
  "alternates": {
    "canonical": "https://www.netcoder.in/contact"
  }
};

export default function ContactPage() {
  return (
    <>
      <PageInteractiveHandler pageSlug="contact" />

      <section className="page-hero">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
          </ul>
                <div className="page-title">
                    <div>Contact</div>
                    <p>HOME /             <b>Contact</b></p>
          </div>
        </section>

      

      {/* Contact Info Section */}


      
      <div className="contact container">
                <div className="contact-info">
                    <div className="info">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="4" fill="#ff5532" />
                            <path d="M18 11C18 15.6667 12 19.6667 12 19.6667C12 19.6667 6 15.6667 6 11C6 9.4087 6.63214 7.88258 7.75736 6.75736C8.88258 5.63214 10.4087 5 12 5C13.5913 5 15.1174 5.63214 16.2426 6.75736C17.3679 7.88258 18 9.4087 18 11Z" fill="#ff5532" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z" fill="#ff5532" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
                        <div className="office">
                            <h5>Office</h5>
                            <div>
                                <p>Dharamshala Branch Office</p>
                                <small>
                            1st Floor, above Gramin Bank, near Govt. ITI,
                            Dari                  <br />Dharamshala (176057)
                        </small>
                </div>
              </div>
            </div>
                    <div className="info">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="4" fill="#ff5532" />
                            <path d="M17.9996 14.9843V16.7908C18.0003 16.9585 17.9659 17.1245 17.8986 17.2781C17.8313 17.4318 17.7325 17.5697 17.6087 17.6831C17.4849 17.7965 17.3387 17.8828 17.1795 17.9365C17.0203 17.9903 16.8517 18.0102 16.6843 17.9951C14.8277 17.7938 13.0443 17.1606 11.4773 16.1465C10.0195 15.222 8.78356 13.9884 7.8572 12.5335C6.83752 10.9626 6.20294 9.17405 6.0049 7.31277C5.98982 7.14625 6.00965 6.97843 6.06312 6.81998C6.11659 6.66153 6.20254 6.51592 6.31548 6.39244C6.42843 6.26896 6.5659 6.1703 6.71915 6.10274C6.87239 6.03519 7.03805 6.00022 7.20558 6.00006H9.01565C9.30846 5.99718 9.59233 6.10067 9.81435 6.29122C10.0364 6.48178 10.1814 6.74641 10.2224 7.03578C10.2988 7.61389 10.4404 8.18152 10.6447 8.72785C10.7259 8.94338 10.7435 9.17761 10.6953 9.4028C10.6472 9.62799 10.5354 9.83469 10.3732 9.99841L9.60694 10.7632C10.4658 12.2707 11.7165 13.5189 13.2271 14.3761L13.9933 13.6114C14.1574 13.4495 14.3645 13.3379 14.5901 13.2899C14.8158 13.2419 15.0505 13.2594 15.2664 13.3404C15.8138 13.5443 16.3826 13.6857 16.9619 13.7619C17.2549 13.8032 17.5226 13.9505 17.714 14.1759C17.9053 14.4013 18.007 14.689 17.9996 14.9843Z" fill="#ff5532" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
                        <div>
                            <h5>Phone</h5>
                            <small>Mon to Sat 10 am to 5 pm</small>
                            <p>+91 9816732055, 7590832055</p>
              </div>
            </div>
                    <div className="info">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="4" fill="#ff5532" />
                            <path d="M18 14C18 14.3536 17.8595 14.6928 17.6095 14.9428C17.3594 15.1929 17.0203 15.3333 16.6667 15.3333H8.6667L6 18V7.33333C6 6.97971 6.14048 6.64057 6.39052 6.39052C6.64057 6.14048 6.97971 6 7.33333 6H16.6667C17.0203 6 17.3594 6.14048 17.6095 6.39052C17.8595 6.64057 18 6.97971 18 7.33333V14Z" fill="#ff5532" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
                        <div>
                            <h5>Chat to us</h5>
                            <small>Send us your query anytime!</small>
                            <p>info@netcoder.in</p>
              </div>
            </div>
          </div>
        
        {/* Contact Form */}

                <div className="contact-form-container">
                    <div className="form-slides">
            
            {/* Slide 1: Course Selection */}

                        <div className="form-slide active" id="slide1">
                            <br />
                            <h3 className="slide-title">What are you interested in?</h3>
                            <div className="form-group">
                                <label className="form-label">Select Your Type</label>
                                <select className="form-select" id="educationType">
                                    <option value="">Choose an option</option>
                                    <option value="regular">Regular Courses</option>
                                    <option value="industrial">Industrial Training</option>
                                    <option value="services">Our Services</option>
                                    <option value="online">Online Courses</option>
                  </select>
                                <div className="error-message" id="educationTypeError"></div>
                </div>
              
              {/* Regular Courses Section */}

                            <div className="form-group" id="regularCoursesSection" style={{"display":"none"}}>
                                <label className="form-label">Select Course</label>
                                <select className="form-select" id="courseSelect">
                                    <option value="">Select a course</option>
                                    <optgroup label="Design & Multimedia Courses">
                                        <option value="Graphic Designing">Graphic Designing</option>
                                        <option value="Web Designing">Web Designing</option>
                                        <option value="UI & UX Design">UI &amp; UX Design</option>
                                        <option value="2D/3D Animation">2D/3D Animation</option>
                                        <option value="Motion Graphics">Motion Graphics</option>
                                        <option value="Graphics & Web Designing">Graphics &amp; Web Designing</option>
                                        <option value="Digital Content Creator">Digital Content Creator</option>
                                        <option value="Auto CAD">Auto CAD</option>
                    </optgroup>
                                    <optgroup label="CMS & Web Technologies">
                                        <option value="Web Development">Web Development</option>
                                        <option value="Full Stack Development">Full Stack Development</option>
                                        <option value="MERN Stack">MERN Stack</option>
                                        <option value="MEAN Stack">MEAN Stack</option>
                                        <option value="PHP Training">PHP Training</option>
                                        <option value="Wordpress">Wordpress</option>
                    </optgroup>
                                    <optgroup label="Digital Marketing">
                                        <option value="Digital Marketing">Digital Marketing</option>
                                        <option value="Social Media Marketing">Social Media Marketing</option>
                                        <option value="SEO Course">SEO Course</option>
                    </optgroup>
                                    <optgroup label="Professional Training">
                                        <option value="Data Science & Business Analytics">Data Science &amp; Business Analytics
                                </option>
                                        <option value="Data Science & Machine Learning">Data Science &amp; Machine Learning</option>
                                        <option value="Complete Cyber Security">Complete Cyber Security</option>
                                        <option value="Ethical Hacking">Ethical Hacking</option>
                                        <option value="Software Engineering with Python">Software Engineering with Python
                                </option>
                    </optgroup>
                                    <optgroup label="Additional Courses">
                                        <option value="System Design & Operating Systems">System Design &amp; Operating Systems
                                </option>
                                        <option value="Algorithm & Data Structures in Python">Algorithm &amp; Data Structures in
                                    Python</option>
                    </optgroup>
                  </select>
                                <div className="error-message" id="courseSelectError"></div>
                </div>
              
              {/* Industrial Training Section */}

                            <div className="form-group" id="industrialSection" style={{"display":"none"}}>
                                <label className="form-label">Training Type</label>
                                <select className="form-select" id="trainingType">
                                    <option value="">Select training type</option>
                                    <option value="Summer Training">Summer Training</option>
                                    <option value="Winter Training">Winter Training</option>
                                    <option value="Internship Program">Internship Program</option>
                                    <option value="Project Based Training">Project Based Training</option>
                                    <option value="Corporate Training">Corporate Training</option>
                  </select>
                                <div className="error-message" id="trainingTypeError"></div>
                                <label className="form-label" style={{"marginTop":"15px"}}>Select Technology</label>
                                <select className="form-select" id="trainingTech">
                                    <option value="">Select technology</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Mobile App Development">Mobile App Development</option>
                                    <option value="Python Programming">Python Programming</option>
                                    <option value="Java Programming">Java Programming</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="Cyber Security">Cyber Security</option>
                                    <option value="Graphic Design">Graphic Design</option>
                                    <option value="Digital Marketing">Digital Marketing</option>
                  </select>
                                <div className="error-message" id="trainingTechError"></div>
                </div>
              
              {/* Services Section */}

                            <div className="form-group" id="servicesSection" style={{"display":"none"}}>
                                <label className="form-label">Select Service</label>
                                <div className="service-options">
                                    <div className="service-option">
                                        <button type="button" className="service-btn" data-service="web-development">
                                    Web Development
                                </button>
                    </div>
                                    <div className="service-option">
                                        <button type="button" className="service-btn" data-service="graphic-design">
                                    Graphic Design
                                </button>
                    </div>
                                    <div className="service-option">
                                        <button type="button" className="service-btn" data-service="digital-marketing">
                                    Digital Marketing
                                </button>
                    </div>
                  </div>
                                <div className="error-message" id="serviceError"></div>
                </div>
              
              {/* Online Courses Section */}

                            <div className="form-group" id="onlineCoursesSection" style={{"display":"none"}}>
                                <label className="form-label">Select Course</label>
                                <select className="form-select" id="onlineCourseSelect">
                                    <option value="Full Stack Development">Full Stack &amp; App Development</option>
                                    <option value="Data Science & Business Analytics">Data Science &amp; Business Analytics
                                </option>
                                    <option value="Digital Marketing">Digital Marketing</option>
                                    <option value="SEO Course">SEO Course</option>
                                    <option value="Ethical Hacking">Ethical Hacking</option>
                  </select>
                                <div className="error-message" id="onlineCourseSelectError"></div>
                </div>
                            <div className="progress-indicators">
                                <span className="indicator active"></span>
                                <span className="indicator"></span>
                                <span className="indicator"></span>
                                <span className="indicator"></span>
                </div>
                            <button type="button" className="form-btn continue-btn-form">Continue</button>
              </div>
            
            {/* Slide 2: Personal Information */}

                        <div className="form-slide" id="slide2">
                            <h3 className="slide-title">Tell us about yourself</h3>
                            <div className="form-group">
                                <label className="form-label">Full Name *</label>
                                <input type="text" className="form-input" id="fullName" placeholder="Enter your full name" />
                                <div className="error-message" id="fullNameError"></div>
                </div>
                            <div className="form-group">
                                <label className="form-label">Mobile Number *</label>
                                <input type="tel" className="form-input" id="mobileNumber" placeholder="Enter 10-digit mobile number" maxLength="10" />
                                <div className="error-message" id="mobileNumberError"></div>
                </div>
                            <div className="form-group">
                                <label className="form-label">Email Address *</label>
                                <input type="email" className="form-input" id="emailAddress" placeholder="Enter your email address" />
                                <div className="error-message" id="emailAddressError"></div>
                </div>
                            <div className="form-group">
                                <label className="form-label">Address</label>
                                <input type="text" className="form-input" id="address" placeholder="Enter your address" />
                </div>
                            <div className="form-group">
                                <label className="form-label">Message (Optional)</label>
                                <textarea className="form-input" id="message" rows="3" placeholder="Any additional information..."></textarea>
                </div>
                            <div className="progress-indicators">
                                <span className="indicator"></span>
                                <span className="indicator active"></span>
                                <span className="indicator"></span>
                                <span className="indicator"></span>
                </div>
                            <div className="form-navigation">
                                <button className="form-btn btn-secondary">Back</button>
                                <button type="button" className="form-btn submit-btn-form">Continue</button>
                </div>
              </div>
            
            {/* Slide 3: OTP Verification */}

                        <div className="form-slide" id="slide3">
                            <div className="otp-container">
                                <h3 className="slide-title">Verify Mobile Number</h3>
                                <div className="otp-inputs">
                                    <input type="text" className="otp-input" maxLength="1" inputMode="numeric" autoComplete="one-time-code" data-index="0" />
                                    <input type="text" className="otp-input" maxLength="1" inputMode="numeric" data-index="1" />
                                    <input type="text" className="otp-input" maxLength="1" inputMode="numeric" data-index="2" />
                                    <input type="text" className="otp-input" maxLength="1" inputMode="numeric" data-index="3" />
                                    <input type="text" className="otp-input" maxLength="1" inputMode="numeric" data-index="4" />
                                    <input type="text" className="otp-input" maxLength="1" inputMode="numeric" data-index="5" />
                  </div>
                                <div className="error-message" id="otpError"></div>
                                <div id="contact-recaptcha-container"></div>
                                <button type="button" id="sendBtn" className="form-btn otp-btn" data-label="Send OTP">Send OTP</button>
                                <button type="button" id="verifyBtn" className="form-btn otp-btn-verify" data-label="Verify OTP">
    Verify OTP
</button>
                
                {/* Resend link + timer */}

                                <p style={{"marginTop":"10px"}}>
                                    <span id="resendWrap">
    Didn't get OTP?
                        <a href="javascript:void(0)" id="resendBtn">Resend</a>
                    </span>
                                    <span id="timerWrap" style={{"display":"none"}}>Resend in                     <b id="timer">30</b>s</span>
                  </p>
                                <p style={{"marginTop":"20px","color":"#666"}}>
                            Enter the 6-digit OTP sent to your mobile number
                        </p>
                                <div className="progress-indicators">
                                    <span className="indicator"></span>
                                    <span className="indicator"></span>
                                    <span className="indicator active"></span>
                                    <span className="indicator"></span>
                  </div>
                                <div className="form-navigation">
                                    <button className="form-btn btn-secondary">Back</button>
                  </div>
                </div>
              </div>
            
            {/* Slide 4: Success Message */}

                        <div className="form-slide" id="slide4">
                            <div className="success-message">
                                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="40" cy="40" r="40" fill="#27ae60" fillOpacity="0.1" />
                                    <path d="M30 40L37.5 47.5L50 32.5" stroke="#27ae60" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                                <h4>Congratulations!</h4>
                                <p>Your details have been submitted successfully.</p>
                                <p>Our team will contact you within 24 hours.</p>
                                <p style={{"marginTop":"20px"}}>
                            Redirecting to homepage in                   <span className="countdown">5</span> seconds...
                        </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      
    </>
  );
}
