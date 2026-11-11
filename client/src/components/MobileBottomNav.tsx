import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, LayoutGrid, Percent, Heart, ShoppingCart } from "lucide-react";
import { selectCartCount } from "../store/cartSlice";
import { selectWishlistCount } from "../store/wishlistSlice";

const MobileBottomNav: React.FC = () => {
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5"
    >
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
              isActive ? "text-amber-600" : "text-gray-500 hover:text-gray-800"
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5 leading-none">Home</span>
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
              isActive ? "text-amber-600" : "text-gray-500 hover:text-gray-800"
            }`
          }
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5 leading-none">Categories</span>
        </NavLink>

        <NavLink
          to="/offers"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
              isActive ? "text-amber-600" : "text-gray-500 hover:text-gray-800"
            }`
          }
        >
          <Percent className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5 leading-none">Offers</span>
        </NavLink>

        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
              isActive ? "text-red-500" : "text-gray-500 hover:text-gray-800"
            }`
          }
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 text-[9px] font-black text-white bg-red-500 min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-0.5 leading-none">Wishlist</span>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
              isActive ? "text-amber-600" : "text-gray-500 hover:text-gray-800"
            }`
          }
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 text-[9px] font-black text-white bg-amber-600 min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-0.5 leading-none">Cart</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default MobileBottomNav;

