import React from "react";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [email, setEmail] = React.useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("Subscribed for exclusive SrisCart deals!");
      setEmail("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 mt-12 md:mt-20 pb-8 md:pb-12 px-4">
      <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-gray-900">
        Never Miss a Deal!
      </h2>
      <p className="text-xs sm:text-sm md:text-lg text-gray-500 pb-4 sm:pb-6 max-w-xl">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </p>
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col xs:flex-row items-stretch justify-center max-w-xl w-full gap-2 xs:gap-0"
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-xl xs:rounded-r-none h-11 sm:h-12 outline-none w-full px-3.5 text-sm text-gray-700 bg-white focus:border-amber-400"
          type="email"
          placeholder="Enter your email address"
          required
        />
        <button
          type="submit"
          className="px-6 sm:px-10 h-11 sm:h-12 bg-linear-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold text-sm cursor-pointer rounded-xl xs:rounded-l-none shrink-0 transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
