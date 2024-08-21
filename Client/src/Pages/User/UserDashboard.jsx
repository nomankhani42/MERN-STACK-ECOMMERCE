import React from 'react'
import Layout from '../../Layout/Layout'
import UserMenu from '../../Components/UserMenu';
import { SignUpSchema } from '../../Validations';
import { useFormik } from 'formik';
import axios from 'axios';
import { FaPersonDress } from 'react-icons/fa6';
import { MdFavorite, MdMarkEmailUnread } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';

import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const UserDashboard = () => {
  const UserData=useSelector(state=>state.user);

  const onSubmit=async(values)=>{
        
    try {
      const res= await axios.post('/api/register',{...values});
      console.log(res.data)
       if(res.data.success===true){
          
       
          toast.success('User Profile Updated Success')
         
       }
       else{
         toast.error(res.data.message)
       }
    } catch (error) {
      console.log(error)
    }
}

  const {values,handleChange,handleBlur,handleSubmit,errors,touched}=useFormik({
    validationSchema:SignUpSchema,
    initialValues:{
           name:UserData.name,
           
           userName:UserData.userName,
           answer:UserData.answer,
           country:UserData.country,
           role:UserData.role
    },
    onSubmit,
})
  return (
    <Layout>
        <div className='lg:p-10 sm:p-5 py-5 px-2 lg:grid grid-cols-12'>
              <div className=' lg:col-span-3'>
                <UserMenu index={1} />
              </div>
              <div className=''>
                   {/* {update Profile container } */}
        <div className="lg:col-span-8 lg:w-[60vw] md:w-[80vw] w-[90vw] px-5">
          <form onSubmit={handleSubmit} className="md:w-[80%] mx-auto p-10  mt-20">
           
            <div className="relative my-5   mx-auto">
              <FaPersonDress className=" absolute top-3 text-xl left-2" />
              <input
              name="name"
               value={values.name}
               onChange={handleChange}
               onBlur={handleBlur}
             
                type="text"
                className="w-[100%] focus:outline-none border-[1px solid bg-slate-400] px-3 pl-8 rounded-sm py-2 bg-slate-200"
                placeholder="Enter Your Full Name"
              />
              {errors.name && touched.name ? <p className=" text-red-500 pl-1 text-sm">{errors.name}</p>: null}
            </div>
            <div className="relative my-5   mx-auto">
              <MdMarkEmailUnread className=" absolute top-3 text-xl left-2" />
              <input
              disabled
              name="userName"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
           
                type="email"
                className=" w-[100%] focus:outline-none border-[1px solid bg-slate-400] px-3 pl-8 rounded-sm py-2 bg-slate-200"
                placeholder="Enter Your User Name"
              />
               {errors.userName && touched.userName ? <p className=" text-red-500 pl-1 text-sm">{errors.userName}</p>: null}
            </div>
            <div className="relative my-5   mx-auto">
              <FaMapMarkerAlt className=" absolute top-3 text-xl left-2" />
              <input
              name="country"
               value={values.country}
               onChange={handleChange}
               onBlur={handleBlur}
                type="text"
               
                className="w-[100%] focus:outline-none border-[1px solid bg-slate-400] px-3 pl-8 rounded-sm py-2 bg-slate-200"
                placeholder="Enter Your Country Name"
              />
               {errors.country && touched.country ? <p className=" text-red-500 pl-1 text-sm">{errors.country}</p>: null}
            </div>
            <div className="relative my-5   mx-auto">
            <MdFavorite  className=" absolute top-3 text-xl left-2" />
              <input
              name="role"
              disabled
               value={values.role===0?"USER" : "ADMIN"}
               onChange={handleChange}
               onBlur={handleBlur}
                type="text"
                
                className="w-[100%] focus:outline-none border-[1px solid bg-slate-400] px-3 pl-8 rounded-sm py-2 bg-slate-200"
                placeholder="What is Your Favorite Animal"
              />
               {errors.role && touched.role ? <p className=" text-red-500 pl-1 text-sm">{errors.role}</p>: null}
            </div>
          
            <div>
                <button type="submit" className=" w-full bg-blue-600 py-2 uppercase text-white ">Update Profile</button>
            </div>
          </form>
        </div>
              </div>
        </div>
    </Layout>
  )
}

export default UserDashboard;