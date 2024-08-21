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
import { AnimatePresence,motion } from "framer-motion";

const Navbar = () => {
 
  const userDetails = useSelector((state) => state.user);
  const [activeDetails, setActiveDetails] = useState(false);
  const [logoutVisible,setLogoutVisible]=useState(false);
  const auth = useSelector((state) => state.auth);
  const Mycart=useSelector(state=>state.cart);
  const Navigate=useNavigate()
  const dispatch=useDispatch();

  const logoutHandle = () => {
    dispatch(logoutSuccess());
    dispatch(removeUser());
    dispatch(clearCart())
    setLogoutVisible(false)

    Navigate("/");
  };

  return (
    <div>
      <div className="pt-4   bg-blue-600 sticky top-0 z-10">
      <div className=" px-5 flex justify-between items-center">
        {/* {LOGO} */}
        <div className="flex gap-3 items-center">
          
          <h2 className=" text-2xl font-bold text-white">BESTO SALE</h2>
        </div>
        {/* {search} */}
        <div>
          <SearchInput classes="w-[430px]  hidden lg:block" />
        </div>
        {/* {nav } */}
        <div className="flex gap-x-5 items-center">
          <NavMenu classes={"md:flex gap-x-5 hidden "} />
          {/* {cart icon on sm screen} */}
         <div className="relative cursor-pointer md:hidden"> 
          <FaCartShopping onClick={()=>Navigate('/cart')} className="  text-white text-xl" />
          <div className=" w-7 h-7 rounded-[50%] bg-yellow-500 text-white absolute -right-4 -top-5 flex items-center justify-center">
           {Mycart.totalQuantities}
         </div>
          </div>
          {auth.isAuthenticated ? (
            <div className="flex relative  bg-white p-3 items-end">
              {" "}
              <span className="text-black font-semibold text-sm">
                {userDetails.name}
              </span>{" "}
              {activeDetails ? (
                <MdArrowDropUp  onClick={()=>setActiveDetails(!activeDetails)} className="ml-2 text-sm  align-bottom" />
              ) : (
                <MdArrowDropDown onClick={()=>setActiveDetails(!activeDetails)} className="ml-2 text-sm  align-bottom" />
              )}
              {
                activeDetails ? <AnimatePresence>
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}>
                    <UserDetailsCard setActiveDetails={setActiveDetails}   setLogoutVisible={setLogoutVisible} />
                    </motion.div>
                </AnimatePresence> :null
              }
            </div>
          ) : <button onClick={()=>Navigate('/login')} className=" px-3 py-2 md:hidden bg-white uppercase rounded">Login</button>}
        </div>
      </div>
      {/* {2nd row}  */}
      <div className="px-5 mt-4 pb-2 lg:pb-0 flex items-center justify-between md:justify-end">
        <FaHome onClick={()=>Navigate('/')} className="text-white md:hidden text-2xl cursor-pointer" />

        <SearchInput classes="w-[70vw]  ml-auto lg:hidden" />
      </div>
     
    </div>
      {logoutVisible ? <AnimatePresence>
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}>
                    <LogoutModal logoutHandle={logoutHandle} setLogoutVisible={setLogoutVisible}/>
                    </motion.div>
                </AnimatePresence>  : null}
    </div>
  );
};


const LogoutModal=({setLogoutVisible,logoutHandle})=>{

  return (
    <div className="z-[500] fixed inset-0 bg-black backdrop-blur bg-opacity-25 flex justify-center items-center">
        <div className=" bg-white p-5 w-[350px] ">
              <p className=" text-center">Are You Want Sure to Logout Make Sure That Your Items Will Also Be Deleted</p>
               <div className=" flex justify-center gap-2 mt-2">
               <button onClick={()=>logoutHandle()} className="px-4 uppercase py-2 bg-green-400  text-white">Yes</button>
               <button onClick={()=>setLogoutVisible(false)} className="px-4 uppercase py-2 bg-red-400  text-white">No</button>
               </div>
        </div>
    </div>
  )
}

export default Navbar;
