"use client";

import { formatINR } from "@/lib/payments";
import type { CheckoutCourse } from "@/lib/payments";

export default function OrderSummary({
    course,
    totals,
}: {
    course: CheckoutCourse;
    totals: {
        subtotalINR: number;
        discountINR: number;
        taxINR: number;
        totalINR: number;
    } | null;
}) {
    if (!totals) return null;
    return (
        <div className="bg-[#faf8ff] rounded-2xl border border-slate-200 p-5">
            <div className="flex items-start gap-3 pb-4 border-b border-slate-200">
                {course.image && (
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-16 h-16 rounded-xl object-cover"
                    />
                )}
                <div className="min-w-0">
                    <h4 className="text-sm font-bold text-[#131b2e] line-clamp-2">
                        {course.title}
                    </h4>
                    {course.instructor && (
                        <p className="text-[11px] text-slate-500 mt-0.5">
                            {course.instructor}
                        </p>
                    )}
                </div>
            </div>

            <div className="pt-4 space-y-2 text-xs">
                <Row label="Subtotal" value={formatINR(totals.subtotalINR)} />
                {totals.discountINR > 0 && (
                    <Row
                        label="Discount"
                        value={`- ${formatINR(totals.discountINR)}`}
                        valueClass="text-emerald-600"
                    />
                )}
                <Row label="GST (18%)" value={formatINR(totals.taxINR)} />
                <div className="pt-3 mt-2 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-[#131b2e]">Total</span>
                    <span className="text-xl font-black text-orange-600">
                        {formatINR(totals.totalINR)}
                    </span>
                </div>
            </div>
        </div>
    );
}

function Row({
    label,
    value,
    valueClass = "",
}: {
    label: string;
    value: string;
    valueClass?: string;
}) {
    return (
        <div className="flex justify-between">
            <span className="text-slate-500">{label}</span>
            <span className={`font-semibold text-[#131b2e] ${valueClass}`}>
                {value}
            </span>
        </div>
    );
}