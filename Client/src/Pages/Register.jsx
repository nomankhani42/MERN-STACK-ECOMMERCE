import React from "react";
import Layout from "../Layout/Layout";
// import imgSide from '../Assets/signup.png';
import { FaPersonDress } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { SignUpSchema } from "../Validations";
import { Link } from "react-router-dom";

const Register = () => {


  const Navigate=useNavigate();

  const onSubmit=async(values)=>{
        
    try {
      const res= await axios.post('/api/register',{...values});
      console.log(res.data)
       if(res.data.success===true){
          
          Navigate('/login');
          toast.success('User Registered Success')
         
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
           name:'',
           
           userName:'',
           answer:'',
           country:'',
           password:''
    },
    onSubmit,
})

console.log(touched,errors)

  
  return (
    <Layout>
      <div className=" flex justify-center h-[85vh]">
        {/* {Sign Up container } */}
        <div className="lg:w-[60vw] md:w-[80vw] w-[90vw] px-5">
          <form onSubmit={handleSubmit} className="md:w-[80%] mx-auto p-10  mt-20">
            <h2 className=" text-center font-semibold text-2xl">Register</h2>
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
              name="answer"
               value={values.answer}
               onChange={handleChange}
               onBlur={handleBlur}
                type="text"
                
                className="w-[100%] focus:outline-none border-[1px solid bg-slate-400] px-3 pl-8 rounded-sm py-2 bg-slate-200"
                placeholder="What is Your Favorite Animal"
              />
               {errors.answer && touched.answer ? <p className=" text-red-500 pl-1 text-sm">{errors.answer}</p>: null}
            </div>
            <div className="relative my-5   mx-auto">
              <RiLockPasswordFill className=" absolute top-3 text-xl left-2" />
              <input
              name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              
                type="password"
                
                className="w-[100%] focus:outline-none border-[1px solid bg-slate-400] px-3 pl-8 rounded-sm py-2 bg-slate-200"
                placeholder="Enter Your Password"
              />
               {errors.password && touched.password ? <p className=" text-red-500 pl-1 text-sm">{errors.password}</p>: null}
            </div>
            <div>
                <button type="submit" className=" w-full bg-blue-600 py-2  text-white font-bold">Register</button>
                <p className=" text-right">If You Already Have an Account Please <Link className="text-blue-500" to={'/login'}>Login</Link></p>
            </div>
          </form>
        </div>
      
      </div>
    </Layout>
  );
};

export default Register;
