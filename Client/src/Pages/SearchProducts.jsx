import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { useParams } from 'react-router';
import axios from 'axios';
import ProductCardForUser from './User/ProductCardForUser';

const SearchProducts = () => {
    const {keyword} = useParams();
    const [products,setProducts]=useState([]);

    const searchProductsFilter=async()=>{
       const response=await axios.get(`/api/product/search-product/${keyword}`);

       if(response.data.success){
           setProducts(response.data.searchProducts)
       }
    }

    

 useEffect(()=>{
    searchProductsFilter()
 })
  return (
      <Layout>
          <div className='md:px-5 px-2 py-2'>
                <p>{products.length} Products Found</p>
                <div className='grid grid-cols-12'>
                {products.map((data) => {
            return <ProductCardForUser key={data._id} data={data} />
          })}
                </div>
          </div>
      </Layout>
  )
}

export default SearchProducts
