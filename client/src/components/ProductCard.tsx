import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Heart, Star, ShoppingCart, Eye, Plus, Minus } from "lucide-react";
import { RootState, AppDispatch } from "../store";
import { addToCart as addToCartAction, removeFromCart as removeFromCartAction } from "../store/cartSlice";
import { toggleWishlist, selectIsInWishlist } from "../store/wishlistSlice";
import { CURRENCY } from "../constants";
import { Product } from "../types";
import toast from "react-hot-toast";
import QuickViewModal from "./QuickViewModal";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showQuickView, setShowQuickView] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const isInWishlist = useSelector((state: RootState) =>
    selectIsInWishlist(product?._id)(state)
  );

  if (!product) return null;

  const quantityInCart = cartItems[product._id] || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCartAction(product._id));
    toast.success(`Added ${product.name} to cart!`);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCartAction(product._id));
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeFromCartAction(product._id));
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    if (isInWishlist) {
      toast.success("Removed from Wishlist");
    } else {
      toast.success("Saved to Wishlist! ❤️");
    }
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowQuickView(true);
  };

  const discountPercent =
    product.discount ||
    (product.price && product.offerPrice
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0);

  const primaryImage =
    Array.isArray(product.image) && product.image.length > 0
      ? product.image[0]
      : "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600";

  return (
    <>
      <div
        onClick={() => {
          navigate(
            `/products/${(product.category || "all").toLowerCase()}/${product._id}`
          );
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="group relative bg-white border border-gray-200/90 hover:border-amber-300/80 rounded-2xl p-2.5 sm:p-3.5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl md:hover:-translate-y-1 cursor-pointer w-full h-full select-none min-w-0"
      >
        {/* Top Badges & Wishlist */}
        <div className="flex items-start justify-between relative z-10 w-full mb-1 gap-1">
          <div className="flex flex-col gap-1 items-start min-w-0">
            {discountPercent > 0 && (
              <span className="bg-linear-to-r from-red-500 to-amber-500 text-white font-extrabold text-[9px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-md shadow-xs tracking-tight whitespace-nowrap">
                {discountPercent}% OFF
              </span>
            )}
            {product.bestseller && (
              <span className="bg-amber-100 text-amber-800 font-bold text-[8px] sm:text-[9px] uppercase px-1.5 py-0.5 rounded tracking-wide border border-amber-200 whitespace-nowrap">
                Bestseller
              </span>
            )}
          </div>

          <button
            onClick={handleToggleWishlist}
            aria-label="Wishlist"
            className="p-1.5 rounded-full bg-white/95 hover:bg-white text-gray-400 hover:text-red-500 shadow-xs transition duration-200 cursor-pointer border border-gray-100 shrink-0"
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                isInWishlist
                  ? "fill-red-500 text-red-500"
                  : "hover:fill-red-100 text-gray-400"
              }`}
            />
          </button>
        </div>

        {/* Product Image with Quick View Trigger */}
        <div className="relative w-full h-28 xs:h-32 sm:h-40 md:h-44 flex items-center justify-center p-1.5 sm:p-2 mb-2 overflow-hidden rounded-xl bg-gray-50/60">
          <img
            src={primaryImage}
            alt={product.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300 ease-out"
          />

          {/* Quick View Button overlay */}
          <button
            onClick={handleOpenQuickView}
            className="hidden md:flex items-center gap-1 absolute bottom-2 bg-white/95 hover:bg-white text-gray-800 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-gray-200 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-amber-600" /> Quick View
          </button>
        </div>

        {/* Brand & Unit */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-gray-400 font-medium mb-1 gap-1">
          <span className="font-bold text-gray-500 uppercase tracking-wider truncate">
            {product.brand || product.category}
          </span>
          {product.unit && (
            <span className="text-gray-500 text-[9px] sm:text-[10px] bg-gray-100 px-1.5 py-0.5 rounded truncate max-w-[50%] shrink-0">
              {product.unit}
            </span>
          )}
        </div>

        {/* Product Title */}
        <h4 className="text-gray-800 font-semibold text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors duration-200 min-h-[2.2rem] sm:min-h-[2.5rem] mb-1.5">
          {product.name}
        </h4>

        {/* Rating Pill */}
        <div className="flex items-center gap-1 sm:gap-1.5 mb-2">
          <div className="flex items-center gap-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded">
            <span>{product.rating || 4.5}</span>
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-emerald-600 text-emerald-600" />
          </div>
          <span className="text-[10px] text-gray-400 truncate">
            ({(product.reviewsCount || 850).toLocaleString("en-IN")})
          </span>
        </div>

        {/* Price & Full-Width Action Footer (Zero overflow across all screen widths) */}
        <div className="pt-2 border-t border-gray-100 space-y-2 mt-auto">
          <div className="flex flex-wrap items-baseline justify-between gap-x-1.5 gap-y-0.5">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-sm sm:text-base md:text-lg font-black text-gray-900 tracking-tight">
                {CURRENCY}
                {Number(product.offerPrice).toLocaleString("en-IN")}
              </span>
              {product.price > product.offerPrice && (
                <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                  {CURRENCY}
                  {Number(product.price).toLocaleString("en-IN")}
                </span>
              )}
            </div>
            {product.price > product.offerPrice && (
              <span className="text-[10px] font-bold text-emerald-600 whitespace-nowrap">
                Save {CURRENCY}
                {Number(product.price - product.offerPrice).toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            {quantityInCart === 0 ? (
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-1.5 bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white border border-amber-300/90 hover:border-amber-500 font-bold text-xs py-1.5 sm:py-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-95"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            ) : (
              <div className="w-full flex items-center justify-between bg-amber-500 text-white rounded-xl overflow-hidden shadow-xs">
                <button
                  onClick={handleDecrement}
                  aria-label="Decrease quantity"
                  className="px-3 py-1.5 sm:py-2 hover:bg-amber-600 text-white font-black text-xs transition cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold text-xs sm:text-sm select-none">
                  {quantityInCart} in Cart
                </span>
                <button
                  onClick={handleIncrement}
                  aria-label="Increase quantity"
                  className="px-3 py-1.5 sm:py-2 hover:bg-amber-600 text-white font-black text-xs transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
