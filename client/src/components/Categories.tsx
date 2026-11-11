import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

interface CategoryItem {
  name: string;
  query: string;
  tag: string;
  image: string;
  bgColor: string;
}

const FEATURED_CATEGORIES: CategoryItem[] = [
  {
    name: "Dairy & Staples",
    query: "groceries",
    tag: "Express 9 mins",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=80",
    bgColor: "bg-amber-50/80 border-amber-200/60",
  },
  {
    name: "Smartphones",
    query: "mobiles",
    tag: "5G Deals",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&auto=format&fit=crop&q=80",
    bgColor: "bg-blue-50/80 border-blue-200/60",
  },
  {
    name: "Electronics & Audio",
    query: "electronics",
    tag: "Up to 50% Off",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80",
    bgColor: "bg-purple-50/80 border-purple-200/60",
  },
  {
    name: "Home Appliances",
    query: "appliances",
    tag: "Top Brands",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&auto=format&fit=crop&q=80",
    bgColor: "bg-emerald-50/80 border-emerald-200/60",
  },
  {
    name: "Fashion & Lifestyle",
    query: "fashion",
    tag: "Min 40% Off",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&auto=format&fit=crop&q=80",
    bgColor: "bg-rose-50/80 border-rose-200/60",
  },
  {
    name: "Beauty & Grooming",
    query: "beauty",
    tag: "Best Sellers",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80",
    bgColor: "bg-pink-50/80 border-pink-200/60",
  },
  {
    name: "Home & Kitchen",
    query: "home & kitchen",
    tag: "Cookware & Decor",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=300&auto=format&fit=crop&q=80",
    bgColor: "bg-orange-50/80 border-orange-200/60",
  },
  {
    name: "Baby Care & Toys",
    query: "toys & baby care",
    tag: "Diapers & Care",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&auto=format&fit=crop&q=80",
    bgColor: "bg-sky-50/80 border-sky-200/60",
  },
];

const Categories: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="my-6 sm:my-10 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              Shop by Category
            </h2>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full hidden sm:inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Explore Collections
            </span>
          </div>
          <p className="text-[11px] sm:text-sm text-gray-500 font-medium line-clamp-1">
            Find everything you need across our handpicked departments
          </p>
        </div>

        <button
          onClick={() => navigate("/products")}
          className="text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 group cursor-pointer shrink-0 whitespace-nowrap"
        >
          <span>All</span>
          <span className="hidden sm:inline">Departments</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 xs:grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-4">
        {FEATURED_CATEGORIES.map((cat, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/products?category=${encodeURIComponent(cat.query.toLowerCase())}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`group relative rounded-2xl p-2.5 sm:p-3 border transition-all duration-300 hover:shadow-lg md:hover:-translate-y-1 cursor-pointer flex flex-col items-center text-center ${cat.bgColor}`}
          >
            {/* Image Circle */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-1.5 sm:mb-2 bg-white p-1 shadow-2xs group-hover:scale-108 transition-transform duration-300">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Title */}
            <h4 className="text-[11px] sm:text-xs font-bold text-gray-800 leading-tight group-hover:text-amber-700 transition-colors">
              {cat.name}
            </h4>

            {/* Tag */}
            <span className="text-[9px] sm:text-[10px] font-semibold text-gray-500 mt-0.5">
              {cat.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
