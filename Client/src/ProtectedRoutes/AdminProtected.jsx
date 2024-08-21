import  axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {Outlet} from 'react-router'
import Spinner from '../Components/Spinner';

const AdminProtected = () => {

    const [ok,setOk]=useState(false);
    const auth=useSelector(state=>state.user);
 
 const adminCheck=async()=>{
   const res = await axios.get('/api/admin-check',{
     headers:{
        "authorization":auth.token


     }
   
   })
   console.log(res.data)
   if(res.data.success ){
       setOk(true);
   }
 }
    useEffect(()=>{
      adminCheck();
    },[])
  return ok ? <Outlet /> : <Spinner />;
}

export default AdminProtected