import React, { useEffect } from 'react'
import Layout from '../../Layout/Layout'
import { ThreeCircles } from 'react-loader-spinner'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { clearCart } from '../../Redux/Cart/CartSlice'
import toast from 'react-hot-toast'

const Success = () => {

    const [searchParams]=useSearchParams();
    const order_id=searchParams.get('order_id');
    const Navigate=useNavigate();
    const dispatch=useDispatch();

    

     const verifyOrder=async()=>{
               const response=await axios.post(`/api/order/verify-order` , {id:order_id});

               console.log(response.data)
               if(response.data.success){
                   
                   toast.success('Order Placed Successfully');
                       setTimeout(()=>{
                        dispatch(clearCart());
                        Navigate('/dashboard/user/orders')
                       },1000)
               }
     }

     useEffect(()=>{
          verifyOrder();
     },[]);
  return (
    <Layout>
        <div className=' min-h-[70vh] flex justify-center items-center'>

        <ThreeCircles
  visible={true}
  height="100"
  width="100"
  color="blue"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
        </div>
    </Layout>
  )
}

export default Success