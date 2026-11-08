import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, ArrowRight, Star, Sparkles } from "lucide-react";
import { RootState, AppDispatch } from "../store";
import { removeFromWishlist, clearWishlist } from "../store/wishlistSlice";
import { addToCart as addToCartAction } from "../store/cartSlice";
import { CURRENCY } from "../constants";
import toast from "react-hot-toast";

const Wishlist: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const handleMoveToCart = (item: any) => {
    dispatch(addToCartAction(item._id));
    dispatch(removeFromWishlist(item._id));
    toast.success(`Moved ${item.name} to Cart!`);
  };

  const handleRemove = (id: string, name: string) => {
    dispatch(removeFromWishlist(id));
    toast.success(`Removed ${name} from Wishlist`);
  };

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((item) => {
      dispatch(addToCartAction(item._id));
    });
    dispatch(clearWishlist());
    toast.success("All items moved to Cart!");
    navigate("/cart");
  };

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto shadow-xs">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Your Wishlist is Empty</h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Explore our vast catalog of groceries, smartphones, electronics, and fashion items to save your favorite deals for later!
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold rounded-full shadow-md transition"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              My Wishlist
            </h1>
            <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Items saved for quick access and price-drop tracking
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(clearWishlist())}
            className="text-xs font-bold text-gray-500 hover:text-red-600 px-3 py-2 rounded-xl border border-gray-200 hover:border-red-300 transition cursor-pointer"
          >
            Clear All
          </button>
          <button
            onClick={handleMoveAllToCart}
            className="flex items-center gap-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl shadow-xs transition cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" /> Move All to Cart
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {wishlistItems.map((item) => {
          const discountPercent =
            item.discount ||
            (item.price && item.offerPrice
              ? Math.round(((item.price - item.offerPrice) / item.price) * 100)
              : 0);

          return (
            <div
              key={item._id}
              className="group relative bg-white border border-gray-200 hover:border-amber-400 rounded-2xl p-3 flex flex-col justify-between shadow-2xs hover:shadow-lg transition-all duration-300"
            >
              {/* Image Container */}
              <div
                onClick={() =>
                  navigate(`/products/${(item.category || "all").toLowerCase()}/${item._id}`)
                }
                className="relative w-full h-36 flex items-center justify-center p-2 mb-2 bg-gray-50/60 rounded-xl cursor-pointer overflow-hidden"
              >
                <img
                  src={Array.isArray(item.image) ? item.image[0] : item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />

                {discountPercent > 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow-xs">
                    {discountPercent}% OFF
                  </span>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item._id, item.name);
                  }}
                  title="Remove"
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-400 hover:text-red-600 shadow-xs transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Title & Brand */}
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                  {item.brand || item.category}
                </span>
                <h4
                  onClick={() =>
                    navigate(`/products/${(item.category || "all").toLowerCase()}/${item._id}`)
                  }
                  className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug cursor-pointer hover:text-amber-600 mb-1"
                >
                  {item.name}
                </h4>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    <span>{item.rating || 4.5}</span>
                    <Star className="w-2.5 h-2.5 fill-emerald-600" />
                  </span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-black text-gray-900">
                    {CURRENCY}{item.offerPrice}
                  </span>
                  {item.price > item.offerPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {CURRENCY}{item.price}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleMoveToCart(item)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-linear-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Move to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;

