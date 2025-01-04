import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="py-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-center gap-x-6 mb-4">
          <Link className="text-white text-lg font-semibold hover:text-yellow-300 transition duration-300">
            Privacy & Policy
          </Link>
          <Link className="text-white text-lg font-semibold hover:text-yellow-300 transition duration-300">
            About Us
          </Link>
          <Link className="text-white text-lg font-semibold hover:text-yellow-300 transition duration-300">
            New Products
          </Link>
          <Link className="text-white text-lg font-semibold hover:text-yellow-300 transition duration-300">
            Terms and Conditions
          </Link>
        </div>
        <div>
          <p className="text-sm text-white text-center pt-4">
            All Rights Reserved &copy; BB Store @2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
