import { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import ProductCardForUser from './User/ProductCardForUser';
import HomeHeroSlider from '../Components/HomeHeroSlider';
import { FaAngleDown } from "react-icons/fa6";
import { AnimatePresence, motion } from 'framer-motion';

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Keep a copy of all products
  const [categoriesList, setCategoriesList] = useState([]);
  const [categoryBool, setCategoryBool] = useState(false);
  const [priceBool, setPriceBool] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [selectedPrice, setSelectedPrice] = useState(null);

  const filterProductsByCategoryAndPrice = () => {
    let filteredProducts = allProducts;

    if (checkedItems.size > 0) {
      filteredProducts = filteredProducts.filter(product =>
        Array.from(checkedItems).some(categoryId => product.category.includes(categoryId))
      );
    }

    if (selectedPrice) {
      filteredProducts = filteredProducts.filter(product => product.price <= parseFloat(selectedPrice));
    }

    setProductList(filteredProducts);
  };

  const onChangeHandler = (e) => {
    setSelectedPrice(e.target.value);
    filterProductsByCategoryAndPrice();
  };

  const onChangeCheckHandler = (e) => {
    const { value, checked } = e.target;
    setCheckedItems((prev) => {
      const newCheckedItems = new Set(prev);
      if (checked) {
        newCheckedItems.add(value);
      } else {
        newCheckedItems.delete(value);
      }
      return newCheckedItems;
    });
    filterProductsByCategoryAndPrice();
  };

  const clearFilters = () => {
    setCheckedItems(new Set());
    setSelectedPrice(null);
    setProductList(allProducts);
  };

  const getProducts = async () => {
    const response = await axios.get('/api/product/get-products');
    if (response.data.success) {
      setAllProducts(response.data.Products);
      setProductList(response.data.Products);
    }
  };

  const getCategories = async () => {
    const response = await axios.get('/api/category/get-categories');
    if (response.data.success) {
      setCategoriesList(response.data.categories);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <Layout>
      <HomeHeroSlider />
      <h2 className='text-2xl text-center py-4 uppercase'>Here Are Our Products</h2>
      <div className='grid xl:grid-cols-12 gap-x-5'>
        {/* Filter products by category - large devices */}
        <div className='hidden xl:block xl:col-span-3 ml-5 pt-2 bg-white sticky top-0 z-20 rounded-lg shadow-md p-4'>
          <div>
            <h2 className='text-xl font-semibold py-4 uppercase'>Categories</h2>
            {categoriesList.map((data) => (
              <div key={data._id} className='flex gap-2 items-center py-2'>
                <input
                  type="checkbox"
                  onChange={onChangeCheckHandler}
                  name={data.category}
                  checked={checkedItems.has(data._id)}
                  className='w-4 h-4 text-green-600 cursor-pointer'
                  value={data._id}
                />
                <label htmlFor={data._id} className='text-lg cursor-pointer'>{data.category}</label>
              </div>
            ))}
          </div>
          <div className='mt-6'>
            <h2 className='text-xl font-semibold py-4 uppercase'>Price</h2>
            <div>
              {['20', '40', '60', '80', '100'].map(price => (
                <div key={price} className="flex gap-2 items-center py-2">
                  <input
                    name="price"
                    id={price}
                    className="w-4 h-4 text-green-600 cursor-pointer"
                    type="radio"
                    value={price}
                    checked={selectedPrice === price}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor={price} className="text-lg cursor-pointer">${price}</label>
                </div>
              ))}
            </div>
          </div>
          <button onClick={clearFilters} className='mt-6 bg-red-500 text-white py-2 px-4 rounded-lg w-full hover:bg-red-600'>Clear Filters</button>
        </div>

        {/* Filter products - small and medium devices */}
        <div className='xl:hidden flex flex-col gap-y-4 px-5'>
          <div className='flex gap-x-4'>
            <button
              onClick={() => {
                setPriceBool(false);
                setCategoryBool(!categoryBool);
              }}
              className='shadow-sm shadow-neutral-600 px-4 py-2 flex items-center gap-x-2 bg-white rounded-lg hover:shadow-md'>
              <h5>Category</h5>
              <FaAngleDown className='text-sm text-gray-400' />
            </button>
            <button
              onClick={() => {
                setCategoryBool(false);
                setPriceBool(!priceBool);
              }}
              className='shadow-sm shadow-neutral-600 px-4 py-2 flex items-center gap-x-2 bg-white rounded-lg hover:shadow-md'>
              <h5>Price</h5>
              <FaAngleDown className='text-sm text-gray-400' />
            </button>
            <button onClick={clearFilters} className='bg-red-500 text-white py-2 px-4 rounded-lg w-full hover:bg-red-600'>Clear Filters</button>
          </div>
          {categoryBool && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className='bg-white w-full ring-2 ring-black ring-opacity-5 z-20 rounded-lg shadow-md px-5 py-4'>
                {categoriesList.map((item) => (
                  <div key={item._id} className='flex items-center gap-x-2 py-2'>
                    <input
                      type="checkbox"
                      onChange={onChangeCheckHandler}
                      name={item.category}
                      checked={checkedItems.has(item._id)}
                      className='h-4 w-4'
                      value={item._id}
                    />
                    <span>{item.category}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
          {priceBool && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white w-full ring-2 ring-black ring-opacity-5 z-20 rounded-lg shadow-md px-6 py-4">
                {['20', '40', '60', '80', '100'].map(price => (
                  <div key={price} className="flex gap-2 items-center py-2">
                    <input
                      name="price"
                      id={price}
                      className="w-4 h-4 text-green-600 cursor-pointer"
                      type="radio"
                      value={price}
                      checked={selectedPrice === price}
                      onChange={onChangeHandler}
                    />
                    <label htmlFor={price} className="text-lg cursor-pointer">${price}</label>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
         
        </div>

        {/* Products to show */}
        <div className='xl:col-span-9 grid grid-cols-12 gap-4'>
          {productList.map((data) => (
            <ProductCardForUser key={data._id} data={data} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
