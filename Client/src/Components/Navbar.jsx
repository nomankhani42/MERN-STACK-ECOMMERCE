import React, { useState } from "react";
import SearchInput from "./SubComponents/SearchInput";
import NavMenu from "./SubComponents/NavMenu";
import { FaCartShopping } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import UserDetailsCard from "./SubComponents/UserDetailsCard";
import { clearCart } from "../Redux/Cart/CartSlice";
import { removeUser } from "../Redux/user/UserSlice";
import { logoutSuccess } from "../Redux/auth/AuthSlice";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const userDetails = useSelector((state) => state.user);
  const [activeDetails, setActiveDetails] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const auth = useSelector((state) => state.auth);
  const Mycart = useSelector((state) => state.cart);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandle = () => {
    dispatch(logoutSuccess());
    dispatch(removeUser());
    dispatch(clearCart());
    setLogoutVisible(false);
    Navigate("/");
  };

  return (
    <div>
      <div className="pt-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 sticky top-0 z-10">
        <div className="px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex gap-3 items-center">
            <h2 className="text-2xl font-bold text-white">BESTO SALE</h2>
          </div>
          
          {/* Search Input */}
          <div>
            <SearchInput classes="w-[430px] hidden lg:block" />
          </div>

          {/* Navigation and Cart */}
          <div className="flex gap-x-5 items-center">
            <NavMenu classes={"md:flex gap-x-5 hidden"} />
            
            {/* Cart Icon on Mobile */}
            <div className="relative cursor-pointer md:hidden">
              <FaCartShopping
                onClick={() => Navigate('/cart')}
                className="text-white text-xl"
              />
              <div className="w-7 h-7 rounded-[50%] bg-yellow-500 text-white absolute -right-4 -top-5 flex items-center justify-center">
                {Mycart.totalQuantities}
              </div>
            </div>

            {/* User Menu */}
            {auth.isAuthenticated ? (
              <div className="flex relative bg-white p-3 items-center rounded-lg shadow-lg">
                <span className="text-black font-semibold text-sm">
                  {userDetails.name}
                </span>
                {activeDetails ? (
                  <MdArrowDropUp
                    onClick={() => setActiveDetails(!activeDetails)}
                    className="ml-2 text-lg cursor-pointer"
                  />
                ) : (
                  <MdArrowDropDown
                    onClick={() => setActiveDetails(!activeDetails)}
                    className="ml-2 text-lg cursor-pointer"
                  />
                )}
                {activeDetails && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <UserDetailsCard
                        setActiveDetails={setActiveDetails}
                        setLogoutVisible={setLogoutVisible}
                      />
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            ) : (
              <button
                onClick={() => Navigate('/login')}
                className="px-4 py-2 bg-white text-blue-600 rounded-lg shadow-lg uppercase md:hidden"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* 2nd Row */}
        <div className="px-6 mt-4 pb-2 lg:pb-0 flex items-center justify-between md:justify-end">
          <FaHome
            onClick={() => Navigate('/')}
            className="text-white md:hidden text-2xl cursor-pointer"
          />
          <SearchInput classes="w-[70vw] ml-auto lg:hidden" />
        </div>
      </div>

      {/* Logout Modal */}
      {logoutVisible && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LogoutModal
              logoutHandle={logoutHandle}
              setLogoutVisible={setLogoutVisible}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

const LogoutModal = ({ setLogoutVisible, logoutHandle }) => {
  return (
    <div className="z-[500] fixed inset-0 bg-black backdrop-blur bg-opacity-25 flex justify-center items-center">
      <div className="bg-white p-6 w-[350px] rounded-lg shadow-lg">
        <p className="text-center text-sm text-gray-800">
          Are you sure you want to logout? Please note that your items will be deleted.
        </p>
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={() => logoutHandle()}
            className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
          >
            Yes
          </button>
          <button
            onClick={() => setLogoutVisible(false)}
            className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
