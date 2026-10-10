"use client";

import { useState, useEffect } from "react";
import PaymentMethodTabs from "./PaymentMethodTabs";
import OrderSummary from "./OrderSummary";
import {
    isCVV,
    isCardNumber,
    isEmail,
    isExpiry,
    isPhone,
    isPincode,
    isUPI,
    type CheckoutCourse,
    type CheckoutCustomer,
    type PaymentMethod,
} from "@/lib/payments";
import {
    QrCode,
    CreditCard,
    Building2,
    Wallet,
    ShieldCheck,
    CheckCircle2,
    Sparkles,
    Smartphone,
    Clock,
    Lock,
    Zap,
    Check,
} from "lucide-react";

interface Props {
    course: CheckoutCourse;
    customer: CheckoutCustomer;
    setCustomer: (c: CheckoutCustomer) => void;
    method: PaymentMethod;
    setMethod: (m: PaymentMethod) => void;
    couponInput: string;
    setCouponInput: (v: string) => void;
    couponApplied: { valid: boolean; message: string; discountPct: number };
    onApplyCoupon: () => void;
    resetCoupon: () => void;
    totals: {
        subtotalINR: number;
        discountINR: number;
        taxINR: number;
        totalINR: number;
    } | null;
    onSubmit: () => Promise<void>;
    isSubmitting: boolean;
    errorMsg: string;
    submitLabel?: string;
}

const TOP_BANKS = [
    { name: "HDFC Bank", code: "HDFC", icon: "🏛️" },
    { name: "ICICI Bank", code: "ICICI", icon: "🏦" },
    { name: "State Bank of India", code: "SBI", icon: "🇮🇳" },
    { name: "Axis Bank", code: "AXIS", icon: "💳" },
    { name: "Kotak Mahindra", code: "KOTAK", icon: "🔴" },
    { name: "Punjab National Bank", code: "PNB", icon: "🏢" },
];

const OTHER_BANKS = [
    "Bank of Baroda",
    "Canara Bank",
    "IndusInd Bank",
    "Union Bank of India",
    "Federal Bank",
    "IDBI Bank",
    "Yes Bank",
    "Central Bank of India",
    "Indian Bank",
    "Bank of India",
    "RBL Bank",
    "Bandhan Bank",
];

const UPI_SUFFIXES = ["@okhdfcbank", "@oksbi", "@paytm", "@ybl", "@icici", "@axisbank"];

const WALLETS = [
    { id: "paytm", name: "Paytm Wallet", badge: "Instant Cashback" },
    { id: "phonepe", name: "PhonePe Wallet", badge: "1-Click UPI" },
    { id: "amazonpay", name: "Amazon Pay", badge: "Prime Rewards" },
    { id: "mobikwik", name: "MobiKwik ZIP", badge: "Instant Credit" },
];

