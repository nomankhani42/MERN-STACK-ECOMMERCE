// import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const UserDetailCard = ({setLogoutVisible,setActiveDetails}) => {
  const userDetails = useSelector((state) => state.user);
  
  console.log(userDetails.role)
 
  return (
    <div onMouseLeave={()=>setActiveDetails(false)} className="max-w-sm absolute top-14 lg:top-16 right-0 border border-gray-200 bg-white shadow-lg rounded-lg z-10 p-6 space-y-4">
    <div className="flex items-center space-x-3 py-2">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-xl font-bold">{userDetails.userName?.[0] || '?'}</span>
      </div>
      <div className="flex-1">
        <p className="text-gray-600 font-semibold">User Name:</p>
        <p className="text-gray-800">{userDetails.userName || 'N/A'}</p>
      </div>
    </div>
    <div className="flex items-center space-x-3 py-2">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-xl font-bold">🌍</span>
      </div>
      <div className="flex-1">
        <p className="text-gray-600 font-semibold">Country:</p>
        <p className="text-gray-800">{userDetails.country || 'N/A'}</p>
      </div>
    </div>
    <div className="flex justify-between">
      <Link
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        to={`/dashboard/${
          Number(userDetails.role) === 0
            ? 'user'
            : Number(userDetails.role) === 1
            ? 'admin'
            : 'page-not-found'
        }`}
      >
        Dashboard
      </Link>
      <button
        className="bg-red-500 hover:bg-red-600 mx-1 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        onClick={() => setLogoutVisible(true)}
        aria-label="Logout"
      >
        Logout
      </button>
    </div>
  </div>
  );
};



export default UserDetailCard;
