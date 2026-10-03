import emailjs from "@emailjs/browser";

// EmailJS Netcoder Credentials
export const EMAILJS_PUBLIC_KEY = "arbtZPAg8iH0kJRCt";
export const CONTACT_SERVICE_ID = "service_xukw6z4";
export const CONTACT_TEMPLATE_ID = "template_ny7v7la";

export const DEMO_SERVICE_ID = "service_fall03r";
export const DEMO_TEMPLATE_ID = "template_lvuwe08";

/**
 * Send Contact Inquiry Form email
 */
export async function sendContactEmail(params) {
  try {
    const result = await emailjs.send(
      CONTACT_SERVICE_ID,
      CONTACT_TEMPLATE_ID,
      {
        name: params.name || "",
        email: params.email || "",
        number: params.phone || params.number || "",
        course: params.course || "General Inquiry",
        address: params.address || "",
        message: params.message || "",
      },
      EMAILJS_PUBLIC_KEY
    );
    return { success: true, result };
  } catch (error) {
    console.error("EmailJS Contact Error:", error);
    return { success: false, error };
  }
}

/**
 * Send Free Demo Class Booking email
 */
export async function sendDemoBookingEmail(params) {
  try {
    const result = await emailjs.send(
      DEMO_SERVICE_ID,
      DEMO_TEMPLATE_ID,
      {
        name: params.name || "",
        email: params.email || "",
        phone: params.phone || params.number || "",
        address: params.address || "",
        course: params.course || "",
        date: params.date || new Date().toLocaleDateString(),
        slot: params.slot || "Morning",
      },
      EMAILJS_PUBLIC_KEY
    );
    return { success: true, result };
  } catch (error) {
    console.error("EmailJS Demo Booking Error:", error);
    return { success: false, error };
  }
}
