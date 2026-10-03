"use client";

import { useEffect } from "react";
import CheckoutForm from "./payment/CheckoutForm";
import { useCheckout } from "@/hooks/useCheckout";
import type { CheckoutCourse } from "@/lib/payments";

export type { CheckoutCourse };

export default function PaymentCheckoutModal({
  course,
  isOpen,
  onClose,
}: {
  course: CheckoutCourse | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const checkout = useCheckout(course);

  /* Lock scroll + Esc close */
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  const handleSubmit = async () => {
    const order = await checkout.submit();
    if (!order) return;

    // 🔒 For production: open your PG SDK here (Razorpay/Stripe).
    // For now, redirect to the success page which verifies server-side.
    onClose();
    window.location.href = `/lms/checkout/success?orderId=${encodeURIComponent(
      order.orderId
    )}&course=${encodeURIComponent(course.slug)}`;
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <div>
            <h2 className="text-lg font-black text-[#131b2e]">
              Secure Checkout
            </h2>
            <p className="text-[11px] text-slate-500">
              Your payment is encrypted end-to-end
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[20px] text-slate-700">
              close
            </span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <CheckoutForm
            course={course}
            customer={checkout.customer}
            setCustomer={checkout.setCustomer}
            method={checkout.method}
            setMethod={checkout.setMethod}
            couponInput={checkout.couponInput}
            setCouponInput={checkout.setCouponInput}
            couponApplied={checkout.couponApplied}
            onApplyCoupon={checkout.onApplyCoupon}
            resetCoupon={checkout.resetCoupon}
            totals={checkout.totals}
            onSubmit={handleSubmit}
            isSubmitting={checkout.isSubmitting}
            errorMsg={checkout.errorMsg}
          />
        </div>
      </div>
    </div>
  );
}