import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MainBanner from "../components/MainBanner";
import Categories from "../components/Categories";
import ProductCarouselSection from "../components/ProductCarouselSection";
import TopBrands from "../components/TopBrands";
import RecipeBundles from "../components/RecipeBundles";
import NewsLetter from "../components/NewsLetter";
import BottomBanner from "../components/BottomBanner";
import { Zap, ShieldCheck, Truck, Clock } from "lucide-react";

const Home: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);

  // 1. Popular Near You (Dairy & Fresh items like JioMart screenshot)
  const popularNearYou = useMemo(() => {
    return products.filter(
      (p) =>
        p.brand === "Amul" ||
        p.category.toLowerCase().includes("dairy") ||
        (p.category.toLowerCase().includes("grocer") && p.price < 300)
    );
  }, [products]);

  // 2. Best Sellers
  const bestSellers = useMemo(() => {
    return products.filter((p) => p.bestseller || (p.rating && p.rating >= 4.7));
  }, [products]);

  // 3. Trending Smartphones
  const trendingSmartphones = useMemo(() => {
    return products.filter((p) => p.category.toLowerCase().includes("mobile"));
  }, [products]);

  // 4. Electronics Deals
  const electronicsDeals = useMemo(() => {
    return products.filter((p) => p.category.toLowerCase().includes("electron"));
  }, [products]);

  // 5. Top Deals on Appliances
  const applianceDeals = useMemo(() => {
    return products.filter((p) => p.category.toLowerCase().includes("appliance"));
  }, [products]);

  // 6. Daily Grocery Essentials
  const groceryEssentials = useMemo(() => {
    return products.filter(
      (p) =>
        p.category.toLowerCase().includes("grocer") &&
        p.brand !== "Amul"
    );
  }, [products]);

  // 7. Recommended For You (Beauty, personal care & gadgets)
  const recommendedForYou = useMemo(() => {
    return products.filter(
      (p) =>
        p.category.toLowerCase().includes("beauty") ||
        p.category.toLowerCase().includes("toys")
    );
  }, [products]);

  // 8. Best of Fashion
  const bestOfFashion = useMemo(() => {
    return products.filter((p) => p.category.toLowerCase().includes("fashion"));
  }, [products]);

  // 9. Home & Kitchen Essentials
  const homeAndKitchen = useMemo(() => {
    return products.filter(
      (p) =>
        p.category.toLowerCase().includes("home") ||
        p.category.toLowerCase().includes("kitchen")
    );
  }, [products]);

  // 10. Deals Under ₹499
  const dealsUnder499 = useMemo(() => {
    return products.filter((p) => p.offerPrice <= 499);
  }, [products]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-8 md:pb-14">
      {/* 1. Main Hero Carousel & Promo Cards */}
      <MainBanner />

      {/* Trust Badges Strip */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 py-3 px-3 sm:px-4 bg-white rounded-2xl border border-gray-200/80 shadow-2xs">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-500 text-amber-500" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-black text-gray-800 truncate">Express 9 Mins</p>
              <p className="text-[9px] sm:text-[10px] text-gray-500 truncate">Superfast local delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-black text-gray-800 truncate">100% Genuine</p>
              <p className="text-[9px] sm:text-[10px] text-gray-500 truncate">Directly from brands</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-black text-gray-800 truncate">Free Delivery</p>
              <p className="text-[9px] sm:text-[10px] text-gray-500 truncate">On orders above ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-black text-gray-800 truncate">Easy Returns</p>
              <p className="text-[9px] sm:text-[10px] text-gray-500 truncate">Doorstep return pickup</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Shop By Category Cards */}
      <Categories />

      {/* 3. Popular Near You (JioMart screenshot layout) */}
      <ProductCarouselSection
        title="Popular Near You"
        subtitle="Top consumed fresh dairy & staples in Vadodara"
        badge="Instant Delivery"
        viewAllLink="/products?category=groceries"
        products={popularNearYou}
      />

      {/* 4. Best Sellers */}
      <ProductCarouselSection
        title="Best Sellers"
        subtitle="Customer favorites with 4.5+ star ratings"
        badge="Top Rated"
        viewAllLink="/products"
        products={bestSellers}
      />

      {/* 5. Trending Smartphones */}
      <ProductCarouselSection
        title="Trending Smartphones"
        subtitle="Latest 5G flagship & budget smartphones"
        badge="Extra ₹5,000 Off"
        viewAllLink="/products?category=mobiles"
        products={trendingSmartphones}
      />

      {/* 6. Electronics & Audio Deals */}
      <ProductCarouselSection
        title="Electronics & Audio Deals"
        subtitle="Wireless headphones, TWS earbuds, smartwatches & 4K TVs"
        badge="Up to 60% OFF"
        viewAllLink="/products?category=electronics"
        products={electronicsDeals}
      />

      {/* 7. Deals Under ₹499 */}
      <ProductCarouselSection
        title="Deals Under ₹499"
        subtitle="Pocket-friendly everyday essentials & gadgets"
        badge="Budget Friendly"
        viewAllLink="/products"
        products={dealsUnder499}
      />

      {/* 8. Top Deals on Appliances */}
      <ProductCarouselSection
        title="Top Deals on Appliances"
        subtitle="Refrigerators, washing machines, ACs & air fryers"
        badge="Warranty Included"
        viewAllLink="/products?category=appliances"
        products={applianceDeals}
      />

      {/* 9. Daily Grocery Essentials */}
      <ProductCarouselSection
        title="Daily Grocery Essentials"
        subtitle="Oils, Atta, Rice, Pulses, Snacks & Beverages"
        badge="Fresh Stock"
        viewAllLink="/products?category=groceries"
        products={groceryEssentials}
      />

      {/* 10. Best of Fashion & Lifestyle */}
      <ProductCarouselSection
        title="Best of Fashion & Lifestyle"
        subtitle="Trendy casual shirts, denim jeans, sneakers & watches"
        badge="Min 40% OFF"
        viewAllLink="/products?category=fashion"
        products={bestOfFashion}
      />

      {/* 11. Home & Kitchen Essentials */}
      <ProductCarouselSection
        title="Home & Kitchen Essentials"
        subtitle="Non-stick cookware, dinner sets, bedsheets & furniture"
        badge="Home Upgrade"
        viewAllLink="/products?category=home%20%26%20kitchen"
        products={homeAndKitchen}
      />

      {/* 12. Recommended For You */}
      <ProductCarouselSection
        title="Recommended For You"
        subtitle="Handpicked skincare, beauty & personal care treats"
        badge="Trending"
        viewAllLink="/products?category=beauty"
        products={recommendedForYou}
      />

      {/* 13. Top Official Brands */}
      <TopBrands />

      {/* 14. Bundles & Value Deals */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 my-4 sm:my-6">
        <RecipeBundles />
      </div>

      {/* 15. Promotional Bottom Banner */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 my-4 sm:my-6">
        <BottomBanner />
      </div>

      {/* 16. Newsletter */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 my-4 sm:my-6">
        <NewsLetter />
      </div>
    </div>
  );
};

export default Home;
