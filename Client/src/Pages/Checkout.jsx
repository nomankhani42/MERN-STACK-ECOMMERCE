import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { useFormik } from 'formik';
import { CheckoutSchema } from '../Validations/index';
import { useSelector } from 'react-redux';
import axios from 'axios';


const Checkout = () => {
     const Mycart = useSelector(state => state.cart);
     const user = useSelector(state => state.user);
     const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (values, action) => {
  setSubmitting(true);
  try {
    const response = await axios.post('api/order/create-order', {
      ...values,
      cart_items: Mycart.cart,
      NetAmount: Mycart.netAmount,
      userId: user.userId,
  
    });
         
    if (response.data.success) {
      console.log(response.data);
      // Handle success
      window.location.replace(response.data.url)
    }
  } catch (error) {
    console.error('Error creating order:', error);
    // Handle error
  } finally {
    setSubmitting(false);
  }
};


     const {values,handleChange,handleBlur,handleSubmit,errors,touched}=useFormik({
          validationSchema:CheckoutSchema,
          initialValues:{
                 first_Name:'',
                 last_Name:'',
                 email:'',
                 phone:'',
                 street:'',
                 city:'',
                 state:'',
                 postal_code:'',
                 country:''
          },
          onSubmit,
     })
   
  return (
      <Layout>
          <div className=' md:p-20 p-2'>

              <form  onSubmit={handleSubmit}>
                <div className='grid lg:grid-cols-12 gap-x-5'>
                {/* delivery information section  */}
               <div className=' lg:col-span-6'>
                    <h2 className=' text-2xl uppercase'>Delivery Information</h2>
                    {/* this is our form container of user details  */}
                    <div className=' pt-10'>
                            <div className='flex gap-2 justify-between'>
                                <div className='w-[50%]'>
                                <input name='first_Name' onChange={handleChange} onBlur={handleBlur} value={values.first_Name} placeholder='First Name' className='w-[100%] focus:outline-none border-[1px solid bg-slate-400] px-3 rounded-sm py-2 bg-slate-200' type="text" />
                                  {errors.first_Name && touched.first_Name ? <p className=' text-sm text-red-600 pl-1'>{errors.first_Name}</p> : null}
                                </div>

                                  <div className='w-[50%]'>
                                  <input name='last_Name' onChange={handleChange} onBlur={handleBlur} value={values.last_Name} placeholder='Last Name' className='w-[100%] focus:outline-none border-[1px solid bg-slate-400] px-3 rounded-sm py-2 bg-slate-200' type="text" />
                                  {errors.last_Name && touched.last_Name ? <p className=' text-sm text-red-600 pl-1'>{errors.last_Name}</p> : null}
                                  </div>
                            </div>
                            <div className='mt-2'>
                                 <input name='email' onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder='Email' className='w-full focus:outline-none border-[1px solid bg-slate-400] px-3 rounded-sm py-2 bg-slate-200' type="text" />
                                 {errors.email && touched.email ? <p className=' text-sm text-red-600 pl-1'>{errors.email}</p> : null}
                            </div>
                            <div className='mt-2'>
                                 <input name='phone' onChange={handleChange} onBlur={handleBlur} value={values.phone} placeholder='Phone' className='w-full focus:outline-none border-[1px solid bg-slate-400] px-3 rounded-sm py-2 bg-slate-200' type="text" />
                                 {errors.phone && touched.phone ? <p className=' text-sm text-red-600 pl-1'>{errors.phone}</p> : null}
                            </div>
                            <div className='mt-2'>
                                 <input name='street' onChange={handleChange} onBlur={handleBlur} value={values.street} placeholder='Street' className='w-full focus:outline-none border-[1px solid bg-slate-400] px-3 rounded-sm py-2 bg-slate-200' type="text" />
                                 {errors.street && touched.street ? <p className=' text-sm text-red-600 pl-1'>{errors.street}</p> : null}
                            </div>
                            <div className='flex gap-2 mt-2 justify-between'>
                                <div className='w-[50%]'>
                                <input name='city' onChange={handleChange} onBlur={handleBlur} value={values.city} placeholder='City' className='w-[100%] focus:outline-none border-[1px solid bg-slate-400] px-3 rounded-sm py-2 bg-slate-200' type="text" />
                                {errors.city && touched.city ? <p className=' text-sm text-red-600 pl-1'>{errors.city}</p> : null}
                                </div>
                                 <div className='w-[50%]'> 
                                 <input name='state' placeholder='State' onChange={handleChange} onBlur={handleBlur} value={values.state} className='w-[100%] focus:outline-none border-[1px solid bg-slate-400] px-3 rounded-sm py-2 bg-slate-200' type="text" />
                                 {errors.state && touched.state ? <p className=' text-sm text-red-600 pl-1'>{errors.state}</p> : null}
                                 </div>
                               
                            </div>
                            <div className='flex gap-2 mt-2 justify-between'>
                                <div className='w-[50%]'>
                                <input name='postal_code' onChange={handleChange} onBlur={handleBlur} placeholder='Postal Code' value={values.postal_code} className='w-[100%] focus:outline-none border-[1px solid bg-slate-400] px-3 rounded-sm py-2 bg-slate-200' type="text" />
                                {errors.postal_code && touched.postal_code ? <p className=' text-sm text-red-600 pl-1'>{errors.postal_code}</p> : null}
                                </div>
                                  <div className='w-[50%]'>
                                  <input name='country' onChange={handleChange} onBlur={handleBlur} placeholder='Country' value={values.country} className='w-[100%] focus:outline-none border-[1px solid bg-slate-400] px-3 rounded-sm py-2 bg-slate-200' type="text" />
                                  {errors.country && touched.country ? <p className=' text-sm text-red-600 pl-1'>{errors.country}</p> : null}
                                  </div>
                            </div>
                            
                    </div>
               </div>
               {/* amount summary section  */}
               <div className='col-span-4'>
                     <h2 className='  uppercase text-2xl'>Summary</h2>
                     {/* this summary wrapper  */}
                     <div className='mt-8'>

                        
                         <div className='py-2 flex justify-between border-b border-b-gray-200'>
                                <h4 className='text-lg font-semibold uppercase'>Sub total</h4>   
                                <h4 className=' text-slate-500 text-lg'>{Mycart.netAmount.toFixed(2)}</h4>          
                         </div>
                         <div className='py-2 flex justify-between border-b border-b-gray-200'>
                                <h4 className='text-lg font-semibold uppercase'>Delivery Charges</h4>   
                                <h4 className=' text-slate-500 text-lg'>$ 2</h4>          
                         </div>
                         <div className='py-2 flex justify-between border-b border-b-gray-200'>
                                <h4 className='text-lg font-semibold uppercase'>Total</h4>   
                                <h4 className=' text-slate-500 text-lg'> {(Mycart.netAmount+2).toFixed(2)}</h4>          
                         </div>
                         <div>
                               <button disabled={isSubmitting} type='submit'  title='submit' className=' uppercase py-2 px-3 mt-2 text-white rounded bg-green-500'>{isSubmitting ? 'Processing...' : 'Proceed to Check Out'}</button>
                         </div>
                     </div>
               </div>
              </div>
              </form>
          </div>
      </Layout>
  )
}

export default Checkout
