import Product from "../models/product.js";

// Helper: Smart Local Knowledge Base & Inventory Engine (Works 100% offline or as robust fallback)
async function generateSmartLocalReply(message) {
  const query = (message || "").toLowerCase().trim();

  // 1. Delivery questions
  if (
    query.includes("delivery") ||
    query.includes("shipping") ||
    query.includes("time") ||
    query.includes("fee") ||
    query.includes("cost") ||
    query.includes("charge") ||
    query.includes("how long")
  ) {
    return (
      "🚚 **Delivery Information for SrisCart:**\n\n" +
      "• **Speed:** Fast **30-minute express delivery** (same-day delivery guaranteed).\n" +
      "• **Fees:** **100% Free Shipping** on all orders with no hidden charges!\n" +
      "• **Timing:** Open daily from **7:00 AM to 10:00 PM**.\n" +
      "• **Coverage Area:** All across Vadodara (Ajwa Road, Alkapuri, Manjalpur, Gotri, Sayajigunj, Karelibaug, and up to 50 km).\n\n" +
      "Need anything delivered right now? Just add items to your cart!"
    );
  }

  // 2. Contact & Store Location
  if (
    query.includes("contact") ||
    query.includes("phone") ||
    query.includes("call") ||
    query.includes("number") ||
    query.includes("email") ||
    query.includes("location") ||
    query.includes("address") ||
    query.includes("office") ||
    query.includes("where are you")
  ) {
    return (
      "📍 **SrisCart Store & Contact Details:**\n\n" +
      "• **Address:** Uma Society, Ajwa Road, Vadodara, Gujarat 390019\n" +
      "• **Phone:** [+91 96960 89688](tel:+919696089688) (Mon – Sat: 9:00 AM – 8:00 PM)\n" +
      "• **Email:** supportsriscart@gmail.com\n" +
      "• **Working Hours:** Daily 7:00 AM – 10:00 PM\n\n" +
      "Feel free to call or email our support team anytime!"
    );
  }

  // 3. Coupons & Discounts
  if (
    query.includes("coupon") ||
    query.includes("discount") ||
    query.includes("promo") ||
    query.includes("code") ||
    query.includes("offer") ||
    query.includes("deal") ||
    query.includes("save")
  ) {
    return (
      "🏷️ **Active Coupons You Can Use at Checkout:**\n\n" +
      "• **SRIS20** — Get **20% OFF** on your entire cart!\n" +
      "• **FREESHIP** — Flat **$5 OFF** + Express Delivery.\n" +
      "• **FESTIVE10** — Flat **$10 OFF** on orders above $100.\n\n" +
      "Enter any of these codes in your Cart order summary to apply the discount instantly!"
    );
  }

  // 4. Payment methods
  if (
    query.includes("payment") ||
    query.includes("pay") ||
    query.includes("cod") ||
    query.includes("cash") ||
    query.includes("stripe") ||
    query.includes("card") ||
    query.includes("upi")
  ) {
    return (
      "💳 **Payment Options Available on SrisCart:**\n\n" +
      "• **Cash on Delivery (COD):** Pay conveniently with cash when your groceries arrive at your doorstep.\n" +
      "• **Online Payment:** Secure card checkout powered by Stripe.\n\n" +
      "Both payment methods are 100% safe and verified."
    );
  }

  // 5. Return & Refund
  if (
    query.includes("return") ||
    query.includes("refund") ||
    query.includes("replace") ||
    query.includes("damaged") ||
    query.includes("spoiled")
  ) {
    return (
      "🔄 **Return & Refund Policy:**\n\n" +
      "We guarantee 100% farm-fresh quality! If any item arrives damaged or not up to standard, we provide an **instant replacement or full refund**.\n\n" +
      "Reach out to us at **supportsriscart@gmail.com** or call **+91 96960 89688** with your Order ID."
    );
  }

  // 6. Recipe suggestions
  if (
    query.includes("recipe") ||
    query.includes("cook") ||
    query.includes("dish") ||
    query.includes("meal") ||
    query.includes("dinner") ||
    query.includes("lunch") ||
    query.includes("breakfast")
  ) {
    return (
      "🍳 **Quick & Delicious Recipe Idea: Fresh Kadai Paneer & Basmati Rice!**\n\n" +
      "• **Ingredients available in store:**\n" +
      "  - Fresh Paneer (200g)\n" +
      "  - Farm Tomatoes (1kg) & Red Onions (500g)\n" +
      "  - Premium Basmati Rice (5kg)\n" +
      "• **Quick Steps:** Sauté chopped onions and tomatoes until tender, add your favorite spices, fold in fresh cubed paneer, and serve hot over steaming Basmati rice in under 20 minutes!\n\n" +
      "All ingredients are in stock right now on SrisCart. Would you like to check out the Dairy or Grains section?"
    );
  }

  // 7. Inventory Search from Database
  try {
    const products = await Product.find({ inStock: true }).select(
      "name category price offerPrice bestseller description"
    );

    // Check specific categories
    const categories = ["Vegetables", "Fruits", "Dairy", "Drinks", "Grains", "Bakery", "Instant"];
    const matchedCategory = categories.find((cat) =>
      query.includes(cat.toLowerCase()) ||
      (cat === "Vegetables" && (query.includes("veggie") || query.includes("vegetable"))) ||
      (cat === "Fruits" && (query.includes("fruit") || query.includes("apple") || query.includes("mango") || query.includes("banana"))) ||
      (cat === "Drinks" && (query.includes("drink") || query.includes("beverage") || query.includes("soda") || query.includes("coke") || query.includes("pepsi") || query.includes("sprite"))) ||
      (cat === "Dairy" && (query.includes("milk") || query.includes("cheese") || query.includes("paneer") || query.includes("egg"))) ||
      (cat === "Bakery" && (query.includes("bread") || query.includes("cake") || query.includes("muffin") || query.includes("croissant"))) ||
      (cat === "Instant" && (query.includes("maggi") || query.includes("noodle") || query.includes("soup") || query.includes("ramen"))) ||
      (cat === "Grains" && (query.includes("rice") || query.includes("flour") || query.includes("wheat") || query.includes("atta") || query.includes("quinoa")))
    );

    if (matchedCategory) {
      const categoryProducts = products.filter((p) => p.category.toLowerCase() === matchedCategory.toLowerCase());
      if (categoryProducts.length > 0) {
        const productList = categoryProducts
          .slice(0, 6)
          .map((p) => `• **${p.name}** — $${p.offerPrice} ${p.bestseller ? "⭐ *(Best Seller)*" : ""}`)
          .join("\n");

        return (
          `🛒 **Fresh ${matchedCategory} In Stock Right Now:**\n\n` +
          `${productList}\n\n` +
          `You can find all of these under the **${matchedCategory}** category. Would you like to know more about any item?`
        );
      }
    }

    // Check for specific product name match
    const matchingProducts = products.filter((p) => {
      const pName = p.name.toLowerCase();
      const pDesc = (p.description || []).join(" ").toLowerCase();
      return query.split(" ").some((word) => word.length > 2 && (pName.includes(word) || pDesc.includes(word)));
    });

    if (matchingProducts.length > 0) {
      const topMatches = matchingProducts
        .slice(0, 5)
        .map((p) => `• **${p.name}** (${p.category}) — **$${p.offerPrice}** (Was $${p.price})`)
        .join("\n");

      return (
        `✨ **Here are matching items currently in stock:**\n\n` +
        `${topMatches}\n\n` +
        `Ready to order? Click on any item or browse the categories to add them to your cart!`
      );
    }

    // Best sellers query
    if (query.includes("best") || query.includes("popular") || query.includes("top") || query.includes("recommend")) {
      const bestSellers = products.filter((p) => p.bestseller);
      const list = (bestSellers.length > 0 ? bestSellers : products.slice(0, 5))
        .map((p) => `• **${p.name}** (${p.category}) — **$${p.offerPrice}**`)
        .join("\n");

      return (
        `🌟 **Our Most Popular Best Sellers:**\n\n` +
        `${list}\n\n` +
        `These customer favorites are freshly stocked and ready for 30-min express delivery!`
      );
    }
  } catch (dbErr) {
    console.error("Local inventory query error:", dbErr);
  }

  // Default friendly response
  return (
    "👋 **Hello from SrisCart AI Assistant!**\n\n" +
    "I'm here to help you shop! You can ask me about:\n" +
    "• 🍎 **In-Stock Groceries:** *'What fresh fruits do you have?'* or *'Show dairy products'*\n" +
    "• ⚡ **Delivery & Timings:** *'Tell me about delivery times and fees'*\n" +
    "• 🏷️ **Discounts & Offers:** *'What coupon codes can I use?'*\n" +
    "• 📍 **Store Location & Support:** *'How can I contact support?'*\n" +
    "• 🍲 **Recipe Ideas:** *'Recommend a quick dinner recipe'*\n\n" +
    "How can I help you today?"
  );
}

