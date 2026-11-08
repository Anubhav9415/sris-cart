import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      {/* Trust & Guarantee Banner */}
      <div className="bg-amber-50/70 border-b border-amber-200/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Express 9-Min Delivery</h4>
                <p className="text-xs text-gray-500">Fast doorstep deliveries in Vadodara</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">100% Authentic</h4>
                <p className="text-xs text-gray-500">Directly sourced brand genuine stock</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Easy Returns</h4>
                <p className="text-xs text-gray-500">Hassle-free doorstep returns & refund</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">24/7 Dedicated Support</h4>
                <p className="text-xs text-gray-500">Quick resolution for all your orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => {
                navigate("/");
                window.scrollTo(0, 0);
              }}
              className="flex items-center gap-2 cursor-pointer group select-none w-max"
            >
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-400 via-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black bg-linear-to-r from-amber-500 via-amber-600 to-orange-600 bg-clip-text text-transparent tracking-tight">
                SrisCart
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-sm">
              India's premier multi-category shopping destination delivering fresh groceries, smartphones, electronics, appliances, and fashion right to your doorstep.
            </p>

            <div className="space-y-1.5 text-xs text-gray-600">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Uma Society, Ajwa Road, Vadodara, Gujarat - 390019</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+91 96960 89688 (Mon-Sat, 8am-10pm)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>supportsriscart@gmail.com</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-gray-900">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link to="/products?category=groceries" className="hover:text-amber-600 transition">
                  Daily Groceries & Dairy
                </Link>
              </li>
              <li>
                <Link to="/products?category=mobiles" className="hover:text-amber-600 transition">
                  Smartphones & 5G Mobiles
                </Link>
              </li>
              <li>
                <Link to="/products?category=electronics" className="hover:text-amber-600 transition">
                  Electronics & Audio
                </Link>
              </li>
              <li>
                <Link to="/products?category=appliances" className="hover:text-amber-600 transition">
                  Home & Kitchen Appliances
                </Link>
              </li>
              <li>
                <Link to="/products?category=fashion" className="hover:text-amber-600 transition">
                  Men & Women Fashion
                </Link>
              </li>
              <li>
                <Link to="/products?category=beauty" className="hover:text-amber-600 transition">
                  Beauty & Personal Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-gray-900">
              Help & Support
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link to="/contact" className="hover:text-amber-600 transition">
                  Contact Customer Care
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-amber-600 transition">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/delivery-info" className="hover:text-amber-600 transition">
                  Shipping & Delivery Info
                </Link>
              </li>
              <li>
                <Link to="/return-refund" className="hover:text-amber-600 transition">
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/my-orders" className="hover:text-amber-600 transition">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-amber-600 transition">
                  Active Coupons & Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Legal */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-gray-900">
              Partner Portals
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link to="/seller" className="hover:text-amber-600 font-semibold transition">
                  Merchant / Seller Center
                </Link>
              </li>
              <li>
                <Link to="/rider" className="hover:text-amber-600 font-semibold transition">
                  Delivery Partner App
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-amber-600 font-semibold transition">
                  Operations Admin
                </Link>
              </li>
              <li className="pt-2 border-t border-gray-100">
                <a
                  href="https://sriscart.live"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-600 font-bold flex items-center gap-1"
                >
                  sriscart.live <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} SrisCart E-Commerce Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              100% Safe Payments:
            </span>
            <span className="bg-gray-100 px-2 py-0.5 rounded font-bold text-gray-700">UPI</span>
            <span className="bg-gray-100 px-2 py-0.5 rounded font-bold text-gray-700">RuPay</span>
            <span className="bg-gray-100 px-2 py-0.5 rounded font-bold text-gray-700">Visa</span>
            <span className="bg-gray-100 px-2 py-0.5 rounded font-bold text-gray-700">Mastercard</span>
            <span className="bg-gray-100 px-2 py-0.5 rounded font-bold text-gray-700">NetBanking</span>
            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">COD Available</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
