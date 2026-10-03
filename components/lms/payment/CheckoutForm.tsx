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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* ---------- Left: form ---------- */}
            <div className="lg:col-span-3 space-y-6">
                {/* Contact info */}
                <section>
                    <h3 className="text-sm font-bold text-[#131b2e] mb-3">
                        1. Contact Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <section>
                    <h3 className="text-sm font-bold text-[#131b2e] mb-3">
                        2. Payment Method
                    </h3>
                    <PaymentMethodTabs value={method} onChange={setMethod} />

                    <div className="mt-4 p-4 rounded-xl bg-[#faf8ff] border border-slate-200">
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
                <section>
                    <h3 className="text-sm font-bold text-[#131b2e] mb-3">
                        3. Coupon (optional)
                    </h3>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                            placeholder="NETCODER10"
                            className="flex-1 text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-orange-500"
                            disabled={couponApplied.valid}
                        />
                        {couponApplied.valid ? (
                            <button
                                type="button"
                                onClick={resetCoupon}
                                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 rounded-xl"
                            >
                                Remove
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={onApplyCoupon}
                                className="text-xs bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 rounded-xl"
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
            <div className="lg:col-span-2 space-y-4">
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
                    className={`w-full text-sm font-bold px-6 py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${canSubmit
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

                <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">lock</span>
                        256-bit SSL
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">verified_user</span>
                        PCI-DSS
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">refresh</span>
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
                    className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:border-orange-500"
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
                    className={`w-full text-sm border rounded-xl px-3 py-2.5 focus:outline-none ${error
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-200 focus:border-orange-500"
                        }`}
                />
            )}
            {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
        </div>
    );
}