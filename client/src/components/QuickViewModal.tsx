import React, { useState } from "react";
import { X, Star, ShoppingCart, Zap, Heart, Check, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../store";
import { addToCart as addToCartAction } from "../store/cartSlice";
import { toggleWishlist, selectIsInWishlist } from "../store/wishlistSlice";
import { CURRENCY } from "../constants";
import { Product } from "../types";
import toast from "react-hot-toast";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const isInWishlist = useSelector((state: RootState) =>
    product ? selectIsInWishlist(product._id)(state) : false
  );

  if (!isOpen || !product) return null;

  const images = Array.isArray(product.image) && product.image.length > 0
    ? product.image
    : ["https://images.unsplash.com/photo-1542838132-92c53300491e?w=600"];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCartAction(product._id));
    }
    toast.success(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleBuyNow = () => {
    dispatch(addToCartAction(product._id));
    onClose();
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

  const discountPercent =
    product.discount ||
    (product.price && product.offerPrice
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-700 bg-white/80 hover:bg-white rounded-full shadow-md transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images */}
        <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center bg-gray-50/70 border-r border-gray-100">
          <div className="relative w-full h-64 md:h-80 flex items-center justify-center p-4">
            <img
              src={images[selectedImgIdx] || images[0]}
              alt={product.name}
              className="max-h-full max-w-full object-contain rounded-xl transition duration-300"
            />
            {discountPercent > 0 && (
              <span className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-amber-500 text-white font-bold text-xs px-2.5 py-1 rounded-md shadow-sm">
                {discountPercent}% OFF
              </span>
            )}
            <button
              onClick={handleToggleWishlist}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition cursor-pointer"
            >
              <Heart
                className={`w-5 h-5 transition ${
                  isInWishlist
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
              />
            </button>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1 max-w-full">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIdx(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 p-1 transition cursor-pointer bg-white ${
                    selectedImgIdx === idx
                      ? "border-amber-500 shadow-sm"
                      : "border-gray-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {product.brand && (
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {product.brand}
                </span>
              )}
              <span className="text-xs text-gray-500 font-medium">
                {product.category}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
              {product.name}
            </h2>
            {product.unit && (
              <p className="text-xs text-gray-500 mt-0.5">
                Pack: <span className="font-semibold">{product.unit}</span>
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded">
              <span>{product.rating || 4.6}</span>
              <Star className="w-3 h-3 fill-white" />
            </div>
            <span className="text-xs text-gray-500">
              ({(product.reviewsCount || 1250).toLocaleString()} Verified Ratings)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 pt-1 border-t border-gray-100">
            <span className="text-3xl font-extrabold text-gray-900">
              {CURRENCY}{product.offerPrice}
            </span>
            {product.price > product.offerPrice && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  {CURRENCY}{product.price}
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  Save {CURRENCY}{product.price - product.offerPrice} ({discountPercent}%)
                </span>
              </>
            )}
          </div>

          {/* Description */}
          {Array.isArray(product.description) && product.description.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase text-gray-600 tracking-wider">
                Highlights
              </p>
              <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                {product.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-gray-100">
              <p className="text-xs font-bold uppercase text-gray-600 tracking-wider">
                Specifications
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(product.specifications).map(([key, val], idx) => (
                  <div key={idx} className="bg-gray-50 p-2 rounded-lg">
                    <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                      {key}
                    </span>
                    <span className="font-semibold text-gray-800">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Badges / Guarantees */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 text-center">
            <div className="flex flex-col items-center text-gray-600">
              <Truck className="w-4 h-4 text-amber-600 mb-0.5" />
              <span className="text-[10px] font-bold">Fast Express</span>
              <span className="text-[9px] text-gray-400">9-30 mins</span>
            </div>
            <div className="flex flex-col items-center text-gray-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mb-0.5" />
              <span className="text-[10px] font-bold">100% Genuine</span>
              <span className="text-[9px] text-gray-400">Direct Brand</span>
            </div>
            <div className="flex flex-col items-center text-gray-600">
              <RefreshCw className="w-4 h-4 text-blue-600 mb-0.5" />
              <span className="text-[10px] font-bold">Easy Returns</span>
              <span className="text-[9px] text-gray-400">Doorstep pickup</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-2 font-bold text-sm text-gray-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-linear-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold rounded-xl shadow-xs transition cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-900 hover:bg-black text-white font-bold rounded-xl shadow-xs transition cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;

