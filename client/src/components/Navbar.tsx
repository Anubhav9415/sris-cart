import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ShoppingCart,
  Heart,
  Clock,
  Search,
  MapPin,
  ChevronDown,
  User,
  Zap,
  Menu,
  X,
  Home as HomeIcon,
  ShoppingBag,
  LogOut,
  Package,
} from "lucide-react";
import { RootState, AppDispatch } from "../store";
import { setShowUserLogin as setShowUserLoginAction, logoutUserThunk } from "../store/authSlice";
import { setSearchQuery as setSearchQueryAction, selectCartCount, selectCartTotal } from "../store/cartSlice";
import { selectWishlistCount } from "../store/wishlistSlice";
import { CURRENCY } from "../constants";
import LocationModal from "./LocationModal";
import MegaMenu from "./MegaMenu";
import toast from "react-hot-toast";

const ROTATING_SEARCH_TERMS = [
  "Fruits & Vegetables",
  "Smartphones & 5G Mobiles",
  "Amul Butter & Dairy",
  "Sony Headphones & Audio",
  "Smart TVs & Appliances",
  "Casual Shirts & Fashion",
  "Air Fryers & Kitchen Essentials",
];

const SECOND_NAV_CATEGORIES = [
  { id: "home", label: "My Home", path: "/", icon: HomeIcon, isHome: true },
  { id: "groceries", label: "Groceries", path: "/products?category=groceries", hasMega: true },
  { id: "mobiles", label: "Mobiles", path: "/products?category=mobiles", hasMega: true },
  { id: "electronics", label: "Electronics", path: "/products?category=electronics", hasMega: true },
  { id: "appliances", label: "Appliances", path: "/products?category=appliances", hasMega: true },
  { id: "fashion", label: "Fashion", path: "/products?category=fashion", hasMega: true },
  { id: "beauty", label: "Beauty", path: "/products?category=beauty", hasMega: true },
  { id: "home-kitchen", label: "Home & Kitchen", path: "/products?category=home%20%26%20kitchen", hasMega: true },
  { id: "furniture", label: "Furniture", path: "/products?category=furniture" },
  { id: "toys-baby", label: "Toys & Baby Care", path: "/products?category=toys%20%26%20baby%20care" },
  { id: "sports", label: "Sports & Fitness", path: "/products?category=sports%20%26%20fitness" },
  { id: "pharmacy", label: "Pharmacy", path: "/products?category=pharmacy" },
  { id: "coupons", label: "Coupons & Offers", path: "/offers", isOffer: true },
];

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state: RootState) => state.auth.user);
  const cartCount = useSelector(selectCartCount);
  const cartTotal = useSelector(selectCartTotal);
  const wishlistCount = useSelector(selectWishlistCount);
  const products = useSelector((state: RootState) => state.products.products);

  const [searchInput, setSearchInput] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState<string | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const [deliveryLocation, setDeliveryLocation] = useState(() => {
    try {
      const saved = localStorage.getItem("sriscart_location");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    return {
      address: "Uma Society, Ajwa Road",
      city: "Vadodara, Gujarat",
      pincode: "390019",
      deliveryTime: "9 mins",
    };
  });

  const handleSelectLocation = (loc: typeof deliveryLocation) => {
    setDeliveryLocation(loc);
    try {
      localStorage.setItem("sriscart_location", JSON.stringify(loc));
    } catch {
      // ignore storage errors
    }
    toast.success(`Delivery address updated to ${loc.address}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % ROTATING_SEARCH_TERMS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const inDesktopSearch = desktopSearchRef.current?.contains(target);
      const inMobileSearch = mobileSearchRef.current?.contains(target);
      if (!inDesktopSearch && !inMobileSearch) {
        setShowSuggestions(false);
      }
      if (navContainerRef.current && !navContainerRef.current.contains(target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaCategory(null);
  }, [location.pathname, location.search]);

  const suggestions =
    searchInput.trim().length > 1
      ? products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
              (p.brand && p.brand.toLowerCase().includes(searchInput.toLowerCase())) ||
              p.category.toLowerCase().includes(searchInput.toLowerCase())
          )
          .slice(0, 6)
      : [];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchInput.trim()) {
      dispatch(setSearchQueryAction(searchInput.trim()));
      setShowSuggestions(false);
      navigate(`/products?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleSelectSuggestion = (product: any) => {
    setShowSuggestions(false);
    setSearchInput(product.name);
    navigate(`/products/${(product.category || "all").toLowerCase()}/${product._id}`);
  };

  const handleLogout = async () => {
    try {
      const data = await dispatch(logoutUserThunk()).unwrap();
      if (data.success) {
        toast.success(data.message || "Logged out successfully");
        setUserDropdownOpen(false);
        setMobileMenuOpen(false);
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to log out");
    }
  };

  const renderSuggestionsDropdown = () =>
    showSuggestions &&
    suggestions.length > 0 && (
      <div className="absolute top-full left-0 w-full mt-1.5 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in duration-150">
        <div className="px-3 py-2 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between">
          <span>Suggested Products</span>
          <span className="text-amber-600 font-semibold">{suggestions.length} matches</span>
        </div>
        <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
          {suggestions.map((item) => (
            <div
              key={item._id}
              onClick={() => handleSelectSuggestion(item)}
              className="flex items-center gap-3 p-2.5 hover:bg-amber-50/60 cursor-pointer transition"
            >
              <img
                src={Array.isArray(item.image) ? item.image[0] : item.image}
                alt={item.name}
                className="w-9 h-9 object-contain rounded-md bg-gray-50 p-1 border border-gray-100 shrink-0"
              />
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs font-semibold text-gray-800 truncate">{item.name}</p>
                <p className="text-[10px] text-gray-400 truncate">
                  {item.brand ? `${item.brand} • ` : ""}
                  {item.category}
                </p>
              </div>
              <span className="text-xs font-bold text-amber-600 shrink-0">
                {CURRENCY}
                {Number(item.offerPrice).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <>
      <header
        ref={navContainerRef}
        className="sticky top-0 z-40 bg-white border-b border-gray-200/90 shadow-2xs transition-all w-full"
      >
        {/* ─────────────────────────────────────────────────────────────
            ROW 1: BRAND + LOCATION (MD+) + DESKTOP SEARCH + ACTION ICONS
            ───────────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-2 md:gap-4">
          {/* Left: Hamburger (< lg) + Logo */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-gray-700 hover:text-amber-600 hover:bg-gray-100 rounded-lg cursor-pointer transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>

            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group cursor-pointer select-none">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-linear-to-br from-amber-400 via-amber-500 to-orange-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
                <ShoppingBag className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-black bg-linear-to-r from-amber-500 via-amber-600 to-orange-600 bg-clip-text text-transparent tracking-tight leading-none">
                  SrisCart
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold text-gray-400 mt-0.5 tracking-wider uppercase hidden xs:block">
                  India's Best Store
                </span>
              </div>
            </Link>
          </div>

          {/* Quick & Shop All Pills (xl+) */}
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <button
              onClick={() => navigate("/products?category=groceries")}
              className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-xs transition duration-200 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-white" /> Quick
            </button>
            <button
              onClick={() => navigate("/products")}
              className="text-xs font-bold text-gray-700 hover:text-amber-600 px-2 py-1.5 rounded-full transition cursor-pointer"
            >
              Shop all
            </button>
          </div>

          {/* Delivery Location & Time Selector (md+) */}
          <div
            onClick={() => setShowLocationModal(true)}
            className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 cursor-pointer transition select-none group shrink-0"
          >
            <div className="bg-red-800 text-white text-[10px] font-extrabold uppercase px-2 py-1 rounded-md tracking-wider flex items-center gap-1 shadow-2xs">
              <span>Delivery in</span>
              <span className="text-amber-300">{deliveryLocation.deliveryTime}</span>
            </div>

            <div className="flex flex-col text-left">
              <span className="text-[11px] font-bold text-gray-800 flex items-center gap-1 group-hover:text-amber-600">
                <MapPin className="w-3 h-3 text-amber-500" /> Location <ChevronDown className="w-3 h-3 text-gray-400" />
              </span>
              <span className="text-[11px] text-gray-500 truncate max-w-[140px] lg:max-w-[170px]">
                {deliveryLocation.address}, {deliveryLocation.pincode}
              </span>
            </div>
          </div>

          {/* Desktop Search Bar (lg+ inline in Row 1) */}
          <div ref={desktopSearchRef} className="hidden lg:block relative flex-1 max-w-xl mx-2">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
              <Search className="w-4 h-4 absolute left-3.5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder={`Search for '${ROTATING_SEARCH_TERMS[placeholderIndex]}' ...`}
                className="w-full pl-9 pr-10 py-2.5 text-sm bg-gray-50/80 hover:bg-gray-100/80 focus:bg-white border border-gray-200 focus:border-amber-400 rounded-full outline-hidden transition shadow-2xs focus:ring-2 focus:ring-amber-200"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput("")}
                  className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
            {renderSuggestionsDropdown()}
          </div>

          {/* Right Side Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* Offers Icon */}
            <Link
              to="/offers"
              title="Offers & Discounts"
              className="hidden sm:flex p-1.5 sm:p-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-full transition items-center justify-center cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-black text-xs">
                %
              </div>
            </Link>

            {/* Orders Icon */}
            <Link
              to="/my-orders"
              title="Order History"
              className="hidden sm:flex p-2 text-gray-600 hover:text-amber-600 hover:bg-gray-100 rounded-full transition items-center justify-center cursor-pointer"
            >
              <Clock className="w-5 h-5" />
            </Link>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              title="Wishlist"
              className="relative p-1.5 sm:p-2 text-gray-600 hover:text-red-500 hover:bg-gray-100 rounded-full transition flex items-center justify-center cursor-pointer"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? "fill-red-500 text-red-500" : ""}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 text-[10px] font-black text-white bg-red-500 min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon & Total */}
            <Link
              to="/cart"
              title="Shopping Cart"
              className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:px-3 sm:py-1.5 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 rounded-full transition cursor-pointer group"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 text-[9px] sm:text-[10px] font-black text-white bg-amber-600 min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-gray-500 font-medium leading-none">Cart</span>
                <span className="text-xs font-black text-gray-900 leading-tight">
                  {CURRENCY}
                  {Number(cartTotal).toLocaleString("en-IN")}
                </span>
              </div>
            </Link>

            {/* User Profile / Login */}
            {!user ? (
              <button
                onClick={() => dispatch(setShowUserLoginAction(true))}
                className="flex items-center gap-1 px-3 sm:px-4 py-1.5 bg-linear-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold text-[11px] sm:text-xs rounded-full shadow-xs transition duration-200 cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1 p-0.5 rounded-full hover:ring-2 hover:ring-amber-300 transition cursor-pointer"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-amber-500 to-orange-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
                    {(user.name || user.email || "U").charAt(0).toUpperCase()}
                  </div>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-50 text-xs animate-in fade-in duration-150">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-bold text-gray-800 truncate">{user.name || "My Account"}</p>
                      <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-amber-50 text-gray-700 font-medium cursor-pointer"
                    >
                      <User className="w-4 h-4 text-gray-400" /> My Profile
                    </Link>
                    <Link
                      to="/my-orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-amber-50 text-gray-700 font-medium cursor-pointer"
                    >
                      <Package className="w-4 h-4 text-gray-400" /> My Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-amber-50 text-gray-700 font-medium cursor-pointer"
                    >
                      <Heart className="w-4 h-4 text-gray-400" /> My Wishlist
                    </Link>
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 font-semibold text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            MOBILE & TABLET SUB-BARS (< lg): LOCATION + FULL-WIDTH SEARCH
            ───────────────────────────────────────────────────────────── */}
        <div className="lg:hidden px-3 sm:px-6 pb-2.5 space-y-2 border-t border-gray-100/80 pt-2 bg-white">
          {/* Mobile Location & Quick Bar (< md) */}
          <div className="md:hidden flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-1.5 text-left min-w-0 flex-1 py-1 px-2 rounded-xl bg-amber-50/70 border border-amber-200/70 cursor-pointer"
            >
              <span className="bg-red-700 text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded shrink-0">
                ⚡ {deliveryLocation.deliveryTime}
              </span>
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="text-[11px] font-semibold text-gray-700 truncate">
                {deliveryLocation.address}, {deliveryLocation.pincode}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 shrink-0 ml-auto" />
            </button>

            <button
              type="button"
              onClick={() => navigate("/products?category=groceries")}
              className="flex items-center gap-1 bg-amber-500 text-white font-extrabold text-[10px] px-2.5 py-1.5 rounded-full shrink-0 shadow-2xs cursor-pointer"
            >
              <Zap className="w-3 h-3 fill-white" /> Quick
            </button>
          </div>

          {/* Mobile/Tablet Full-Width Search Bar */}
          <div ref={mobileSearchRef} className="relative w-full">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
              <Search className="w-4 h-4 absolute left-3.5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder={`Search '${ROTATING_SEARCH_TERMS[placeholderIndex]}'`}
                className="w-full pl-9 pr-16 py-2 text-xs sm:text-sm bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-400 rounded-full outline-hidden transition"
              />
              {searchInput ? (
                <button
                  type="button"
                  onClick={() => setSearchInput("")}
                  className="absolute right-12 p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : null}
              <button
                type="submit"
                className="absolute right-1.5 px-2.5 py-1 bg-amber-500 text-white text-[11px] font-bold rounded-full cursor-pointer"
              >
                Go
              </button>
            </form>
            {renderSuggestionsDropdown()}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SECOND NAVIGATION BAR (13 Horizontal Category Pills + Desktop MegaMenu)
            ───────────────────────────────────────────────────────────── */}
        <div className="border-t border-gray-100 bg-white relative">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1.5 no-scrollbar scroll-smooth">
              {SECOND_NAV_CATEGORIES.map((item) => {
                const isHome = item.isHome;
                const isOffer = item.isOffer;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => {
                      if (item.hasMega && window.innerWidth >= 1024) {
                        setActiveMegaCategory(item.label);
                      }
                    }}
                    className="relative shrink-0"
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive: navActive }) => `
                        flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-150 cursor-pointer select-none whitespace-nowrap
                        ${
                          isHome && location.pathname === "/"
                            ? "bg-amber-500 text-white shadow-2xs hover:bg-amber-600"
                            : isHome
                            ? "text-gray-700 hover:bg-gray-100"
                            : isOffer
                            ? "text-red-600 bg-red-50 hover:bg-red-100 font-extrabold"
                            : navActive || activeMegaCategory === item.label
                            ? "text-amber-700 bg-amber-50"
                            : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                        }
                      `}
                    >
                      {item.icon && <item.icon className="w-3.5 h-3.5" />}
                      <span>{item.label}</span>
                      {item.hasMega && (
                        <ChevronDown className="hidden lg:inline w-3 h-3 text-gray-400" />
                      )}
                    </NavLink>
                  </div>
                );
              })}
            </nav>
          </div>

          {activeMegaCategory && (
            <div className="hidden lg:block">
              <MegaMenu
                category={activeMegaCategory}
                onClose={() => setActiveMegaCategory(null)}
              />
            </div>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            MOBILE & TABLET NAVIGATION DRAWER (< lg)
            ───────────────────────────────────────────────────────────── */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white p-4 space-y-4 max-h-[75dvh] overflow-y-auto shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Location Box */}
            <div
              onClick={() => {
                setShowLocationModal(true);
                setMobileMenuOpen(false);
              }}
              className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl flex items-center justify-between gap-2 cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">
                    {deliveryLocation.address}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {deliveryLocation.city} - {deliveryLocation.pincode}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-amber-700 bg-white px-2.5 py-1 rounded-lg shadow-2xs shrink-0">
                Change
              </span>
            </div>

            {/* Account Section */}
            {!user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  dispatch(setShowUserLoginAction(true));
                }}
                className="w-full py-2.5 bg-linear-to-r from-yellow-400 to-amber-500 text-white font-bold rounded-xl text-center text-sm shadow-xs cursor-pointer"
              >
                Sign In / Create Account
              </button>
            ) : (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">{user.name}</p>
                  <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-bold text-amber-600 px-2 py-1"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* Quick Account Links */}
            <div className="grid grid-cols-3 gap-2">
              <Link
                to="/my-orders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-gray-50 hover:bg-amber-50 text-gray-700 text-xs font-bold gap-1"
              >
                <Package className="w-4 h-4 text-amber-600" />
                <span>Orders</span>
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-gray-50 hover:bg-amber-50 text-gray-700 text-xs font-bold gap-1"
              >
                <Heart className="w-4 h-4 text-red-500" />
                <span>Wishlist ({wishlistCount})</span>
              </Link>
              <Link
                to="/offers"
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-gray-50 hover:bg-amber-50 text-gray-700 text-xs font-bold gap-1"
              >
                <span className="font-black text-amber-600 text-sm leading-none">%</span>
                <span>Offers</span>
              </Link>
            </div>

            {/* Categories Grid */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase text-gray-400 px-1">
                Shop By Department
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {SECOND_NAV_CATEGORIES.map((c) => (
                  <Link
                    key={c.id}
                    to={c.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-gray-50/70 hover:bg-amber-50 hover:text-amber-700 transition truncate"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        currentLocation={deliveryLocation}
        onSelectLocation={handleSelectLocation}
      />
    </>
  );
};

export default Navbar;
