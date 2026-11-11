import Order from "../models/Order.js";
import stripe from "stripe";
import User from "../models/user.js";
import { resolveOrderItem, hydrateOrderProducts } from "../utils/orderHydration.js";

const getOriginUrl = (req) => {
  if (req.headers.origin) return req.headers.origin;
  if (req.headers.referer) {
    try {
      return new URL(req.headers.referer).origin;
    } catch {
      // fall through
    }
  }
  return "https://sriscart.live";
};

// Placed order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const { items, address, discount = 0 } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Please log in to place an order" });
    }
    if (!address || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid delivery address or empty cart" });
    }

    const resolvedItems = [];
    let baseAmount = 0;

    for (const rawItem of items) {
      const resolved = await resolveOrderItem(rawItem);
      resolvedItems.push(resolved);
      baseAmount += resolved.offerPrice * resolved.quantity;
    }

    const safeDiscount = Math.min(baseAmount, Math.max(0, Number(discount) || 0));
    const discountedAmount = Math.max(0, baseAmount - safeDiscount);
    const finalAmount = Math.round((discountedAmount + discountedAmount * 0.02) * 100) / 100;

    const order = await Order.create({
      userId,
      items: resolvedItems,
      amount: finalAmount,
      address,
      paymentType: "COD",
      isPaid: false,
    });

    // Clear user's persisted DB cart after successful order
    await User.findByIdAndUpdate(userId, { cartItems: {} });

    return res.json({ success: true, message: "Order placed successfully!", orderId: order._id });
  } catch (error) {
    console.log("placeOrderCOD error:", error.message);
    return res.status(400).json({ success: false, message: error.message || "Failed to place COD order" });
  }
};

// Placed order STRIPE : /api/order/stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const { items, address, discount = 0 } = req.body;
    const origin = getOriginUrl(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Please log in to place an order" });
    }
    if (!address || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid delivery address or empty cart" });
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ success: false, message: "Stripe payment gateway is not configured" });
    }

    const resolvedItems = [];
    let baseAmount = 0;

    for (const rawItem of items) {
      const resolved = await resolveOrderItem(rawItem);
      resolvedItems.push(resolved);
      baseAmount += resolved.offerPrice * resolved.quantity;
    }

    const safeDiscount = Math.min(baseAmount, Math.max(0, Number(discount) || 0));
    const discountedAmount = Math.max(0, baseAmount - safeDiscount);
    const finalAmount = Math.round((discountedAmount + discountedAmount * 0.02) * 100) / 100;

    if (finalAmount < 50) {
      return res.status(400).json({
        success: false,
        message: "Online payment via Stripe requires a minimum order total of ₹50. Please add another item or choose Cash on Delivery.",
      });
    }

    const order = await Order.create({
      userId,
      items: resolvedItems,
      amount: finalAmount,
      address,
      paymentType: "Online",
      isPaid: false,
    });

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const discountRatio = baseAmount > 0 ? discountedAmount / baseAmount : 1;

    const line_items = resolvedItems.map((item) => {
      const adjustedPrice = item.offerPrice * discountRatio;
      const unitPaise = Math.max(100, Math.round(adjustedPrice * 1.02 * 100));
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: unitPaise,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId: String(userId),
      },
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    console.log("placeOrderStripe error:", error.message);
    return res.status(400).json({ success: false, message: error.message || "Failed to initialize online payment" });
  }
};

// Verify Stripe Checkout Session cleanly upon redirect : /api/order/verify-stripe
export const verifyStripeOrder = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ success: false, message: "Missing Stripe session ID" });
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ success: false, message: "Stripe is not configured" });
    }

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripeInstance.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ success: false, message: "Payment has not been completed" });
    }

    const { orderId, userId: metaUserId } = session.metadata || {};
    if (!orderId || (metaUserId && String(metaUserId) !== String(userId))) {
      return res.status(403).json({ success: false, message: "Unauthorized payment verification" });
    }

    await Order.findByIdAndUpdate(orderId, { isPaid: true });
    await User.findByIdAndUpdate(userId, { cartItems: {} });

    return res.json({ success: true, message: "Payment verified and order confirmed!" });
  } catch (error) {
    console.log("verifyStripeOrder error:", error.message);
    return res.status(400).json({ success: false, message: error.message || "Failed to verify Stripe session" });
  }
};

// Stripe webhook to verify payment action:"/stripe"
export const stripeWebhooks = async (request, response) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntent.id,
      });

      if (session.data?.[0]?.metadata) {
        const { orderId, userId } = session.data[0].metadata;
        await Order.findByIdAndUpdate(orderId, { isPaid: true });
        await User.findByIdAndUpdate(userId, { cartItems: {} });
      }
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntent.id,
      });

      if (session.data?.[0]?.metadata?.orderId) {
        await Order.findByIdAndDelete(session.data[0].metadata.orderId);
      }
      break;
    }

    default:
      console.error(`Unhandled event type ${event.type}`);
      break;
  }
  response.json({ received: true });
};

// Get Orders by User ID : /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const rawOrders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("address")
      .sort({ createdAt: -1 });

    const orders = await hydrateOrderProducts(rawOrders);
    res.json({ success: true, orders });
  } catch (error) {
    console.log("getUserOrders error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get All Orders(for seller/admin) : /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const rawOrders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("address")
      .sort({ createdAt: -1 });

    const orders = await hydrateOrderProducts(rawOrders);
    res.json({ success: true, orders });
  } catch (error) {
    console.log("getAllOrders error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Update Order Status (for seller/admin) : /api/order/status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }
    return res.json({ success: true, message: "Order status updated successfully", order });
  } catch (error) {
    console.log("updateOrderStatus error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
