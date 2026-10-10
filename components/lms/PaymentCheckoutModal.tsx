"use client";

import { useEffect, useState } from "react";
import CheckoutForm from "./payment/CheckoutForm";
import PaymentProcessingOverlay from "./payment/PaymentProcessingOverlay";
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any>(null);

  /* Lock scroll + Esc close */
  useEffect(() => {
    if (!isOpen) {
      setIsProcessing(false);
      setCreatedOrder(null);
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !isProcessing && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, isProcessing, onClose]);

  if (!isOpen || !course) return null;

  const handleSubmit = async () => {
    const order = await checkout.submit();
    if (!order) return;

    // Show realistic payment processing gateway animation
    setCreatedOrder(order);
    setIsProcessing(true);
  };

  const handleProcessingComplete = () => {
    if (!createdOrder || !course) return;
    onClose();
    window.location.href = `/lms/checkout/success?orderId=${encodeURIComponent(
      createdOrder.orderId
    )}&course=${encodeURIComponent(course.slug)}`;
  };


  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-slate-950/60 p-2 backdrop-blur-sm sm:items-center sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[calc(100dvh-1rem)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:max-h-[min(92dvh,900px)] sm:rounded-3xl"
      >
        {/* Header */}
        <div className="z-10 flex shrink-0 items-center justify-between gap-4 border-b border-slate-100 bg-white px-5 py-4 sm:px-7">
          <div>
            <h2 id="checkout-modal-title" className="text-base font-black text-[#131b2e] sm:text-lg">
              Secure Checkout
            </h2>
            <p className="text-[10px] text-slate-500 sm:text-[11px]">
              Your payment is encrypted end-to-end
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#ff5532] bg-[#ff5532] text-white shadow-sm transition-all duration-200 ease-out hover:scale-105 hover:rotate-3 hover:bg-white hover:text-[#ff5532] hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5532] focus-visible:ring-offset-2"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:rotate-90">
              close
            </span>
          </button>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7 lg:p-8">
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

        {/* Realistic Payment Processing Overlay */}
        {isProcessing && (
          <PaymentProcessingOverlay
            isProcessing={isProcessing}
            courseTitle={course.title}
            amountINR={checkout.totals?.totalINR || course.price}
            method={checkout.method}
            orderId={createdOrder?.orderId}
            onComplete={handleProcessingComplete}
          />
        )}
      </div>
    </div>
  );
}