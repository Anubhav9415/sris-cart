import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "../types";

interface ProductCarouselSectionProps {
  title: string;
  subtitle?: string;
  badge?: string;
  viewAllLink?: string;
  products: Product[];
}

const ProductCarouselSection: React.FC<ProductCarouselSectionProps> = ({
  title,
  subtitle,
  badge,
  viewAllLink = "/products",
  products,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!products || products.length === 0) return null;

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -420 : 420;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative my-6 sm:my-10 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-end justify-between gap-2 mb-3 sm:mb-4 pb-2 border-b border-gray-100">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-tight">
              {title}
            </h2>
            {badge && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-500" /> {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-[11px] sm:text-sm text-gray-500 font-medium line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 group transition whitespace-nowrap"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}

          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => handleScroll("left")}
              aria-label="Previous products"
              className="p-1.5 rounded-full border border-gray-200 hover:border-amber-400 bg-white hover:bg-amber-50 text-gray-700 transition cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              aria-label="Next products"
              className="p-1.5 rounded-full border border-gray-200 hover:border-amber-400 bg-white hover:bg-amber-50 text-gray-700 transition cursor-pointer shadow-2xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-2.5 sm:gap-4 overflow-x-auto pb-3 pt-1 scroll-smooth no-scrollbar snap-x"
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="w-[164px] xs:w-[178px] sm:w-52 md:w-60 shrink-0 flex snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCarouselSection;
