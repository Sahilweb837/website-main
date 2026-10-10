"use client";

import type { PaymentMethod } from "@/lib/payments";

const TABS: { id: PaymentMethod; label: string; icon: string; badge?: string }[] = [
    { id: "upi", label: "UPI & QR", icon: "qr_code_2", badge: "Instant" },
    { id: "card", label: "Cards", icon: "credit_card" },
    { id: "netbanking", label: "Net Banking", icon: "account_balance" },
    { id: "wallet", label: "Wallets", icon: "wallet" },
    { id: "emi", label: "0% EMI", icon: "payments", badge: "No Cost" },
];

export default function PaymentMethodTabs({
    value,
    onChange,
}: {
    value: PaymentMethod;
    onChange: (v: PaymentMethod) => void;
}) {
    return (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {TABS.map((tab) => {
                const active = value === tab.id;
                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onChange(tab.id)}
                        className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl border text-[11px] font-bold transition-all ${active
                                ? "bg-orange-50 border-orange-500 text-orange-700 shadow-sm"
                                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {tab.icon}
                        </span>
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}