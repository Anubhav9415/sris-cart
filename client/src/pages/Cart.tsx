import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { ArrowLeftIcon, Wallet, CreditCard, Ticket, MapPin } from "lucide-react";
import { getAddresses } from "../services/addressService";
import { placeCODOrder, placeStripeOrder } from "../services/orderService";
import { CURRENCY } from "../constants";
import {
  removeFromCart as removeFromCartAction,
  updateCartItem as updateCartItemAction,
  setCartItems as setCartItemsAction,
  selectCartCount,
  selectCartAmount,
} from "../store/cartSlice";
import { setShowUserLogin } from "../store/authSlice";
import { RootState, AppDispatch } from "../store";

const SELLER_COORDS = { lat: 22.3072, lng: 73.1812 }; // Vadodara, Gujarat

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const currency = CURRENCY;

  const products = useSelector((state: RootState) => state.products.products);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const user = useSelector((state: RootState) => state.auth.user);
  const cartCount = useSelector(selectCartCount);
  const cartAmount = useSelector(selectCartAmount);

  const getCartCount = () => cartCount;
  const getCartAmount = () => cartAmount;

  const removeFromCart = (itemId) => dispatch(removeFromCartAction(itemId));
  const updateCartItem = (itemId, quantity) =>
    dispatch(updateCartItemAction({ itemId, quantity }));
  const setCartItems = (items) => dispatch(setCartItemsAction(items));
  const [showAddress, setShowAddress] = useState(false);
  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAdresses] = useState([]);
  const [selectedAdress, setSelectedAddress] = useState(null);
  console.log("Cart component - selectedAdress:", selectedAdress);
  const [paymentOption, setPaymentOption] = useState("COD");
  const [loading, setLoading] = useState(false);

  // Coupon / Discount states
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Address distance range calculations
  const getAddressRangeStatus = () => {
    if (!selectedAdress) return { distance: null, isWithinRange: false, hasCoords: false };
    if (selectedAdress.latitude === undefined || selectedAdress.longitude === undefined) {
      return { distance: null, isWithinRange: false, hasCoords: false };
    }
    const dist = getDistance(
      SELLER_COORDS.lat,
      SELLER_COORDS.lng,
      selectedAdress.latitude,
      selectedAdress.longitude
    );
    return { distance: dist, isWithinRange: dist <= 50.0, hasCoords: true };
  };

  const { distance: addressDistance, isWithinRange: isAddressWithinRange, hasCoords } = getAddressRangeStatus();
  const isCheckoutDisabled = loading;

  // Confetti effect trigger
  const triggerConfetti = () => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = ["#FFC107", "#FF5722", "#E91E63", "#9C27B0", "#3F51B5", "#00BCD4", "#4CAF50", "#FFEB3B"];
    const particles = [];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 6 + 4,
        d: Math.random() * height,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0,
      });
    }

    let animationFrameId;
    let startTime = Date.now();

    function draw() {
      ctx.clearRect(0, 0, width, height);

      let active = false;
      particles.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.tiltAngle);
        p.tilt = Math.sin(p.tiltAngle - p.r / 2) * 15;

        if (p.y < height) {
          active = true;
        }

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
      });

      if (active && Date.now() - startTime < 3000) {
        animationFrameId = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(animationFrameId);
        canvas.remove();
      }
    }

    draw();
  };

  // Apply Coupon
  const applyCoupon = (codeToApply) => {
    const code = (typeof codeToApply === "string" ? codeToApply : couponCode).trim().toUpperCase();
    if (!code) return;
    const cartAmount = getCartAmount();

    if (cartAmount === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (code === "SRIS20" || code === "FESTIVE20") {
      const discount = Math.round(cartAmount * 0.20 * 100) / 100;
      setDiscountAmount(discount);
      setAppliedCoupon(code);
      toast.success(`Coupon ${code} applied! 20% off`);
      triggerConfetti();
    } else if (code === "SRISFIRST") {
      if (cartAmount < 499) {
        toast.error("SRISFIRST requires a minimum order value of ₹499!");
        return;
      }
      setDiscountAmount(100);
      setAppliedCoupon("SRISFIRST");
      toast.success("Coupon SRISFIRST applied! Flat ₹100 off");
      triggerConfetti();
    } else if (code === "FESTIVE10") {
      if (cartAmount < 499) {
        toast.error("FESTIVE10 coupon requires a minimum order value of ₹499!");
        return;
      }
      setDiscountAmount(50);
      setAppliedCoupon("FESTIVE10");
      toast.success("Coupon FESTIVE10 applied! Flat ₹50 off");
      triggerConfetti();
    } else if (code === "FREESHIP" || code === "FREEDEL") {
      setDiscountAmount(40);
      setAppliedCoupon(code);
      toast.success(`Coupon ${code} applied! Free Express Delivery (₹40 off)`);
      triggerConfetti();
    } else if (code === "SPIN10") {
      const discount = Math.round(cartAmount * 0.10 * 100) / 100;
      setDiscountAmount(discount);
      setAppliedCoupon("SPIN10");
      toast.success("Coupon SPIN10 applied! 10% off");
      triggerConfetti();
    } else if (code === "SPIN15") {
      const discount = Math.round(cartAmount * 0.15 * 100) / 100;
      setDiscountAmount(discount);
      setAppliedCoupon("SPIN15");
      toast.success("Coupon SPIN15 applied! 15% off");
      triggerConfetti();
    } else if (code === "SPIN5") {
      setDiscountAmount(25);
      setAppliedCoupon("SPIN5");
      toast.success("Coupon SPIN5 applied! Flat ₹25 off");
      triggerConfetti();
    } else {
      toast.error("Invalid Coupon Code!");
    }
  };

  // Remove Coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponCode("");
    toast.success("Coupon removed");
  };

  // Dynamic Coupon Recalculation / Security Check
  useEffect(() => {
    const cartAmount = getCartAmount();
    if (appliedCoupon === "FESTIVE10" && cartAmount < 100) {
      removeCoupon();
      toast.error("Coupon FESTIVE10 removed: minimum order value of $100 is required!");
    } else if (appliedCoupon === "SRIS20") {
      const newDiscount = Math.round(cartAmount * 0.20 * 100) / 100;
      setDiscountAmount(newDiscount);
    } else if (appliedCoupon && cartAmount === 0) {
      removeCoupon();
    }
  }, [cartItems, products]);

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        tempArray.push({
          ...product,
          quantity: cartItems[key],
        });
      }
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const data = await getAddresses();
      if (data?.address?.length > 0) {
        setAdresses(data.address);
        setSelectedAddress(data.address[0]);
      } else {
        setAdresses([]);
        setSelectedAddress(null);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || "Unable to load addresses");
    }
  };

  const placeOrder = async () => {
    try {
      if (!user) {
        toast("Please log in to complete your order", { icon: "🔒" });
        dispatch(setShowUserLogin(true));
        return;
      }
      if (!selectedAdress) {
        toast.error("Please add a delivery address to continue");
        navigate("/add-address");
        return;
      }

      if (paymentOption === "Online" && totalAmount < 50) {
        toast.error("Online payment via Stripe requires at least ₹50. Please choose Cash on Delivery or add another item.");
        return;
      }

      setLoading(true);
      const orderItemsPayload = cartArray.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      if (paymentOption === "COD") {
        const data = await placeCODOrder({
          userId: user?._id,
          items: orderItemsPayload,
          address: selectedAdress._id,
          discount: discountAmount,
        });
        if (data.success) {
          toast.success(data.message || "Order placed successfully!");
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message || "Could not place COD order");
        }
      } else {
        const data = await placeStripeOrder({
          userId: user?._id,
          items: orderItemsPayload,
          address: selectedAdress._id,
          discount: discountAmount,
        });
        if (data.success && data.url) {
          window.location.assign(data.url);
        } else {
          toast.error(data.message || "Could not initialize Stripe checkout");
        }
      }
    } catch (error: any) {
      const errMsg = error?.response?.data?.message || error?.message || "Order failed. Please try again.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products?.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  useEffect(() => {
    const pending = sessionStorage.getItem("srisCart_pendingCoupon");
    if (pending && getCartAmount() > 0) {
      setCouponCode(pending);
      const t = setTimeout(() => {
        applyCoupon(pending);
        sessionStorage.removeItem("srisCart_pendingCoupon");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [products, cartItems]);

  // Order summary calculations
  const basePrice = getCartAmount();
  const taxableAmount = Math.max(0, basePrice - discountAmount);
  const tax = Math.round(taxableAmount * 0.02 * 100) / 100;
  const totalAmount = Math.round((taxableAmount + tax) * 100) / 100;

  if (cartArray.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto shadow-xs">
          <Ticket className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Your Shopping Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
          Add fresh groceries, smartphones, electronics, and daily essentials to enjoy express delivery and exclusive deals!
        </p>
        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold rounded-full shadow-md transition cursor-pointer"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return products?.length > 0 && cartItems ? (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-6 md:mt-10 pb-12 flex flex-col lg:flex-row gap-6 lg:gap-8">
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 flex items-baseline gap-2 flex-wrap">
          <span>Shopping Cart</span>
          <span className="text-xs sm:text-sm text-amber-600 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full">
            {getCartCount()} Items
          </span>
        </h1>

        <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-sm md:text-base font-medium pb-3 border-b border-gray-200">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        <div className="space-y-3 sm:space-y-0">
          {cartArray.map((product, index) => (
            <div
              key={index}
              className="flex flex-col sm:grid sm:grid-cols-[2fr_1fr_1fr] bg-white sm:bg-transparent p-3 sm:py-4 sm:px-0 rounded-2xl sm:rounded-none border border-gray-200 sm:border-0 sm:border-b sm:border-gray-100 text-gray-500 sm:items-center text-sm md:text-base font-medium gap-3 sm:gap-2 shadow-2xs sm:shadow-none"
            >
              <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                <div
                  onClick={() => {
                    navigate(
                      `/products/${product.category.toLowerCase()}/${product._id}`
                    );
                    scrollTo(0, 0);
                  }}
                  className="cursor-pointer w-18 h-18 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center border border-gray-200 bg-white rounded-xl overflow-hidden shadow-2xs"
                >
                  <img
                    className="max-w-full max-h-full object-contain p-1.5 sm:p-2 hover:scale-105 transition duration-300"
                    src={product.image[0]}
                    alt={product.name}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-gray-800 text-xs sm:text-sm md:text-base line-clamp-2">
                    {product.name}
                  </p>
                  <div className="font-normal text-gray-500/80 text-xs mt-1 space-y-1">
                    <p className="truncate">
                      Category: <span className="font-medium text-gray-600">{product.category}</span>
                    </p>
                    <div className="flex items-center gap-1.5">
                      <p>Qty:</p>
                      <select
                        onChange={(e) => {
                          updateCartItem(product._id, Number(e.target.value));
                        }}
                        value={cartItems[product._id]}
                        className="outline-none border border-gray-200 rounded-lg px-2 py-0.5 bg-gray-50 text-xs font-semibold text-gray-700 cursor-pointer"
                      >
                        {Array(
                          cartItems[product._id] > 9 ? cartItems[product._id] : 9
                        )
                          .fill("")
                          .map((_, idx) => (
                            <option key={idx} value={idx + 1}>
                              {idx + 1}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Subtotal & Remove row / Desktop columns */}
              <div className="flex items-center justify-between sm:contents pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <span className="text-xs text-gray-400 sm:hidden">Item Subtotal:</span>
                <p className="sm:text-center font-black text-gray-800 text-sm sm:text-base">
                  {currency}
                  {(product.offerPrice * product.quantity).toLocaleString("en-IN")}
                </p>
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="cursor-pointer sm:mx-auto p-1.5 sm:p-2 rounded-xl hover:bg-red-50 text-red-500 transition-colors flex items-center gap-1 text-xs"
                  aria-label="Remove item"
                >
                  <img
                    src={assets.remove_icon}
                    alt="remove"
                    className="inline-block w-5 h-5 sm:w-6 sm:h-6"
                  />
                  <span className="sm:hidden font-semibold">Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-6 sm:mt-8 gap-2 text-amber-600 font-bold text-sm hover:text-amber-700 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Continue Shopping
        </button>
      </div>

      <div className="w-full lg:w-[380px] xl:w-[400px] shrink-0 bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-lg self-start">
        <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
        <hr className="border-gray-100 my-4" />

        <div className="space-y-5">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Delivery Address</p>
            {!user ? (
              <div className="mt-2 bg-amber-50/80 border border-amber-200 p-3 rounded-xl flex items-center justify-between gap-2">
                <p className="text-xs font-medium text-amber-900">
                  Log in to select or save your delivery address
                </p>
                <button
                  type="button"
                  onClick={() => dispatch(setShowUserLogin(true))}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shrink-0 cursor-pointer transition"
                >
                  Login
                </button>
              </div>
            ) : !selectedAdress ? (
              <div className="mt-2 bg-amber-50/80 border border-amber-200 p-3 rounded-xl flex items-center justify-between gap-2">
                <p className="text-xs font-medium text-amber-900">
                  No delivery address saved yet
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/add-address")}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shrink-0 cursor-pointer transition"
                >
                  + Add Address
                </button>
              </div>
            ) : (
              <div className="relative flex justify-between items-start mt-2 bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs sm:text-sm">
                <div className="space-y-1.5 min-w-0 pr-2">
                  <p className="text-gray-700 font-medium leading-relaxed break-words">
                    {`${selectedAdress.street}, ${selectedAdress.city}, ${selectedAdress.state}, ${selectedAdress.country}`}
                  </p>
                  <div className="pt-1 border-t border-gray-200/50">
                    {hasCoords && isAddressWithinRange ? (
                      <p className="text-emerald-600 font-semibold flex items-center gap-1 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        Express Delivery Zone ({addressDistance?.toFixed(1)} km)
                      </p>
                    ) : (
                      <p className="text-blue-600 font-semibold flex items-center gap-1 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        Standard Nationwide Delivery (2-4 Days)
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddress(!showAddress)}
                  className="text-amber-600 hover:text-amber-700 font-bold shrink-0 cursor-pointer"
                >
                  Change
                </button>
                {showAddress && (
                  <div className="absolute left-0 right-0 top-full mt-1 z-20 py-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto no-scrollbar">
                    {addresses.map((address, idx) => (
                      <p
                        key={idx}
                        onClick={() => {
                          setSelectedAddress(address);
                          setShowAddress(false);
                        }}
                        className="text-gray-600 p-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                      >
                        {address.street}, {address.city}, {address.state}, {address.country}
                      </p>
                    ))}
                    <p
                      onClick={() => navigate("/add-address")}
                      className="text-amber-600 text-center font-semibold cursor-pointer p-2.5 hover:bg-amber-50"
                    >
                      + Add new address
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Payment Method</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentOption("COD")}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  paymentOption === "COD"
                    ? "border-primary bg-primary/5 text-primary font-bold shadow-sm"
                    : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                }`}
              >
                <Wallet className="w-5 h-5 mb-1" />
                <span className="text-xs">Cash on Delivery</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentOption("Online")}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  paymentOption === "Online"
                    ? "border-primary bg-primary/5 text-primary font-bold shadow-sm"
                    : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                }`}
              >
                <CreditCard className="w-5 h-5 mb-1" />
                <span className="text-xs">Online Payment</span>
              </button>
            </div>
          </div>

          {/* Coupon Input Block */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Ticket className="w-4 h-4 text-primary" />
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Coupon Discount
              </label>
            </div>
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-xl">
                <div>
                  <p className="text-emerald-700 text-xs font-bold tracking-wider">{appliedCoupon}</p>
                  <p className="text-emerald-600 text-[11px]">Saved {currency}{discountAmount.toFixed(2)}</p>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. SRIS20"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-primary text-xs uppercase placeholder-gray-400 font-semibold"
                />
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-primary hover:bg-amber-500 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Apply
                </button>
              </div>
            )}
            {!appliedCoupon && (
              <p className="text-[10px] text-gray-400 mt-1.5 leading-relaxed">
                Try <span className="font-bold text-gray-600">SRISFIRST</span> (₹100 off on ₹499+), <span className="font-bold text-gray-600">FESTIVE20</span> (20% off), or <span className="font-bold text-gray-600">FREEDEL</span> (Free Delivery).
              </p>
            )}
          </div>
        </div>

        <hr className="border-gray-100 my-4" />

        <div className="text-gray-500 text-xs sm:text-sm space-y-2.5">
          <p className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-700">
              {currency}
              {basePrice.toFixed(2)}
            </span>
          </p>
          {appliedCoupon && (
            <p className="flex justify-between text-emerald-600 font-semibold">
              <span>Discount ({appliedCoupon})</span>
              <span>
                -{currency}
                {discountAmount.toFixed(2)}
              </span>
            </p>
          )}
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-emerald-600 font-bold">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span className="font-semibold text-gray-700">
              {currency}
              {tax.toFixed(2)}
            </span>
          </p>
          <p className="flex justify-between text-lg font-black text-gray-800 border-t border-gray-100 pt-3 mt-3">
            <span>Total:</span>
            <span>
              {currency}
              {totalAmount.toFixed(2)}
            </span>
          </p>
        </div>

        <button
          disabled={isCheckoutDisabled}
          onClick={placeOrder}
          className={`w-full py-3.5 mt-6 cursor-pointer bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-yellow-500/10 hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-200 flex items-center justify-center gap-2 ${isCheckoutDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : !user ? (
            paymentOption === "COD" ? "Login & Place Order (COD)" : "Login & Pay Online"
          ) : !selectedAdress ? (
            "Add Delivery Address to Order"
          ) : paymentOption === "COD" ? (
            "Place Order (Cash on Delivery)"
          ) : (
            "Proceed to Online Payment"
          )}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
