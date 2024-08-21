import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";


const AdminMenu = ({activeMenu}) => {
     const [menuBool,setMenuBool]=useState(false)
  
  return (
    <div >
        
        <div className="relative px-5 py-3 w-[500px] lg:hidden">
  <button 
    onClick={() => setMenuBool(!menuBool)} 
    className="px-5 py-2 mt-2 shadow-lg transition-transform duration-300 rounded-lg flex items-center justify-between gap-3 bg-blue-500 text-white text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
  >
    <span>
      {activeMenu === 0 ? 'Admin Profile' : 
        activeMenu === 1 ? 'Categories' : 
        activeMenu === 2 ? 'Add Product' : 
        activeMenu === 3 ? 'Product List' : 
        activeMenu === 4 ? 'Orders' : 
        activeMenu === 5 ? 'Completed Orders' : ''
      }
    </span>
    {menuBool ? <IoMdArrowUp className="text-white" /> : <IoMdArrowDown className="text-white" />}
  </button>
  
  {menuBool && (
    <ul className="absolute mt-2 z-50 py-2 px-4 bg-white rounded-lg shadow-xl w-[300px] transition-opacity duration-300 ease-in-out">
      <li>
        <NavLink 
          to="/dashboard/admin" 
          className={`py-2 my-1 block px-4 text-md font-semibold rounded-lg ${activeMenu === 0 ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-100'}`}
        >
          Admin Profile
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/dashboard/create-category" 
          className={`py-2 my-1 block px-4 text-md font-semibold rounded-lg ${activeMenu === 1 ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-100'}`}
        >
          Categories
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/dashboard/add-product" 
          className={`py-2 my-1 block px-4 text-md font-semibold rounded-lg ${activeMenu === 2 ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-100'}`}
        >
          Add Product
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/dashboard/product-list" 
          className={`py-2 my-1 block px-4 text-md font-semibold rounded-lg ${activeMenu === 3 ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-100'}`}
        >
          Product List
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/dashboard/manage-orders" 
          className={`py-2 my-1 block px-4 text-md font-semibold rounded-lg ${activeMenu === 4 ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-100'}`}
        >
          Orders
        </NavLink>
      </li>
     
    </ul>
  )}
</div>

<div className="p-5 hidden lg:flex flex-col bg-gray-100 rounded-lg shadow-lg">
  <NavLink 
    to="/dashboard/admin" 
    className={`py-4 px-6 mb-2 rounded-lg border transition-colors duration-300 text-xl font-semibold ${activeMenu === 0 ? 'bg-blue-500 text-white border-blue-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-200'}`}
  >
    Admin Profile
  </NavLink>

  <NavLink 
    to="/dashboard/create-category" 
    className={`py-4 px-6 mb-2 rounded-lg border transition-colors duration-300 text-xl font-semibold ${activeMenu === 1 ? 'bg-blue-500 text-white border-blue-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-200'}`}
  >
    Categories
  </NavLink>

  <NavLink 
    to="/dashboard/add-product" 
    className={`py-4 px-6 mb-2 rounded-lg border transition-colors duration-300 text-xl font-semibold ${activeMenu === 2 ? 'bg-blue-500 text-white border-blue-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-200'}`}
  >
    Add Products
  </NavLink>

  <NavLink 
    to="/dashboard/product-list" 
    className={`py-4 px-6 mb-2 rounded-lg border transition-colors duration-300 text-xl font-semibold ${activeMenu === 3 ? 'bg-blue-500 text-white border-blue-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-200'}`}
  >
    Products List
  </NavLink>

  <NavLink 
    to="/dashboard/manage-orders" 
    className={`py-4 px-6 mb-2 rounded-lg border transition-colors duration-300 text-xl font-semibold ${activeMenu === 4 ? 'bg-blue-500 text-white border-blue-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-200'}`}
  >
    Orders
  </NavLink>

 
</div>
 
    </div>
  )
}

export default AdminMenu;