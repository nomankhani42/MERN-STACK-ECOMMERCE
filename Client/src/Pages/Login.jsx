import React from "react";
import Layout from "../Layout/Layout";
import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/auth/AuthSlice";
import { addUser } from "../Redux/user/UserSlice";
import { useFormik } from "formik";
import { SignInSchema } from "../Validations";
import { Link } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const onSubmit = async (values) => {
    try {
      console.log('Submitting login request with values:', values); // Debugging log
      const res = await axios.post('/api/login', { ...values });
      console.log('Login response:', res); // Debugging log
      
      if (res.data.success) {
        toast.success('User Logged in Successfully');
        Navigate(location.state?.from || '/');
        dispatch(loginSuccess(res.data.token));
        dispatch(addUser({
          name: res.data.user.name,
          userName: res.data.user.userName,
          country: res.data.user.country,
          role: res.data.user.role,
          userId: res.data.user._id,
          token: res.data.token
        }));
      } else {
        console.log('Error response message:', res.data.message); // Debugging log
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Login API error:', error.response || error.message || error); // Enhanced error logging
      toast.error('An error occurred during login. Please try again.');
    }
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
    validationSchema: SignInSchema,
    initialValues: {
      userName: '',
      password: ''
    },
    onSubmit,
  });

  return (
    <Layout>
      <div className="flex items-center justify-center h-[85vh]">
        <div className="lg:w-[60vw] md:w-[80vw] w-[90vw] px-5">
          <form onSubmit={handleSubmit} className="mx-auto p-10 mt-5">
            <h2 className="text-center font-semibold text-2xl">LOGIN</h2>
            <div className="relative my-5 mx-auto">
              <MdMarkEmailUnread className="absolute top-3 text-xl left-2" />
              <input
                type="email"
                name="userName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userName}
                className="w-[100%] focus:outline-none border-[1px solid bg-slate-400] px-3 pl-8 rounded-sm py-2 bg-slate-200"
                placeholder="Enter Your Email"
              />
              {errors.userName && touched.userName ? <p className="text-red-500 pl-1 text-sm">{errors.userName}</p> : null}
            </div>

            <div className="relative my-5 mx-auto">
              <RiLockPasswordFill className="absolute top-3 text-xl left-2" />
              <input
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                type="password"
                className="w-[100%] focus:outline-none border-[1px solid bg-slate-400] pr-5 pl-8 rounded-sm py-2 bg-slate-200"
                placeholder="Enter Your Password"
              />
              {errors.password && touched.password ? <p className="text-red-500 pl-1 text-sm">{errors.password}</p> : null}
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 py-2 text-white font-bold"
              >
                Login
              </button>
              <p className="text-right">If You Don't Have an Account Please <Link className="text-blue-500" to={'/register'}>Register</Link></p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
