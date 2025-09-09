import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); //  Secret Key

export async function POST(req) {
  const body = await req.json();
  const { userId, cartItems, billingDetails, total } = body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "pkr",
          product_data: {
            name: item.product_title,
          },
          unit_amount: item.product_price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}&user_id=${userId}&fullname=${encodeURIComponent(
        billingDetails.fullname
      )}&email=${encodeURIComponent(
        billingDetails.email
      )}&phone=${encodeURIComponent(
        billingDetails.phone
      )}&address=${encodeURIComponent(
        billingDetails.address
      )}&city=${encodeURIComponent(
        billingDetails.city
      )}&country=${encodeURIComponent(
        billingDetails.country
      )}&zip=${encodeURIComponent(billingDetails.zip)}`,
      cancel_url: `http://localhost:3000/checkout`,
    });

    return Response.json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe Session Error:", err);
    return Response.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
