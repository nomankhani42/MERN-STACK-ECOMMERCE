import  axios  from 'axios';
import React, { useEffect, useState } from 'react'
import {Outlet} from 'react-router'
import { useSelector } from 'react-redux'
// import Layout from '../Layout/Layout';
import Spinner from '../Components/Spinner';

const UserProtected = () => {
   const[ok,setOk]=useState(false);
   const auth=useSelector(state=>state.user);

   const userCheck=async()=>{
    const res=await axios.get('/api/auth-check',{
        headers:{
            "authorization":auth.token
        }
    })
    console.log(res)
    if(res.data.success && res.data.user.role !== 1){
        setOk(true)
    }

}

   useEffect(()=>{
   if(auth?.token) userCheck();
   },[auth]);

   return ok ? <Outlet /> : <Spinner />;
  
}

export default UserProtected