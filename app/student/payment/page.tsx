"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/context";
import { LMS_COURSES } from "@/data/lms-courses";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Download,
  AlertCircle,
  QrCode,
  ShieldCheck,
  Building,
  Receipt,
  FileText,
  ArrowRight,
  Sparkles,
  X,
  Printer,
  ChevronRight,
} from "lucide-react";

interface Invoice {
  id: string;
  invoiceNo: string;
  date: string;
  courseTitle: string;
  amount: number;
  method: string;
  txnRef: string;
  status: "Paid" | "Pending";
}

function StudentPaymentContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const courseSlug = searchParams.get("course");

  const studentName = user?.name || "Aarav Patel";
  const studentEmail = user?.email || "aarav@netcoder.in";
  const studentId = user?.id || "NC-STU-2026-084";

  // Selected course if passed via URL
  const selectedCourse = courseSlug
    ? LMS_COURSES.find((c) => c.slug === courseSlug)
    : null;

  // Fee state
  const [totalFee, setTotalFee] = useState(25000);
  const [paidAmount, setPaidAmount] = useState(18000);
  const dueAmount = totalFee - paidAmount;

  // Modal states
  const [isPayModalOpen, setIsPayModalOpen] = useState(!!selectedCourse);
  const [payAmountInput, setPayAmountInput] = useState(
    selectedCourse ? selectedCourse.price * 85 : dueAmount > 0 ? dueAmount : 5000
  );
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  // Receipt modal state
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null);

  // Invoices ledger
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "inv-1",
      invoiceNo: "NC-INV-2026-084-A",
      date: "02 Feb 2026",
      courseTitle: "Full Stack Web & Next.js Cohort (Installment 1)",
      amount: 10000,
      method: "UPI (Google Pay)",
      txnRef: "TXN_UPI_98374100",
      status: "Paid",
    },
    {
      id: "inv-2",
      invoiceNo: "NC-INV-2026-084-B",
      date: "05 Mar 2026",
      courseTitle: "Production Kubernetes & Multi-Cloud Infrastructure",
      amount: 8000,
      method: "Credit Card (Visa ending 4821)",
      txnRef: "TXN_CARD_44928172",
      status: "Paid",
    },
  ]);

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaySuccess(true);
      const newPaid = paidAmount + Number(payAmountInput);
      setPaidAmount(newPaid);

      const newInv: Invoice = {
        id: `inv-${Date.now()}`,
        invoiceNo: `NC-INV-2026-${Math.floor(100 + Math.random() * 900)}`,
        date: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        courseTitle: selectedCourse
          ? selectedCourse.title
          : "Tuition Fee Installment Payment",
        amount: Number(payAmountInput),
        method:
          paymentMethod === "upi"
            ? "UPI / Instant QR"
            : paymentMethod === "card"
            ? "Debit / Credit Card"
            : "Net Banking",
        txnRef: `TXN_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        status: "Paid",
      };

      setInvoices([newInv, ...invoices]);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-amber-300 border border-white/10">
              <Receipt className="w-3.5 h-3.5" />
              <span>Netcoder Accounts & Fee Ledger</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Student Fees & Payment Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Student ID: <span className="font-mono text-amber-300">{studentId}</span> • Registered under {studentName}. Pay installments online and download official GST tax invoices.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setPaySuccess(false);
                setIsPayModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ff5532] hover:bg-[#e04524] text-white font-bold text-sm shadow-lg shadow-[#ff5532]/30 transition-all hover:scale-102"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay Fees Online</span>
            </button>
          </div>
        </div>
      </div>

      {/* Selected Course Prompt Notice */}
      {selectedCourse && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-900">
                Course Enrollment Checkout: {selectedCourse.title}
              </p>
              <p className="text-[11px] text-amber-700">
                Course Tuition Fee: ${selectedCourse.price} (Approx ₹{selectedCourse.price * 85})
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setPayAmountInput(selectedCourse.price * 85);
              setIsPayModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs"
          >
            Complete Checkout
          </button>
        </div>
      )}

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Fee */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <p className="text-xs font-medium text-slate-500">Total Program Fee</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">₹{totalFee.toLocaleString("en-IN")}</p>
          <p className="text-[11px] text-slate-400 mt-1">Cohort Tuition & Certification</p>
        </div>

        {/* Paid to Date */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <p className="text-xs font-medium text-slate-500">Total Amount Paid</p>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">₹{paidAmount.toLocaleString("en-IN")}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            {Math.round((paidAmount / totalFee) * 100)}% Cleared
          </p>
        </div>

        {/* Balance Due */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <p className="text-xs font-medium text-slate-500">Balance Pending</p>
          <p className="text-2xl font-extrabold text-amber-600 mt-1">
            {dueAmount > 0 ? `₹${dueAmount.toLocaleString("en-IN")}` : "₹0 (Fully Paid)"}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            {dueAmount > 0 ? "Installment 2 of 2" : "No pending balance"}
          </p>
        </div>

        {/* Next Due Date */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <p className="text-xs font-medium text-slate-500">Next Installment Due</p>
          <p className="text-xl font-extrabold text-slate-900 mt-1">
            {dueAmount > 0 ? "15 Oct 2026" : "All Cleared"}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Zero late penalty applied</p>
        </div>
      </div>

      {/* Payment Gateway Modal */}
      {isPayModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsPayModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {paySuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Payment Successful!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your fee payment of <span className="font-bold text-slate-900">₹{payAmountInput.toLocaleString("en-IN")}</span> has been recorded. An official GST tax invoice has been generated.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setIsPayModalOpen(false);
                      setPaySuccess(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                  >
                    View Invoices Ledger
                  </button>
                  <Link
                    href="/student/dashboard"
                    className="px-5 py-2.5 rounded-xl bg-[#ff5532] text-white font-bold text-xs text-center"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ff5532]/10 text-[#ff5532] flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Netcoder Secure Fee Checkout
                    </h3>
                    <p className="text-xs text-slate-500">
                      Authorized Merchant: Netcoder Technology
                    </p>
                  </div>
                </div>

                <form onSubmit={handlePaySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Payment Amount (INR ₹)
                    </label>
                    <input
                      type="number"
                      required
                      min="100"
                      value={payAmountInput}
                      onChange={(e) => setPayAmountInput(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ff5532]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Choose Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("upi")}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          paymentMethod === "upi"
                            ? "border-[#ff5532] bg-[#ff5532]/5 text-[#ff5532] font-bold"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                        }`}
                      >
                        <QrCode className="w-5 h-5 mx-auto mb-1 text-[#ff5532]" />
                        <span className="text-[11px] block">UPI / QR</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          paymentMethod === "card"
                            ? "border-[#ff5532] bg-[#ff5532]/5 text-[#ff5532] font-bold"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                        }`}
                      >
                        <CreditCard className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                        <span className="text-[11px] block">Debit / Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("netbanking")}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          paymentMethod === "netbanking"
                            ? "border-[#ff5532] bg-[#ff5532]/5 text-[#ff5532] font-bold"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                        }`}
                      >
                        <Building className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                        <span className="text-[11px] block">NetBanking</span>
                      </button>
                    </div>
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-2">
                      <p className="text-xs font-bold text-slate-800">
                        Scan with Google Pay, PhonePe, or Paytm
                      </p>
                      <div className="w-28 h-28 bg-white border border-slate-300 rounded-lg mx-auto flex items-center justify-center p-2">
                        <QrCode className="w-full h-full text-slate-900" />
                      </div>
                      <p className="text-[11px] font-mono text-slate-500">
                        UPI ID: netcoder@upi
                      </p>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="4111 2222 3333 4444"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3 px-4 rounded-xl bg-[#ff5532] hover:bg-[#e04524] text-white font-bold text-sm shadow-md shadow-[#ff5532]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <span>Contacting Payment Gateway…</span>
                      ) : (
                        <span>Confirm & Pay ₹{payAmountInput.toLocaleString("en-IN")}</span>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>256-Bit SSL Encrypted Payment Gate</span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Invoice Receipt Modal */}
      {viewingInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setViewingInvoice(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable Receipt Body */}
            <div className="space-y-4" id="printable-receipt">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">NETCODER</h3>
                  <p className="text-[11px] text-slate-500">
                    IT Training Institute & Software Labs
                  </p>
                  <p className="text-[10px] text-slate-400">
                    GSTIN: 02AAACN9382P1Z4 • Dharamshala, HP
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    PAID IN FULL
                  </span>
                  <p className="text-xs font-mono font-bold text-slate-800 mt-1">
                    {viewingInvoice.invoiceNo}
                  </p>
                  <p className="text-[11px] text-slate-500">{viewingInvoice.date}</p>
                </div>
              </div>

              <div className="text-xs space-y-1 bg-slate-50 p-3 rounded-xl">
                <p>
                  <span className="text-slate-500">Billed To:</span>{" "}
                  <strong className="text-slate-900">{studentName}</strong> (ID: {studentId})
                </p>
                <p>
                  <span className="text-slate-500">Email:</span> {studentEmail}
                </p>
                <p>
                  <span className="text-slate-500">Transaction Ref:</span>{" "}
                  <code className="font-mono text-slate-700">{viewingInvoice.txnRef}</code>
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <div className="bg-slate-100 px-3 py-2 font-bold text-slate-700 flex justify-between">
                  <span>Particulars</span>
                  <span>Amount</span>
                </div>
                <div className="p-3 flex justify-between border-b border-slate-100 text-slate-800">
                  <span>{viewingInvoice.courseTitle}</span>
                  <span className="font-bold">
                    ₹{viewingInvoice.amount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="p-3 bg-slate-50/50 flex justify-between font-extrabold text-slate-900 text-sm">
                  <span>Total Paid</span>
                  <span className="text-emerald-600">
                    ₹{viewingInvoice.amount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewingInvoice(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoices Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Payment History & Tax Invoices</h3>
            <p className="text-xs text-slate-500">Official fee receipts recorded for your learner account</p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit">
            {invoices.length} Transactions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Invoice No</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {inv.invoiceNo}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{inv.date}</td>
                  <td className="py-3 px-4 font-medium text-slate-800 max-w-xs truncate">
                    {inv.courseTitle}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{inv.method}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    ₹{inv.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{inv.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setViewingInvoice(inv)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors"
                    >
                      <Download className="w-3 h-3 text-slate-500" />
                      <span>Invoice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function StudentPaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[50vh] flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="w-3 h-3 rounded-full bg-[#ff5532] animate-ping" />
            <span>Loading Student Payment Ledger...</span>
          </div>
        </div>
      }
    >
      <StudentPaymentContent />
    </Suspense>
  );
}
