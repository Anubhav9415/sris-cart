import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { verifyStripeOrder } from "../services/orderService";
import { setCartItems } from "../store/cartSlice";
import { AppDispatch } from "../store";

const Loading = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get("next");
  const sessionId = query.get("session_id");
  const [statusText, setStatusText] = useState(
    sessionId ? "Verifying your Stripe payment..." : "Redirecting..."
  );

  useEffect(() => {
    let active = true;

    const handleVerification = async () => {
      if (sessionId) {
        try {
          const data = await verifyStripeOrder(sessionId);
          if (!active) return;
          if (data.success) {
            dispatch(setCartItems({}));
            toast.success("Payment verified! Your order is confirmed.");
            navigate(`/${nextUrl || "my-orders"}`, { replace: true });
          } else {
            toast.error(data.message || "Payment verification failed");
            navigate("/cart", { replace: true });
          }
        } catch (error: any) {
          if (!active) return;
          toast.error(
            error.response?.data?.message || error.message || "Failed to verify payment"
          );
          navigate("/cart", { replace: true });
        }
      } else if (nextUrl) {
        const timer = setTimeout(() => {
          if (active) navigate(`/${nextUrl}`, { replace: true });
        }, 1200);
        return () => clearTimeout(timer);
      } else {
        setStatusText("Loading...");
      }
    };

    handleVerification();
    return () => {
      active = false;
    };
  }, [nextUrl, sessionId, dispatch, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-[70vh] gap-4 px-4 text-center">
      <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-4 border-gray-200 border-t-amber-500"></div>
      <p className="text-sm sm:text-base font-bold text-gray-700">{statusText}</p>
    </div>
  );
};

export default Loading;
