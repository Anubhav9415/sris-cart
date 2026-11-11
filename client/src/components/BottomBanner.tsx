import React from "react";
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-10 md:mt-16 rounded-2xl sm:rounded-3xl overflow-hidden bg-emerald-50/60 border border-emerald-100 shadow-xs">
      {/* Desktop Layout with Overlay */}
      <div className="hidden md:block relative">
        <img
          src={assets.bottom_banner_image}
          alt="Why SrisCart is the Best"
          className="w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-end justify-center pr-12 lg:pr-24">
          <div className="max-w-md space-y-3">
            <h2 className="text-2xl lg:text-3xl font-black text-amber-600 mb-4">
              Why We Are the Best
            </h2>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3.5">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-10 h-10 shrink-0"
                />
                <div>
                  <h3 className="text-base lg:text-lg font-bold text-gray-900 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs lg:text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / Small Tablet Stacked Card Layout (Never overlaps or clips!) */}
      <div className="md:hidden">
        <div className="p-5 sm:p-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-amber-600 text-center">
            Why We Are the Best
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/90 p-3 rounded-2xl border border-emerald-100 shadow-2xs"
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-9 h-9 shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-0.5 leading-snug">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <img
          src={assets.bottom_banner_image_sm}
          alt="Fresh Groceries"
          className="w-full h-44 sm:h-56 object-cover object-bottom"
        />
      </div>
    </div>
  );
};

export default BottomBanner;
