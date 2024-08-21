import React from 'react'
import Layout from '../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
// import { FaTrashAlt } from "react-icons/fa";
import { clearCart, decreaseProductQuantity, increaseProductQuantity } from '../Redux/Cart/CartSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Cart = () => {

   const Mycart = useSelector(state => state.cart);
   const auth = useSelector((state) => state.auth);
   const dispatch=useDispatch();
   const Navigate=useNavigate();
   const location=useLocation();
   
   return (
      <Layout>
         <div>
            <div className=' md:p-20 p-4'>
               <h2 className=' text-center text-2xl my-4'>{Mycart.cart.length>0 ? 'Shopping Cart' : "Your Cart is Empty"}</h2>
               {/* table for card Products to display*/}
            {
               Mycart.cart.length>0 ? 
               <div class="flex flex-col">
               <div class="-m-1.5 overflow-x-auto">
                  <div class="p-1.5 min-w-full inline-block align-middle">
                     <div class="border rounded-lg overflow-hidden dark:border-neutral-700">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                           <thead class="bg-gray-50 dark:bg-neutral-700">
                              <tr>
                                 <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Product</th>
                                 <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Price</th>
                                 <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Quantity</th>
                                 <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Total</th>
                              </tr>
                           </thead>
                           <tbody class="divide-y divide-gray-200">
                              {/* loop of products  */}
                              {Mycart.cart.map((item) => {
                                 return <tr>
                                    <td class="px-4 py-4  text-sm font-medium text-gray-800">
                                       <div className='  flex flex-col lg:flex-row lg:items-center gap-2'>
                                          <div>
                                             <img className=' w-24 h-28' src={`/api/product//get-product-photo/${item._id}`} alt="" />
                                          </div>
                                          <div className=' text-ellipsis text-center '>{item.title}</div>
                                       </div>
                                    </td>
                                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                                       ${item.price}
                                    </td>
                                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-800"> <div>
                                       <span onClick={()=>dispatch(increaseProductQuantity(item._id))} className=' cursor-pointer border border-gray-200 py-2 px-2' >
                                          +
                                       </span>
                                       <span className=' border border-gray-200 py-2 px-2' >
                                          {item.quantity}
                                       </span>
                                       <span onClick={()=>dispatch(decreaseProductQuantity(item._id))} className=' cursor-pointer border border-gray-200 py-2 px-2'>
                                          -
                                       </span >
                                    </div>
                                    </td>
                                    <td class="px-4 py-4 whitespace-nowrap text-end text-sm font-medium">
                                      ${item.price * item.quantity}
                                    </td>

                                 </tr>
                              })}


                           </tbody>
                        </table>

                     </div>
                     {/* footer of my cart for example checkout and clear cart  */}
                     <div className='flex justify-between items-baseline'>
                        {/* clear cart button wrapper  */}
                        <div className=' m-5 '>
                           <button onClick={()=>dispatch(clearCart())} className=' px-4 py-2 text-white bg-red-500 uppercase rounded font-semibold'>Clear Cart</button>
                        </div>
                        {/* this check out and total etc functionslity  */}
                        <div className=' flex flex-col gap-2'>
                           <h2 className=' uppercase text-xl ' >Net Amount : ${Mycart.netAmount.toFixed(2)}</h2>
                           {
                              auth.isAuthenticated ? <Link to={'/checkout'} className=' self-end px-4 py-2 text-white bg-green-500 uppercase rounded font-semibold'>checkout</Link> :
                               <button onClick={()=>Navigate('/login',{
                                 state:location.pathname
                               })} className=' self-end px-4 py-2 text-white bg-orange-500 uppercase rounded font-semibold'>Login to checkout</button>
                           }
                        </div>
                     </div>
                  </div>
               </div>
            </div>
               : null
            }

               <div>


               </div>
            </div>
         </div>
      </Layout>
   )
}

export default Cart;