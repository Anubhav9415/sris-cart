import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserSession } from "./store/authSlice";
import { fetchProductsThunk } from "./store/productsSlice";
import { AppDispatch } from "./store";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadUserSession());
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  return <AppRoutes />;
};

export default App;
