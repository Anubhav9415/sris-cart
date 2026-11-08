import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Tag, Sparkles } from "lucide-react";

export interface MegaMenuCategoryData {
  category: string;
  badge?: string;
  columns: {
    heading: string;
    items: { label: string; query?: string }[];
  }[];
  featured?: {
    title: string;
    description: string;
    image: string;
    link: string;
  };
}

export const MEGA_MENU_DATA: Record<string, MegaMenuCategoryData> = {
  Groceries: {
    category: "Groceries",
    badge: "Express 9 mins",
    columns: [
      {
        heading: "Dairy & Breakfast",
        items: [
          { label: "Amul Butter & Ghee", query: "Amul Butter" },
          { label: "Paneer & Curd", query: "Amul Paneer" },
          { label: "Milk & Chaas", query: "Buttermilk" },
          { label: "Breads & Bakery", query: "Bread" },
          { label: "Breakfast Cereals", query: "Cereals" },
        ],
      },
      {
        heading: "Daily Staples",
        items: [
          { label: "Atta & Flours", query: "Aashirvaad" },
          { label: "Basmati Rice", query: "Basmati" },
          { label: "Edible Oils & Ghee", query: "Sunflower Oil" },
          { label: "Dals & Pulses", query: "Dal" },
          { label: "Tata Salt & Sugar", query: "Tata Salt" },
        ],
      },
      {
        heading: "Snacks & Drinks",
        items: [
          { label: "Maggi & Noodles", query: "Maggi" },
          { label: "Biscuits & Cookies", query: "Biscuits" },
          { label: "Haldiram's Namkeen", query: "Haldiram" },
          { label: "Cold Drinks & Juices", query: "Coca-Cola" },
          { label: "Tea & Coffee", query: "Tata Tea" },
        ],
      },
    ],
    featured: {
      title: "Dairy Festival Deals",
      description: "Up to 30% off on fresh Amul Malai Paneer & Butter",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80",
      link: "/products?category=groceries",
    },
  },

  Mobiles: {
    category: "Mobiles",
    badge: "5G Smartphone Sale",
    columns: [
      {
        heading: "Top Smartphone Brands",
        items: [
          { label: "Apple iPhone 16 / 15", query: "iPhone" },
          { label: "Samsung Galaxy S24 / S25", query: "Samsung Galaxy" },
          { label: "OnePlus 12 / 13 Series", query: "OnePlus" },
          { label: "Xiaomi Redmi Note", query: "Redmi" },
          { label: "Realme 12 Series", query: "Realme" },
        ],
      },
      {
        heading: "More Brands & Styles",
        items: [
          { label: "Vivo V Series", query: "Vivo" },
          { label: "Motorola Edge Series", query: "Motorola" },
          { label: "5G Phones Under ₹20,000", query: "5G" },
          { label: "Flagship Camera Phones", query: "Smartphone" },
        ],
      },
      {
        heading: "Mobile Accessories",
        items: [
          { label: "Fast Wall Chargers", query: "Charger" },
          { label: "Type-C Braided Cables", query: "Cable" },
          { label: "Power Banks 20000mAh", query: "Power Bank" },
          { label: "Cases & Screen Protectors", query: "Case" },
        ],
      },
    ],
    featured: {
      title: "Next-Gen 5G Phones",
      description: "Exchange bonus up to ₹5,000 + No Cost EMI",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=80",
      link: "/products?category=mobiles",
    },
  },

  Electronics: {
    category: "Electronics",
    badge: "Audio & Gadgets",
    columns: [
      {
        heading: "Audio & Headphones",
        items: [
          { label: "Sony Noise Cancelling", query: "Sony" },
          { label: "Apple AirPods Pro", query: "AirPods" },
          { label: "boAt TWS Earbuds", query: "boAt" },
          { label: "JBL Bluetooth Speakers", query: "JBL" },
        ],
      },
      {
        heading: "Computing & Smart Living",
        items: [
          { label: "Apple iPad 10th Gen", query: "iPad" },
          { label: "HP & Dell Laptops", query: "Laptop" },
          { label: "Samsung & LG Smart TVs", query: "Smart TV" },
          { label: "SanDisk Portable SSDs", query: "SSD" },
        ],
      },
      {
        heading: "Smart Wearables",
        items: [
          { label: "Noise ColorFit Smartwatch", query: "Smartwatch" },
          { label: "Logitech MX Master Mouse", query: "Logitech" },
          { label: "Fitness Trackers", query: "Watch" },
          { label: "Computer Peripherals", query: "Mouse" },
        ],
      },
    ],
    featured: {
      title: "Audio Mega Fest",
      description: "Up to 60% OFF on Sony, boAt, and JBL gear",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80",
      link: "/products?category=electronics",
    },
  },

  Appliances: {
    category: "Appliances",
    badge: "Big Home Fest",
    columns: [
      {
        heading: "Kitchen Appliances",
        items: [
          { label: "Philips Digital Air Fryer", query: "Air Fryer" },
          { label: "Bajaj 500W Mixer Grinder", query: "Mixer Grinder" },
          { label: "Microwave Ovens", query: "Microwave" },
          { label: "RO Water Purifiers", query: "Water Purifier" },
        ],
      },
      {
        heading: "Large Appliances",
        items: [
          { label: "LG Double Door Refrigerators", query: "Refrigerator" },
          { label: "Samsung AI Washing Machines", query: "Washing Machine" },
          { label: "Daikin Inverter Split ACs", query: "Air Conditioner" },
          { label: "Havells Water Heaters", query: "Water Heater" },
        ],
      },
      {
        heading: "Home Cleaning",
        items: [
          { label: "Dyson Cordless Vacuum", query: "Dyson" },
          { label: "Air Purifiers", query: "Purifier" },
          { label: "Garment Steamers", query: "Iron" },
        ],
      },
    ],
    featured: {
      title: "Modern Smart Kitchen",
      description: "Save up to 40% on smart energy-rated appliances",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=80",
      link: "/products?category=appliances",
    },
  },

  Fashion: {
    category: "Fashion",
    badge: "Trending Looks",
    columns: [
      {
        heading: "Men's Fashion",
        items: [
          { label: "Casual Slim Fit Shirts", query: "Shirt" },
          { label: "Levi's 511 Denim Jeans", query: "Jeans" },
          { label: "Puma Sports Running Shoes", query: "Running Shoes" },
          { label: "Classic Sneakers", query: "Sneakers" },
        ],
      },
      {
        heading: "Women's Fashion",
        items: [
          { label: "Anarkali Kurta Sets", query: "Kurta" },
          { label: "Ethnic Festive Wear", query: "Ethnic" },
          { label: "Dresses & Tops", query: "Dress" },
          { label: "Handbags & Totes", query: "Bags" },
        ],
      },
      {
        heading: "Accessories & Bags",
        items: [
          { label: "Fossil Chronograph Watches", query: "Fossil" },
          { label: "Wildcraft Backpacks", query: "Backpack" },
          { label: "Sunglasses & Wallets", query: "Wallet" },
        ],
      },
    ],
    featured: {
      title: "Festive Fashion Wardrobe",
      description: "Minimum 40% to 70% Off on top fashion brands",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format&fit=crop&q=80",
      link: "/products?category=fashion",
    },
  },

  Beauty: {
    category: "Beauty",
    badge: "Glow & Care",
    columns: [
      {
        heading: "Skincare Essentials",
        items: [
          { label: "Minimalist Vitamin C Serum", query: "Minimalist" },
          { label: "Nivea Soft Light Cream", query: "Nivea" },
          { label: "Moisturizers & Sunscreens", query: "Cream" },
          { label: "Face Wash & Cleansers", query: "Face Wash" },
        ],
      },
      {
        heading: "Hair & Personal Care",
        items: [
          { label: "Mamaearth Onion Hair Oil", query: "Mamaearth" },
          { label: "L'Oreal Total Repair Shampoo", query: "L'Oreal" },
          { label: "Dettol Germ Protection Handwash", query: "Dettol" },
          { label: "Body Wash & Shower Gels", query: "Soap" },
        ],
      },
      {
        heading: "Makeup & Fragrances",
        items: [
          { label: "Lakme Eyeconic Kajal", query: "Lakme" },
          { label: "Mascaras & Eyeliners", query: "Kajal" },
          { label: "Lipsticks & Lip Balms", query: "Lipstick" },
          { label: "Luxury Fragrances", query: "Perfume" },
        ],
      },
    ],
    featured: {
      title: "Daily Radiance Ritual",
      description: "Top dermatologist-tested brands at guaranteed lowest prices",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80",
      link: "/products?category=beauty",
    },
  },

  "Home & Kitchen": {
    category: "Home & Kitchen",
    badge: "Home Upgrade",
    columns: [
      {
        heading: "Cookware & Dining",
        items: [
          { label: "Prestige Non-Stick Cookware Set", query: "Cookware" },
          { label: "Cello 33-Piece Dinner Sets", query: "Dinner Set" },
          { label: "Pigeon Insulated Flasks", query: "Flask" },
          { label: "Kitchen Storage & Jars", query: "Bottle" },
        ],
      },
      {
        heading: "Bedding & Furnishing",
        items: [
          { label: "Bombay Dyeing Cotton Bedsheets", query: "Bedsheet" },
          { label: "Curtains & Cushions", query: "Curtains" },
          { label: "Bath Towels & Mats", query: "Towels" },
        ],
      },
      {
        heading: "Lighting & Home Decor",
        items: [
          { label: "Philips Smart Wi-Fi LED Bulbs", query: "LED" },
          { label: "Green Soul Ergonomic Chair", query: "Chair" },
          { label: "DeckUp Solid Wood Study Table", query: "Table" },
        ],
      },
    ],
    featured: {
      title: "Complete Kitchen Makeover",
      description: "Up to 50% OFF on cookware, dinnerware, & smart home lights",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=80",
      link: "/products?category=home%20%26%20kitchen",
    },
  },
};

