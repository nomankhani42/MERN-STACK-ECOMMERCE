import React from 'react'
import { Link } from 'react-router-dom'

const UserMenu = ({index}) => {
  return (
    <div>
          <div className='flex lg:flex-col lg:mt-20 justify-center'>
             <Link to={'/dashboard/user'} className={index===1 ?'bg-blue-400 text-white text-lg text-center   uppercase py-2 border border-slate-300 lg:w-[200px] w-[45%]' : 'text-lg  uppercase py-2 border text-center lg:w-[200px] w-[45%] border-slate-300 '}  >Profile</Link>
             <Link to={'/dashboard/user/orders'} className={index===2 ?'bg-blue-400 text-white text-lg text-center   uppercase py-2 border border-slate-300 lg:w-[200px] w-[45%]' : 'text-lg  uppercase py-2 border text-center lg:w-[200px] w-[45%] border-slate-300 '}  >Orders</Link>
          </div>
    </div>
  )
}

export default UserMenu
