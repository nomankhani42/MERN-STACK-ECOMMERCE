import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="py-10 bg-blue-600">
      <div className="px-5">
           <div className="flex gap-x-3 justify-center">
             <Link className=" text-white text-md font-semibold">Privacy & Policy |</Link>
             <Link className=" text-white text-md font-semibold">About Us |</Link>
             <Link className=" text-white text-md font-semibold">New Products |</Link>
             <Link className=" text-white text-md font-semibold" >Terms and Conditions</Link>
           </div>
           <div>
             <p className="text-sm text-white text-center pt-2">All right Reserved Copyright BB Store @2024 </p>
           </div>
      </div>
    </div>
  );
};

export default Footer;
