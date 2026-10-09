import "./globals.css";
import type { ReactNode } from "react";
import Script from "next/script";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata = {
  metadataBase: new URL("https://www.netcoder.in"),
  title: "Best IT Training Institute in Dharamshala | Netcoder Technology",
  description:
    "Netcoder Technology is a leading EdTech and IT services company in Dharamshala offering training in Data Science, AI, Cyber Security, Full Stack Development, Digital Marketing, UI/UX, Animation, and AutoCAD with practical learning and placement support.",
  keywords:
    "IT training institute Dharamshala, best coding classes Dharamshala, full stack development, python data science, digital marketing course, ethical hacking, industrial training Dharamshala Himachal",
  authors: [{ name: "Netcoder Technology" }],
  openGraph: {
    title:
      "Netcoder Technology | Best IT Training & Digital Services in Dharamshala",
    description:
      "Professional IT training and digital solutions in Dharamshala. Learn Data Science, AI, Cyber Security, Full Stack Development, Digital Marketing, UI/UX, Animation & more.",
    url: "https://www.netcoder.in/",
    siteName: "Netcoder Technology",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "Netcoder Technology Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/images/net-coder-logo icon.png",
    shortcut: "/images/net-coder-logo icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const schemaOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Netcoder Technology",
    url: "https://www.netcoder.in/",
    logo: "https://www.netcoder.in/images/logo.png",
    description:
      "Netcoder Technology is an EdTech and IT services company in Dharamshala, Himachal Pradesh, offering professional training in Data Science, AI, Cyber Security, Full Stack Development, Digital Marketing, UI/UX Design, Animation, AutoCAD, and other industry-focused programs.",
    foundingDate: "2016",
    founder: {
      "@type": "Person",
      name: "Nitin Kapoor",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "1st Floor, above Gramin Bank, near Govt. ITI, Dari",
      addressLocality: "Dharamshala",
      addressRegion: "Himachal Pradesh",
      postalCode: "176057",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9816732055",
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.facebook.com/netcodertechnology/",
      "https://www.instagram.com/netcodertechnology/",
      "https://www.youtube.com/@netcodertechnology",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ---------- CSS ---------- */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap-grid.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Sora:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/blog.css" />
        <link rel="stylesheet" href="/css/form.css" />
        <link rel="stylesheet" href="/css/spa-skeleton.css" />

        {/* ---------- Structured Data ---------- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaOrganization),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
          <main className="spa-page-container">{children}</main>
        </AuthProvider>

        {/* ---------- External Libraries ---------- */}
        <Script
          src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"
          strategy="afterInteractive"
        />

        {/* ---------- Firebase + EmailJS Initializer ---------- */}
        <Script
          id="firebase-emailjs-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function initLibs() {
                  if (typeof emailjs !== 'undefined' && typeof emailjs.init === 'function') {
                    try { emailjs.init({ publicKey: "arbtZPAg8iH0kJRCt" }); } catch(e){}
                  }
                  if (typeof firebase !== 'undefined' && (!firebase.apps || !firebase.apps.length)) {
                    try {
                      firebase.initializeApp({
                        apiKey: "AIzaSyBGHd5l5nLwqsK3tqZwZrfFkrsvQyxW6rk",
                        authDomain: "demoform-netcoder-website.firebaseapp.com",
                        projectId: "demoform-netcoder-website",
                        storageBucket: "demoform-netcoder-website.firebasestorage.app",
                        messagingSenderId: "755574278305",
                        appId: "1:755574278305:web:d44565fdf35cc62202c8e0",
                        measurementId: "G-BWFCRTJWQG"
                      });
                    } catch(e){}
                  }
                }

                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', initLibs);
                } else {
                  initLibs();
                }

                var tries = 0;
                var timer = setInterval(function() {
                  tries++;
                  initLibs();
                  if (
                    tries > 20 ||
                    (typeof firebase !== 'undefined' &&
                      firebase.apps &&
                      firebase.apps.length)
                  ) {
                    clearInterval(timer);
                  }
                }, 200);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}