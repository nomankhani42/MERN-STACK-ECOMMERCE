import React from "react";
import { NavLink } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../Redux/auth/AuthSlice";


const NavMenu = ({classes}) => {
  const isAuthutenticate=useSelector(state=>state.auth.isAuthenticated);
  const Mycart=useSelector(state=>state.cart);
  const dispatch = useDispatch();

  const handleLogOut=()=>{
    setTimeout(()=>{
      dispatch(logoutSuccess())
      
    },180)
    setTimeout(()=>window.location.reload(),200);
    
    
   
    
   
  }
  return (
    <div className={classes}>
    <div className="flex gap-x-5 md:flex-row flex-col gap-y-5 ">
    <NavLink
       to={'/'} className={"uppercase  text-black md:text-white font-semibold hover:text-red-400"}
      >
        Home
      </NavLink>
     
     {!isAuthutenticate ?  <NavLink
      to={'/register'}
        className={"uppercase text-black md:text-white font-semibold hover:text-red-400"}
      >
        Register
      </NavLink>  : null }
      {!isAuthutenticate ? <NavLink
      to={'/login'}
        className={"uppercase text-black md:text-white font-semibold hover:text-red-400"}
      >
        Login
      </NavLink> : null}
     
      <NavLink
      to={'/cart'}
        className={
          "uppercase text-white font-semibold hidden relative  hover:text-red-400 md:flex items-center "
        }
      >
         Cart <CiShoppingCart size={25} className=" text-xl font-bold w-7 h-7 " />
         <div className=" w-7 h-7 rounded-[50%] bg-yellow-500 hover:text-white absolute -right-4 -top-3 flex items-center justify-center">
           {Mycart.totalQuantities}
         </div>

      </NavLink>
      {isAuthutenticate ? <NavLink
      to={'/login'}
      onClick={handleLogOut}
        className={"uppercase hidden text-black md:text-white font-semibold hover:text-red-400"}
      >
        LogOut
      </NavLink> : null}
    </div>
    </div>
  );
};

export default NavMenu;
