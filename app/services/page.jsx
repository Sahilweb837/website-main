import Link from "next/link";
import PageInteractiveHandler from "@/components/PageInteractiveHandler";

export const metadata = {
  "title": "IT & Digital Services in Dharamshala | Netcoder Technology",
  "description": "Explore professional IT and digital services by Netcoder Technology in Dharamshala including website development, UI/UX design, branding, graphic design, social media management, SEO, and digital marketing solutions.",
  "openGraph": {
    "title": "IT & Digital Services in Dharamshala | Netcoder Technology",
    "description": "Explore professional IT and digital services by Netcoder Technology in Dharamshala including website development, UI/UX design, branding, graphic design, social media management, SEO, and digital marketing solutions.",
    "url": "https://www.netcoder.in/services",
    "siteName": "Netcoder Technology",
    "type": "website"
  },
  "alternates": {
    "canonical": "https://www.netcoder.in/services"
  }
};

export default function ServicesPage() {
  return (
    <>
      <PageInteractiveHandler pageSlug="services" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"ProfessionalService\",\"name\":\"Netcoder Technology\",\"image\":\"https://www.netcoder.in/images/logo.png\",\"url\":\"https://www.netcoder.in/services.html\",\"telephone\":\"+91-9816732055\",\"address\":{\"@type\":\"PostalAddress\",\"streetAddress\":\"Near Govt. ITI, Above Gramin Bank Dari\",\"addressLocality\":\"Dharamshala\",\"postalCode\":\"176057\",\"addressRegion\":\"Himachal Pradesh\",\"addressCountry\":\"IN\"},\"description\":\"Professional IT and digital services including website development, UI/UX design, branding, SEO, social media management, and digital marketing solutions in Dharamshala.\",\"areaServed\":{\"@type\":\"Place\",\"name\":\"Himachal Pradesh\"},\"serviceType\":[\"Website Development\",\"UI/UX Design\",\"SEO Services\",\"Digital Marketing\",\"Branding\",\"Graphic Design\",\"Social Media Management\"]}" }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://www.netcoder.in/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Services\",\"item\":\"https://www.netcoder.in/services.html\"}]}" }}
      />
      <div className="float-contact">
                <a href="https://wa.me/919816732055?text=Hi%20Netcoder%2C%20I%20want%20to%20discuss%20a%20project" target="_blank" rel="noopener" className="float-btn float-whatsapp" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
                    <i className="fa-brands fa-whatsapp"></i>
                    <span className="float-tooltip">WhatsApp</span>
          </a>
                <a href="tel:+919816732055" className="float-btn float-call" aria-label="Call Us" title="Call Us">
                    <i className="fa-solid fa-phone"></i>
                    <span className="float-tooltip">Call Now</span>
          </a>
        </div>

      
      <div className="course-single">
                <div>
                    <img src="/images/digital-solutions.png" alt="Digital services and website solutions" loading="lazy" decoding="async" />
          </div>
                <div>
                    <h2>            <span>Professional IT &amp; Digital Services</span> for modern businesses</h2>
                    <p>We help businesses build, launch and grow online with complete digital solutions. Our services include             <strong>website development, website maintenance, SEO, graphic design, UI/UX design, social media marketing, content creation, digital marketing and app development.</strong></p>
                    <p>From a new website or mobile application to stronger search visibility and consistent brand communication, our team delivers practical solutions designed around your goals.</p>
                    <button type="button" className="color-btn" data-modal-trigger="demo" style={{"border":"none","cursor":"pointer"}}>Get Quote</button>
          </div>
        </div>

      

      {/* services */}


      
      <div className="services container" id="service-offerings">
                <div className="heading">
                    <h2>CREATIVE DESIGN SOLUTIONS</h2>
                    <p>Our             <strong>Creative Design Solutions</strong> encompass branding, UI/UX, and graphic design, ensuring a
                cohesive
                visual identity across all platforms. We craft engaging and intuitive designs that not only
                captivate users but also drive conversions. Our approach combines creativity with strategic
                insights
                to elevate your brand in the digital landscape.</p>
          </div>
                <div className="card">
                    <div className="col">
            
            {/*  */}

                        <ul>
                            <h3>                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="16" fill="#ff5532" />
                                    <path d="M18.2894 12H10.6795C10.4993 12 10.3264 12.0716 10.199 12.199C10.0716 12.3264 10 12.4993 10 12.6795V19.4741C10 19.6543 10.0716 19.8271 10.199 19.9545C10.3264 20.082 10.4993 20.1535 10.6795 20.1535H18.2894C18.3852 20.1536 18.48 20.1335 18.5675 20.0944C18.655 20.0552 18.7332 19.9981 18.797 19.9266L21.8274 16.5293C21.9386 16.4048 22 16.2437 22 16.0768C22 15.9098 21.9386 15.7488 21.8274 15.6242L18.797 12.2269C18.7332 12.1555 18.655 12.0983 18.5675 12.0592C18.48 12.0201 18.3852 11.9999 18.2894 12Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                                <span>Branding</span>
                </h3>
                            <li>
                        Brand strategy and positioning
                    </li>
                            <li>
                        Logo and visual identity creation
                    </li>
              </ul>
            
            {/*  */}

                        <ul>
                            <h3>                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="16" fill="#ff5532" />
                                    <path d="M16.8567 20.91L11.8814 21.8333C10.9274 22.0099 10.4501 22.0986 10.1754 21.8239C9.90076 21.5493 9.98876 21.072 10.1661 20.1173L11.0901 15.142C11.2381 14.3447 11.3128 13.9453 11.5754 13.7047C11.8381 13.464 12.3194 13.4167 13.2814 13.322C14.2081 13.232 15.0854 12.9147 16.0001 12L20 16C19.0854 16.9146 18.7674 17.7913 18.6767 18.7186C18.5827 19.6806 18.5354 20.162 18.2947 20.4246C18.0534 20.6873 17.6547 20.7613 16.8567 20.91Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15.3327 18.1399C14.9614 18.0845 14.6174 17.9127 14.35 17.6493C14.0866 17.3819 13.9148 17.0378 13.8593 16.6666M14.3507 17.6493L10.666 21.3332M15.9993 12C16.474 11.3 17.1173 10.1206 18.0706 10.0073C18.7206 9.92997 19.26 10.4686 20.3373 11.5466L20.4526 11.662C21.5306 12.7393 22.0693 13.2786 21.992 13.9286C21.8786 14.8819 20.7 15.5253 19.9993 15.9999" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                                <span>GRAPHIC DESIGN</span>
                </h3>
                            <li>
                        Creation of marketing collateral (brochures, flyers)
                    </li>
                            <li>
                        Digital graphics for social media and advertising
                    </li>
              </ul>
            
            {/*  */}

                        <ul>
                            <h3>                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="16" fill="#ff5532" />
                                    <path d="M10 11.5C10 11.1022 10.158 10.7206 10.4393 10.4393C10.7206 10.158 11.1022 10 11.5 10H13C13.3978 10 13.7794 10.158 14.0607 10.4393C14.342 10.7206 14.5 11.1022 14.5 11.5V12.25C14.5 12.6478 14.342 13.0294 14.0607 13.3107C13.7794 13.592 13.3978 13.75 13 13.75H11.5C11.1022 13.75 10.7206 13.592 10.4393 13.3107C10.158 13.0294 10 12.6478 10 12.25V11.5ZM10 18.25C10 17.8522 10.158 17.4706 10.4393 17.1893C10.7206 16.908 11.1022 16.75 11.5 16.75H13C13.3978 16.75 13.7794 16.908 14.0607 17.1893C14.342 17.4706 14.5 17.8522 14.5 18.25V20.5C14.5 20.8978 14.342 21.2794 14.0607 21.5607C13.7794 21.842 13.3978 22 13 22H11.5C11.1022 22 10.7206 21.842 10.4393 21.5607C10.158 21.2794 10 20.8978 10 20.5V18.25ZM17.5 11.5C17.5 11.1022 17.658 10.7206 17.9393 10.4393C18.2206 10.158 18.6022 10 19 10H20.5C20.8978 10 21.2794 10.158 21.5607 10.4393C21.842 10.7206 22 11.1022 22 11.5V20.5C22 20.8978 21.842 21.2794 21.5607 21.5607C21.2794 21.842 20.8978 22 20.5 22H19C18.6022 22 18.2206 21.842 17.9393 21.5607C17.658 21.2794 17.5 20.8978 17.5 20.5V11.5Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                                <span>UX/UI DESIGN</span>
                </h3>
                            <li>
                        User Research
                    </li>
                            <li>
                        Wireframe &amp; Prototyping
                    </li>
                            <li>
                        Usability Testing
                    </li>
              </ul>
            
            {/*  */}

            </div>
                    <div className="col">
                        <img src="/images/creative-design-solutions.png" alt="" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>

      

      {/*  */}


      
      <div className="services container">
                <div className="heading">
                    <h2>DEVELOPMENT</h2>
                    <p>Our             <strong>Development</strong> service delivers custom, responsive websites tailored to your business
                needs. With expertise in full-stack development, we create dynamic and user-friendly platforms that
                enhance online presence. From CMS integration to e-commerce solutions, we ensure your website performs
                optimally while providing ongoing maintenance and support.</p>
          </div>
                <div className="card">
                    <div className="col">
            
            {/*  */}

                        <ul>
                            <h3>                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="16" fill="#ff5532" />
                                    <path d="M17.5 19.75H22M19.75 22V17.5M11.2 10H13.3C13.4576 10 13.6136 10.031 13.7592 10.0913C13.9048 10.1517 14.0371 10.24 14.1485 10.3515C14.26 10.4629 14.3483 10.5952 14.4087 10.7408C14.469 10.8864 14.5 11.0424 14.5 11.2V13.3C14.5 13.4576 14.469 13.6136 14.4087 13.7592C14.3483 13.9048 14.26 14.0371 14.1485 14.1485C14.0371 14.26 13.9048 14.3483 13.7592 14.4087C13.6136 14.469 13.4576 14.5 13.3 14.5H11.2C10.8817 14.5 10.5765 14.3736 10.3515 14.1485C10.1264 13.9235 10 13.6183 10 13.3V11.2C10 10.8817 10.1264 10.5765 10.3515 10.3515C10.5765 10.1264 10.8817 10 11.2 10ZM11.2 17.5H13.3C13.6183 17.5 13.9235 17.6264 14.1485 17.8515C14.3736 18.0765 14.5 18.3817 14.5 18.7V20.8C14.5 21.1183 14.3736 21.4235 14.1485 21.6485C13.9235 21.8736 13.6183 22 13.3 22H11.2C10.8817 22 10.5765 21.8736 10.3515 21.6485C10.1264 21.4235 10 21.1183 10 20.8V18.7C10 18.3817 10.1264 18.0765 10.3515 17.8515C10.5765 17.6264 10.8817 17.5 11.2 17.5ZM18.7 10H20.8C21.1183 10 21.4235 10.1264 21.6485 10.3515C21.8736 10.5765 22 10.8817 22 11.2V13.3C22 13.6183 21.8736 13.9235 21.6485 14.1485C21.4235 14.3736 21.1183 14.5 20.8 14.5H18.7C18.3817 14.5 18.0765 14.3736 17.8515 14.1485C17.6264 13.9235 17.5 13.6183 17.5 13.3V11.2C17.5 10.8817 17.6264 10.5765 17.8515 10.3515C18.0765 10.1264 18.3817 10 18.7 10Z" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                                <span>Custom Websites</span>
                </h3>
                            <li>
                        Tailored web solutions to meet client needs
                    </li>
                            <li>
                        Responsive design for mobile and desktop
                    </li>
              </ul>
            
            {/*  */}

                        <ul>
                            <h3>                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="16" fill="#ff5532" />
                                    <path d="M21.3692 17.5789V12.5263C21.3692 11.3352 21.3692 10.7402 20.9991 10.3701C20.629 10 20.0341 10 18.8429 10H13.7903C12.5991 10 12.0042 10 11.6341 10.3701C11.264 10.7402 11.264 11.3352 11.264 12.5263V17.5789M10.9469 18.22L11.2766 17.5789H21.3389L21.6863 18.22C22.5976 19.9013 22.825 20.7419 22.4783 21.3709C22.1315 22 21.2139 22 19.3772 22H13.256C11.4187 22 10.5004 22 10.1543 21.3709C9.80754 20.7419 10.0349 19.9013 10.9469 18.22Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.5266 12.842L19.1077 13.3429C19.3521 13.5532 19.474 13.6587 19.474 13.7894C19.474 13.9201 19.3521 14.0256 19.1077 14.2359L18.5266 14.7368M14.1056 12.842L13.5245 13.3429C13.2801 13.5532 13.1582 13.6587 13.1582 13.7894C13.1582 13.9201 13.2801 14.0256 13.5245 14.2359L14.1056 14.7368M16.9477 12.2104L15.6845 15.3683" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                                <span>Front-End Technologies</span>
                </h3>
                            <li>
                        HTML, CSS, JavaScript for user interfaces
                    </li>
                            <li>
                        Frameworks like React or Angular
                    </li>
              </ul>
            
            {/*  */}

                        <ul>
                            <h3>                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="16" fill="#ff5532" />
                                    <path d="M22 10H10V14.8H22V10ZM22 17.2H10V22H22V17.2Z" stroke="white" strokeLinejoin="round" />
                                    <path d="M12.3008 12.5V12.3H12.5008V12.5H12.3008ZM12.3008 19.7V19.5H12.5008V19.7H12.3008ZM14.7008 12.5V12.3H14.9008V12.5H14.7008ZM14.7008 19.7V19.5H14.9008V19.7H14.7008Z" fill="white" stroke="white" />
                  </svg>
                                <span>Back-End Technologies</span>
                </h3>
                            <li>
                        Server-side programming (Node.js, PHP, Python)
                    </li>
                            <li>
                        Database integration (MySQL, MongoDB)
                    </li>
              </ul>
            
            {/*  */}

                        <ul>
                            <h3>                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="16" fill="#ff5532" />
                                    <path d="M22.875 10H10.125C9.50368 10 9 10.5037 9 11.125V20.875C9 21.4963 9.50368 22 10.125 22H22.875C23.4963 22 24 21.4963 24 20.875V11.125C24 10.5037 23.4963 10 22.875 10Z" stroke="white" strokeLinejoin="round" />
                                    <path d="M9 11.125C9 10.8266 9.11853 10.5405 9.3295 10.3295C9.54048 10.1185 9.82663 10 10.125 10H22.875C23.1734 10 23.4595 10.1185 23.6705 10.3295C23.8815 10.5405 24 10.8266 24 11.125V14.5H9V11.125Z" stroke="white" />
                                    <path d="M11.25 12C11.1119 12 11 12.1119 11 12.25C11 12.3881 11.1119 12.5 11.25 12.5C11.3881 12.5 11.5 12.3881 11.5 12.25C11.5 12.1119 11.3881 12 11.25 12Z" fill="white" stroke="white" />
                                    <path d="M13.5 12C13.3619 12 13.25 12.1119 13.25 12.25C13.25 12.3881 13.3619 12.5 13.5 12.5C13.6381 12.5 13.75 12.3881 13.75 12.25C13.75 12.1119 13.6381 12 13.5 12Z" fill="white" stroke="white" />
                  </svg>
                                <span>CMS Integration</span>
                </h3>
                            <li>
                        Setup and customization of content management systems
                    </li>
                            <li>
                        Training for clients on CMS usage
                    </li>
              </ul>
            
            {/*  */}

                        <ul>
                            <h3>                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="16" fill="#ff5532" />
                                    <path d="M10 20.6666C10 21.0202 10.1405 21.3593 10.3905 21.6094C10.6406 21.8594 10.9797 21.9999 11.3333 21.9999C11.687 21.9999 12.0261 21.8594 12.2761 21.6094C12.5262 21.3593 12.6667 21.0202 12.6667 20.6666C12.6667 20.313 12.5262 19.9738 12.2761 19.7238C12.0261 19.4737 11.687 19.3333 11.3333 19.3333C10.9797 19.3333 10.6406 19.4737 10.3905 19.7238C10.1405 19.9738 10 20.313 10 20.6666Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15 19.3333H11.3333V10H10" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M11.334 11.3333L20.6673 11.9999L20.0007 16.6666H11.334M20.6673 21.9999L22.0007 20.6666L20.6673 19.3333M18.6673 19.3333L17.334 20.6666L18.6673 21.9999" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                                <span>E-Commerce Solutions</span>
                </h3>
                            <li>
                        Shopping cart integration and product management
                    </li>
                            <li>
                        Secure payment gateway setup
                    </li>
              </ul>
            </div>
                    <div className="col">
                        <img src="/images/development.png" alt="" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>

      

      {/*  */}


      
      <div className="services container">
                <div className="heading">
                    <h2>DIGITAL ENGAGEMENT SOLUTIONS </h2>
                    <p>Our             <strong>Digital Engagement Solutions</strong> focus on building meaningful connections with your
                audience. Through tailored social media management, content creation, and effective digital marketing
                strategies, we enhance your brand's visibility and engagement. By leveraging analytics and reporting, we
                optimize campaigns to ensure your message resonates and drives results.</p>
          </div>
                <div className="card">
                    <div className="col">
            
            {/*  */}

                        <ul>
                            <h3>                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="16" fill="#ff5532" />
                                    <path d="M22 10.4V21.6C22 21.7061 21.9579 21.8078 21.8828 21.8828C21.8078 21.9579 21.7061 22 21.6 22H10.4C10.2939 22 10.1922 21.9579 10.1172 21.8828C10.0421 21.8078 10 21.7061 10 21.6V10.4C10 10.2939 10.0421 10.1922 10.1172 10.1172C10.1922 10.0421 10.2939 10 10.4 10H21.6C21.7061 10 21.8078 10.0421 21.8828 10.1172C21.9579 10.1922 22 10.2939 22 10.4Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.5987 13.3861C14.5379 13.3513 14.469 13.3331 14.399 13.3333C14.3289 13.3334 14.2602 13.352 14.1996 13.3871C14.1389 13.4222 14.0886 13.4726 14.0536 13.5333C14.0186 13.5939 14.0001 13.6627 14 13.7327V17.6881C14 17.7582 14.0184 17.827 14.0533 17.8878C14.0883 17.9485 14.1386 17.999 14.1993 18.0342C14.2599 18.0694 14.3287 18.088 14.3988 18.0882C14.4689 18.0884 14.5378 18.0702 14.5987 18.0354L18.0587 16.0581C18.1199 16.0231 18.1708 15.9725 18.2062 15.9115C18.2416 15.8505 18.2603 15.7813 18.2603 15.7107C18.2603 15.6402 18.2416 15.5709 18.2062 15.5099C18.1708 15.4489 18.1199 15.3984 18.0587 15.3634L14.5987 13.3861Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                                <span>Social Media Management</span>
                </h3>
                            <li>
                        Developing social media strategies tailored to target audiences
                    </li>
                            <li>
                        Content planning and scheduling for various platforms
                    </li>
              </ul>
            
            {/*  */}

                        <ul>
                            <h3>                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="16" fill="#ff5532" />
                                    <path d="M10.127 13.4054H21.8727M10.127 18.5946H21.8727M15.9998 10V22M19.2431 21.7898V18.5946M19.2431 13.4054V10.2815M12.7566 21.7898V18.5946M12.7566 13.4054V10.2815" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.1081 10H13.8919C11.7425 10 10 11.7425 10 13.8919V18.1081C10 20.2575 11.7425 22 13.8919 22H18.1081C20.2575 22 22 20.2575 22 18.1081V13.8919C22 11.7425 20.2575 10 18.1081 10Z" stroke="white" />
                  </svg>
                                <span>Content Creation</span>
                </h3>
                            <li>
                        Blog writing, video production, and photography services
                    </li>
                            <li>
                        Copywriting for websites and marketing materials
                    </li>
              </ul>
            
            {/*  */}

                        <ul>
                            <h3>                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="16" fill="#ff5532" />
                                    <path d="M10.252 22L12.0617 20.1902M12.0617 20.1902C12.3712 20.4998 12.7387 20.7453 13.143 20.9128C13.5474 21.0803 13.9809 21.1665 14.4186 21.1665C14.8563 21.1665 15.2897 21.0803 15.6941 20.9128C16.0985 20.7453 16.4659 20.4998 16.7755 20.1902C17.085 19.8807 17.3305 19.5133 17.498 19.1089C17.6655 18.7045 17.7517 18.2711 17.7517 17.8334C17.7517 17.3957 17.6655 16.9622 17.498 16.5578C17.3305 16.1534 17.085 15.786 16.7755 15.4765C16.1504 14.8514 15.3026 14.5002 14.4186 14.5002C13.5346 14.5002 12.6868 14.8514 12.0617 15.4765C11.4366 16.1016 11.0855 16.9494 11.0855 17.8334C11.0855 18.7174 11.4366 19.5652 12.0617 20.1902Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8.75001 18.391C8.25732 17.5422 7.99853 16.5779 8.00001 15.5965C8.00001 12.5058 10.5185 10 13.625 10H17.375C20.4815 10 23 12.5058 23 15.5965C23 18.034 21.4348 20.107 19.25 20.875" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                                <span>Digital Marketing</span>
                </h3>
                            <li>
                        Search engine optimization (SEO) strategies
                    </li>
                            <li>
                        Pay-per-click (PPC) advertising campaigns
                    </li>
                            <li>
                        Email marketing campaigns and automation
                    </li>
              </ul>
            
            {/*  */}

            </div>
                    <div className="col">
                        <img src="/images/digital-solutions.png" alt="" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>

      
      <section className="services-results" aria-labelledby="services-results-title">
                <div className="services-results-inner">
                    <div className="services-results-heading">
                        <p className="services-results-eyebrow">Built for measurable growth</p>
                        <h2 id="services-results-title">Turn digital attention into               <span>real business results.</span></h2>
                        <p>Being online is only the beginning. We combine strategy, design, technology, and marketing to help your business get discovered, earn trust, and turn visitors into customers.</p>
            </div>
                    <div className="services-results-grid">
                        <article className="services-result-card">
                            <div className="services-result-icon">                <i className="fa-solid fa-chart-line" aria-hidden="true"></i></div>
                            <p className="services-result-number">0                 <span>to</span> 1,000+</p>
                            <h3>More people discover your business</h3>
                            <p>Build a stronger online presence with search-friendly websites, content, SEO, and campaigns that bring the right audience to you.</p>
              </article>
                        <article className="services-result-card services-result-card-highlight">
                            <div className="services-result-icon">                <i className="fa-solid fa-arrow-trend-up" aria-hidden="true"></i></div>
                            <p className="services-result-number">More                 <span>sales</span></p>
                            <h3>Turn visitors into customers</h3>
                            <p>Create clearer journeys, faster experiences, and persuasive content that makes it easier for people to enquire, buy, or book.</p>
              </article>
                        <article className="services-result-card">
                            <div className="services-result-icon">                <i className="fa-solid fa-globe" aria-hidden="true"></i></div>
                            <p className="services-result-number">Online                 <span>growth</span></p>
                            <h3>Make your business ready for the next step</h3>
                            <p>Use a polished brand, dependable technology, and ongoing digital support to grow your income and compete with confidence.</p>
              </article>
            </div>
                    <div className="services-results-note">
                        <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                        <p>              <strong>One partner for the whole journey.</strong> From your first website to long-term digital growth, we keep your goals at the centre of every decision.</p>
            </div>
          </div>
        </section>

      

      {/* service delivery roadmap */}


      
      <section className="timeline nc-home-roadmap" id="nc-roadmap" aria-labelledby="services-roadmap-title">
                <h2 className="nc-roadmap-title" id="services-roadmap-title">          <span>Our Service Delivery Roadmap</span></h2>
                <p className="nc-roadmap-intro">A clear, collaborative process that turns your business goals into a polished digital presence and measurable growth.</p>
                <div className="timeline-line" aria-hidden="true">
                    <div className="timeline-progress"></div>
          </div>
                <div className="timeline-item">
                    <div className="circle">1</div>
                    <div className="timeline-card">
                        <h3>Understand Your               <span>Business Goals</span></h3>
                        <p>We learn about your business, audience, priorities, and challenges to define the right digital direction for your project.</p>
            </div>
          </div>
                <div className="timeline-item">
                    <div className="circle">2</div>
                    <div className="timeline-card">
                        <h3>Shape Your               <span>Digital Strategy</span></h3>
                        <p>We plan the website, app, branding, SEO, or marketing approach around clear objectives, useful content, and a practical delivery roadmap.</p>
            </div>
          </div>
                <div className="timeline-item">
                    <div className="circle">3</div>
                    <div className="timeline-card">
                        <h3>Design Your               <span>Brand Experience</span></h3>
                        <p>Our team creates the visual identity, user experience, layouts, graphics, and content direction that make your brand easy to recognize and trust.</p>
            </div>
          </div>
                <div className="timeline-item">
                    <div className="circle">4</div>
                    <div className="timeline-card">
                        <h3>Build with               <span>Modern Technology</span></h3>
                        <p>We develop responsive websites, web applications, e-commerce platforms, and mobile solutions with performance, usability, and scalability in mind.</p>
            </div>
          </div>
                <div className="timeline-item">
                    <div className="circle">5</div>
                    <div className="timeline-card">
                        <h3>Launch with               <span>Confidence</span></h3>
                        <p>Before launch, we test the experience across devices, refine the details, connect the required tools, and prepare your digital solution for real users.</p>
            </div>
          </div>
                <div className="timeline-item">
                    <div className="circle">6</div>
                    <div className="timeline-card">
                        <h3>Grow through               <span>Ongoing Support</span></h3>
                        <p>After launch, we support maintenance, SEO, social media, content, campaign improvements, and future updates that keep your business moving forward.</p>
            </div>
          </div>
        </section>

      
      <div className="container break" id="services-partnership-cta">
                <img src="/images/query.png" alt="Start a digital partnership with Netcoder Technology" loading="lazy" decoding="async" />
                <div>
                    <h2>Ready to make an impact?</h2>
                    <p>
        Yes, we create custom business websites, corporate websites, portfolio websites,
        e-commerce platforms, educational portals, and responsive web applications tailored
        to your requirements.
      </p>
          </div>
        </div>

      

      {/* FAQs */}


      
      <div className="accordion container">
                <div className="headings">
                    <h2>Frequently Asked             <span>Questions</span></h2>
                    <small>
      Find answers about our IT services, web development, digital marketing, software solutions,
      UI/UX design, training programs, and business technology services at Netcoder Technology.
    </small>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header active">
                        <h5>What Services Does Netcoder Technology Provide?</h5>
            </div>
                    <div className="accordion-content show">
                        <p>
        Netcoder Technology offers Web Development, E-Commerce Solutions, Digital Marketing,
        UI/UX Design, Graphic Design, Software Development, Mobile App Solutions,
        IT Consulting, and Professional Training Programs.
      </p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <h5>Do You Develop Custom Websites For Businesses?</h5>
            </div>
                    <div className="accordion-content">
                        <p>
        Yes, we create custom business websites, corporate websites, portfolio websites,
        e-commerce platforms, educational portals, and responsive web applications tailored
        to your requirements.
      </p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <h5>Can You Help Improve My Business's Online Presence?</h5>
            </div>
                    <div className="accordion-content">
                        <p>
        Absolutely. Our digital marketing services include SEO, Social Media Marketing,
        Content Strategy, Brand Promotion, and Online Advertising to help businesses
        reach more customers and grow online.
      </p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <h5>Do You Offer UI/UX And Graphic Design Services?</h5>
            </div>
                    <div className="accordion-content">
                        <p>
        Yes, our creative team designs modern user interfaces, website layouts,
        mobile app designs, branding materials, logos, social media creatives,
        and marketing graphics that enhance user experience and brand identity.
      </p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <h5>Do You Provide Training Along With IT Services?</h5>
            </div>
                    <div className="accordion-content">
                        <p>
        Yes, Netcoder Technology combines professional IT services with industry-focused
        training programs in Web Development, Digital Marketing, Data Science,
        Cyber Security, AI, UI/UX Design, and other technology domains.
      </p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <h5>Why Choose Netcoder Technology For Digital Solutions?</h5>
            </div>
                    <div className="accordion-content">
                        <p>
        We focus on innovation, quality, practical expertise, and client satisfaction.
        Our team delivers scalable solutions, modern technologies, professional support,
        and results-driven strategies that help businesses succeed in the digital world.
      </p>
            </div>
          </div>
        </div>

      

      {/* ================= SERVICES CONTACT-STYLED POPUP MODAL ================= */}


      


      
      <div className="service-modal-overlay" id="serviceInquiryModal" role="dialog" aria-modal="true" aria-labelledby="svcModalTitle">
                <div className="contact-form-container">
                    <button type="button" className="service-modal-close" aria-label="Close modal">×</button>
                    <div className="form-slides">
            
            {/* Slide 1: Service Selection */}

                        <div className="form-slide active" id="svcSlide1">
                            <br />
                            <h3 className="slide-title" id="svcModalTitle">Start Your Project With Netcoder</h3>
                            <p style={{"color":"#64748b","fontSize":"14px","marginBottom":"20px"}}>
                        Tell us what you need and our lead tech architect will prepare a tailored proposal within 24 hours.
                    </p>
                            <p style={{"textAlign":"center","margin":"-8px 0 20px","fontSize":"14px"}}>
                        Prefer to speak with us?                 <a href="tel:+919816732055" style={{"color":"#ff5532","fontWeight":"600"}}>Call +91 9816732055</a>
                </p>
                            <div className="form-group">
                                <label className="form-label" htmlFor="svc_service">Select Required Service *</label>
                                <select className="form-select" id="svc_service" required>
                                    <option value="">Choose a service</option>
                                    <option value="Custom Web Development">Custom Web Development</option>
                                    <option value="UI & UX Design">UI &amp; UX Design</option>
                                    <option value="Branding & Graphic Design">Branding &amp; Graphic Design</option>
                                    <option value="SEO & Digital Marketing">SEO &amp; Digital Marketing</option>
                                    <option value="Mobile App Development">Mobile App Development</option>
                                    <option value="E-Commerce Solutions">E-Commerce Solutions</option>
                                    <option value="Website Maintenance & Support">Website Maintenance &amp; Support</option>
                                    <option value="Corporate / IT Training">Corporate / IT Training</option>
                  </select>
                                <div className="error-message" id="svcServiceError"></div>
                </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="svc_budget">Estimated Budget Tier</label>
                                <select className="form-select" id="svc_budget" defaultValue="₹35,000 - ₹75,000 (Growth Tier)">
                                    <option value="₹15,000 - ₹35,000 (Starter Tier)">₹15,000 - ₹35,000 (Starter Tier)</option>
                                    <option value="₹35,000 - ₹75,000 (Growth Tier)">₹35,000 - ₹75,000 (Growth Tier)</option>
                                    <option value="₹75,000 - ₹1.5 Lakhs (Scale / Enterprise)">₹75,000 - ₹1.5 Lakhs (Scale / Enterprise)</option>
                                    <option value="₹1.5 Lakhs+ (Custom Architecture)">₹1.5 Lakhs+ (Custom Architecture)</option>
                  </select>
                </div>
                            <div className="progress-indicators">
                                <span className="indicator active"></span>
                                <span className="indicator"></span>
                                <span className="indicator"></span>
                                <span className="indicator"></span>
                </div>
                            <button type="button" className="form-btn continue-btn-form">Continue</button>
              </div>
            
            {/* Slide 2: Personal & Project Details */}

                        <div className="form-slide" id="svcSlide2">
                            <h3 className="slide-title">Tell Us About Yourself</h3>
                            <div className="form-group">
                                <label className="form-label" htmlFor="svc_name">Full Name *</label>
                                <input type="text" className="form-input" id="svc_name" placeholder="Enter your full name" />
                                <div className="error-message" id="svcNameError"></div>
                </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="svc_number">Mobile Number *</label>
                                <input type="tel" className="form-input" id="svc_number" placeholder="10-digit mobile number" maxLength="10" />
                                <div className="error-message" id="svcNumberError"></div>
                </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="svc_email">Email Address *</label>
                                <input type="email" className="form-input" id="svc_email" placeholder="Enter your email address" />
                                <div className="error-message" id="svcEmailError"></div>
                </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="svc_message">Project Details / Scope (Optional)</label>
                                <textarea className="form-input" id="svc_message" rows="3" placeholder="Briefly describe your requirements or timeline..."></textarea>
                </div>
                            <div className="progress-indicators">
                                <span className="indicator"></span>
                                <span className="indicator active"></span>
                                <span className="indicator"></span>
                                <span className="indicator"></span>
                </div>
                            <div className="form-navigation">
                                <button type="button" className="form-btn btn-secondary">Back</button>
                                <button type="button" className="form-btn submit-btn-form" id="svcSendOtpBtn">Send Verification OTP</button>
                </div>
              </div>
            
            {/* Slide 3: Real Firebase SMS OTP Verification */}

                        <div className="form-slide" id="svcSlide3">
                            <div className="otp-container">
                                <h3 className="slide-title">Verify Mobile Number</h3>
                                <p id="svcOtpPhonePrompt" style={{"color":"#64748b","fontSize":"14px","textAlign":"center","marginBottom":"15px"}}>
                            We sent a 6-digit verification code to your phone.
                        </p>
                                <div className="otp-inputs" id="svcOtpInputs">
                                    <input type="text" className="otp-input svc-otp-digit" maxLength="1" inputMode="numeric" data-idx="0" />
                                    <input type="text" className="otp-input svc-otp-digit" maxLength="1" inputMode="numeric" data-idx="1" disabled />
                                    <input type="text" className="otp-input svc-otp-digit" maxLength="1" inputMode="numeric" data-idx="2" disabled />
                                    <input type="text" className="otp-input svc-otp-digit" maxLength="1" inputMode="numeric" data-idx="3" disabled />
                                    <input type="text" className="otp-input svc-otp-digit" maxLength="1" inputMode="numeric" data-idx="4" disabled />
                                    <input type="text" className="otp-input svc-otp-digit" maxLength="1" inputMode="numeric" data-idx="5" disabled />
                  </div>
                                <div className="svc-otp-status" id="svcOtpStatus">Waiting for code entry...</div>
                                <div className="error-message" id="svcOtpError"></div>
                                <div id="svc-recaptcha-container"></div>
                                <button type="button" id="svcVerifyBtn" className="form-btn otp-btn-verify" style={{"display":"block","width":"100%","marginTop":"15px"}}>
                            Verify OTP &amp; Submit Request
                        </button>
                                <p style={{"marginTop":"14px","fontSize":"13px","textAlign":"center","color":"#64748b"}}>
                                    <span id="svcResendWrap">Didn't receive OTP?                     <a href="javascript:void(0)" style={{"color":"#ff5532","fontWeight":"600"}}>Resend</a></span>
                                    <span id="svcTimerWrap" style={{"display":"none"}}>Resend in                     <b id="svcTimer">30</b>s</span>
                  </p>
                                <div className="progress-indicators" style={{"marginTop":"25px"}}>
                                    <span className="indicator"></span>
                                    <span className="indicator"></span>
                                    <span className="indicator active"></span>
                                    <span className="indicator"></span>
                  </div>
                                <div className="form-navigation" style={{"marginTop":"20px"}}>
                                    <button type="button" className="form-btn btn-secondary">Back</button>
                  </div>
                </div>
              </div>
            
            {/* Slide 4: Success Message */}

                        <div className="form-slide" id="svcSlide4">
                            <div className="success-message">
                                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="40" cy="40" r="40" fill="#27ae60" fillOpacity="0.1" />
                                    <path d="M30 40L37.5 47.5L50 32.5" stroke="#27ae60" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                                <h4>Proposal Request Received!</h4>
                                <p>Thank you,                   <strong id="svcSuccessName"></strong>! Your project brief has been forwarded directly to our technology team.</p>
                                <p style={{"color":"#64748b","fontSize":"14px","marginTop":"8px"}}>Our lead architect will contact you within 24 hours.</p>
                                <div style={{"marginTop":"20px"}}>
                                    <a id="svcWhatsappLink" href="https://wa.me/919816732055" target="_blank" className="svc-wa-btn">
                                        <i className="fa-brands fa-whatsapp" style={{"fontSize":"20px"}}></i> Connect On WhatsApp Now
                            </a>
                  </div>
                                <div style={{"marginTop":"25px"}}>
                                    <button type="button" className="form-btn btn-secondary">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      

      {/* Firebase & EmailJS Logic for Services Modal */}


      


      
    </>
  );
}
