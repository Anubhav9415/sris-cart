import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  ShoppingCart,
  Zap,
  Truck,
  ShieldCheck,
  RefreshCw,
  MapPin,
  Tag,
  CheckCircle2,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";
import { CURRENCY } from "../constants";
import { addToCart as addToCartAction } from "../store/cartSlice";
import { toggleWishlist, selectIsInWishlist } from "../store/wishlistSlice";
import ProductCard from "../components/ProductCard";
import { RootState, AppDispatch } from "../store";
import toast from "react-hot-toast";

const SAMPLE_REVIEWS = [
  {
    author: "Rahul Sharma",
    location: "Vadodara, Gujarat",
    rating: 5,
    date: "2 days ago",
    comment: "Delivered in under 12 minutes! Fresh quality and excellent packing. SrisCart has become my everyday go-to store.",
    verified: true,
  },
  {
    author: "Pooja Patel",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    date: "1 week ago",
    comment: "Authentic product with genuine brand warranty. Price is noticeably cheaper than other quick commerce platforms.",
    verified: true,
  },
  {
    author: "Amit Verma",
    location: "Surat, Gujarat",
    rating: 4,
    date: "2 weeks ago",
    comment: "Very good experience. Customer service responded quickly when I needed to update my delivery instructions.",
    verified: true,
  },
];

const ProductDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();

  const products = useSelector((state: RootState) => state.products.products);
  const product = products.find((item) => item._id === id);

  const [thumbnail, setThumbnail] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("390019");
  const [deliveryResult, setDeliveryResult] = useState({
    checked: true,
    available: true,
    time: "9-15 mins Express Delivery",
    location: "Vadodara Central",
  });

  const isInWishlist = useSelector((state: RootState) =>
    product ? selectIsInWishlist(product._id)(state) : false
  );

  useEffect(() => {
    if (product) {
      const firstImg =
        Array.isArray(product.image) && product.image.length > 0
          ? product.image[0]
          : "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600";
      setThumbnail(firstImg);
      window.scrollTo(0, 0);
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-black text-gray-800">Product Not Found</h2>
        <p className="text-sm text-gray-500 mt-2">
          The requested product may have been moved or is currently out of stock.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="mt-6 px-6 py-2.5 bg-amber-500 text-white font-bold rounded-xl cursor-pointer"
        >
          Browse All Products
        </button>
      </div>
    );
  }

  const images =
    Array.isArray(product.image) && product.image.length > 0
      ? product.image
      : ["https://images.unsplash.com/photo-1542838132-92c53300491e?w=600"];

  const discountPercent =
    product.discount ||
    (product.price && product.offerPrice
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p._id !== product._id)
    .slice(0, 5);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCartAction(product._id));
    }
    toast.success(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleBuyNow = () => {
    dispatch(addToCartAction(product._id));
    navigate("/cart");
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
    if (isInWishlist) {
      toast.success("Removed from Wishlist");
    } else {
      toast.success("Saved to Wishlist! ❤️");
    }
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pincode.trim())) {
      const isVadodara = pincode.trim().startsWith("390");
      setDeliveryResult({
        checked: true,
        available: true,
        time: isVadodara ? "9-15 mins Express Delivery" : "Standard Delivery in 2-3 Days",
        location: isVadodara ? "Vadodara Hub" : "Regional Logistics",
      });
      toast.success("Pincode verified for delivery!");
    } else {
      toast.error("Please enter a valid 6-digit Indian Pincode");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 overflow-x-auto whitespace-nowrap no-scrollbar">
        <Link to="/" className="hover:text-amber-600 transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        <Link to="/products" className="hover:text-amber-600 transition">
          Products
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        <Link
          to={`/products?category=${encodeURIComponent((product.category || "").toLowerCase())}`}
          className="hover:text-amber-600 transition"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        <span className="text-gray-800 font-bold truncate max-w-[180px] sm:max-w-xs">{product.name}</span>
      </nav>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-xs">
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto max-h-96 no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setThumbnail(img)}
                  className={`w-14 h-14 sm:w-20 sm:h-20 rounded-xl overflow-hidden p-1 bg-gray-50 border-2 transition cursor-pointer shrink-0 ${
                    thumbnail === img
                      ? "border-amber-500 shadow-xs"
                      : "border-gray-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Primary View */}
          <div className="relative flex-1 bg-gray-50/60 rounded-2xl p-4 sm:p-6 flex items-center justify-center min-h-[240px] sm:min-h-[360px] md:min-h-[420px] overflow-hidden border border-gray-100">
            <img
              src={thumbnail || images[0]}
              alt={product.name}
              className="max-h-60 sm:max-h-80 md:max-h-96 max-w-full object-contain transition-transform duration-300 hover:scale-105"
            />

            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-linear-to-r from-red-500 to-amber-500 text-white font-black text-xs px-3 py-1 rounded-md shadow-xs">
                {discountPercent}% OFF
              </span>
            )}

            <button
              onClick={handleToggleWishlist}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white shadow-md hover:scale-110 transition cursor-pointer"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isInWishlist ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Right Column: Product Info & Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Brand & Category */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              {product.brand && (
                <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded">
                  {product.brand}
                </span>
              )}
              <span className="text-xs font-semibold text-gray-500">
                {product.category}
              </span>
              {product.unit && (
                <span className="text-xs text-gray-400">
                  • Pack Size: <strong className="text-gray-700">{product.unit}</strong>
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-snug">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-emerald-600 text-white text-xs font-black px-2.5 py-1 rounded-md">
              <span>{product.rating || 4.7}</span>
              <Star className="w-3.5 h-3.5 fill-white" />
            </div>
            <span className="text-xs text-gray-500 font-medium">
              ({(product.reviewsCount || 2400).toLocaleString()} Verified Ratings & Reviews)
            </span>
          </div>

          {/* Price Stack */}
          <div className="py-3 px-3.5 sm:px-4 bg-amber-50/60 rounded-2xl border border-amber-200/60 flex flex-wrap items-baseline gap-2 sm:gap-3">
            <span className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
              {CURRENCY}{Number(product.offerPrice).toLocaleString("en-IN")}
            </span>
            {product.price > product.offerPrice && (
              <>
                <span className="text-sm sm:text-base text-gray-400 line-through">
                  MRP {CURRENCY}{Number(product.price).toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
                  Save {CURRENCY}{Number(product.price - product.offerPrice).toLocaleString("en-IN")} ({discountPercent}%)
                </span>
              </>
            )}
            <span className="text-[11px] text-gray-500 ml-auto hidden sm:inline">
              (Inclusive of all taxes)
            </span>
          </div>

          {/* Available Offers Box */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-amber-600" /> Available Offers
            </p>
            <ul className="text-xs text-gray-600 space-y-1.5">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span>
                  <strong>SRISFIRST</strong>: Flat ₹100 Off on orders above ₹499
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span>
                  <strong>FESTIVE20</strong>: Extra 20% instant discount up to ₹500
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span>
                  <strong>Bank Offer</strong>: 10% Instant Discount on HDFC & SBI Credit Cards
                </span>
              </li>
            </ul>
          </div>

          {/* Delivery & Pincode Checker */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600" /> Delivery Details
            </label>
            <form onSubmit={handleCheckPincode} className="flex gap-2 max-w-md">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 6-digit Pincode"
                className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-amber-500 outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Check
              </button>
            </form>
            {deliveryResult.checked && (
              <p className="text-xs text-emerald-700 font-bold flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{deliveryResult.time} ({deliveryResult.location})</span>
              </p>
            )}
          </div>

          {/* Action Buttons & Quantity */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
            <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden w-full sm:w-auto">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3.5 py-3 bg-gray-50 hover:bg-gray-100 font-black text-sm text-gray-700 cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-5 py-3 font-black text-sm text-gray-800 text-center min-w-12">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3.5 py-3 bg-gray-50 hover:bg-gray-100 font-black text-sm text-gray-700 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-linear-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-black text-sm rounded-xl shadow-md transition cursor-pointer active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gray-900 hover:bg-black text-white font-black text-sm rounded-xl shadow-md transition cursor-pointer active:scale-95"
            >
              <Zap className="w-4 h-4 text-amber-400" /> Buy Now
            </button>
          </div>

          {/* Features Strip */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-center">
            <div className="flex flex-col items-center">
              <Truck className="w-5 h-5 text-amber-600 mb-1" />
              <span className="text-xs font-bold text-gray-800">Superfast Delivery</span>
              <span className="text-[10px] text-gray-400">9-30 mins Vadodara</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
              <span className="text-xs font-bold text-gray-800">100% Genuine</span>
              <span className="text-[10px] text-gray-400">Direct Brand Warranty</span>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="w-5 h-5 text-blue-600 mb-1" />
              <span className="text-xs font-bold text-gray-800">Easy Returns</span>
              <span className="text-[10px] text-gray-400">Doorstep pickup</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xs">
        {/* Description */}
        <div className="space-y-3">
          <h3 className="text-lg font-black text-gray-900 border-b border-gray-100 pb-2">
            Product Highlights
          </h3>
          {Array.isArray(product.description) && product.description.length > 0 ? (
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
              {product.description.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Premium quality product from trusted brand.</p>
          )}
        </div>

        {/* Specifications */}
        <div className="space-y-3">
          <h3 className="text-lg font-black text-gray-900 border-b border-gray-100 pb-2">
            Specifications
          </h3>
          {product.specifications && Object.keys(product.specifications).length > 0 ? (
            <div className="divide-y divide-gray-100 text-xs sm:text-sm">
              {Object.entries(product.specifications).map(([key, val], idx) => (
                <div key={idx} className="py-2 flex justify-between">
                  <span className="font-semibold text-gray-500">{key}</span>
                  <span className="font-bold text-gray-800 text-right">{val}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-100 text-xs sm:text-sm">
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-gray-500">Category</span>
                <span className="font-bold text-gray-800">{product.category}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-gray-500">In Stock</span>
                <span className="font-bold text-emerald-600">Yes, Available</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-black text-gray-900">Customer Ratings & Reviews</h3>
            <p className="text-xs text-gray-500">Based on verified purchases in Gujarat</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-emerald-600 text-white font-black text-sm px-3 py-1 rounded-lg">
              <span>{product.rating || 4.7}</span>
              <Star className="w-4 h-4 fill-white" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_REVIEWS.map((rev, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                </div>
                <span className="text-[10px] text-gray-400">{rev.date}</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed italic">"{rev.comment}"</p>
              <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-[11px]">
                <span className="font-bold text-gray-800">{rev.author}</span>
                <span className="text-gray-400">{rev.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-gray-900">Similar Products You May Like</h3>
            <Link
              to={`/products?category=${encodeURIComponent((product.category || "").toLowerCase())}`}
              className="text-xs font-bold text-amber-600 hover:underline"
            >
              View More In {product.category} →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel._id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
