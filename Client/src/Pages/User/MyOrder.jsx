import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import UserMenu from '../../Components/UserMenu';
import { FaEye } from "react-icons/fa6";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AnimatePresence ,motion} from 'framer-motion';
import OrderViewModal from '../../Components/OrderViewModal';

const MyOrder = () => {
  const [orderList, setOrderList] = useState([]);
  const [viewOrderModal,setViewOrderModal]=useState(false);
  const [OrderData,setOrderData]=useState({});
  

  const auth = useSelector(state => state.auth)

  const getOrdersOfUser = async () => {
    try {
      const response = await axios.get('/api/order/get-user-orders', {
        headers: {
          Authorization: auth.token
        }


      });

      if (response.data.success) {
        setOrderList(response.data.UserOrders)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOrdersOfUser();
  }, [])
  return (
    <Layout>
      <div className='lg:p-10 sm:p-5 py-5 px-2 lg:grid grid-cols-12'>
        <div className=' col-span-3'>
          <UserMenu index={2} />
        </div>
        <div className='col-span-8'>
          <h2 className=' text-center text-xl uppercase my-4'>My Orders</h2>
          <div className="flex flex-col overflow-x-auto">
            <div className="sm:-mx-4 lg:-mx-6">
              <div className="inline-block min-w-full py-2 sm:px-4 lg:px-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr className=' bg-neutral-800 uppercase text-white'>
                        <th scope="col" className="px-3 py-4 text-center">S No</th>
                        <th scope="col" className="px-3 py-4 text-center">Status</th>
                        <th scope="col" className="px-3 py-4 text-center">Buyer</th>
                        <th scope="col" className="px-3 py-4 text-center">Payment</th>

                        <th scope="col" className="px-3 py-4 text-center">Net Amount</th>
                        <th scope="col" className="px-3 py-4 text-center">View Order</th>

                      </tr>
                    </thead>
                    <tbody>
                      {
                        orderList.map((item, ind) => {
                          return <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap text-center px-3 py-4 font-medium">{ind + 1}</td>
                            <td className="whitespace-nowrap text-center px-3 py-4">{item.status}</td>
                            <td className="whitespace-nowrap text-center px-3 py-4">{`${item.first_Name} ${item.last_Name}`}</td>
                            <td className="whitespace-nowrap text-center px-3 py-4">{item.payment === true ? "Success" : "Failed"}</td>

                            <td className="whitespace-nowrap text-center px-3 py-4 ">{item.NetAmount.toFixed(2)}</td>
                            <td className="whitespace-nowrap text-center px-3 py-4 ">
                              <FaEye onClick={()=>{
                                setOrderData(item)
                                setViewOrderModal(true)
                              }} className='text-red-600 mx-auto text-lg cursor-pointer ' />
                            </td>

                          </tr>
                        })
                      }


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
       {/* this is for modal of order View  */}
       <AnimatePresence>
             {viewOrderModal && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}>
              <OrderViewModal OrderData={OrderData}  viewOrderModal={viewOrderModal} setViewOrderModal={setViewOrderModal}  />
              </motion.div>}
        </AnimatePresence>
      
    </Layout>
  )
}

export default MyOrder
