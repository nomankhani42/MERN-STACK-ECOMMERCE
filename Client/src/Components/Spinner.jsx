import React, { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from 'react-redux';
;

const Spinner = () => {
    let [count,setCount]=useState(5);
    const navigate=useNavigate();
    const location=useLocation();
    const auth=useSelector(state=>state.auth);
    
    
   
   

    useEffect(()=>{
      const interval=setInterval(()=>setCount((prev)=>--prev),1000)
    

      if(count===0){
        clearInterval(interval);
       console.log('stoped')
       
       navigate(auth.isAuthenticated ? '/' :'/login',{
        state:location.pathname
       })
      
      }
     
      

    },[count])
  return (
    <div className=' flex justify-center items-center flex-col h-screen'>
        <h2 className=' my-2 text-2xl'>Redirecting in {count}s ...</h2>
              <ClipLoader
        color={'blue'}
        loading={true}
        
        size={120}
        
      />

    </div>
  )
}

export default Spinner