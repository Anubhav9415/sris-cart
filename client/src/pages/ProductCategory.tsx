import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { RootState } from "../store";

const ProductCategory = () => {
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.products.products);
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category?.toLowerCase()
  );
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category?.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-6 sm:mt-10 pb-12">
      <div className="flex flex-col items-start w-max mb-4 sm:mb-6">
        <p className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 uppercase">
          {searchCategory ? searchCategory.text : category}
        </p>
        <div className="w-16 h-1 bg-primary rounded-full mt-1"></div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4 mt-4 sm:mt-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] bg-white rounded-3xl border border-gray-200 p-6 text-center space-y-4">
          <p className="text-lg sm:text-2xl font-bold text-gray-800">
            No products found in this category
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-full transition cursor-pointer"
          >
            Browse All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
