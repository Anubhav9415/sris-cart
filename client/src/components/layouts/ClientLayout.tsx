import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ChatAssistant from "../ChatAssistant";
import SpinWheel from "../SpinWheel";
import Login from "../Login";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ClientLayout = () => {
  const showUserLogin = useSelector((state: RootState) => state.auth.showUserLogin);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {showUserLogin ? <Login /> : null}
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
      <ChatAssistant />
      <SpinWheel />
    </div>
  );
};

export default ClientLayout;
