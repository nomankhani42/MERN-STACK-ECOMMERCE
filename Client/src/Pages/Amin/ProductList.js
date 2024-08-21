import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import ProductCard from '../../Components/ProductCard';
import ProductActionModal from '../../Components/ProductActionModal';
import { animate, AnimatePresence , motion } from 'framer-motion';

const ProductList = () => {
  const [Products,setProducts]=useState([]);
  const [ProductModalFlag,setProductModalFlag]=useState(false);
  const [productModalData,setProductModalData]=useState();


  
  const getProducts=async()=>{
    const res=await axios.get('/api/product/get-products');
     if(res.data.success){
      
      setProducts(res.data.Products)
     }
  }

  useEffect(()=>{
    getProducts();
  },[])
    return (
        <Layout>
          <div className=" lg:mt-5 lg:p-20 p-4">
            <h2 className=" text-center font-bold text-3xl">Admin Dashboard - Products</h2>
            <div className=" grid grid-cols-12 pt-5">
          <div className=" lg:col-span-3 col-span-6">
            <AdminMenu activeMenu={3} />
          </div>
          <div className="lg:col-span-8 col-span-12 p-5">
                {/* this is our Products list  */}
                  <p className='text-gray-500'>You Have {Products.length} Products </p>
                  <div className=' grid grid-cols-12 md:gap-4 gap-1'>
                          {Products.map((data)=>{
                            return <ProductCard key={data._id} setProductModalFlag={setProductModalFlag} setProductModalData={setProductModalData} data={data} />
                          })}
                  </div>
              </div>
            </div>
          </div>
         <AnimatePresence>
         {
            ProductModalFlag && <motion.div initial={{opacity:0} } animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.4}} ><ProductActionModal data={productModalData} setProductModalFlag={setProductModalFlag} getProducts={getProducts} /> </motion.div>
          }
         </AnimatePresence>
        </Layout>
      );
}

export default ProductList 