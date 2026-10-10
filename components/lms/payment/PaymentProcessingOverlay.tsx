"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Lock, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import type { PaymentMethod } from "@/lib/payments";

interface PaymentProcessingOverlayProps {
  isProcessing: boolean;
  courseTitle: string;
  amountINR: number;
  method: PaymentMethod;
  orderId?: string;
  onComplete: () => void;
}

export default function PaymentProcessingOverlay({
  isProcessing,
  courseTitle,
  amountINR,
  method,
  orderId = "NC-PAY-98214",
  onComplete,
}: PaymentProcessingOverlayProps) {
  const [step, setStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(15);
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (!isProcessing) {
      setStep(1);
      setProgress(15);
      setCompleted(false);
      return;
    }

    // Step 1: Initializing Handshake (0ms - 800ms)
    setStep(1);
    setProgress(35);

    // Step 2: Authorizing with Bank / Gateway (800ms - 1700ms)
    const t1 = setTimeout(() => {
      setStep(2);
      setProgress(70);
    }, 850);

    // Step 3: Capturing Payment & Enrolling (1700ms - 2400ms)
    const t2 = setTimeout(() => {
      setStep(3);
      setProgress(95);
    }, 1750);

    // Final Success & Trigger Redirection (2500ms)
    const t3 = setTimeout(() => {
      setProgress(100);
      setCompleted(true);
    }, 2450);

    const t4 = setTimeout(() => {
      onComplete();
    }, 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isProcessing, onComplete]);

  if (!isProcessing) return null;

  const methodLabel =
    method === "upi"
      ? "UPI / Instant QR"
      : method === "card"
      ? "Debit / Credit Card"
      : method === "netbanking"
      ? "Net Banking Gateway"
      : method === "emi"
      ? "0% No-Cost EMI"
      : "Digital Wallet";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white p-7 text-center shadow-2xl sm:p-8">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#ff5532]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-emerald-500/15 blur-3xl" />

        {/* Top Header Badge */}
        <div className="mb-6 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold text-[#ff5532]">
            <Lock className="h-3.5 w-3.5" />
            <span>256-Bit SSL Bank Encrypted</span>
          </div>
        </div>

        {/* Center Spinner or Success Checkmark */}
        <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
          {!completed ? (
            <>
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 animate-ping rounded-full bg-orange-100 opacity-60 duration-1000" />
              {/* Spinning gradient ring */}
              <div className="h-20 w-20 animate-spin rounded-full border-4 border-slate-100 border-t-[#ff5532] border-r-orange-400" />
              <div className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md">
                <ShieldCheck className="h-7 w-7 text-[#ff5532]" />
              </div>
            </>
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 animate-in zoom-in-75 duration-300">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
          )}
        </div>

        {/* Status Headings */}
        {!completed ? (
          <>
            <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
              Processing Payment...
            </h3>
            <p className="mt-1.5 text-xs text-slate-500">
              Communicating securely with {methodLabel}
            </p>
          </>
        ) : (
          <>
            <h3 className="text-xl font-black text-emerald-600 sm:text-2xl">
              Payment Approved! 🎉
            </h3>
            <p className="mt-1.5 text-xs font-semibold text-slate-600">
              Activating your course access & redirecting...
            </p>
          </>
        )}

        {/* Transaction Summary Card */}
        <div className="my-6 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-left text-xs">
          <div className="flex items-center justify-between py-1 text-slate-500">
            <span>Course Track:</span>
            <span className="font-semibold text-slate-800 line-clamp-1 max-w-[200px]">
              {courseTitle}
            </span>
          </div>
          <div className="flex items-center justify-between py-1 text-slate-500">
            <span>Total Payable:</span>
            <span className="text-sm font-black text-[#ff5532]">
              ₹{amountINR.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex items-center justify-between py-1 text-slate-500 border-t border-slate-200/60 mt-1 pt-1.5">
            <span>Transaction Ref:</span>
            <span className="font-mono text-[11px] font-semibold text-slate-700">
              {orderId}
            </span>
          </div>
        </div>

        {/* Stepper Progress */}
        <div className="space-y-2.5 text-left text-xs">
          <div
            className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors ${
              step >= 1 ? "bg-orange-50/70 text-slate-800" : "text-slate-400"
            }`}
          >
            {step > 1 || completed ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            ) : (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#ff5532]" />
            )}
            <span className="font-medium">1. Establishing secure banking connection</span>
          </div>

          <div
            className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors ${
              step >= 2 ? "bg-orange-50/70 text-slate-800" : "text-slate-400"
            }`}
          >
            {step > 2 || completed ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            ) : step === 2 ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#ff5532]" />
            ) : (
              <div className="h-4 w-4 shrink-0 rounded-full border border-slate-300" />
            )}
            <span className="font-medium">2. Authorizing transaction with bank gateway</span>
          </div>

          <div
            className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors ${
              step >= 3 ? "bg-orange-50/70 text-slate-800" : "text-slate-400"
            }`}
          >
            {completed ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            ) : step === 3 ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#ff5532]" />
            ) : (
              <div className="h-4 w-4 shrink-0 rounded-full border border-slate-300" />
            )}
            <span className="font-medium">3. Unlocking LMS cohort classroom & materials</span>
          </div>
        </div>

        {/* Smooth Progress Bar */}
        <div className="mt-5 overflow-hidden rounded-full bg-slate-100 h-2">
          <div
            className={`h-full transition-all duration-500 ease-out ${
              completed
                ? "bg-emerald-500"
                : "bg-gradient-to-r from-[#ff5532] to-amber-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Security Warning Notice */}
        <p className="mt-4 text-[10px] text-slate-400 flex items-center justify-center gap-1">
          <Lock className="h-3 w-3" />
          <span>Please do not refresh this page or press back. Protected by Netcoder Shield.</span>
        </p>
      </div>
    </div>
  );
}
