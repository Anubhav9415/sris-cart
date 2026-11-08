import { Product } from "../types";

export const sampleProducts: Product[] = [
  // ──────────────────────────────────────────────
  // 1. GROCERIES (Dairy, Staples, Snacks, Beverages)
  // ──────────────────────────────────────────────
  {
    _id: "groc-01",
    name: "Amul Pasteurised Butter 500g",
    brand: "Amul",
    category: "Groceries",
    unit: "500 g",
    price: 285,
    offerPrice: 260,
    discount: 9,
    rating: 4.8,
    reviewsCount: 3820,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Utterly Butterly Delicious fresh cream butter",
      "Rich source of Vitamin A, perfect for breakfast toast and cooking",
      "Made from pure cow and buffalo milk"
    ],
    specifications: {
      "Quantity": "500 g",
      "Type": "Salted Butter",
      "Packaging": "Carton Pack",
      "Shelf Life": "12 Months"
    }
  },
  {
    _id: "groc-02",
    name: "Amul Malai Fresh Paneer 200g",
    brand: "Amul",
    category: "Groceries",
    unit: "200 g",
    price: 95,
    offerPrice: 85,
    discount: 11,
    rating: 4.7,
    reviewsCount: 2410,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1631452180775-6e5b6895d93e?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Soft and smooth rich malai paneer",
      "High protein content, ideal for palak paneer and tikka",
      "Pasteurized and hygienically packed"
    ],
    specifications: {
      "Quantity": "200 g",
      "Protein": "18g per 100g",
      "Packaging": "Vacuum Sealed Pouch"
    }
  },
  {
    _id: "groc-03",
    name: "Amul Masti Dahi Cup 400g",
    brand: "Amul",
    category: "Groceries",
    unit: "400 g",
    price: 45,
    offerPrice: 40,
    discount: 11,
    rating: 4.6,
    reviewsCount: 1890,
    bestseller: false,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Thick, creamy and deliciously mild curd",
      "Good for gut health with active probiotic cultures",
      "No added preservatives or artificial thickeners"
    ],
    specifications: {
      "Quantity": "400 g",
      "Container": "Plastic Tub with Foil Lid",
      "Fat Content": "3.5%"
    }
  },
  {
    _id: "groc-04",
    name: "Amul Spiced Buttermilk (Chaas) 500ml",
    brand: "Amul",
    category: "Groceries",
    unit: "500 ml",
    price: 20,
    offerPrice: 18,
    discount: 10,
    rating: 4.8,
    reviewsCount: 3120,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Traditional Indian spiced buttermilk made with roasted cumin and mint",
      "Instant cooling and digestive beverage",
      "Ready to drink cold refreshment"
    ],
    specifications: {
      "Volume": "500 ml",
      "Flavor": "Masala Jeera",
      "Packaging": "Pouch"
    }
  },
  {
    _id: "groc-05",
    name: "Fortune Sunlite Refined Sunflower Oil 1L",
    brand: "Fortune",
    category: "Groceries",
    unit: "1 L",
    price: 175,
    offerPrice: 142,
    discount: 19,
    rating: 4.6,
    reviewsCount: 4210,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Enriched with Vitamins A & D",
      "Light and healthy edible cooking oil with high smoke point",
      "Helps maintain healthy heart and active lifestyle"
    ],
    specifications: {
      "Quantity": "1 Litre",
      "Type": "Refined Sunflower Oil",
      "Shelf Life": "9 Months"
    }
  },
  {
    _id: "groc-06",
    name: "Aashirvaad Shudh Chakki Whole Wheat Atta 5kg",
    brand: "Aashirvaad",
    category: "Groceries",
    unit: "5 kg",
    price: 260,
    offerPrice: 228,
    discount: 12,
    rating: 4.8,
    reviewsCount: 8900,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "100% pure whole wheat grain flour with 0% maida",
      "Soft and fluffy rotis that stay fresh longer",
      "Traditional 4-step chakki grinding process lock-in dietary fiber"
    ],
    specifications: {
      "Weight": "5 kg",
      "Ingredients": "100% Whole Wheat",
      "Packaging": "Sealed Bag"
    }
  },
  {
    _id: "groc-07",
    name: "Tata Salt Vacuum Evaporated Iodised Salt 1kg",
    brand: "Tata",
    category: "Groceries",
    unit: "1 kg",
    price: 28,
    offerPrice: 25,
    discount: 11,
    rating: 4.9,
    reviewsCount: 15400,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Desh Ka Namak — India's most trusted vacuum-evaporated iodised salt",
      "Ensures mental development and iodine balance",
      "Free-flowing, clean, and crystal pure"
    ],
    specifications: {
      "Weight": "1 kg",
      "Type": "Iodised Table Salt",
      "Purity": "Vacuum Evaporated"
    }
  },
  {
    _id: "groc-08",
    name: "Daawat Rozana Super Basmati Rice 5kg",
    brand: "Daawat",
    category: "Groceries",
    unit: "5 kg",
    price: 495,
    offerPrice: 389,
    discount: 21,
    rating: 4.5,
    reviewsCount: 3100,
    bestseller: false,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1536304993881-ff86e9b96df7?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Fluffy, long-grain aromatic basmati rice for daily meals",
      "Aged to perfection for non-sticky cooking",
      "Ideal for pulao, khichdi, and everyday rice bowls"
    ],
    specifications: {
      "Weight": "5 kg",
      "Grain Type": "Medium Long Grain",
      "Aged": "Yes"
    }
  },
  {
    _id: "groc-09",
    name: "Maggi 2-Minute Masala Instant Noodles 420g (Pack of 6)",
    brand: "Maggi",
    category: "Groceries",
    unit: "420 g",
    price: 96,
    offerPrice: 84,
    discount: 13,
    rating: 4.9,
    reviewsCount: 18200,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Classic masala tastemaker made with 10 roasted aromatic spices",
      "Delicious 2-minute snack loved by children and adults alike",
      "Fortified with Iron and goodness of wheat"
    ],
    specifications: {
      "Weight": "420 g (6 x 70g)",
      "Flavor": "Authentic Masala",
      "Vegetarian": "100% Veg"
    }
  },
  {
    _id: "groc-10",
    name: "Coca-Cola Original Refreshing Drink 750ml",
    brand: "Coca-Cola",
    category: "Groceries",
    unit: "750 ml",
    price: 45,
    offerPrice: 38,
    discount: 16,
    rating: 4.7,
    reviewsCount: 5400,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Iconic crisp and bubbly cola refreshment",
      "Best served chilled with ice and meals",
      "100% refreshing taste"
    ],
    specifications: {
      "Volume": "750 ml",
      "Flavor": "Classic Cola",
      "Packaging": "PET Bottle"
    }
  },
  {
    _id: "groc-11",
    name: "Tata Tea Gold Royal Assam Leaf Tea 500g",
    brand: "Tata",
    category: "Groceries",
    unit: "500 g",
    price: 360,
    offerPrice: 299,
    discount: 17,
    rating: 4.8,
    reviewsCount: 4100,
    bestseller: false,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Unique blend of CTC granules with gently rolled long aroma leaves",
      "Rich taste, deep golden color and irresistible aroma",
      "Sourced from the finest gardens of Assam"
    ],
    specifications: {
      "Weight": "500 g",
      "Type": "Assam Black Tea",
      "Packaging": "Foil Pouch"
    }
  },
  {
    _id: "groc-12",
    name: "Cadbury Dairy Milk Silk Chocolate Bar 150g",
    brand: "Cadbury",
    category: "Groceries",
    unit: "150 g",
    price: 195,
    offerPrice: 170,
    discount: 13,
    rating: 4.9,
    reviewsCount: 7800,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Silky smooth and melt-in-the-mouth creamy milk chocolate",
      "Made with 100% sustainably sourced cocoa",
      "Perfect treat for special moments and celebrations"
    ],
    specifications: {
      "Weight": "150 g",
      "Type": "Milk Chocolate",
      "Vegetarian": "Yes"
    }
  },
  {
    _id: "groc-13",
    name: "Fresh Shimla Red Apples 1kg",
    brand: "Fresh Produce",
    category: "Groceries",
    unit: "1 kg",
    price: 180,
    offerPrice: 139,
    discount: 23,
    rating: 4.6,
    reviewsCount: 1650,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Handpicked crispy, juicy red apples directly from Himachal orchards",
      "Rich in natural antioxidants and dietary fiber",
      "Hygienically sorted and cleaned"
    ],
    specifications: {
      "Weight": "1 kg (approx. 4-5 pcs)",
      "Origin": "Shimla, India",
      "Storage": "Cool and dry place"
    }
  },
  {
    _id: "groc-14",
    name: "Farm Fresh Desi Tomatoes 1kg",
    brand: "Fresh Produce",
    category: "Groceries",
    unit: "1 kg",
    price: 40,
    offerPrice: 28,
    discount: 30,
    rating: 4.5,
    reviewsCount: 2200,
    bestseller: false,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Freshly harvested ripe red tomatoes with tangy pulp",
      "Ideal for everyday Indian gravies, rasam, and fresh salads",
      "Naturally sun-ripened without chemical sprays"
    ],
    specifications: {
      "Weight": "1 kg",
      "Variety": "Desi Hybrid",
      "Freshness": "Farm to Table"
    }
  },

  // ──────────────────────────────────────────────
  // 2. MOBILES & SMARTPHONES
  // ──────────────────────────────────────────────
  {
    _id: "mob-01",
    name: "Apple iPhone 16 Pro (128GB) - Desert Titanium",
    brand: "Apple",
    category: "Mobiles",
    unit: "128 GB",
    price: 119900,
    offerPrice: 109900,
    discount: 8,
    rating: 4.9,
    reviewsCount: 6420,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Grade 5 Titanium design with refined microblasted texture",
      "A18 Pro chip with industry-leading efficiency and Apple Intelligence",
      "Pro camera system with 48MP Fusion and 5x Telephoto zoom",
      "All-day battery life with up to 27 hours video playback"
    ],
    specifications: {
      "Display": "6.3-inch Super Retina XDR OLED 120Hz",
      "Processor": "Apple A18 Pro Bionic",
      "Main Camera": "48MP + 48MP Ultra Wide + 12MP 5x Telephoto",
      "Battery": "3582 mAh with MagSafe Fast Wireless Charging",
      "Warranty": "1 Year Official Apple India Warranty"
    }
  },
  {
    _id: "mob-02",
    name: "Samsung Galaxy S25 Ultra 5G (256GB, Titanium Black)",
    brand: "Samsung",
    category: "Mobiles",
    unit: "256 GB",
    price: 129999,
    offerPrice: 119999,
    discount: 8,
    rating: 4.8,
    reviewsCount: 4890,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Galaxy AI 2.0 with Live Translate, Generative Photo Edit and Note Assist",
      "Built-in S Pen stylus with low-latency writing and camera gesture control",
      "200MP Quad Telephoto Camera with 100x Space Zoom",
      "Snapdragon 8 Elite for Galaxy with vapor chamber liquid cooling"
    ],
    specifications: {
      "Display": "6.8-inch Dynamic AMOLED 2X 120Hz QHD+",
      "RAM & Storage": "12GB RAM | 256GB Storage",
      "Camera": "200MP + 50MP + 50MP + 12MP",
      "Battery": "5000 mAh with 45W Super Fast Charging",
      "OS": "Android 15 with One UI 7"
    }
  },
  {
    _id: "mob-03",
    name: "OnePlus 13 5G (16GB RAM, 512GB, Emerald Green)",
    brand: "OnePlus",
    category: "Mobiles",
    unit: "512 GB",
    price: 69999,
    offerPrice: 62999,
    discount: 10,
    rating: 4.7,
    reviewsCount: 3950,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Snapdragon 8 Elite flagship chipset with hyper-smooth multitasking",
      "Hasselblad Gen 5 Triple 50MP Camera setup with master portraits",
      "6000 mAh Glacier battery with 100W SUPERVOOC fast charging",
      "2K 120Hz Oriental Eye-Care Display with 4500 nits peak brightness"
    ],
    specifications: {
      "Display": "6.82-inch 2K ProXDR Display 120Hz",
      "RAM": "16GB LPDDR5X",
      "Storage": "512GB UFS 4.0",
      "Charging": "100W Wired + 50W Wireless AIRVOOC"
    }
  },
  {
    _id: "mob-04",
    name: "Redmi Note 14 Pro+ 5G (8GB RAM, 256GB, Mirror Silver)",
    brand: "Xiaomi",
    category: "Mobiles",
    unit: "256 GB",
    price: 29999,
    offerPrice: 24999,
    discount: 17,
    rating: 4.6,
    reviewsCount: 8200,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "200MP OIS Camera with 4x Lossless In-Sensor Zoom",
      "1.5K 120Hz Curved AMOLED with Dolby Vision & Gorilla Glass Victus 2",
      "6200 mAh Silicon-Carbon battery with 90W HyperCharge",
      "IP68 dust and water resistance certified"
    ],
    specifications: {
      "Processor": "Snapdragon 7s Gen 3",
      "Charging": "90W HyperCharge In-Box",
      "Protection": "IP68 Water & Dust Resistant"
    }
  },
  {
    _id: "mob-05",
    name: "Realme 13 Pro+ 5G (12GB RAM, 256GB, Monet Gold)",
    brand: "Realme",
    category: "Mobiles",
    unit: "256 GB",
    price: 33999,
    offerPrice: 28499,
    discount: 16,
    rating: 4.5,
    reviewsCount: 2900,
    bestseller: false,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Sony LYT-701 flagship OIS main sensor + 50MP Periscope Telephoto",
      "HYPERIMAGE+ AI camera engine with Ultra-Clear portraits",
      "120Hz Curved Vision Display with 2160Hz PWM dimming",
      "5200 mAh massive battery with 80W SUPERVOOC"
    ],
    specifications: {
      "Camera": "50MP OIS + 50MP Periscope + 8MP Ultra Wide",
      "RAM/ROM": "12GB / 256GB",
      "Charging": "80W Fast Charger included"
    }
  },
  {
    _id: "mob-06",
    name: "Vivo V40 Pro 5G (12GB RAM, 512GB, Ganges Blue)",
    brand: "Vivo",
    category: "Mobiles",
    unit: "512 GB",
    price: 54999,
    offerPrice: 47999,
    discount: 13,
    rating: 4.7,
    reviewsCount: 3100,
    bestseller: false,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Co-engineered with ZEISS Optics for studio quality portraits",
      "50MP ZEISS Multifocal Portrait Camera with Smart Aura Light",
      "MediaTek Dimensity 9200+ flagship 4nm chipset",
      "5500 mAh BlueVolt ultra-thin battery with 80W FlashCharge"
    ],
    specifications: {
      "Display": "6.78-inch 1.5K 120Hz AMOLED 3D Curved",
      "Cameras": "50MP ZEISS Main + 50MP Telephoto + 50MP Wide",
      "Waterproofing": "IP68 & IP69 Rated"
    }
  },
  {
    _id: "mob-07",
    name: "Motorola Edge 50 Ultra 5G (16GB RAM, 1TB, Nordic Wood)",
    brand: "Motorola",
    category: "Mobiles",
    unit: "1 TB",
    price: 64999,
    offerPrice: 53999,
    discount: 17,
    rating: 4.6,
    reviewsCount: 2150,
    bestseller: false,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Real FSC-certified real wood back finish with aluminum frame",
      "Pantone-validated camera and display colors for natural skin tones",
      "Snapdragon 8s Gen 3 processor with Moto AI camera enhancements",
      "125W TurboPower wired + 50W wireless charging"
    ],
    specifications: {
      "Storage": "1 Terabyte UFS 4.0",
      "Display": "6.7-inch 144Hz Super HD pOLED",
      "Charging": "125W Charger In The Box"
    }
  },

  // ──────────────────────────────────────────────
  // 3. ELECTRONICS & GADGETS
  // ──────────────────────────────────────────────
  {
    _id: "elec-01",
    name: "Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones",
    brand: "Sony",
    category: "Electronics",
    unit: "Silver",
    price: 34990,
    offerPrice: 26990,
    discount: 23,
    rating: 4.9,
    reviewsCount: 9400,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Industry leading noise cancellation with two processors and 8 microphones",
      "Magnificent High-Resolution Audio with 30mm carbon fiber driver unit",
      "Up to 30 hours battery life with quick charge (3 mins = 3 hours playback)",
      "Ultra-comfortable lightweight design with soft fit leather"
    ],
    specifications: {
      "Battery Life": "30 Hours ANC ON (40h ANC OFF)",
      "Bluetooth": "v5.2 with LDAC, AAC, SBC",
      "Voice Assistant": "Alexa, Google Assistant, Siri Built-in",
      "Microphones": "4 Beamforming mics with AI noise reduction"
    }
  },
  {
    _id: "elec-02",
    name: "Apple AirPods Pro (2nd Gen) with USB-C MagSafe Case",
    brand: "Apple",
    category: "Electronics",
    unit: "White",
    price: 24900,
    offerPrice: 21900,
    discount: 12,
    rating: 4.9,
    reviewsCount: 11200,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Apple-designed H2 chip delivers 2x more Active Noise Cancellation",
      "Adaptive Audio dynamically blends Transparency and Noise Cancellation",
      "Personalized Spatial Audio with dynamic head tracking for 3D sound",
      "Up to 6 hours listening time (up to 30 hours with MagSafe Charging Case)"
    ],
    specifications: {
      "Port": "USB-C MagSafe with Speaker & Lanyard Loop",
      "Dust & Sweat Resistance": "IP54 Rated Earbuds & Case",
      "Controls": "Touch control volume swipe on stem"
    }
  },
  {
    _id: "elec-03",
    name: "boAt Airdopes 141 ANC TWS Earbuds with 42H Playtime",
    brand: "boAt",
    category: "Electronics",
    unit: "Gunmetal Black",
    price: 5990,
    offerPrice: 1699,
    discount: 72,
    rating: 4.4,
    reviewsCount: 28400,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Up to 32dB Active Noise Cancellation for undisturbed listening",
      "Signature boAt sound with 10mm drivers and punchy bass",
      "ENx Environmental Noise Cancellation technology for crystal clear calls",
      "BEAST Mode low latency (50ms) for seamless gaming"
    ],
    specifications: {
      "Playback": "42 Hours total playtime",
      "Charging": "ASAP Charge (10 mins = 150 mins)",
      "Water Resistance": "IPX5 Splash & Sweat Proof"
    }
  },
  {
    _id: "elec-04",
    name: "JBL Flip 6 Waterproof Portable Bluetooth Speaker 20W",
    brand: "JBL",
    category: "Electronics",
    unit: "Squad Camo",
    price: 13999,
    offerPrice: 8999,
    discount: 36,
    rating: 4.8,
    reviewsCount: 6300,
    bestseller: false,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Bold JBL Original Pro Sound with 2-way speaker system",
      "IP67 waterproof and dustproof to take anywhere outdoors",
      "12 Hours of non-stop playtime on a single charge",
      "PartyBoost allows pairing multiple compatible speakers together"
    ],
    specifications: {
      "Output Power": "20W RMS Woofer + 10W RMS Tweeter",
      "Waterproof": "IP67 Certified",
      "Frequency Response": "63 Hz - 20k Hz"
    }
  },
  {
    _id: "elec-05",
    name: "Samsung 55-inch Crystal 4K Vivid Pro Ultra HD Smart TV",
    brand: "Samsung",
    category: "Electronics",
    unit: "55 Inch",
    price: 64900,
    offerPrice: 42990,
    discount: 34,
    rating: 4.7,
    reviewsCount: 5120,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Crystal Processor 4K with 4K Upscaling and PurColor technology",
      "HDR 10+ with Contrast Enhancer for vivid lifelike visuals",
      "Q-Symphony sound with Object Tracking Sound Lite (OTS Lite)",
      "Smart TV Tizen OS with Netflix, Prime Video, Disney+ Hotstar, YouTube"
    ],
    specifications: {
      "Resolution": "4K Ultra HD (3840 x 2160)",
      "Audio": "20W Output with Dolby Digital Plus",
      "Ports": "3 HDMI ports, 1 USB port, Optical, LAN, Wi-Fi, Bluetooth"
    }
  },
  {
    _id: "elec-06",
    name: "Noise ColorFit Pulse 3 Smartwatch (1.96-inch TFT Display)",
    brand: "Noise",
    category: "Electronics",
    unit: "Jet Black",
    price: 4999,
    offerPrice: 1499,
    discount: 70,
    rating: 4.3,
    reviewsCount: 16700,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Massive 1.96-inch high-brightness display with 550 nits",
      "TruSync Bluetooth calling with quick dial pad and recent call logs",
      "Noise Health Suite: 24/7 Heart rate, SpO2, Sleep tracking & Breathe guides",
      "100+ Sports modes with 150+ customizable cloud watch faces"
    ],
    specifications: {
      "Battery": "Up to 7 days standby (2 days with heavy calling)",
      "Water Resistance": "IP68 Water Resistant",
      "Compatibility": "Android & iOS with NoiseFit App"
    }
  },
  {
    _id: "elec-07",
    name: "Logitech MX Master 3S Wireless Performance Mouse",
    brand: "Logitech",
    category: "Electronics",
    unit: "Graphite",
    price: 10995,
    offerPrice: 8495,
    discount: 23,
    rating: 4.9,
    reviewsCount: 4300,
    bestseller: false,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "8000 DPI Darkfield sensor tracks on any surface, even glass",
      "Quiet Clicks feel satisfying but make 90% less click noise",
      "MagSpeed electromagnetic scroll wheel scrolls 1,000 lines in 1 second",
      "Ergonomic silhouette crafted to support your palm and fingers"
    ],
    specifications: {
      "Connectivity": "Bluetooth Low Energy + Logi Bolt USB Receiver",
      "Battery Life": "Up to 70 days on full charge, 1 min charge = 3 hours use",
      "Customization": "Logi Options+ software on Windows & macOS"
    }
  },
  {
    _id: "elec-08",
    name: "HP Pavilion 15 (13th Gen Intel Core i5, 16GB, 512GB SSD, FHD)",
    brand: "HP",
    category: "Electronics",
    unit: "Natural Silver",
    price: 78200,
    offerPrice: 62990,
    discount: 19,
    rating: 4.6,
    reviewsCount: 2840,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "13th Gen Intel Core i5-1335U processor (10 cores, up to 4.6 GHz)",
      "15.6-inch Full HD micro-edge IPS anti-glare display",
      "Audio by B&O with dual stereo speakers and HP Audio Boost",
      "Backlit keyboard with integrated numeric keypad and fingerprint reader"
    ],
    specifications: {
      "RAM": "16GB DDR4-3200 MHz RAM",
      "Storage": "512GB PCIe NVMe M.2 SSD",
      "OS": "Windows 11 Home + MS Office Home & Student 2021",
      "Weight": "1.75 kg"
    }
  },

  // ──────────────────────────────────────────────
  // 4. HOME APPLIANCES
  // ──────────────────────────────────────────────
  {
    _id: "app-01",
    name: "LG 242L 3-Star Smart Inverter Frost-Free Double Door Refrigerator",
    brand: "LG",
    category: "Appliances",
    unit: "Shiny Steel",
    price: 37999,
    offerPrice: 26990,
    discount: 29,
    rating: 4.8,
    reviewsCount: 7120,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Smart Inverter Compressor saves energy and operates super quietly",
      "Door Cooling+ provides 35% faster even cooling across shelves",
      "Toughened glass shelves capable of holding heavy Indian utensils",
      "Anti-bacterial gasket keeps food hygienic and fresh up to 14 days"
    ],
    specifications: {
      "Capacity": "242 Litres (Suitable for 3-4 member families)",
      "Energy Rating": "3 Star BEE rating",
      "Compressor Warranty": "10 Years Smart Inverter Warranty"
    }
  },
  {
    _id: "app-02",
    name: "Samsung 8 kg Fully-Automatic Front Load Washing Machine with AI Control",
    brand: "Samsung",
    category: "Appliances",
    unit: "Inox Grey",
    price: 49990,
    offerPrice: 35990,
    discount: 28,
    rating: 4.7,
    reviewsCount: 3950,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "EcoBubble technology turns detergent into gentle bubbles for 40x fabric care",
      "Hygiene Steam cycle removes 99.9% of bacteria and allergens",
      "AI Control personalizes wash cycles and displays timely info on smartphone",
      "Digital Inverter motor with 20-year warranty"
    ],
    specifications: {
      "Capacity": "8.0 kg (ideal for large families)",
      "Spin Speed": "1400 RPM for fast drying",
      "Energy Rating": "5 Star Star BEE rating"
    }
  },
  {
    _id: "app-03",
    name: "Daikin 1.5 Ton 5-Star Inverter Split Air Conditioner (Copper, PM 2.5 Filter)",
    brand: "Daikin",
    category: "Appliances",
    unit: "White",
    price: 67200,
    offerPrice: 45990,
    discount: 32,
    rating: 4.8,
    reviewsCount: 4620,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Triple Display indicates power consumption percentage, set temp & error code",
      "Dew Clean technology automatically cleans indoor evaporator coil at touch of button",
      "PM 2.5 filter captures microscopic air pollutants for healthy living",
      "Cools powerfully even at 54°C extreme Indian summer temperatures"
    ],
    specifications: {
      "Capacity": "1.5 Ton (Ideal for 111 to 150 sq.ft rooms)",
      "Energy Efficiency": "5 Star BEE (Highest savings)",
      "Condenser Coil": "100% Copper with anti-corrosion coating"
    }
  },
  {
    _id: "app-04",
    name: "Philips Digital Air Fryer HD9252/90 (4.1L with Rapid Air Technology)",
    brand: "Philips",
    category: "Appliances",
    unit: "Black",
    price: 11995,
    offerPrice: 7999,
    discount: 33,
    rating: 4.7,
    reviewsCount: 8800,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Cook with up to 90% less oil without sacrificing crispy taste",
      "Patented Rapid Air starfish design circulates hot air for even frying",
      "Touchscreen with 7 preset cooking programs: fries, meat, fish, chicken, cake",
      "Dishwasher-safe non-stick basket for effortless clean-up"
    ],
    specifications: {
      "Capacity": "4.1 Litres (0.8kg food capacity)",
      "Power": "1400 Watts",
      "Programs": "Fry, Bake, Grill, Roast, Reheat"
    }
  },
  {
    _id: "app-05",
    name: "Bajaj Rex 500W Mixer Grinder with 3 Stainless Steel Jars",
    brand: "Bajaj",
    category: "Appliances",
    unit: "White",
    price: 3650,
    offerPrice: 1999,
    discount: 45,
    rating: 4.4,
    reviewsCount: 14200,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Heavy duty 500 Watts copper motor for tough Indian chutneys and masalas",
      "3 Stainless Steel Jars: 1.20L Liquidizing, 0.8L Multi-purpose & 0.3L Chutney jar",
      "Multi-functional blade system with 3 speed controls and incher",
      "Overload protection prevents motor burnout during heavy grinding"
    ],
    specifications: {
      "Motor Power": "500 Watts",
      "Jars": "3 Stainless Steel Jars with easy-grip handles",
      "Warranty": "1 Year on Product, 1 Year on Motor"
    }
  },
  {
    _id: "app-06",
    name: "Havells Instanio 3-Litre Instant Water Heater (Geyser)",
    brand: "Havells",
    category: "Appliances",
    unit: "White Mustard",
    price: 5890,
    offerPrice: 3499,
    discount: 41,
    rating: 4.6,
    reviewsCount: 5120,
    bestseller: false,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Ultra-thick stainless steel inner tank provides superior corrosion protection",
      "Color-changing LED indicator lights show when water is hot and ready",
      "High-precision thermostat and safety valve for complete peace of mind",
      "Suitable for high-rise buildings and pressure pump installations"
    ],
    specifications: {
      "Capacity": "3 Litres Instant Heating",
      "Wattage": "3000 Watts for boiling hot water in seconds",
      "Pressure": "0.65 MPa Bar Pressure Rating"
    }
  },
  {
    _id: "app-07",
    name: "Dyson V8 Cordless Vacuum Cleaner with Powerful Suction",
    brand: "Dyson",
    category: "Appliances",
    unit: "Nickel & Yellow",
    price: 43900,
    offerPrice: 29900,
    discount: 32,
    rating: 4.8,
    reviewsCount: 3100,
    bestseller: false,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Engineered for homes with pets: de-tangles hair automatically as you vacuum",
      "Up to 40 minutes of fade-free suction across hard floors and carpets",
      "Advanced whole-machine filtration captures 99.99% of dust particles and allergens",
      "Quickly transforms into a handheld vacuum for sofa, cars, and mattresses"
    ],
    specifications: {
      "Motor": "Dyson Digital Motor V8 (115 Air Watts suction)",
      "Runtime": "40 Minutes",
      "Weight": "2.5 kg lightweight design"
    }
  },

  // ──────────────────────────────────────────────
  // 5. FASHION & LIFESTYLE
  // ──────────────────────────────────────────────
  {
    _id: "fash-01",
    name: "Dennis Lingo Men's Slim Fit 100% Cotton Casual Shirt",
    brand: "Dennis Lingo",
    category: "Fashion",
    unit: "Size L (Sky Blue)",
    price: 1849,
    offerPrice: 649,
    discount: 65,
    rating: 4.4,
    reviewsCount: 14200,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "100% Premium breathable combed cotton fabric",
      "Curved hemline with classic spread collar and patch pocket",
      "Pre-washed for an extremely soft hand-feel and zero shrinkage",
      "Versatile styling for office, weekend outings and dinners"
    ],
    specifications: {
      "Material": "100% Pure Cotton",
      "Fit": "Modern Slim Fit",
      "Sleeve": "Full Sleeves",
      "Care": "Machine wash cold"
    }
  },
  {
    _id: "fash-02",
    name: "Biba Women's Floral Printed Cotton Anarkali Kurta Set with Dupatta",
    brand: "Biba",
    category: "Fashion",
    unit: "Size M (Coral Pink)",
    price: 4599,
    offerPrice: 1899,
    discount: 59,
    rating: 4.7,
    reviewsCount: 4200,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Pure soft mulmul cotton with gold foil ethnic bootis",
      "Graceful Anarkali flare with embroidered sweetheart neckline",
      "Coordinated straight pants with elasticated waistband and printed chiffon dupatta",
      "Ideal for festivities, family gatherings, and weddings"
    ],
    specifications: {
      "Fabric": "100% Breathable Cotton",
      "Set Includes": "Kurta, Trousers & Dupatta (3 Pcs)",
      "Length": "Calf Length Kurta"
    }
  },
  {
    _id: "fash-03",
    name: "Puma Men's Softride Rift Lightweight Running Shoes",
    brand: "Puma",
    category: "Fashion",
    unit: "UK Size 8 (Black-White)",
    price: 4999,
    offerPrice: 2249,
    discount: 55,
    rating: 4.5,
    reviewsCount: 6800,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "SOFTRIDE foam midsole provides extreme cushioning and all-day comfort",
      "Breathable engineered mesh upper with molded TPU midfoot cage",
      "Zoned rubber outsole pods for ultimate traction and durability",
      "Lightweight athletic construction for gym, running, and casual walks"
    ],
    specifications: {
      "Upper": "Textile Mesh",
      "Sole": "Softride Cushion Foam + Rubber Pods",
      "Closure": "Lace-Up"
    }
  },
  {
    _id: "fash-04",
    name: "Nike Court Vision Low Casual Retro Sneakers",
    brand: "Nike",
    category: "Fashion",
    unit: "UK Size 9 (Triple White)",
    price: 5995,
    offerPrice: 4795,
    discount: 20,
    rating: 4.8,
    reviewsCount: 8900,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "80s basketball-inspired classic retro silhouette",
      "Crisp synthetic leather upper with stitched overlays",
      "Perforations on toe and sides add breathability and timeless style",
      "Padded, low-cut collar looks sleek and feels great around ankle"
    ],
    specifications: {
      "Upper": "Synthetic & Genuine Leather",
      "Outsole": "Vulcanized Rubber Cupsole",
      "Color": "White / White"
    }
  },
  {
    _id: "fash-05",
    name: "Titan Neo Classic Black Dial Analog Watch for Men",
    brand: "Titan",
    category: "Fashion",
    unit: "Black Leather Strap",
    price: 4995,
    offerPrice: 3495,
    discount: 30,
    rating: 4.7,
    reviewsCount: 3750,
    bestseller: false,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Sophisticated mineral glass dial with date display function",
      "Genuine leather strap with contrast perimeter stitching",
      "High-precision Japanese quartz movement",
      "50M water resistance (shower and rain proof)"
    ],
    specifications: {
      "Case Material": "Brass Stainless Steel",
      "Water Resistance": "5 ATM (50 Meters)",
      "Warranty": "2 Years Titan India Warranty"
    }
  },
  {
    _id: "fash-06",
    name: "American Tourister 32L Casual Laptop Travel Backpack",
    brand: "American Tourister",
    category: "Fashion",
    unit: "Navy Blue",
    price: 2999,
    offerPrice: 1299,
    discount: 57,
    rating: 4.6,
    reviewsCount: 12400,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "3 Spacious full-zip compartments with padded 15.6-inch laptop pocket",
      "Water-resistant high-durability polyester fabric with rain cover",
      "Ergonomic mesh back padding with air-grooves for back comfort",
      "Side bottle holder and front quick-access organizer pockets"
    ],
    specifications: {
      "Capacity": "32 Litres",
      "Laptop Sleeve": "Holds up to 15.6 inch laptops",
      "Warranty": "1 Year International Manufacturer Warranty"
    }
  },

  // ──────────────────────────────────────────────
  // 6. HOME & KITCHEN
  // ──────────────────────────────────────────────
  {
    _id: "home-01",
    name: "Prestige Omega Deluxe Granite Non-Stick Kitchen Cookware Set (3 Pcs)",
    brand: "Prestige",
    category: "Home & Kitchen",
    unit: "Set of 3",
    price: 4400,
    offerPrice: 2499,
    discount: 43,
    rating: 4.7,
    reviewsCount: 7600,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Includes: 24cm Omni Tawa, 24cm Fry Pan, and 24cm Kadai with Glass Lid",
      "5-layer durable granite spatter non-stick coating with German technology",
      "Gas and Induction compatible heavy gauge aluminum base",
      "Metal spoon friendly, PFOA-free, and dishwasher safe"
    ],
    specifications: {
      "Items": "Fry Pan, Kadai with Glass Lid, Flat Dosa Tawa",
      "Coating": "5-Layer Spatter Granite Finish",
      "Warranty": "2 Years Prestige Warranty"
    }
  },
  {
    _id: "home-02",
    name: "Cello Opalware Dazzle Tropical Lagoon Dinner Set (18 Pcs)",
    brand: "Cello",
    category: "Home & Kitchen",
    unit: "18 Pieces",
    price: 3200,
    offerPrice: 1799,
    discount: 44,
    rating: 4.6,
    reviewsCount: 5100,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Bone ash free 100% vegetarian premium European opal glass",
      "Chip-resistant, scratch-resistant and thermal shock resistant",
      "Microwave, refrigerator and dishwasher safe",
      "Includes 6 Full Dinner Plates, 6 Quarter Plates, and 6 Veg Bowls"
    ],
    specifications: {
      "Material": "Opal Glass (Tough & Break Resistant)",
      "Set Size": "18 Pieces for 6 Person Dining",
      "Design": "Tropical Floral Print"
    }
  },
  {
    _id: "home-03",
    name: "Spaces 100% Cotton 210 TC Double Bedsheet with 2 Pillow Covers",
    brand: "Spaces",
    category: "Home & Kitchen",
    unit: "Double Bed (King Size)",
    price: 2199,
    offerPrice: 1199,
    discount: 45,
    rating: 4.5,
    reviewsCount: 3800,
    bestseller: false,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "210 Thread Count 100% fine long-staple breathable cotton",
      "Color-lock technology ensures fade-resistant vibrant shades even after 30+ washes",
      "Skin-friendly, hypoallergenic fabric perfect for Indian seasons",
      "Dimensions: Bedsheet 224 cm x 274 cm, Pillow covers 46 cm x 68 cm"
    ],
    specifications: {
      "Thread Count": "210 TC",
      "Material": "100% Pure Combed Cotton",
      "Size": "Double King Size Bedsheet + 2 Covers"
    }
  },
  {
    _id: "home-04",
    name: "Wipro Garnet 9W B22 LED Cool White Bulbs (Pack of 4)",
    brand: "Wipro",
    category: "Home & Kitchen",
    unit: "Pack of 4",
    price: 720,
    offerPrice: 349,
    discount: 52,
    rating: 4.7,
    reviewsCount: 14800,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1550985543-f47f38aeee65?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Bright 6500K Cool Day White light with 900 Lumens output",
      "Saves up to 90% energy compared to traditional incandescent bulbs",
      "Wide beam angle with glare-free uniform illumination",
      "Long lifespan of 25,000 hours with surge protection up to 4kV"
    ],
    specifications: {
      "Wattage": "9 Watts per bulb",
      "Cap Type": "B22 Regular Indian Standard Base",
      "Color Temperature": "6500K Cool White"
    }
  },
  {
    _id: "home-05",
    name: "Green Soul Beast Ergonomic High Back Office & Gaming Chair",
    brand: "Green Soul",
    category: "Home & Kitchen",
    unit: "GS-600 (Black & Red)",
    price: 24990,
    offerPrice: 14490,
    discount: 42,
    rating: 4.8,
    reviewsCount: 4600,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1580481077195-c2f82d1a646f?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Ergonomic lumbar support cushion and memory foam headrest pillow",
      "Heavy duty metallic frame with Class 4 pneumatic gas lift",
      "3D adjustable armrests and 180-degree reclining mechanism",
      "Breathable premium PU leather upholstery designed for 8+ hour work sessions"
    ],
    specifications: {
      "Weight Capacity": "Up to 135 kg",
      "Recline": "90 to 180 Degrees",
      "Warranty": "3 Years Comprehensive Warranty"
    }
  },

  // ──────────────────────────────────────────────
  // 7. BEAUTY & PERSONAL CARE
  // ──────────────────────────────────────────────
  {
    _id: "beau-01",
    name: "Nivea Soft Light Non-Greasy Moisturizer Cream 200ml",
    brand: "Nivea",
    category: "Beauty",
    unit: "200 ml",
    price: 350,
    offerPrice: 245,
    discount: 30,
    rating: 4.8,
    reviewsCount: 16400,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Fast-absorbing light moisturizing cream with Jojoba Oil and Vitamin E",
      "Non-greasy formula leaves skin refreshed, supple, and radiant",
      "Suitable for all skin types, daily use on face, body, and hands"
    ],
    specifications: {
      "Volume": "200 ml",
      "Key Ingredients": "Jojoba Oil & Vitamin E",
      "Form": "Lightweight Cream"
    }
  },
  {
    _id: "beau-02",
    name: "L'Oreal Paris Total Repair 5 Damaged Hair Shampoo 650ml",
    brand: "L'Oreal",
    category: "Beauty",
    unit: "650 ml",
    price: 749,
    offerPrice: 489,
    discount: 35,
    rating: 4.7,
    reviewsCount: 9200,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Fights the 5 visible signs of damaged hair: hairfall, dryness, roughness, dullness and split ends",
      "Formulated with Ceramide technology that penetrates hair fibers deeply",
      "Restores natural shine and bouncy softness"
    ],
    specifications: {
      "Volume": "650 ml with Pump Dispenser",
      "Hair Type": "Damaged / Dry Hair",
      "Features": "Ceramide-Cement Repair"
    }
  },
  {
    _id: "beau-03",
    name: "Dettol Original Germ Protection Liquid Handwash Refill 1500ml",
    brand: "Dettol",
    category: "Beauty",
    unit: "1500 ml",
    price: 325,
    offerPrice: 229,
    discount: 30,
    rating: 4.9,
    reviewsCount: 19800,
    bestseller: true,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Protects against 100 illness-causing germs with 99.9% proven efficacy",
      "Formulated with pure pine oil and moisturizing glycerin",
      "Dermatologically tested pH balanced formula gentle on hands"
    ],
    specifications: {
      "Quantity": "1500 ml Mega Refill Pouch",
      "Scent": "Original Dettol Pine",
      "Type": "Antibacterial Hand Wash"
    }
  },
  {
    _id: "beau-04",
    name: "Mamaearth Onion Hair Oil for Hair Fall Control with Redensyl 150ml",
    brand: "Mamaearth",
    category: "Beauty",
    unit: "150 ml",
    price: 419,
    offerPrice: 335,
    discount: 20,
    rating: 4.5,
    reviewsCount: 7100,
    bestseller: false,
    inStock: true,
    image: [
      "https://images.unsplash.com/photo-1608248597359-29119c8f07aa?w=600&auto=format&fit=crop&q=80"
    ],
    description: [
      "Enriched with Onion Seed Oil, Redensyl, Almond Oil, and Bhringraj",
      "Reduces hair fall and promotes healthy new hair follicle growth",
      "Safe for chemically treated hair, dermatologically tested and toxin free"
    ],
    specifications: {
      "Volume": "150 ml with Comb Applicator",
      "Toxins": "No Parabens, Silicones or Mineral Oil",
      "Suitable For": "All Hair Types"
    }
  }
];

