"use client";

import { useState } from "react";
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
    const [paymentDetails, setPaymentDetails] = useState({
        upiId: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvv: "",
        cardName: "",
        bank: "",
    });

    const set = (k: keyof CheckoutCustomer, v: string) =>
        setCustomer({ ...customer, [k]: v });

    const isValidCustomer =
        customer.fullName.trim() &&
        isEmail(customer.email) &&
        isPhone(customer.phone) &&
        !!customer.country;

    const isValidPayment =
        method === "upi"
            ? isUPI(paymentDetails.upiId)
            : method === "card"
                ? isCardNumber(paymentDetails.cardNumber) &&
                isExpiry(paymentDetails.cardExpiry) &&
                isCVV(paymentDetails.cardCvv) &&
                paymentDetails.cardName.trim().length > 2
                : method === "netbanking"
                    ? !!paymentDetails.bank
                    : true;

    const canSubmit = isValidCustomer && isValidPayment && !isSubmitting;

    return (
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5 lg:gap-10">
            {/* ---------- Left: form ---------- */}
            <div className="min-w-0 lg:col-span-3 space-y-8">
                {/* Contact info */}
                <section className="min-w-0">
                    <h3 className="text-sm font-bold text-[#131b2e] mb-4 sm:text-base">
                        1. Contact Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                        <Field
                            label="Full Name"
                            value={customer.fullName}
                            onChange={(v) => set("fullName", v)}
                            onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
                            error={touched.fullName && !customer.fullName.trim() ? "Required" : ""}
                        />
                        <Field
                            label="Email"
                            type="email"
                            value={customer.email}
                            onChange={(v) => set("email", v)}
                            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                            error={touched.email && !isEmail(customer.email) ? "Invalid email" : ""}
                        />
                        <Field
                            label="Phone"
                            value={customer.phone}
                            onChange={(v) => set("phone", v.replace(/\D/g, "").slice(0, 10))}
                            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                            error={touched.phone && !isPhone(customer.phone) ? "Invalid phone" : ""}
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
                                    value={customer.state || ""}
                                    onChange={(v) => set("state", v)}
                                />
                                <Field
                                    label="City"
                                    value={customer.city || ""}
                                    onChange={(v) => set("city", v)}
                                />
                                <Field
                                    label="Pincode"
                                    value={customer.pincode || ""}
                                    onChange={(v) => set("pincode", v.replace(/\D/g, "").slice(0, 6))}
                                    onBlur={() => setTouched((t) => ({ ...t, pincode: true }))}
                                    error={
                                        touched.pincode && customer.pincode && !isPincode(customer.pincode)
                                            ? "Invalid pincode"
                                            : ""
                                    }
                                />
                            </>
                        )}
                    </div>
                </section>

                {/* Payment method */}
                <section className="min-w-0 border-t border-slate-100 pt-[24px]">
                    <h3 className="text-sm font-bold text-[#131b2e] mb-4 sm:text-base">
                        2. Payment Method
                    </h3>
                    <PaymentMethodTabs value={method} onChange={setMethod} />

                    <div className="mt-5 rounded-xl border border-slate-200 bg-[#faf8ff] p-4 sm:p-5">
                        {method === "upi" && (
                            <Field
                                label="UPI ID"
                                placeholder="yourname@okhdfcbank"
                                value={paymentDetails.upiId}
                                onChange={(v) => setPaymentDetails({ ...paymentDetails, upiId: v })}
                                error={
                                    paymentDetails.upiId && !isUPI(paymentDetails.upiId)
                                        ? "Invalid UPI ID"
                                        : ""
                                }
                            />
                        )}

                        {method === "card" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="sm:col-span-2">
                                    <Field
                                        label="Card Number"
                                        placeholder="1234 5678 9012 3456"
                                        value={paymentDetails.cardNumber}
                                        onChange={(v) =>
                                            setPaymentDetails({
                                                ...paymentDetails,
                                                cardNumber: v
                                                    .replace(/\D/g, "")
                                                    .slice(0, 19)
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
                                    label="Expiry (MM/YY)"
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
                                            ? "Invalid expiry"
                                            : ""
                                    }
                                />
                                <Field
                                    label="CVV"
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
                                            ? "Invalid CVV"
                                            : ""
                                    }
                                />
                                <div className="sm:col-span-2">
                                    <Field
                                        label="Name on Card"
                                        value={paymentDetails.cardName}
                                        onChange={(v) =>
                                            setPaymentDetails({ ...paymentDetails, cardName: v })
                                        }
                                    />
                                </div>
                            </div>
                        )}

                        {method === "netbanking" && (
                            <Field
                                label="Select Bank"
                                value={paymentDetails.bank}
                                onChange={(v) => setPaymentDetails({ ...paymentDetails, bank: v })}
                                selectOptions={[
                                    "HDFC Bank",
                                    "ICICI Bank",
                                    "State Bank of India",
                                    "Axis Bank",
                                    "Kotak Mahindra",
                                    "Punjab National Bank",
                                ]}
                            />
                        )}

                        {method === "wallet" && (
                            <p className="text-xs text-slate-600">
                                You'll be redirected to your wallet provider to complete the payment.
                            </p>
                        )}
                    </div>
                </section>

                {/* Coupon */}
                <section className="min-w-0">
                    <h3 className="text-sm font-bold text-[#131b2e] mb-4 sm:text-base">
                        3. Coupon (optional)
                    </h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                        <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                            placeholder="NETCODER10"
                            className="min-h-[44px] min-w-0 w-full rounded-[6px] border border-slate-200 px-[14px] py-[12px] text-sm transition-colors focus:border-[#ff5532] focus:outline-none focus:ring-2 focus:ring-[#ff5532]/10"
                            style={{ minHeight: 44, padding: "12px 14px", borderRadius: 6, boxSizing: "border-box", width: "100%" }}
                            disabled={couponApplied.valid}
                        />
                        {couponApplied.valid ? (
                            <button
                                type="button"
                                onClick={resetCoupon}
                                className="min-h-11 w-full rounded-lg bg-slate-100 px-5 text-xs font-bold text-slate-700 hover:bg-slate-200 sm:w-auto"
                            >
                                Remove
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={onApplyCoupon}
                                className="min-h-11 w-full rounded-lg bg-slate-900 px-5 text-xs font-bold text-white hover:bg-slate-800 sm:w-auto"
                            >
                                Apply
                            </button>
                        )}
                    </div>
                    {couponApplied.message && (
                        <p
                            className={`text-[11px] mt-1.5 font-semibold ${couponApplied.valid ? "text-emerald-600" : "text-red-500"
                                }`}
                        >
                            {couponApplied.message}
                        </p>
                    )}
                </section>
            </div>

            {/* ---------- Right: summary + submit ---------- */}
            <div className="flex min-w-0 flex-col gap-[20px] lg:col-span-2 lg:sticky lg:top-0 lg:self-start">
                <OrderSummary course={course} totals={totals} />

                {errorMsg && (
                    <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
                        {errorMsg}
                    </div>
                )}

                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={!canSubmit}
                    className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 py-4 text-sm font-bold shadow-md transition-all sm:px-6 ${canSubmit
                            ? "bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                >
                    {isSubmitting ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                            Processing...
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-[18px]">lock</span>
                            {submitLabel}
                        </>
                    )}
                </button>

                <div className="grid grid-cols-1 gap-[10px] border-t border-slate-100 pt-[18px] text-[11px] text-slate-600 sm:grid-cols-3">
                    <span className="flex min-h-[40px] items-center justify-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-[10px] py-[8px]">
                        <span className="material-symbols-outlined text-[15px] text-[#ff5532]">lock</span>
                        256-bit SSL
                    </span>
                    <span className="flex min-h-[40px] items-center justify-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-[10px] py-[8px]">
                        <span className="material-symbols-outlined text-[15px] text-[#ff5532]">verified_user</span>
                        PCI-DSS
                    </span>
                    <span className="flex min-h-[40px] items-center justify-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-[10px] py-[8px]">
                        <span className="material-symbols-outlined text-[15px] text-[#ff5532]">refresh</span>
                        14-day refund
                    </span>
                </div>
            </div>
        </div>
    );
}

/* ---------- Field ---------- */
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
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                {label}
            </label>
            {selectOptions ? (
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="min-h-[44px] w-full rounded-[6px] border border-slate-200 bg-white px-[14px] py-[12px] text-sm transition-colors focus:border-[#ff5532] focus:outline-none focus:ring-2 focus:ring-[#ff5532]/10"
                    style={{ minHeight: 44, padding: "12px 14px", borderRadius: 6, boxSizing: "border-box" }}
                >
                    <option value="">Choose...</option>
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
                    className={`min-h-[44px] w-full rounded-[6px] border px-[14px] py-[12px] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff5532]/10 ${error
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-200 focus:border-orange-500"
                        }`}
                        style={{ minHeight: 44, padding: "12px 14px", borderRadius: 6, boxSizing: "border-box" }}
                />
            )}
            {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
        </div>
    );
}