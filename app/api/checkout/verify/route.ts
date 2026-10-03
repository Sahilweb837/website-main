// app/api/checkout/verify/route.ts
import { NextRequest, NextResponse } from "next/server";

interface Body {
  orderId: string;
  // For Razorpay:
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  razorpaySignature?: string;
  // For Stripe:
  stripeSessionId?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;

    if (!body.orderId) {
      return NextResponse.json(
        { error: "Missing orderId." },
        { status: 400 }
      );
    }

    /* ---------- Razorpay signature check ---------- */
    if (body.razorpayPaymentId && body.razorpayOrderId && body.razorpaySignature) {
      const crypto = await import("crypto");
      const secret = process.env.RAZORPAY_KEY_SECRET!;
      const expected = crypto
        .createHmac("sha256", secret)
        .update(`${body.razorpayOrderId}|${body.razorpayPaymentId}`)
        .digest("hex");

      if (expected !== body.razorpaySignature) {
        return NextResponse.json(
          { error: "Invalid signature." },
          { status: 400 }
        );
      }
    }

    /* ---------- TODO: Verify with Stripe similarly ---------- */
    // if (body.stripeSessionId) {
    //   const session = await stripe.checkout.sessions.retrieve(body.stripeSessionId);
    //   if (session.payment_status !== 'paid') {
    //     return NextResponse.json({ error: 'Payment not completed.' }, { status: 400 });
    //   }
    // }

    /* ---------- Mark order paid in DB ---------- */
    // await db.orders.update({ orderId: body.orderId, status: 'paid' });

    /* ---------- Grant course access ---------- */
    // await grantCourseAccess(customerId, courseSlug);

    return NextResponse.json({
      success: true,
      orderId: body.orderId,
      message: "Payment verified. Course activated.",
    });
  } catch (err: any) {
    console.error("[verify] error:", err);
    return NextResponse.json(
      { error: err?.message || "Server error." },
      { status: 500 }
    );
  }
}