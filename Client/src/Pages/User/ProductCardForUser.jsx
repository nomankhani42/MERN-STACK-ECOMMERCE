import React from 'react';
import { IoStarSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Cart/CartSlice';

const ProductCardForUser = ({data}) => {

   const dispatch=useDispatch();
  return (
    <div className=' xl:col-span-3 p-3 cursor-pointer md:col-span-4 col-span-6 transition-all duration-1000' >
          <div className=' border-[1px] shadow-md'>
                <div>
                <img className=' md:h-[250px] h-[150px] w-full block m-auto' src={`/api/product//get-product-photo/${data._id}`} alt="" />

                </div>
                <div>
                    <h2 className='md:h-10 md:text-xl  text-center font-semibold'>{data.title}</h2>
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
                <div className=' mx-auto my-2'>
                    <h5 className='font-semibold text-center'>$<span className=' line-through px-3'>{(data.price+5).toFixed(2)}</span> <span>{data.price}</span></h5>
                </div>
                <div>
                    <button onClick={()=>dispatch(addToCart({...data,quantity:1}))} className=' w-[80%] text-white bg-black py-2 rounded font-semibold my-2 block mx-auto'>Add to Cart</button>
                </div>
          </div>
    </div>
  )
}

export default ProductCardForUser;