export default function CheckoutForm({
    course,
    customer,
    setCustomer,
    method,
    setMethod,
    couponInput,
    setCouponInput,
    couponApplied,
    onApplyCoupon,
    resetCoupon,
    totals,
    onSubmit,
    isSubmitting,
    errorMsg,
    submitLabel = "Pay Securely",
}: Props) {
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [upiMode, setUpiMode] = useState<"qr" | "id">("qr");
    const [qrSeconds, setQrSeconds] = useState(285);
    const [selectedBank, setSelectedBank] = useState("HDFC Bank");
    const [selectedWallet, setSelectedWallet] = useState("paytm");
    const [selectedEmiPlan, setSelectedEmiPlan] = useState("3m");

    const [paymentDetails, setPaymentDetails] = useState({
        upiId: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvv: "",
        cardName: "",
        bank: "HDFC Bank",
    });

    // Countdown for dynamic UPI QR code
    useEffect(() => {
        if (method !== "upi" || upiMode !== "qr") return;
        const interval = setInterval(() => {
            setQrSeconds((prev) => (prev > 1 ? prev - 1 : 300));
        }, 1000);
        return () => clearInterval(interval);
    }, [method, upiMode]);

    const formatTimer = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    const set = (k: keyof CheckoutCustomer, v: string) =>
        setCustomer({ ...customer, [k]: v });

    const isValidCustomer =
        customer.fullName.trim() &&
        isEmail(customer.email) &&
        isPhone(customer.phone) &&
        !!customer.country;

    const isValidPayment =
        method === "upi"
            ? (upiMode === "qr" ? true : isUPI(paymentDetails.upiId))
            : method === "card"
                ? isCardNumber(paymentDetails.cardNumber) &&
                  isExpiry(paymentDetails.cardExpiry) &&
                  isCVV(paymentDetails.cardCvv) &&
                  paymentDetails.cardName.trim().length > 2
                : method === "netbanking"
                    ? !!(paymentDetails.bank || selectedBank)
                    : method === "wallet"
                        ? !!selectedWallet
                        : method === "emi"
                            ? !!selectedEmiPlan
                            : true;

    const canSubmit = isValidCustomer && isValidPayment && !isSubmitting;

    // Detect card provider
    const cleanCardNum = paymentDetails.cardNumber.replace(/\s/g, "");
    const cardProvider = cleanCardNum.startsWith("4")
        ? "VISA"
        : cleanCardNum.startsWith("5")
        ? "MASTERCARD"
        : cleanCardNum.startsWith("6")
        ? "RUPAY"
        : cleanCardNum.startsWith("3")
        ? "AMEX"
        : "DEBIT / CREDIT";

    const totalPayable = totals?.totalINR || course.price;

    return (
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5 lg:gap-10">
            {/* ---------- Left: Form Details ---------- */}
            <div className="min-w-0 lg:col-span-3 space-y-8">
                {/* 1. Contact & Student Details */}
                <section className="min-w-0">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-[#131b2e] sm:text-base flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5532]/10 text-xs font-black text-[#ff5532]">
                                1
                            </span>
                            Student & Enrollment Details
                        </h3>
                        <span className="text-[11px] text-slate-500 font-medium">Step 1 of 2</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                        <Field
                            label="Full Student Name *"
                            placeholder="e.g. Rahul Sharma"
                            value={customer.fullName}
                            onChange={(v) => set("fullName", v)}
                            onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
                            error={touched.fullName && !customer.fullName.trim() ? "Name is required" : ""}
                        />
                        <Field
                            label="Email Address (LMS Login) *"
                            type="email"
                            placeholder="rahul@example.com"
                            value={customer.email}
                            onChange={(v) => set("email", v)}
                            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                            error={touched.email && !isEmail(customer.email) ? "Valid email required" : ""}
                        />
                        <Field
                            label="WhatsApp / Mobile Number *"
                            placeholder="98765 43210"
                            value={customer.phone}
                            onChange={(v) => set("phone", v.replace(/\D/g, "").slice(0, 10))}
                            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                            error={touched.phone && !isPhone(customer.phone) ? "10-digit number required" : ""}
                        />
                        <Field
                            label="Country"
                            value={customer.country}
                            onChange={(v) => set("country", v)}
                        />
                        {customer.country === "India" && (
                            <>
                                <Field
                                    label="State"
                                    placeholder="e.g. Himachal Pradesh / Delhi"
                                    value={customer.state || ""}
                                    onChange={(v) => set("state", v)}
                                />
                                <Field
                                    label="City"
                                    placeholder="e.g. Dharamshala / New Delhi"
                                    value={customer.city || ""}
                                    onChange={(v) => set("city", v)}
                                />
                                <Field
                                    label="Postal Pincode"
                                    placeholder="176215"
                                    value={customer.pincode || ""}
                                    onChange={(v) => set("pincode", v.replace(/\D/g, "").slice(0, 6))}
                                    onBlur={() => setTouched((t) => ({ ...t, pincode: true }))}
                                    error={
                                        touched.pincode && customer.pincode && !isPincode(customer.pincode)
                                            ? "6-digit pincode required"
                                            : ""
                                    }
                                />
                            </>
                        )}
                    </div>
                </section>

                {/* 2. Payment Method Selector */}
                <section className="min-w-0 border-t border-slate-100 pt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-[#131b2e] sm:text-base flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5532]/10 text-xs font-black text-[#ff5532]">
                                2
                            </span>
                            Choose Payment Method
                        </h3>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <ShieldCheck className="h-3 w-3" />
                            NPCI & SSL Verified
                        </span>
                    </div>

                    <PaymentMethodTabs value={method} onChange={setMethod} />

                    <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        {/* ========================================================================= */}
                        {/* UPI & Instant QR Code */}
                        {/* ========================================================================= */}
                        {method === "upi" && (
                            <div className="space-y-5">
                                {/* UPI Sub-mode selector */}
                                <div className="flex rounded-xl bg-slate-100 p-1">
                                    <button
                                        type="button"
                                        onClick={() => setUpiMode("qr")}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                                            upiMode === "qr"
                                                ? "bg-white text-[#ff5532] shadow-sm"
                                                : "text-slate-600 hover:text-slate-900"
                                        }`}
                                    >
                                        <QrCode className="h-4 w-4" />
                                        Scan UPI QR Code (Instant)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setUpiMode("id")}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                                            upiMode === "id"
                                                ? "bg-white text-[#ff5532] shadow-sm"
                                                : "text-slate-600 hover:text-slate-900"
                                        }`}
                                    >
                                        <Smartphone className="h-4 w-4" />
                                        Enter UPI ID / VPA
                                    </button>
                                </div>

                                {upiMode === "qr" ? (
                                    <div className="flex flex-col items-center text-center p-3">
                                        {/* Dynamic BharatQR Code Box */}
                                        <div className="relative rounded-2xl border-2 border-dashed border-[#ff5532]/40 bg-orange-50/40 p-5 shadow-inner">
                                            {/* Stylized Simulated QR Code */}
                                            <div className="relative mx-auto flex h-48 w-48 items-center justify-center rounded-xl bg-white p-3 shadow-md border border-slate-200">
                                                {/* Simulated QR Pattern SVG */}
                                                <svg
                                                    className="h-full w-full"
                                                    viewBox="0 0 100 100"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    {/* Corner Marker Top-Left */}
                                                    <rect x="5" y="5" width="26" height="26" rx="4" fill="#0f172a" />
                                                    <rect x="9" y="9" width="18" height="18" rx="2" fill="#ffffff" />
                                                    <rect x="13" y="13" width="10" height="10" rx="2" fill="#0f172a" />

                                                    {/* Corner Marker Top-Right */}
                                                    <rect x="69" y="5" width="26" height="26" rx="4" fill="#0f172a" />
                                                    <rect x="73" y="9" width="18" height="18" rx="2" fill="#ffffff" />
                                                    <rect x="77" y="13" width="10" height="10" rx="2" fill="#0f172a" />

                                                    {/* Corner Marker Bottom-Left */}
                                                    <rect x="5" y="69" width="26" height="26" rx="4" fill="#0f172a" />
                                                    <rect x="9" y="73" width="18" height="18" rx="2" fill="#ffffff" />
                                                    <rect x="13" y="77" width="10" height="10" rx="2" fill="#0f172a" />

                                                    {/* Simulated QR Matrix Dots */}
                                                    <rect x="36" y="8" width="6" height="6" fill="#0f172a" />
                                                    <rect x="46" y="8" width="6" height="6" fill="#0f172a" />
                                                    <rect x="56" y="8" width="6" height="6" fill="#0f172a" />
                                                    <rect x="36" y="18" width="6" height="6" fill="#0f172a" />
                                                    <rect x="48" y="22" width="6" height="6" fill="#0f172a" />
                                                    <rect x="8" y="38" width="6" height="6" fill="#0f172a" />
                                                    <rect x="18" y="44" width="6" height="6" fill="#0f172a" />
                                                    <rect x="28" y="38" width="6" height="6" fill="#0f172a" />
                                                    <rect x="38" y="38" width="8" height="8" fill="#0f172a" />
                                                    <rect x="68" y="38" width="6" height="6" fill="#0f172a" />
                                                    <rect x="78" y="44" width="6" height="6" fill="#0f172a" />
                                                    <rect x="88" y="38" width="6" height="6" fill="#0f172a" />
                                                    <rect x="38" y="54" width="6" height="6" fill="#0f172a" />
                                                    <rect x="48" y="58" width="6" height="6" fill="#0f172a" />
                                                    <rect x="58" y="54" width="6" height="6" fill="#0f172a" />
                                                    <rect x="68" y="64" width="6" height="6" fill="#0f172a" />
                                                    <rect x="78" y="74" width="6" height="6" fill="#0f172a" />
                                                    <rect x="88" y="84" width="6" height="6" fill="#0f172a" />
                                                    <rect x="44" y="74" width="6" height="6" fill="#0f172a" />
                                                    <rect x="54" y="84" width="6" height="6" fill="#0f172a" />
                                                    <rect x="38" y="88" width="6" height="6" fill="#0f172a" />
                                                </svg>

                                                {/* Center Netcoder Badge */}
                                                <div className="absolute flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff5532] text-white shadow-md">
                                                    <span className="font-black text-xs tracking-tighter">NC</span>
                                                </div>
                                            </div>

                                            {/* Amount Badge */}
                                            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-1 text-xs font-black text-white shadow-sm">
                                                <span>Pay ₹{totalPayable.toLocaleString("en-IN")}</span>
                                            </div>
                                        </div>

                                        {/* Countdown Timer */}
                                        <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                                            <Clock className="h-3.5 w-3.5 text-orange-500" />
                                            <span>Dynamic QR valid for:</span>
                                            <span className="font-mono font-bold text-slate-800">{formatTimer(qrSeconds)}</span>
                                        </div>

                                        {/* Supported UPI Apps Pills */}
                                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] font-bold text-slate-600">
                                            <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-blue-700 border border-blue-200">
                                                GPay
                                            </span>
                                            <span className="rounded-lg bg-purple-50 px-2.5 py-1 text-purple-700 border border-purple-200">
                                                PhonePe
                                            </span>
                                            <span className="rounded-lg bg-sky-50 px-2.5 py-1 text-sky-700 border border-sky-200">
                                                Paytm
                                            </span>
                                            <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-emerald-700 border border-emerald-200">
                                                BHIM
                                            </span>
                                            <span className="rounded-lg bg-rose-50 px-2.5 py-1 text-rose-700 border border-rose-200">
                                                CRED
                                            </span>
                                        </div>

                                        <p className="mt-3 text-[11px] text-slate-500 max-w-sm">
                                            Open any UPI app on your phone, point camera to scan and approve payment. Once paid, click the button below to complete setup.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <Field
                                            label="Your UPI ID / VPA *"
                                            placeholder="username@okhdfcbank"
                                            value={paymentDetails.upiId}
                                            onChange={(v) => setPaymentDetails({ ...paymentDetails, upiId: v })}
                                            error={
                                                paymentDetails.upiId && !isUPI(paymentDetails.upiId)
                                                    ? "Enter valid UPI ID format (e.g. name@bank)"
                                                    : ""
                                            }
                                        />

                                        {/* Quick UPI Extension Suffix Buttons */}
                                        <div>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                                                Fast autofill suffix:
                                            </span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {UPI_SUFFIXES.map((suffix) => (
                                                    <button
                                                        key={suffix}
                                                        type="button"
                                                        onClick={() => {
                                                            const base = paymentDetails.upiId.split("@")[0] || "user";
                                                            setPaymentDetails({ ...paymentDetails, upiId: `${base}${suffix}` });
                                                        }}
                                                        className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:border-[#ff5532] hover:bg-orange-50 hover:text-[#ff5532] transition-colors"
                                                    >
                                                        {suffix}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <p className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                                            <span>A payment collect request will be sent to your UPI app.</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ========================================================================= */}
                        {/* Credit / Debit Card with Interactive Virtual Card */}
                        {/* ========================================================================= */}
                        {method === "card" && (
                            <div className="space-y-6">
                                {/* Interactive Virtual Card Preview */}
                                <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800 p-5 text-white shadow-xl border border-slate-700/60">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="h-7 w-10 rounded-md bg-amber-400/90 shadow-inner flex items-center justify-center">
                                                <div className="h-4 w-6 rounded border border-amber-600/60 bg-amber-300" />
                                            </div>
                                            <span className="text-[10px] text-slate-400 font-mono tracking-widest">
                                                EMV CHIP
                                            </span>
                                        </div>
                                        <span className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-black tracking-widest text-orange-400">
                                            {cardProvider}
                                        </span>
                                    </div>

                                    {/* Virtual Card Number */}
                                    <div className="my-5 font-mono text-base font-semibold tracking-[0.25em] text-slate-200 sm:text-lg">
                                        {paymentDetails.cardNumber || "•••• •••• •••• ••••"}
                                    </div>

                                    {/* Card Footer: Name & Expiry */}
                                    <div className="flex items-end justify-between text-xs">
                                        <div>
                                            <div className="text-[9px] text-slate-400 uppercase tracking-wider">
                                                Cardholder
                                            </div>
                                            <div className="font-semibold uppercase tracking-wide truncate max-w-[180px]">
                                                {paymentDetails.cardName || customer.fullName || "YOUR NAME"}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[9px] text-slate-400 uppercase tracking-wider">
                                                Expires
                                            </div>
                                            <div className="font-mono font-semibold">
                                                {paymentDetails.cardExpiry || "MM/YY"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <Field
                                            label="Card Number *"
                                            placeholder="1234 5678 9012 3456"
                                            value={paymentDetails.cardNumber}
                                            onChange={(v) =>
                                                setPaymentDetails({
                                                    ...paymentDetails,
                                                    cardNumber: v
                                                        .replace(/\D/g, "")
                                                        .slice(0, 16)
                                                        .replace(/(\d{4})(?=\d)/g, "$1 "),
                                                })
                                            }
                                            error={
                                                paymentDetails.cardNumber &&
                                                !isCardNumber(paymentDetails.cardNumber)
                                                    ? "Invalid card number"
                                                    : ""
                                            }
                                        />
                                    </div>
                                    <Field
                                        label="Expiry (MM/YY) *"
                                        placeholder="12/28"
                                        value={paymentDetails.cardExpiry}
                                        onChange={(v) => {
                                            const digits = v.replace(/\D/g, "").slice(0, 4);
                                            const formatted =
                                                digits.length > 2
                                                    ? `${digits.slice(0, 2)}/${digits.slice(2)}`
                                                    : digits;
                                            setPaymentDetails({ ...paymentDetails, cardExpiry: formatted });
                                        }}
                                        error={
                                            paymentDetails.cardExpiry &&
                                            !isExpiry(paymentDetails.cardExpiry)
                                                ? "Invalid expiry date"
                                                : ""
                                        }
                                    />
                                    <Field
                                        label="CVV / CVC *"
                                        type="password"
                                        placeholder="123"
                                        value={paymentDetails.cardCvv}
                                        onChange={(v) =>
                                            setPaymentDetails({
                                                ...paymentDetails,
                                                cardCvv: v.replace(/\D/g, "").slice(0, 4),
                                            })
                                        }
                                        error={
                                            paymentDetails.cardCvv && !isCVV(paymentDetails.cardCvv)
                                                ? "3-4 digit CVV"
                                                : ""
                                        }
                                    />
                                    <div className="sm:col-span-2">
                                        <Field
                                            label="Name on Card *"
                                            placeholder="Full name as printed on card"
                                            value={paymentDetails.cardName}
                                            onChange={(v) =>
                                                setPaymentDetails({ ...paymentDetails, cardName: v })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-[11px] text-slate-500 flex items-center gap-2">
                                    <Lock className="h-4 w-4 text-emerald-600 shrink-0" />
                                    <span>256-Bit SSL encrypted. Card details are tokenized according to RBI guidelines.</span>
                                </div>
                            </div>
                        )}

                        {/* ========================================================================= */}
                        {/* Net Banking */}
                        {/* ========================================================================= */}
                        {method === "netbanking" && (
                            <div className="space-y-5">
                                <label className="block text-xs font-bold text-slate-700">
                                    Select Popular Indian Bank
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                    {TOP_BANKS.map((bank) => {
                                        const isSelected = selectedBank === bank.name;
                                        return (
                                            <button
                                                key={bank.code}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedBank(bank.name);
                                                    setPaymentDetails({ ...paymentDetails, bank: bank.name });
                                                }}
                                                className={`flex items-center gap-2.5 rounded-xl border p-3 text-left text-xs font-semibold transition-all ${
                                                    isSelected
                                                        ? "border-[#ff5532] bg-orange-50/70 text-[#ff5532] shadow-sm font-bold ring-2 ring-[#ff5532]/20"
                                                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                                }`}
                                            >
                                                <span className="text-base">{bank.icon}</span>
                                                <span className="truncate">{bank.name}</span>
                                                {isSelected && (
                                                    <Check className="h-3.5 w-3.5 ml-auto text-[#ff5532]" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="pt-2">
                                    <Field
                                        label="Or Select From 40+ Other Banks"
                                        value={paymentDetails.bank}
                                        onChange={(v) => {
                                            setSelectedBank(v);
                                            setPaymentDetails({ ...paymentDetails, bank: v });
                                        }}
                                        selectOptions={OTHER_BANKS}
                                    />
                                </div>
                            </div>
                        )}

                        {/* ========================================================================= */}
                        {/* Digital Wallets */}
                        {/* ========================================================================= */}
                        {method === "wallet" && (
                            <div className="space-y-4">
                                <label className="block text-xs font-bold text-slate-700">
                                    Select Digital Wallet Provider
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {WALLETS.map((w) => {
                                        const isSelected = selectedWallet === w.id;
                                        return (
                                            <button
                                                key={w.id}
                                                type="button"
                                                onClick={() => setSelectedWallet(w.id)}
                                                className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                                                    isSelected
                                                        ? "border-[#ff5532] bg-orange-50/70 shadow-sm ring-2 ring-[#ff5532]/20"
                                                        : "border-slate-200 bg-white hover:border-slate-300"
                                                }`}
                                            >
                                                <div>
                                                    <div className="text-xs font-bold text-slate-800">
                                                        {w.name}
                                                    </div>
                                                    <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                                                        {w.badge}
                                                    </div>
                                                </div>
                                                {isSelected && (
                                                    <CheckCircle2 className="h-4 w-4 text-[#ff5532]" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                                <p className="text-xs text-slate-500 pt-1">
                                    You will authenticate with your linked mobile number upon clicking Pay Securely.
                                </p>
                            </div>
                        )}

                        {/* ========================================================================= */}
                        {/* 0% EMI & PayLater */}
                        {/* ========================================================================= */}
                        {method === "emi" && (
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-800 mb-1">
                                        No Cost EMI Options (0% Interest)
                                    </h4>
                                    <p className="text-[11px] text-slate-500">
                                        Split your course investment over easy monthly instalments with zero extra charges.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {[
                                        {
                                            id: "3m",
                                            months: "3 Months",
                                            monthly: Math.round(totalPayable / 3),
                                            rate: "0% Interest",
                                            badge: "Popular",
                                        },
                                        {
                                            id: "6m",
                                            months: "6 Months",
                                            monthly: Math.round(totalPayable / 6),
                                            rate: "0% Interest",
                                            badge: "Zero Fee",
                                        },
                                        {
                                            id: "9m",
                                            months: "9 Months",
                                            monthly: Math.round((totalPayable * 1.05) / 9),
                                            rate: "Low EMI",
                                            badge: "Budget",
                                        },
                                    ].map((plan) => {
                                        const isSelected = selectedEmiPlan === plan.id;
                                        return (
                                            <button
                                                key={plan.id}
                                                type="button"
                                                onClick={() => setSelectedEmiPlan(plan.id)}
                                                className={`rounded-xl border p-3.5 text-left transition-all relative ${
                                                    isSelected
                                                        ? "border-[#ff5532] bg-orange-50/70 ring-2 ring-[#ff5532]/20"
                                                        : "border-slate-200 bg-white hover:border-slate-300"
                                                }`}
                                            >
                                                <span className="absolute top-2 right-2 text-[9px] font-bold uppercase rounded bg-orange-100 text-[#ff5532] px-1.5 py-0.5">
                                                    {plan.badge}
                                                </span>
                                                <div className="text-xs font-bold text-slate-800">
                                                    {plan.months}
                                                </div>
                                                <div className="mt-1 text-sm font-black text-[#ff5532]">
                                                    ₹{plan.monthly.toLocaleString("en-IN")}/mo
                                                </div>
                                                <div className="text-[10px] text-emerald-600 font-semibold mt-1">
                                                    {plan.rate}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-[11px] text-slate-500">
                                    <span className="font-bold text-slate-700">Supported Banks for EMI: </span>
                                    HDFC, ICICI, SBI, Axis, Kotak, and Bajaj Finserv EMI Card.
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* 3. Discount Coupon */}
                <section className="min-w-0 border-t border-slate-100 pt-6">
                    <h3 className="text-sm font-bold text-[#131b2e] mb-4 sm:text-base flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-[#ff5532]" />
                        Have a Coupon Code? (Optional)
                    </h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                        <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                            placeholder="e.g. NETCODER10 or LEARN20"
                            className="min-h-[44px] min-w-0 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition-colors focus:border-[#ff5532] focus:outline-none focus:ring-2 focus:ring-[#ff5532]/10"
                            disabled={couponApplied.valid}
                        />
                        {couponApplied.valid ? (
                            <button
                                type="button"
                                onClick={resetCoupon}
                                className="min-h-11 w-full rounded-xl bg-slate-100 px-5 text-xs font-bold text-slate-700 hover:bg-slate-200 sm:w-auto"
                            >
                                Remove
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={onApplyCoupon}
                                className="min-h-11 w-full rounded-xl bg-slate-900 px-6 text-xs font-bold text-white hover:bg-slate-800 sm:w-auto transition-colors"
                            >
                                Apply
                            </button>
                        )}
                    </div>
                    {couponApplied.message && (
                        <p
                            className={`text-xs mt-2 font-semibold ${
                                couponApplied.valid ? "text-emerald-600" : "text-red-500"
                            }`}
                        >
                            {couponApplied.message}
                        </p>
                    )}
                </section>
            </div>

            {/* ---------- Right: Order Summary + Submit Button ---------- */}
            <div className="flex min-w-0 flex-col gap-5 lg:col-span-2 lg:sticky lg:top-4 lg:self-start">
                <OrderSummary
                    course={course}
                    totals={totals}
                />

                {errorMsg && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-700">
                        {errorMsg}
                    </div>
                )}

                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={!canSubmit}
                    className={`flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl px-6 text-sm font-black text-white shadow-xl transition-all duration-200 ${
                        canSubmit
                            ? "bg-gradient-to-r from-[#ff5532] to-[#ea580c] shadow-[#ff5532]/25 hover:scale-[1.01] hover:shadow-2xl active:scale-[0.99]"
                            : "cursor-not-allowed bg-slate-300 opacity-60"
                    }`}
                >
                    <Lock className="h-4 w-4" />
                    <span>{isSubmitting ? "Processing Transaction..." : `${submitLabel} (₹${totalPayable.toLocaleString("en-IN")})`}</span>
                </button>

                {/* Trust Badges Strip */}
                <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-semibold text-slate-500">
                    <span className="flex min-h-[38px] items-center justify-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-2.5 py-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                        256-Bit SSL Secured
                    </span>
                    <span className="flex min-h-[38px] items-center justify-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-2.5 py-1.5">
                        <Zap className="h-3.5 w-3.5 text-[#ff5532]" />
                        Instant LMS Access
                    </span>
                </div>
            </div>
        </div>
    );
}

/* ---------- Reusable Field Input ---------- */
function Field({
    label,
    value,
    onChange,
    onBlur,
    error,
    placeholder,
    type = "text",
    selectOptions,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    onBlur?: () => void;
    error?: string;
    placeholder?: string;
    type?: string;
    selectOptions?: string[];
}) {
    return (
        <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                {label}
            </label>
            {selectOptions ? (
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="min-h-[44px] w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm transition-colors focus:border-[#ff5532] focus:outline-none focus:ring-2 focus:ring-[#ff5532]/10"
                >
                    <option value="">Choose bank...</option>
                    {selectOptions.map((o) => (
                        <option key={o} value={o}>
                            {o}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className={`min-h-[44px] w-full rounded-xl border px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff5532]/10 ${
                        error
                            ? "border-red-400 bg-red-50/20 focus:border-red-500"
                            : "border-slate-200 focus:border-[#ff5532]"
                    }`}
                />
            )}
            {error && <p className="text-[10px] font-semibold text-red-500 mt-1">{error}</p>}
        </div>
    );
}