interface MegaMenuProps {
  category: string;
  onClose: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ category, onClose }) => {
  const data = MEGA_MENU_DATA[category];
  if (!data) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-b border-gray-100 z-40 animate-in fade-in slide-in-from-top-1 duration-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h3 className="font-extrabold text-gray-900 text-lg tracking-tight">
              {data.category} Store
            </h3>
            {data.badge && (
              <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> {data.badge}
              </span>
            )}
          </div>
          <Link
            to={`/products?category=${encodeURIComponent(data.category.toLowerCase())}`}
            onClick={onClose}
            className="text-xs font-bold text-primary hover:text-amber-600 flex items-center gap-1 transition"
          >
            Explore All {data.category} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {data.columns.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 pb-1 border-b border-gray-100">
                {col.heading}
              </h4>
              <ul className="space-y-2 text-sm">
                {col.items.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={`/products?search=${encodeURIComponent(item.query || item.label)}`}
                      onClick={onClose}
                      className="text-gray-600 hover:text-primary hover:translate-x-1 inline-block transition-transform duration-150 text-xs font-medium"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Featured Promo Card */}
          {data.featured && (
            <Link
              to={data.featured.link}
              onClick={onClose}
              className="relative group block rounded-2xl overflow-hidden bg-linear-to-br from-amber-50 to-orange-100 p-4 border border-amber-200/60 hover:shadow-md transition"
            >
              <div className="h-28 overflow-hidden rounded-xl mb-3">
                <img
                  src={data.featured.image}
                  alt={data.featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">
                <Tag className="w-3 h-3" /> Featured Deal
              </div>
              <h5 className="font-bold text-gray-900 text-sm leading-tight mb-1">
                {data.featured.title}
              </h5>
              <p className="text-xs text-gray-600 mb-2">
                {data.featured.description}
              </p>
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1 group-hover:underline">
                Shop Now <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;

