import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Zap, CreditCard } from "lucide-react";

interface BannerSlide {
  id: number;
  tag: string;
  title: string;
  highlight: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
  image: string;
  terms: string;
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 1,
    tag: "GRAND FESTIVE SALE",
    title: "India's Biggest",
    highlight: "Mega Shopping Fest",
    description: "Up to 60% OFF on 10,000+ top groceries, mobiles, and home essentials",
    ctaText: "Shop the Sale",
    ctaLink: "/products",
    bgGradient: "from-amber-500 via-orange-500 to-red-500",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1000&auto=format&fit=crop&q=80",
    terms: "*Extra 10% Instant Discount on HDFC & SBI Cards",
  },
  {
    id: 2,
    tag: "SMARTPHONE FESTIVAL",
    title: "Next-Gen 5G",
    highlight: "Flagship Mobiles",
    description: "iPhone 16, Samsung Galaxy S25, & OnePlus 13 with up to ₹25,000 off + No Cost EMI",
    ctaText: "Explore Mobiles",
    ctaLink: "/products?category=mobiles",
    bgGradient: "from-blue-600 via-indigo-600 to-purple-600",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000&auto=format&fit=crop&q=80",
    terms: "*Exchange bonus up to ₹5,000 available",
  },
  {
    id: 3,
    tag: "EXPRESS GROCERY DEALS",
    title: "Fresh Farm Produce",
    highlight: "& Daily Essentials",
    description: "Amul Butter, Paneer, Aashirvaad Atta, and Basmati Rice delivered to your doorstep in 9 mins",
    ctaText: "Order Groceries",
    ctaLink: "/products?category=groceries",
    bgGradient: "from-emerald-600 via-teal-600 to-green-700",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000&auto=format&fit=crop&q=80",
    terms: "*100% Quality & Freshness Guarantee",
  },
  {
    id: 4,
    tag: "AUDIO & TECH BLOWOUT",
    title: "Sound & Vision",
    highlight: "Electronics Carnival",
    description: "Sony Noise Cancelling, boAt Earbuds, JBL Speakers, & Smart 4K TVs at rock-bottom prices",
    ctaText: "Grab Audio Deals",
    ctaLink: "/products?category=electronics",
    bgGradient: "from-violet-700 via-purple-700 to-pink-600",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80",
    terms: "*Manufacturer warranty included",
  },
  {
    id: 5,
    tag: "FASHION & LIFESTYLE",
    title: "New Wardrobe",
    highlight: "Trendy Fashion Sale",
    description: "Branded Casual Shirts, Denim Jeans, Ethnic Kurtas, and Sneakers at minimum 50% OFF",
    ctaText: "Explore Fashion",
    ctaLink: "/products?category=fashion",
    bgGradient: "from-rose-600 via-pink-600 to-amber-600",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&auto=format&fit=crop&q=80",
    terms: "*Hassle-free 7-day doorstep returns",
  },
];

const MainBanner: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? BANNER_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  const currentSlide = BANNER_SLIDES[currentIdx];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-3 sm:mt-6 space-y-3 sm:space-y-4">
      {/* MAIN ROTATING HERO CAROUSEL */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl bg-gray-900 group">
        <div
          className={`relative min-h-[260px] sm:min-h-[360px] md:min-h-[420px] bg-linear-to-r ${currentSlide.bgGradient} flex flex-col-reverse md:flex-row items-center justify-between gap-4 sm:gap-6 p-5 pb-10 sm:p-10 md:p-14 text-white transition-all duration-700`}
        >
          {/* Text Content */}
          <div className="relative z-10 w-full md:max-w-xl text-left space-y-2.5 sm:space-y-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full border border-white/30 text-white">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" /> {currentSlide.tag}
            </span>

            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight drop-shadow-sm">
                {currentSlide.title}{" "}
                <br className="hidden sm:inline" />
                <span className="text-amber-200 underline decoration-amber-300/60 decoration-wavy">
                  {currentSlide.highlight}
                </span>
              </h1>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-white/90 font-medium leading-relaxed max-w-lg line-clamp-2 sm:line-clamp-none">
              {currentSlide.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 sm:pt-2">
              <Link
                to={currentSlide.ctaLink}
                className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-amber-100 font-extrabold text-xs sm:text-sm px-5 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer group/btn"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <span className="text-[10px] sm:text-[11px] text-white/80 hidden sm:inline-block">
                {currentSlide.terms}
              </span>
            </div>
          </div>

          {/* Banner Hero Image */}
          <div className="relative z-10 w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] md:w-96 h-36 sm:h-56 md:h-72 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white/20 md:rotate-1 group-hover:rotate-0 transition-transform duration-500">
              <img
                src={currentSlide.image}
                alt={currentSlide.highlight}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Previous / Next Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="hidden sm:block absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-md transition opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="hidden sm:block absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-md transition opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
          {BANNER_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIdx === i ? "w-6 sm:w-8 bg-white" : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 3 PROMO CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-1">
        {/* Card 1 */}
        <Link
          to="/products?category=beauty"
          className="relative overflow-hidden rounded-2xl bg-linear-to-r from-amber-100 via-orange-50 to-amber-50 p-3.5 sm:p-4 border border-amber-200/70 hover:shadow-md transition flex items-center justify-between gap-2 group cursor-pointer"
        >
          <div className="min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-200/70 px-2 py-0.5 rounded">
              Daily Essentials
            </span>
            <h4 className="text-sm sm:text-base font-extrabold text-gray-900 mt-1">
              Personal Care & Glow
            </h4>
            <p className="text-[11px] sm:text-xs text-gray-600 mt-0.5">
              Up to 40% Off on Shampoos, Soaps & Creams
            </p>
          </div>
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shadow-xs shrink-0">
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&auto=format&fit=crop&q=80"
              alt="Care"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
            />
          </div>
        </Link>

        {/* Card 2 */}
        <Link
          to="/products?category=electronics"
          className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-50 via-indigo-50 to-white p-3.5 sm:p-4 border border-blue-200/70 hover:shadow-md transition flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="bg-red-600 text-white font-black text-[10px] uppercase px-2 py-0.5 rounded">
                DEALS
              </span>
              <span className="text-xs font-bold text-gray-700">Electronics</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-extrabold text-blue-700 shrink-0">
              <CreditCard className="w-3.5 h-3.5" /> Bank Offers
            </div>
          </div>

          <div className="mt-1.5">
            <p className="text-[11px] font-semibold text-gray-500">UP TO</p>
            <p className="text-base sm:text-xl font-black text-blue-900 leading-tight">
              ₹25,000 INSTANT DISCOUNT*
            </p>
          </div>

          <p className="text-[10px] text-gray-400 mt-1 truncate">
            IndusInd • Axis • HDFC • SBI Card • YES BANK
          </p>
        </Link>

        {/* Card 3 */}
        <Link
          to="/offers"
          className="sm:col-span-2 lg:col-span-1 relative overflow-hidden rounded-2xl bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 p-3.5 sm:p-4 text-white hover:shadow-md transition flex items-center justify-between gap-2 group cursor-pointer"
        >
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
              SrisCart Maha Cashback
            </span>
            <h4 className="text-base sm:text-lg font-black leading-tight">
              Get Up to ₹500 Cashback
            </h4>
            <p className="text-[11px] sm:text-xs text-amber-100 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-white text-white shrink-0" /> Code: <strong>SRISFIRST</strong>
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[11px] sm:text-xs font-extrabold bg-white text-amber-600 px-3 py-1.5 rounded-full shadow-sm group-hover:scale-105 inline-block transition whitespace-nowrap">
              Use It Now →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainBanner;
