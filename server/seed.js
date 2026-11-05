import mongoose from "mongoose";
import "dotenv/config";

// ── Connect to MongoDB ────────────────────────────────────────────────────────
await mongoose.connect(`${process.env.MONGODB_URI}/sris-cart`);
console.log("✅ Database Connected");

// ── Product Model ─────────────────────────────────────────────────────────────
const productSchema = new mongoose.Schema(
  {
    name:        { type: String,  required: true },
    description: { type: Array,   required: true },
    price:       { type: Number,  required: true },
    offerPrice:  { type: Number,  required: true },
    image:       { type: Array,   required: true },
    category:    { type: String,  required: true },
    inStock:     { type: Boolean, default: true  },
    bestseller:  { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Product =
  mongoose.models.product || mongoose.model("product", productSchema);

// ── Stock images (Unsplash) — no Cloudinary needed for seed ──────────────────
const imageMap = {
  "potato_image_1.png":          "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
  "potato_image_2.png":          "https://images.unsplash.com/photo-1508313880080-c4bef0730395?w=400",
  "potato_image_3.png":          "https://images.unsplash.com/photo-1584277261846-c6a1672ed979?w=400",
  "potato_image_4.png":          "https://images.unsplash.com/photo-1565590452754-26cc3c5a7d3a?w=400",
  "tomato_image.png":            "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400",
  "carrot_image.png":            "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400",
  "spinach_image_1.png":         "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400",
  "onion_image_1.png":           "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400",
  "apple_image.png":             "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400",
  "orange_image.png":            "https://images.unsplash.com/photo-1547514701-42782101795e?w=400",
  "banana_image_1.png":          "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
  "mango_image_1.png":           "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400",
  "grapes_image_1.png":          "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400",
  "amul_milk_image.png":         "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
  "paneer_image.png":            "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
  "eggs_image.png":              "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=400",
  "paneer_image_2.png":          "https://images.unsplash.com/photo-1631452180775-6e5b6895d93e?w=400",
  "cheese_image.png":            "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400",
  "coca_cola_image.png":         "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400",
  "pepsi_image.png":             "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400",
  "sprite_image_1.png":          "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400",
  "fanta_image_1.png":           "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=400",
  "seven_up_image_1.png":        "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=400",
  "basmati_rice_image.png":      "https://images.unsplash.com/photo-1536304993881-ff86e9b96df7?w=400",
  "wheat_flour_image.png":       "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
  "quinoa_image.png":            "https://images.unsplash.com/photo-1612257999756-2c4bd773aa57?w=400",
  "brown_rice_image.png":        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
  "barley_image.png":            "https://images.unsplash.com/photo-1467453678174-768ec283a940?w=400",
  "brown_bread_image.png":       "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
  "butter_croissant_image.png":  "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
  "chocolate_cake_image.png":    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400",
  "whole_wheat_bread_image.png": "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400",
  "vanilla_muffins_image.png":   "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400",
  "maggi_image.png":             "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400",
  "top_ramen_image.png":         "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
  "knorr_soup_image.png":        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
  "yippee_image.png":            "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400",
  "maggi_oats_image.png":        "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400",
};

function getImageUrl(filename) {
  return (
    imageMap[filename] ||
    `https://placehold.co/400x400/FFF3CD/856404?text=${encodeURIComponent(filename.replace(/_/g, " ").replace(".png", ""))}`
  );
}

// ── All 35 products ──────────────────────────────────────────────────────────
const products = [
  // ── Vegetables ──
  { name: "Potato 500g",    category: "Vegetables", price: 25,  offerPrice: 20,  bestseller: false, imageFiles: ["potato_image_1.png","potato_image_2.png","potato_image_3.png","potato_image_4.png"], description: ["Fresh and organic","Rich in carbohydrates","Ideal for curries and fries"] },
  { name: "Tomato 1 kg",    category: "Vegetables", price: 40,  offerPrice: 35,  bestseller: true,  imageFiles: ["tomato_image.png"],   description: ["Juicy and ripe","Rich in Vitamin C","Perfect for salads and sauces","Farm fresh quality"] },
  { name: "Carrot 500g",    category: "Vegetables", price: 30,  offerPrice: 28,  bestseller: false, imageFiles: ["carrot_image.png"],   description: ["Sweet and crunchy","Good for eyesight","Ideal for juices and salads"] },
  { name: "Spinach 500g",   category: "Vegetables", price: 18,  offerPrice: 15,  bestseller: false, imageFiles: ["spinach_image_1.png"],description: ["Rich in iron","High in vitamins","Perfect for soups and salads"] },
  { name: "Onion 500g",     category: "Vegetables", price: 22,  offerPrice: 19,  bestseller: false, imageFiles: ["onion_image_1.png"],  description: ["Fresh and pungent","Perfect for cooking","A kitchen staple"] },

  // ── Fruits ──
  { name: "Apple 1 kg",     category: "Fruits", price: 120, offerPrice: 110, bestseller: true,  imageFiles: ["apple_image.png"],   description: ["Crisp and juicy","Rich in fiber","Boosts immunity","Perfect for snacking and desserts","Organic and farm fresh"] },
  { name: "Orange 1 kg",    category: "Fruits", price: 80,  offerPrice: 75,  bestseller: false, imageFiles: ["orange_image.png"],  description: ["Juicy and sweet","Rich in Vitamin C","Perfect for juices and salads"] },
  { name: "Banana 1 kg",    category: "Fruits", price: 50,  offerPrice: 45,  bestseller: false, imageFiles: ["banana_image_1.png"],description: ["Sweet and ripe","High in potassium","Great for smoothies and snacking"] },
  { name: "Mango 1 kg",     category: "Fruits", price: 150, offerPrice: 140, bestseller: false, imageFiles: ["mango_image_1.png"], description: ["Sweet and flavorful","Perfect for smoothies and desserts","Rich in Vitamin A"] },
  { name: "Grapes 500g",    category: "Fruits", price: 70,  offerPrice: 65,  bestseller: false, imageFiles: ["grapes_image_1.png"],description: ["Fresh and juicy","Rich in antioxidants","Perfect for snacking and fruit salads"] },

  // ── Dairy ──
  { name: "Amul Milk 1L",       category: "Dairy", price: 60,  offerPrice: 55,  bestseller: true,  imageFiles: ["amul_milk_image.png"], description: ["Pure and fresh","Rich in calcium","Ideal for tea, coffee, and desserts","Trusted brand quality"] },
  { name: "Paneer 200g",        category: "Dairy", price: 90,  offerPrice: 85,  bestseller: false, imageFiles: ["paneer_image.png"],    description: ["Soft and fresh","Rich in protein","Ideal for curries and snacks"] },
  { name: "Eggs 12 pcs",        category: "Dairy", price: 90,  offerPrice: 85,  bestseller: false, imageFiles: ["eggs_image.png"],      description: ["Farm fresh","Rich in protein","Ideal for breakfast and baking"] },
  { name: "Paneer 200g Premium",category: "Dairy", price: 90,  offerPrice: 85,  bestseller: false, imageFiles: ["paneer_image_2.png"],  description: ["Soft and fresh","Rich in protein","Ideal for curries and snacks"] },
  { name: "Cheese 200g",        category: "Dairy", price: 140, offerPrice: 130, bestseller: false, imageFiles: ["cheese_image.png"],    description: ["Creamy and delicious","Perfect for pizzas and sandwiches","Rich in calcium"] },

  // ── Drinks ──
  { name: "Coca-Cola 1.5L", category: "Drinks", price: 80, offerPrice: 75, bestseller: false, imageFiles: ["coca_cola_image.png"],   description: ["Refreshing and fizzy","Perfect for parties and gatherings","Best served chilled"] },
  { name: "Pepsi 1.5L",     category: "Drinks", price: 78, offerPrice: 73, bestseller: false, imageFiles: ["pepsi_image.png"],       description: ["Chilled and refreshing","Perfect for celebrations","Best served cold"] },
  { name: "Sprite 1.5L",    category: "Drinks", price: 79, offerPrice: 74, bestseller: false, imageFiles: ["sprite_image_1.png"],    description: ["Refreshing citrus taste","Perfect for hot days","Best served chilled"] },
  { name: "Fanta 1.5L",     category: "Drinks", price: 77, offerPrice: 72, bestseller: false, imageFiles: ["fanta_image_1.png"],     description: ["Sweet and fizzy","Great for parties and gatherings","Best served cold"] },
  { name: "7 Up 1.5L",      category: "Drinks", price: 76, offerPrice: 71, bestseller: false, imageFiles: ["seven_up_image_1.png"],  description: ["Refreshing lemon-lime flavor","Perfect for refreshing","Best served chilled"] },

  // ── Grains ──
  { name: "Basmati Rice 5kg",   category: "Grains", price: 550, offerPrice: 520, bestseller: false, imageFiles: ["basmati_rice_image.png"], description: ["Long grain and aromatic","Perfect for biryani and pulao","Premium quality"] },
  { name: "Wheat Flour 5kg",    category: "Grains", price: 250, offerPrice: 230, bestseller: false, imageFiles: ["wheat_flour_image.png"],  description: ["High-quality whole wheat","Soft and fluffy rotis","Rich in nutrients"] },
  { name: "Organic Quinoa 500g",category: "Grains", price: 450, offerPrice: 420, bestseller: false, imageFiles: ["quinoa_image.png"],       description: ["High in protein and fiber","Gluten-free","Rich in vitamins and minerals"] },
  { name: "Brown Rice 1kg",     category: "Grains", price: 120, offerPrice: 110, bestseller: false, imageFiles: ["brown_rice_image.png"],   description: ["Whole grain and nutritious","Helps in weight management","Good source of magnesium"] },
  { name: "Barley 1kg",         category: "Grains", price: 150, offerPrice: 140, bestseller: false, imageFiles: ["barley_image.png"],       description: ["Rich in fiber","Helps improve digestion","Low in fat and cholesterol"] },

  // ── Bakery ──
  { name: "Brown Bread 400g",      category: "Bakery", price: 40,  offerPrice: 35,  bestseller: false, imageFiles: ["brown_bread_image.png"],       description: ["Soft and healthy","Made from whole wheat","Ideal for breakfast and sandwiches"] },
  { name: "Butter Croissant 100g", category: "Bakery", price: 50,  offerPrice: 45,  bestseller: false, imageFiles: ["butter_croissant_image.png"],  description: ["Flaky and buttery","Freshly baked","Perfect for breakfast or snacks"] },
  { name: "Chocolate Cake 500g",   category: "Bakery", price: 350, offerPrice: 325, bestseller: false, imageFiles: ["chocolate_cake_image.png"],    description: ["Rich and moist","Made with premium cocoa","Ideal for celebrations and parties"] },
  { name: "Whole Bread 400g",      category: "Bakery", price: 45,  offerPrice: 40,  bestseller: false, imageFiles: ["whole_wheat_bread_image.png"], description: ["Healthy and nutritious","Made with whole wheat flour","Ideal for sandwiches and toast"] },
  { name: "Vanilla Muffins 6 pcs", category: "Bakery", price: 100, offerPrice: 90,  bestseller: false, imageFiles: ["vanilla_muffins_image.png"],   description: ["Soft and fluffy","Perfect for a quick snack","Made with real vanilla"] },

  // ── Instant ──
  { name: "Maggi Noodles 280g",  category: "Instant", price: 55, offerPrice: 50, bestseller: false, imageFiles: ["maggi_image.png"],       description: ["Instant and easy to cook","Delicious taste","Popular among kids and adults"] },
  { name: "Top Ramen 270g",      category: "Instant", price: 45, offerPrice: 40, bestseller: false, imageFiles: ["top_ramen_image.png"],   description: ["Quick and easy to prepare","Spicy and flavorful","Loved by college students and families"] },
  { name: "Knorr Cup Soup 70g",  category: "Instant", price: 35, offerPrice: 30, bestseller: false, imageFiles: ["knorr_soup_image.png"],  description: ["Convenient for on-the-go","Healthy and nutritious","Variety of flavors"] },
  { name: "Yippee Noodles 260g", category: "Instant", price: 50, offerPrice: 45, bestseller: false, imageFiles: ["yippee_image.png"],      description: ["Non-fried noodles for healthier choice","Tasty and filling","Convenient for busy schedules"] },
  { name: "Oats Noodles 72g",    category: "Instant", price: 40, offerPrice: 35, bestseller: false, imageFiles: ["maggi_oats_image.png"],  description: ["Healthy alternative with oats","Good for digestion","Perfect for breakfast or snacks"] },
];

// ── Seed function ─────────────────────────────────────────────────────────────
async function seed() {
  const existingCount = await Product.countDocuments();
  if (existingCount > 0) {
    console.log(`⚠️  Found ${existingCount} existing products. Clearing...`);
    await Product.deleteMany({});
    console.log("🗑️  Cleared.\n");
  }

  console.log(`🌱 Seeding ${products.length} products...\n`);

  let ok = 0;
  for (const p of products) {
    try {
      const image = p.imageFiles.map(getImageUrl);
      await Product.create({
        name:        p.name,
        description: p.description,
        price:       p.price,
        offerPrice:  p.offerPrice,
        image,
        category:    p.category,
        inStock:     true,
        bestseller:  p.bestseller ?? false,
      });
      console.log(`  ✅ ${p.category.padEnd(11)} → ${p.name}`);
      ok++;
    } catch (err) {
      console.error(`  ❌ ${p.name}: ${err.message}`);
    }
  }

  console.log(`\n🎉 Done! ${ok}/${products.length} products seeded.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
