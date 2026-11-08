import React, { useState, useEffect } from "react";
import { MapPin, X, Check, Search, Navigation } from "lucide-react";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: {
    address: string;
    city: string;
    pincode: string;
    deliveryTime: string;
  };
  onSelectLocation: (loc: {
    address: string;
    city: string;
    pincode: string;
    deliveryTime: string;
  }) => void;
}

const POPULAR_LOCALITIES = [
  {
    address: "Uma Society, Ajwa Road",
    city: "Vadodara, Gujarat",
    pincode: "390019",
    deliveryTime: "9 mins",
  },
  {
    address: "Alkapuri Main Commercial Hub",
    city: "Vadodara, Gujarat",
    pincode: "390007",
    deliveryTime: "12 mins",
  },
  {
    address: "Manjalpur Ring Road",
    city: "Vadodara, Gujarat",
    pincode: "390011",
    deliveryTime: "15 mins",
  },
  {
    address: "Gotri Road near Yash Complex",
    city: "Vadodara, Gujarat",
    pincode: "390021",
    deliveryTime: "14 mins",
  },
  {
    address: "Akota Stadium Area",
    city: "Vadodara, Gujarat",
    pincode: "390020",
    deliveryTime: "10 mins",
  },
  {
    address: "Karelibaug Water Tank",
    city: "Vadodara, Gujarat",
    pincode: "390018",
    deliveryTime: "11 mins",
  },
  {
    address: "Sayajigunj Railway Station Circle",
    city: "Vadodara, Gujarat",
    pincode: "390005",
    deliveryTime: "8 mins",
  },
  {
    address: "Fatehgunj Near University",
    city: "Vadodara, Gujarat",
    pincode: "390002",
    deliveryTime: "9 mins",
  },
];

const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}) => {
  const [pincodeInput, setPincodeInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleApplyPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincodeInput.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setErrorMsg("Please enter a valid 6-digit Indian Pincode");
      return;
    }
    setErrorMsg("");

    // If starts with 390 (Vadodara)
    const isVadodara = cleanPin.startsWith("390");
    const newLoc = {
      address: isVadodara ? "Vadodara Central" : "Standard Delivery Zone",
      city: isVadodara ? "Vadodara, Gujarat" : "Gujarat, India",
      pincode: cleanPin,
      deliveryTime: isVadodara ? "9 mins" : "Next Day",
    };
    onSelectLocation(newLoc);
    onClose();
  };

  const filteredLocalities = POPULAR_LOCALITIES.filter(
    (loc) =>
      loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.pincode.includes(searchQuery) ||
      loc.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-linear-to-r from-amber-50 to-orange-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-amber-700 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Choose Delivery Location
              </h3>
              <p className="text-xs text-gray-500">
                Select your area for fastest delivery time
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Custom Pincode Input Form */}
          <form onSubmit={handleApplyPincode} className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Enter Pincode
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => {
                    setPincodeInput(e.target.value.replace(/\D/g, ""));
                    setErrorMsg("");
                  }}
                  placeholder="e.g. 390019"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-linear-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-semibold text-sm rounded-xl transition shadow-xs cursor-pointer"
              >
                Apply
              </button>
            </div>
            {errorMsg && (
              <p className="text-xs text-red-500 font-medium">{errorMsg}</p>
            )}
          </form>

          {/* Current Selection Pill */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <p className="text-xs text-gray-500">Currently Delivering to:</p>
                <p className="text-sm font-bold text-gray-800">
                  {currentLocation.address}, {currentLocation.city} -{" "}
                  {currentLocation.pincode}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-white px-2.5 py-1 rounded-full shadow-xs border border-amber-200">
              ⚡ {currentLocation.deliveryTime}
            </span>
          </div>

          {/* Popular Areas in Vadodara */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-primary" /> Popular
                Vadodara Locations
              </p>
              <span className="text-[11px] text-gray-400">
                {filteredLocalities.length} areas
              </span>
            </div>

            <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1 divide-y divide-gray-50">
              {filteredLocalities.map((loc, idx) => {
                const isSelected = currentLocation.pincode === loc.pincode;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      onSelectLocation(loc);
                      onClose();
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition ${
                      isSelected
                        ? "bg-primary/10 border border-primary/30"
                        : "hover:bg-gray-50 border border-transparent"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {loc.address}
                      </p>
                      <p className="text-xs text-gray-500">
                        {loc.city} - {loc.pincode}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        {loc.deliveryTime}
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-amber-600 font-bold" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
          <span>SrisCart Quick Express Delivery Network</span>
          <button
            onClick={onClose}
            className="text-gray-700 font-semibold hover:underline cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;

