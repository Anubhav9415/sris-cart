import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types";
import { RootState } from "./index";

interface WishlistState {
  items: Product[];
}

const loadWishlistFromStorage = (): Product[] => {
  try {
    const saved = localStorage.getItem("sriscart_wishlist_items");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const saveWishlistToStorage = (items: Product[]) => {
  try {
    localStorage.setItem("sriscart_wishlist_items", JSON.stringify(items));
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
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const prod = action.payload;
      const index = state.items.findIndex((item) => item._id === prod._id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(prod);
      }
      saveWishlistToStorage(state.items);
    },
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const prod = action.payload;
      if (!state.items.some((item) => item._id === prod._id)) {
        state.items.push(prod);
        saveWishlistToStorage(state.items);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item._id !== id);
      saveWishlistToStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage([]);
    },
  },
});

export const {
  toggleWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export const selectWishlistItems = (state: RootState): Product[] =>
  state.wishlist ? state.wishlist.items : [];

export const selectWishlistCount = (state: RootState): number =>
  state.wishlist && state.wishlist.items ? state.wishlist.items.length : 0;

export const selectIsInWishlist =
  (productId: string) =>
  (state: RootState): boolean =>
    Boolean(
      state.wishlist &&
        state.wishlist.items &&
        state.wishlist.items.some((item) => item._id === productId)
    );

export default wishlistSlice.reducer;
