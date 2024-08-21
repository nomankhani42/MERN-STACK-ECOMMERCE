import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import AdminMenu from './AdminMenu'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaEye } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import StatusDropdown from '../../Components/StatusDropdown';
import OrderViewModal from '../../Components/OrderViewModal';

const ManageOrders = () => {
  const [orderList, setOrderList] = useState([]);
   const auth = useSelector(state => state.auth)
   const [viewOrderModal,setViewOrderModal]=useState(false);
   const [OrderData,setOrderData]=useState({});

  const getAllOrderOfUser = async () => {

    try {
      const response = await axios.get('/api/order/get-admin-orders', {
        headers: {
          Authorization: auth.token
        }


      });

      if (response.data.success) {
        setOrderList(response.data.AllOrders)
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  const updateOrderStatus = async (id, status) => {
    const response = await axios.post(`/api/order/update-order-status/${id}`, { status: status }, {
      headers: {
        Authorization: auth.token
      }


    });
    console.log(response.data)

    if (response.data.success) {
      getAllOrderOfUser();
    }
  }
  useEffect(() => {
    getAllOrderOfUser();
  }, [updateOrderStatus])
  return (
    <Layout>
      <div className=" lg:mt-5 lg:p-20 p-4">
        <h2 className=" text-center font-bold text-3xl">Admin Dashboard -Orders</h2>
        <div className=" grid grid-cols-12 pt-5">
          <div className=" lg:col-span-3 col-span-6">
            <AdminMenu activeMenu={4} />
          </div>
          <div className="lg:col-span-8  col-span-12 p-5">
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
                          <th scope="col" className="px-3 py-4 text-center">Address</th>
                          <th scope="col" className="px-3 py-4 text-center">Phone No</th>
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
                              <td className="  text-center relative px-3 py-4">
                                <StatusDropdown item={item} updateOrderStatus={updateOrderStatus} />
                              </td>
                              <td className="whitespace-nowrap text-center px-3 py-4">{`${item.first_Name} ${item.last_Name}`}</td>
                              <td className=" text-center px-3 py-4">{`Street ${item.street} Postal Code ${item.postal_code} ${item.city}`}</td>
                              <td className=" text-center px-3 py-4">{item.phone}</td>
                              <td className="whitespace-nowrap text-center px-3 py-4">{item.payment === true ? "Success" : "Failed"}</td>

                              <td className="whitespace-nowrap text-center px-3 py-4 ">{item.NetAmount.toFixed(2)}</td>
                              <td className="whitespace-nowrap text-center px-3 py-4 "><FaEye onClick={()=>{
                                setOrderData(item)
                              setViewOrderModal(true)
                              // console.log(OrderData)

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
      </div>

    </Layout>
  )
}

export default ManageOrders
