import Link from "next/link";
import PageInteractiveHandler from "@/components/PageInteractiveHandler";

export const metadata = {
  "title": "Seminar / Workshop Feedback Form | Netcoder Technology",
  "description": "Professional IT training and digital services in Dharamshala at Netcoder Technology.",
  "openGraph": {
    "title": "Seminar / Workshop Feedback Form | Netcoder Technology",
    "description": "Professional IT training and digital services in Dharamshala at Netcoder Technology.",
    "url": "https://www.netcoder.in/feedback",
    "siteName": "Netcoder Technology",
    "type": "website"
  }
};

export default function FeedbackPage() {
  return (
    <>
      <PageInteractiveHandler pageSlug="feedback" />

      <div className="container">
        
        {/* Top Utility & Login Bar */}

                <div className="top-bar">
                    <a href="/" title="Return to Netcoder website">
            ← Netcoder Home
        </a>
          
          {/* <div className="auth-links">
            <a href="/student/dashboard" className="btn-login" title="Student Portal">Student Login</a>
            <a href="/admin/feedback" style="color:#777;" title="Admin Submissions">Admin</a>
        </div> */}

          </div>
        
        {/* Header with Netcoder Logo */}

                <div className="header">
                    <div className="brand-logo">
                        <a href="/" title="Netcoder Technology">
                            <img src="/images/logo.png" alt="Netcoder Technology" loading="eager" />
              </a>
            </div>
                    <h1>Seminar/Workshop Feedback Form</h1>
                    <p>
            It was wonderful meeting you at our seminar. We hope it was everything you wished for.
            We would love it if you could fill out this seminar evaluation form and let us know
            your honest thoughts about the seminar.
        </p>
          </div>
                <form method="POST" action="{{ route('feedback.store') }}">
          
          {/* Student Details */}

                    <div className="student-box">
                        <div className="row">
                            <div className="field">
                                <div className="field-row">
                                    <label>Name of Student                     <span className="req">*</span></label>
                                    <input type="text" name="student_name" id="student_name" defaultValue="" minLength="2" required placeholder="Enter student full name" className="" />
                  </div>
                </div>
                            <div className="field">
                                <div className="field-row">
                                    <label>Contact Number                     <span className="req">*</span></label>
                                    <input type="tel" name="contact_number" id="contact_number" defaultValue="" required pattern="[0-9]{10}" maxLength="10" minLength="10" inputMode="numeric" placeholder="10-digit mobile number" title="Please enter a valid 10-digit mobile number (e.g. 9876543210)" className="" />
                  </div>
                </div>
              </div>
                        <div className="row">
                            <div className="field">
                                <div className="field-row">
                                    <label>Email Address                     <span className="req">*</span></label>
                                    <input type="email" name="email" id="email" defaultValue="" required placeholder="e.g. student@gmail.com" title="Please enter a valid email address" className="" />
                  </div>
                </div>
                            <div className="field">
                                <div className="field-row">
                                    <label>Course                     <span className="req">*</span></label>
                                    <input type="text" name="course" id="course" defaultValue="" required placeholder="e.g. Full-Stack Web Development" className="" />
                  </div>
                </div>
              </div>
                        <div className="row" style={{"marginBottom":"0"}}>
                            <div className="field">
                                <div className="field-row">
                                    <label>Semester                     <span className="req">*</span></label>
                                    <input type="text" name="semester" id="semester" defaultValue="" required placeholder="e.g. 3rd Semester / Final Year" className="" />
                  </div>
                </div>
              </div>
            </div>
          
          {/* Question 1 */}

                    <div className="question">
                        <h3>How did you hear about the seminar?</h3>
                        <div className="options">
                            <label>                <input type="radio" name="heard_about" value="Social Media" /> Social Media</label>
                            <label>                <input type="radio" name="heard_about" value="Search Engine" /> Search Engine</label>
                            <label>                <input type="radio" name="heard_about" value="Advertisement" /> Advertisement</label>
                            <label>                <input type="radio" name="heard_about" value="Word of Mouth" /> Word of Mouth</label>
                            <label>                <input type="radio" name="heard_about" value="Other" /> Other</label>
              </div>
            </div>
          
          {/* Question 2 */}

                    <div className="question">
                        <h3>What is your overall assessment of the seminar?</h3>
                        <div className="options">
                            <label>                <input type="radio" name="overall_assessment" value="Very Satisfied" /> Very Satisfied</label>
                            <label>                <input type="radio" name="overall_assessment" value="Satisfied" /> Satisfied</label>
                            <label>                <input type="radio" name="overall_assessment" value="Neutral" /> Neutral</label>
                            <label>                <input type="radio" name="overall_assessment" value="Dissatisfied" /> Dissatisfied</label>
                            <label>                <input type="radio" name="overall_assessment" value="Very Dissatisfied" /> Very Dissatisfied</label>
              </div>
            </div>
          
          {/* Question 3 */}

                    <div className="question">
                        <h3>The length of this seminar was satisfactory?</h3>
                        <div className="options">
                            <label>                <input type="radio" name="seminar_length" value="Very Satisfied" /> Very Satisfied</label>
                            <label>                <input type="radio" name="seminar_length" value="Satisfied" /> Satisfied</label>
                            <label>                <input type="radio" name="seminar_length" value="Neutral" /> Neutral</label>
                            <label>                <input type="radio" name="seminar_length" value="Dissatisfied" /> Dissatisfied</label>
                            <label>                <input type="radio" name="seminar_length" value="Very Dissatisfied" /> Very Dissatisfied</label>
              </div>
            </div>
          
          {/* Question 4 */}

                    <div className="question">
                        <h3>How likely are you to recommend our service to a friend or colleague?</h3>
                        <div className="options">
                            <label>                <input type="radio" name="recommend" value="Very Likely" /> Very Likely</label>
                            <label>                <input type="radio" name="recommend" value="Likely" /> Likely</label>
                            <label>                <input type="radio" name="recommend" value="Neutral" /> Neutral</label>
                            <label>                <input type="radio" name="recommend" value="Unlikely" /> Unlikely</label>
                            <label>                <input type="radio" name="recommend" value="Very Unlikely" /> Very Unlikely</label>
              </div>
            </div>
          
          {/* Question 5 */}

                    <div className="question">
                        <h3>How was your experience with our team?</h3>
                        <div className="options">
                            <label>                <input type="radio" name="team_experience" value="Excellent" /> Excellent</label>
                            <label>                <input type="radio" name="team_experience" value="Good" /> Good</label>
                            <label>                <input type="radio" name="team_experience" value="Average" /> Average</label>
                            <label>                <input type="radio" name="team_experience" value="Poor" /> Poor</label>
                            <label>                <input type="radio" name="team_experience" value="Very Poor" /> Very Poor</label>
              </div>
            </div>
          
          {/* Question 6 */}

                    <div className="question">
                        <h3>How interesting was this session for you?</h3>
                        <div className="options">
                            <label>                <input type="radio" name="session_interest" value="Excellent" /> Excellent</label>
                            <label>                <input type="radio" name="session_interest" value="Good" /> Good</label>
                            <label>                <input type="radio" name="session_interest" value="Average" /> Average</label>
                            <label>                <input type="radio" name="session_interest" value="Poor" /> Poor</label>
                            <label>                <input type="radio" name="session_interest" value="Very Poor" /> Very Poor</label>
              </div>
            </div>
          
          {/* Suggestion */}

                    <div className="question suggestion">
                        <h3>Do you have any suggestions for improvement?</h3>
                        <textarea name="suggestions"></textarea>
            </div>
          
          {/* Courses */}

                    <div className="course-box">
                        <h2>Which course aligns best with your interests?</h2>
                        <div className="course-grid">
                            <label>                <input type="checkbox" name="interested_courses[]" value="Data Science AI & ML" /> Data Science AI &amp; ML</label>
                            <label>                <input type="checkbox" name="interested_courses[]" value="Web Design" /> Web Design</label>
                            <label>                <input type="checkbox" name="interested_courses[]" value="Data Analytics" /> Data Analytics</label>
                            <label>                <input type="checkbox" name="interested_courses[]" value="Graphic Design" /> Graphic Design</label>
                            <label>                <input type="checkbox" name="interested_courses[]" value="Programming in Python" /> Programming in Python</label>
                            <label>                <input type="checkbox" name="interested_courses[]" value="UI/UX Design" /> UI/UX Design</label>
                            <label>                <input type="checkbox" name="interested_courses[]" value="Full-Stack Development" /> Full-Stack Development</label>
                            <label>                <input type="checkbox" name="interested_courses[]" value="Digital Marketing" /> Digital Marketing</label>
                            <label>                <input type="checkbox" name="interested_courses[]" value="Cyber Security" /> Cyber Security</label>
                            <label>                <input type="checkbox" name="interested_courses[]" value="2D, 3D Animation" /> 2D, 3D Animation</label>
              </div>
            </div>
                    <div className="submit-btn">
                        <button type="submit">Submit Feedback</button>
            </div>
          </form>
        </div>

      


      
    </>
  );
}
