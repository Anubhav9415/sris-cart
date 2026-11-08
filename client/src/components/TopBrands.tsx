import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

const TOP_BRANDS = [
  {
    name: "Amul",
    tagline: "The Taste of India",
    discount: "Up to 25% OFF",
    logo: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&auto=format&fit=crop&q=80",
    color: "from-blue-600 to-indigo-700",
  },
  {
    name: "Apple",
    tagline: "Innovation Redefined",
    discount: "Up to ₹12,000 Off",
    logo: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&auto=format&fit=crop&q=80",
    color: "from-gray-800 to-black",
  },
  {
    name: "Samsung",
    tagline: "Galaxy of Deals",
    discount: "Up to 35% OFF",
    logo: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&auto=format&fit=crop&q=80",
    color: "from-blue-700 to-sky-600",
  },
  {
    name: "Sony",
    tagline: "Pure Audio & Visuals",
    discount: "Up to 40% OFF",
    logo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80",
    color: "from-zinc-800 to-gray-900",
  },
  {
    name: "boAt",
    tagline: "Plug Into Nirvana",
    discount: "Up to 65% OFF",
    logo: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&auto=format&fit=crop&q=80",
    color: "from-red-600 to-amber-600",
  },
  {
    name: "LG",
    tagline: "Life's Good",
    discount: "Up to 30% OFF",
    logo: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=200&auto=format&fit=crop&q=80",
    color: "from-rose-600 to-pink-700",
  },
  {
    name: "Philips",
    tagline: "Smart Appliances",
    discount: "Up to 45% OFF",
    logo: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=200&auto=format&fit=crop&q=80",
    color: "from-cyan-700 to-blue-800",
  },
  {
    name: "Tata",
    tagline: "Leadership with Trust",
    discount: "Best Everyday Price",
    logo: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=200&auto=format&fit=crop&q=80",
    color: "from-blue-900 to-indigo-900",
  },
];

const TopBrands: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="my-8 md:my-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              Top Official Brands
            </h2>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full hidden sm:inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Authentic
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Direct from brand authorized distributors with full manufacturer warranty
          </p>
        </div>

        <button
          onClick={() => navigate("/products")}
          className="text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 group cursor-pointer"
        >
          <span>All Brands</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {TOP_BRANDS.map((brand, idx) => (
          <div
            key={idx}
            onClick={() => {
              navigate(`/products?search=${encodeURIComponent(brand.name)}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group relative bg-white border border-gray-200 hover:border-amber-400 rounded-2xl p-3 flex flex-col items-center text-center shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden mb-2 bg-gray-50 p-1 border border-gray-100 group-hover:scale-108 transition-transform">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h4 className="text-xs font-black text-gray-900">{brand.name}</h4>
            <span className="text-[10px] font-bold text-emerald-600 mt-0.5">
              {brand.discount}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopBrands;

