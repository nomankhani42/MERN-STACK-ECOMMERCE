import React from 'react';
import { IoMdClose } from "react-icons/io";

const OrderViewModal = ({ viewOrderModal, setViewOrderModal ,OrderData}) => {

  const closeModal=(e)=>e.target.id!=='wrapper' ? setViewOrderModal(false): null;
  return (
    <div onClick={(e)=>closeModal(e)} className='fixed backdrop-blur bg-black bg-opacity-25 inset-0 z-[100]'>
      <div className='flex flex-col justify-center h-screen items-center'>
           {/* this is our icon Wrapper */}
           <div className='w-[80vw]'id='wrapper'>
                <IoMdClose onClick={()=>setViewOrderModal(false)} className='cursor-pointer text-xl block ml-auto text-lime-100' />
           </div>
        {/* this is our div Wrapper  */}

        <div className='w-[80vw] mt-2 bg-white p-5'>
            {/* first row Wrapper  */}
            <div className='flex items-center justify-between px-2'>
            <div>
                  <span>Name : </span>
                  <span className=' capitalize'>{`${OrderData.first_Name} ${OrderData.last_Name}`}</span>
            </div>
            <div className='w-40'>
                 <span>Payment :</span>
                 <span className={OrderData.payment ?" text-white bg-green-600 px-1 py-1 mx-2 skew-x-1" : 'text-white bg-red-600 px-1 py-1 mx-2 skew-x-1'}> {OrderData.payment ?" Success" : 'Failed'}</span>
            </div>
            </div>

              {/* second row Wrapper  */}
              <div className='flex  items-center my-2 justify-between px-2'>
            <div>
                  <span>Phone : </span>
                  <span className=' capitalize'>{OrderData.phone}</span>
            </div>
            <div className='w-40'>
                 <span>Address :</span>
                 <span >{` Street ${OrderData.street} Postal Code ${OrderData.postal_code} ${OrderData.city}`} </span>
            </div>
            </div>
               {/* third  row Wrapper  */}
               <div className='flex items-center my-2 justify-between px-2'>
            <div>
                  <span>Status : </span>
                  <span className=' capitalize'>{OrderData.status}</span>
            </div>
            <div className='w-40'>
                 <span>Net Amount : </span>
                 <span >$ {OrderData.NetAmount} </span>
            </div>
            </div>

            {/* this is product details that user has order and want from us  */}
             
            <div className="flex flex-col">
  <div className="-m-1.5 overflow-x-auto">
    <div className="p-1.5 min-w-full inline-block align-middle">
      <div className="border rounded-lg overflow-hidden dark:border-neutral-700">
        <div className="max-h-[400px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead className="bg-gray-50 dark:bg-neutral-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Product</th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Price</th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Quantity</th>
                <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Loop of products */}
              {OrderData.cart_items.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-4 text-sm font-medium text-gray-800">
                    <div className='flex flex-col lg:flex-row lg:items-center gap-2'>
                      <div>
                        <img className='w-24 h-28' src={`/api/product/get-product-photo/${item._id}`} alt={`Photo of ${item.title}`} />
                      </div>
                      <div className='text-ellipsis overflow-hidden'>{item.title}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                    <span className='border border-gray-200 py-2 px-2'>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-end text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

              
        </div>
      </div>
    </div>
  )
}

export default OrderViewModal
