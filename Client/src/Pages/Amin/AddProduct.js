// import React, { useState } from 'react'
import Layout from '../../Layout/Layout';
import AdminMenu from './AdminMenu';
import ProductForm from '../../Components/SubComponents/ProductForm';

const AddProduct = () => {
 

    return (
        <Layout>
          <div className=" lg:mt-5 lg:p-20 p-4">
            <h2 className=" text-center font-bold text-3xl">Admin Dashboard - Add Product</h2>
            <div className=" grid grid-cols-12 pt-5">
          <div className=" lg:col-span-3 col-span-6">
            <AdminMenu activeMenu={2} />
          </div>
          <div className="lg:col-span-8 col-span-12 p-5">
                 <ProductForm
                
                   ></ProductForm>
              </div>
            </div>
          </div>
        </Layout>
      );
}

export default AddProduct