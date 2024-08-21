import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router';


const SearchInput = ({classes}) => {
  const Navigate=useNavigate('');
  const [keyword,setKeyword]=useState();

  const searchHandle=async(req,res)=>{
    if(!keyword){
      return toast.error('Please Enter Atleast 3 keywords')
    }
         if(  keyword.length>2){
          Navigate(`/search-product/${keyword}`)
         }
         else{
            toast.error('Please Enter Atleast 3 keywords')
         }
  }
  return (
    <div>
        <div className={' relative rounded-md ' + classes}>
        <input required placeholder='Search Mobile' value={keyword} onChange={(e)=>setKeyword(e.target.value)} className=' w-full py-2 overflow-hidden rounded-sm focus:outline-none pl-2' />
           <button onClick={searchHandle}><FiSearch   className=' absolute top-2 right-2 text-xl cursor-pointer' /></button>

        </div>
    </div>
  )
}

export default SearchInput;