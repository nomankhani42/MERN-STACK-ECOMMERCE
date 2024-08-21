// import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router';


// console.log(isAuthenticated)


const PrivateRoute = ({children}) => {
  const location=useLocation();

    const isAuthutenticate=useSelector(state=>state.auth.isAuthenticated);
// const Navigate=useNavigate()
  return !isAuthutenticate ? children :  <Navigate to={ location.state || '/'} />;
}

export default PrivateRoute;