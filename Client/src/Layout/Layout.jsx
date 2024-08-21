import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import  { Toaster } from 'react-hot-toast';

const Layout = ({children}) => {
  return (
    <div className='  '>
       <Toaster />
        <Navbar />
        <section className=' min-h-[85vh]'>
            {children}
        </section>
        <Footer />
    </div>
  )
}

export default Layout