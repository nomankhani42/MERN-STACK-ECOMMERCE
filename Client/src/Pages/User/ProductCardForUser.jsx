import React from 'react';
import { IoStarSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Cart/CartSlice';

const ProductCardForUser = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <div className="p-4 xl:col-span-3 md:col-span-4 sm:col-span-6 col-span-12 cursor-pointer transition-transform transform hover:scale-105">
      <div className="border rounded-lg shadow-lg hover:shadow-xl overflow-hidden bg-white">
        {/* Product Image */}
        <div className="relative">
          <img
            className="w-full h-48 md:h-60 object-cover"
            src={`/api/product/get-product-photo/${data._id}`}
            alt={data.title}
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h2 className="text-lg md:text-xl font-semibold text-center truncate" title={data.title}>
            {data.title}
          </h2>
          <p className="text-gray-600 text-sm md:text-base text-center mt-2">
            {data.description.substring(0, 50)}...
          </p>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-center gap-2 py-2">
          <div className="flex gap-1 text-yellow-400">
            {[...Array(4)].map((_, i) => (
              <IoStarSharp key={i} />
            ))}
            <IoStarSharp className="text-gray-300" />
          </div>
          <span className="text-gray-500 text-sm">55 Reviews</span>
        </div>

        {/* Price Section */}
        <div className="text-center my-2">
          <span className="text-gray-500 text-sm line-through mr-2">
            ${(data.price + 5).toFixed(2)}
          </span>
          <span className="text-black font-bold text-lg">${data.price}</span>
        </div>

        {/* Add to Cart Button */}
        <div className="px-4 pb-4">
          <button
            onClick={() => dispatch(addToCart({ ...data, quantity: 1 }))}
            className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardForUser;