// AI Chat handler: /api/ai/chat
export const chatWithAssistant = async (req, res) => {
  try {
    const { message, chatHistory } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If no GEMINI_API_KEY is configured, run our smart local intelligence engine
    if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key") {
      const reply = await generateSmartLocalReply(message);
      return res.json({ success: true, reply });
    }

    // If GEMINI_API_KEY IS provided, use Gemini with automatic local fallback
    try {
      // 1. Fetch current active product list to teach Gemini our inventory
      const products = await Product.find({ inStock: true }).select(
        "name price offerPrice category description"
      );
      const inventoryText = products
        .map(
          (p) =>
            `- ${p.name} (Category: ${p.category}, Price: $${p.offerPrice}, Description: ${(p.description || []).join(
              " "
            )})`
        )
        .join("\n");

      // 2. Build Gemini request payload
      const systemPrompt = `You are "SrisCart AI Assistant", a friendly, helpful grocery store helper.
Your job is to assist customers shopping on SrisCart.
Answer user questions about our inventory, suggest products, and provide helpful recipe ideas.

Store Details:
- Location: Uma Society, Ajwa Road, Vadodara, Gujarat 390019
- Phone: +91 96960 89688 (Mon-Sat: 9:00 AM - 8:00 PM)
- Email: supportsriscart@gmail.com
- Delivery Hours: Daily 7:00 AM - 10:00 PM
- Delivery time is under 30 minutes (express) and is 100% free!
- Payments: Cash On Delivery (COD) or Online via Stripe.
- Coupons: SRIS20 (20% off), FREESHIP ($5 off), FESTIVE10 ($10 off over $100).

IMPORTANT: You ONLY recommend or refer to items that are currently in stock in our store database:
${inventoryText}

Be brief, concise, and helpful. Format text clean using bolding or bullet points where helpful.`;

      const contents = [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [
            {
              text: "Understood! I will act as SrisCart AI Assistant and assist customers using SrisCart's verified inventory and store policies.",
            },
          ],
        },
      ];

      // Add chat history
      if (chatHistory && Array.isArray(chatHistory)) {
        chatHistory.slice(-6).forEach((msg) => {
          contents.push({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: msg.text }],
          });
        });
      }

      // Append latest message
      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      // Try modern Gemini model endpoints
      const modelsToTry = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-2.5-flash"];
      let reply = null;

      for (const model of modelsToTry) {
        try {
          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": apiKey,
              },
              body: JSON.stringify({ contents }),
            }
          );

          if (geminiRes.ok) {
            const data = await geminiRes.json();
            reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply) break;
          }
        } catch (fetchErr) {
          console.warn(`Model ${model} attempt failed:`, fetchErr.message);
        }
      }

      if (reply) {
        return res.json({ success: true, reply });
      }

      // If Gemini didn't return a reply, fallback to smart local reply
      const fallbackReply = await generateSmartLocalReply(message);
      return res.json({ success: true, reply: fallbackReply });
    } catch (apiErr) {
      console.warn("Gemini call failed, falling back to smart local engine:", apiErr.message);
      const fallbackReply = await generateSmartLocalReply(message);
      return res.json({ success: true, reply: fallbackReply });
    }
  } catch (error) {
    console.error("AI Assistant error:", error.message);
    const fallbackReply = await generateSmartLocalReply(req.body?.message || "");
    return res.json({ success: true, reply: fallbackReply });
  }
};
