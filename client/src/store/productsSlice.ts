import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getProductsList } from "../services/productService";
import toast from "react-hot-toast";
import { Product } from "../types";
import { sampleProducts } from "../assets/productsData";

export const fetchProductsThunk = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProductsList();
      if (data.success) {
        return data.products;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: any;
}

const initialState: ProductsState = {
  products: sampleProducts,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = false; // keep products visible during background fetch
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && Array.isArray(action.payload) && action.payload.length > 0) {
          const backendIds = new Set(action.payload.map((p: any) => p._id));
          const remainingSamples = sampleProducts.filter((p) => !backendIds.has(p._id));
          state.products = [...action.payload, ...remainingSamples];
        } else {
          state.products = sampleProducts;
        }
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
