import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface WishlistState {
  items: string[]; // Product IDs
}

const loadWishlistFromStorage = (): string[] => {
  try {
    const saved = localStorage.getItem("sriscart_wishlist");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const saveWishlistToStorage = (items: string[]) => {
  try {
    localStorage.setItem("sriscart_wishlist", JSON.stringify(items));
  } catch (e) {
    console.error("Failed to persist wishlist", e);
  }
};

const initialState: WishlistState = {
  items: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<{ id: string; name?: string }>) => {
      const { id, name } = action.payload;
      const index = state.items.indexOf(id);
      if (index >= 0) {
        state.items.splice(index, 1);
        toast.success(`${name || "Item"} removed from wishlist`, { id: "wishlist-remove" });
      } else {
        state.items.push(id);
        toast.success(`${name || "Item"} added to wishlist ❤️`, { id: "wishlist-add" });
      }
      saveWishlistToStorage(state.items);
    },
    addToWishlist: (state, action: PayloadAction<{ id: string; name?: string }>) => {
      const { id, name } = action.payload;
      if (!state.items.includes(id)) {
        state.items.push(id);
        toast.success(`${name || "Item"} added to wishlist ❤️`, { id: "wishlist-add" });
        saveWishlistToStorage(state.items);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<{ id: string; name?: string }>) => {
      const { id, name } = action.payload;
      state.items = state.items.filter((item) => item !== id);
      toast.success(`${name || "Item"} removed from wishlist`, { id: "wishlist-remove" });
      saveWishlistToStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage([]);
    },
  },
});

export const { toggleWishlist, addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;

