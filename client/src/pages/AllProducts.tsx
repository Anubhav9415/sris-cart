import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { RootState, AppDispatch } from "../store";
import { setSearchQuery } from "../store/cartSlice";
import { Filter, SlidersHorizontal, X, Search, Sparkles, Check } from "lucide-react";
import { CURRENCY } from "../constants";

const ALL_CATEGORIES = [
  "All",
  "Groceries",
  "Mobiles",
  "Electronics",
  "Appliances",
  "Fashion",
  "Beauty",
  "Home & Kitchen",
  "Toys & Baby Care",
];

const POPULAR_BRANDS = [
  "All",
  "Amul",
  "Apple",
  "Samsung",
  "Sony",
  "boAt",
  "LG",
  "Philips",
  "Tata",
  "Levi's",
  "Mamaearth",
  "Minimalist",
  "Lakme",
];

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹499", min: 0, max: 499 },
  { label: "₹500 - ₹2,000", min: 500, max: 2000 },
  { label: "₹2,000 - ₹10,000", min: 2000, max: 10000 },
  { label: "Above ₹10,000", min: 10000, max: Infinity },
];

const AllProducts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();

  const products = useSelector((state: RootState) => state.products.products);
  const reduxSearchQuery = useSelector((state: RootState) => state.cart.searchQuery);

  // Filters state
  const queryParamSearch = searchParams.get("search") || "";
  const queryParamCategory = searchParams.get("category") || "";

  const [searchTerm, setSearchTerm] = useState(queryParamSearch || reduxSearchQuery || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    queryParamCategory
      ? ALL_CATEGORIES.find((c) => c.toLowerCase() === queryParamCategory.toLowerCase()) || "All"
      : "All"
  );
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync when query params change
  useEffect(() => {
    if (queryParamSearch) {
      setSearchTerm(queryParamSearch);
    }
    if (queryParamCategory) {
      const match = ALL_CATEGORIES.find(
        (c) => c.toLowerCase() === queryParamCategory.toLowerCase()
      );
      if (match) setSelectedCategory(match);
    }
  }, [queryParamSearch, queryParamCategory]);

  // Handle Search Input
  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    dispatch(setSearchQuery(val));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedBrand("All");
    setSelectedPriceRange(0);
    setMinRating(0);
    setSortBy("featured");
    setSearchParams({});
    dispatch(setSearchQuery(""));
  };

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Text Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand ? product.brand.toLowerCase().includes(query) : false;
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCategory) return false;
      }

      // 2. Category Filter
      if (selectedCategory !== "All") {
        if (product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // 3. Brand Filter
      if (selectedBrand !== "All") {
        if (!product.brand || product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }
      }

      // 4. Price Filter
      const priceConfig = PRICE_RANGES[selectedPriceRange];
      if (product.offerPrice < priceConfig.min || product.offerPrice > priceConfig.max) {
        return false;
      }

      // 5. Rating Filter
      if (minRating > 0) {
        if (!product.rating || product.rating < minRating) return false;
      }

      return true;
    });
  }, [products, searchTerm, selectedCategory, selectedBrand, selectedPriceRange, minRating]);

  // Sort
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.offerPrice - b.offerPrice);
      case "price-desc":
        return list.sort((a, b) => b.offerPrice - a.offerPrice);
      case "rating":
        return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "bestseller":
        return list.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
      case "discount":
        return list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default:
        return list;
    }
  }, [filteredProducts, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header & Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {selectedCategory === "All" ? "All Products" : `${selectedCategory}`}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Showing <strong className="text-gray-900">{sortedProducts.length}</strong> items
            {searchTerm ? ` for "${searchTerm}"` : ""}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Filter Search Box */}
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Filter by name or brand..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-400 outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-400 outline-none cursor-pointer"
          >
            <option value="featured">Sort: Featured</option>
            <option value="bestseller">Sort: Best Sellers</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="discount">Biggest Discount</option>
          </select>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-amber-500 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Sidebar Filters (Desktop + Mobile Drawer) */}
        <div
          className={`
            bg-white p-5 rounded-3xl border border-gray-200/90 shadow-xs space-y-6 md:block
            ${mobileFilterOpen ? "block" : "hidden"}
          `}
        >
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-extrabold text-gray-900 text-sm flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-amber-600" /> Filter Catalog
            </h3>
            <button
              onClick={handleClearFilters}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Categories Filter */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-600 block">
              Categories
            </label>
            <div className="space-y-1">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                    selectedCategory === cat
                      ? "bg-amber-500 text-white font-bold shadow-2xs"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <label className="text-xs font-black uppercase tracking-wider text-gray-600 block">
              Price Range
            </label>
            <div className="space-y-1">
              {PRICE_RANGES.map((pr, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPriceRange(idx)}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                    selectedPriceRange === idx
                      ? "bg-amber-50 text-amber-700 font-bold border border-amber-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{pr.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <label className="text-xs font-black uppercase tracking-wider text-gray-600 block">
              Top Brands
            </label>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_BRANDS.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    selectedBrand === b
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <label className="text-xs font-black uppercase tracking-wider text-gray-600 block">
              Customer Rating
            </label>
            <div className="space-y-1">
              {[0, 4.5, 4.0].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                    minRating === rating
                      ? "bg-amber-50 text-amber-700 font-bold border border-amber-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{rating === 0 ? "All Ratings" : `${rating}★ & Above`}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid (3 cols on desktop) */}
        <div className="md:col-span-3 space-y-6">
          {sortedProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">No Matching Products</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                We couldn't find any products matching your active filters. Try clearing your search term or adjusting filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {sortedProducts.map((prod) => (
                <ProductCard key={prod._id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
