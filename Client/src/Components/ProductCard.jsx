import React from 'react';
import { IoStarSharp } from "react-icons/io5";

const ProductCard = ({data, setProductModalFlag,setProductModalData}) => {
  return (
    <div className=' lg:col-span-5 md:col-span-4 col-span-6 p-3 cursor-pointer transition-all duration-1000' onClick={()=>{
      setProductModalData(data)
      setProductModalFlag(true)
      }}>
          <div className=' border-[1px] shadow-md'>
                <div>
                <img className=' h-[250px] w-full block m-auto' src={`/api/product//get-product-photo/${data._id}`} alt="" />

                </div>
                <div>
                    <h2 className=' text-xl text-center font-semibold'>{data.title}</h2>
                    <p className='px-3 text-center py-2'>{data.description.substring(0,25)} ..</p>
                </div>
                <div className='flex items-center justify-around'>
                    <div className=' flex gap-[2px]'>
                    <IoStarSharp className=' text-yellow-300' />
                    <IoStarSharp className=' text-yellow-300' />
                    <IoStarSharp className=' text-yellow-300' />
                    <IoStarSharp className=' text-yellow-300' />
                    <IoStarSharp className=' ' />
                    </div>
                    <span>55 Reviews</span>
                </div>
                <div className='px-2 my-2'>
                    <h5 className='font-semibold'>RS : <span className=' line-through px-3'>{data.price+1000}</span> <span>{data.price}</span></h5>
                </div>
          </div>
    </div>
  )
}

export default ProductCard
