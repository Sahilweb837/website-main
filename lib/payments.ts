// lib/payments.ts

export type PaymentMethod = "upi" | "card" | "netbanking" | "wallet" | "emi";

export interface CheckoutCourse {
    slug: string;
    title: string;
    price: number;
    originalPrice?: number;
    image?: string;
    instructor?: string;
    duration?: string;
    level?: string;
}

export interface CheckoutCustomer {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    state?: string;
    city?: string;
    pincode?: string;
}

export interface OrderPayload {
    orderId: string;
    course: CheckoutCourse;
    customer: CheckoutCustomer;
    method: PaymentMethod;
    couponCode?: string;
    discountINR: number;
    taxINR: number;
    totalINR: number;
    totalUSD: number;
    currency: "INR";
}

/* ---------- Validators ---------- */

export const isEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export const isPhone = (v: string) =>
    /^[6-9]\d{9}$/.test(v.replace(/\D/g, "").slice(-10));

export const isPincode = (v: string) => /^\d{6}$/.test(v.trim());

export const isCardNumber = (v: string) =>
    /^\d{13,19}$/.test(v.replace(/\s+/g, ""));

export const isCVV = (v: string) => /^\d{3,4}$/.test(v.trim());

export const isExpiry = (v: string) => {
    const m = v.match(/^(\d{2})\s*\/\s*(\d{2})$/);
    if (!m) return false;
    const month = parseInt(m[1], 10);
    const year = 2000 + parseInt(m[2], 10);
    if (month < 1 || month > 12) return false;
    return new Date(year, month) > new Date();
};

export const isUPI = (v: string) =>
    /^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(v.trim());

/* ---------- Formatting ---------- */

export const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(n);

export const formatUSD = (n: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(n);

/* ---------- Coupons ---------- */

const COUPONS: Record<string, number> = {
    NETCODER10: 10,
    LEARN20: 20,
    FLAGSHIP25: 25,
};

export function applyCoupon(code: string, subtotalINR: number) {
    const key = code.trim().toUpperCase();
    if (!key) return { valid: false, discountINR: 0, message: "" };
    const pct = COUPONS[key];
    if (!pct)
        return { valid: false, discountINR: 0, message: "Invalid coupon code." };
    const discountINR = Math.round((subtotalINR * pct) / 100);
    return {
        valid: true,
        discountINR,
        message: `${pct}% off applied successfully.`,
    };
}

/* ---------- Totals (18% GST on Indian course purchases) ---------- */

export const USD_TO_INR = 83;

export function computeTotals(priceUSD: number, couponDiscountPct = 0) {
    const subtotalINR = Math.round(priceUSD * USD_TO_INR);
    const discountINR = Math.round((subtotalINR * couponDiscountPct) / 100);
    const afterDiscountINR = subtotalINR - discountINR;
    const taxINR = Math.round(afterDiscountINR * 0.18);
    const totalINR = afterDiscountINR + taxINR;

    return {
        subtotalUSD: priceUSD,
        subtotalINR,
        discountINR,
        taxINR,
        totalINR,
        totalUSD: priceUSD - Math.round((priceUSD * couponDiscountPct) / 100),
    };
}