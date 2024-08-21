import { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import ProductCardForUser from './User/ProductCardForUser';
import HomeHeroSlider from '../Components/HomeHeroSlider';
import { FaAngleDown } from "react-icons/fa6";
import { AnimatePresence, motion } from 'framer-motion';

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [categoriesList, setCatogriesList] = useState([]);
  const [categoryBool, setCategoryBool] = useState(false);
  const [priceBool, setPriceBool] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [selectedPrice, setSelectedPrice] = useState(null);

  const filterProductsByCategoryAndPrice = async () => {
    try {
      const response = await axios.post('/api/product/get-filter-products', {
        Checked: Array.from(checkedItems),
        radio: selectedPrice
      });

      if (response.data.success) {
        setProductList(response.data.products);
      } else {
        console.error('Failed to fetch filtered products');
      }
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    }
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

  const getProducts = async () => {
    const response = await axios.get('/api/product/get-products');
    if (response.data.success) {
      setProductList(response.data.Products);
    }
  };

  const getCatogries = async () => {
    const response = await axios.get('/api/category/get-categories');
    if (response.data.success) {
      setCatogriesList(response.data.categories);
    }
  };

  useEffect(() => {
    getProducts();
    getCatogries();
  }, []);

  return (
    <Layout>
      <HomeHeroSlider />
      <h2 className='text-2xl text-center py-4 uppercase'>Here Are Our Products</h2>
      <div className='grid xl:grid-cols-12 gap-x-5'>
        {/* Filter products by category - large devices */}
        <div className='hidden xl:block xl:col-span-2 ml-5 pt-2 bg-white sticky top-0 z-20'>
          <div>
            <h2 className='text-xl py-4 uppercase'>Categories</h2>
            {categoriesList.map((data) => (
              <div key={data._id}>
                <div className='flex gap-2 items-center'>
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
              </div>
            ))}
          </div>
          <div>
            <h2 className='text-xl py-4 uppercase divide-y'>Price</h2>
            <div>
              {['20', '40', '60', '80', '100'].map(price => (
                <div key={price} className="flex gap-2 items-center">
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
        </div>

        {/* Filter products - small and medium devices */}
        <div className='xl:hidden flex justify-end mr-10'>
          <div className='flex items-center gap-x-5'>
            <div className='relative'>
              <button
                onClick={() => {
                  setPriceBool(false);
                  setCategoryBool(!categoryBool);
                }}
                className='shadow-sm shadow-neutral-600 px-4 py-2 flex items-center gap-x-2'>
                <h5>Category</h5>
                <FaAngleDown className='text-sm text-gray-400' />
              </button>
              {categoryBool && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: .2 }}
                    className='absolute top-12 bg-white w-[200px] right-5 ring-2 ring-black ring-opacity-5 z-20 rounded shadow-md px-5 py-4'>
                    {categoriesList.map((item) => (
                      <div key={item._id} className='flex items-center gap-x-2'>
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
            </div>
            <div className='relative'>
              <button
                onClick={() => {
                  setCategoryBool(false);
                  setPriceBool(!priceBool);
                }}
                className='shadow-sm shadow-neutral-600 px-4 py-2 flex items-center gap-x-2'>
                <h5>Price</h5>
                <FaAngleDown className='text-sm text-gray-400' />
              </button>
              {priceBool && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute flex flex-col gap-y-2 top-12 bg-white -right-8 ring-1 ring-black ring-opacity-5 z-20 max-w-[260px] rounded shadow-md px-6 py-4">
                    {['20', '40', '60', '80', '100'].map(price => (
                      <div key={price} className="flex gap-2 items-center">
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
          </div>
        </div>

        {/* Products to show */}
        <div className='xl:col-span-9 grid grid-cols-12'>
          {productList.map((data) => (
            <ProductCardForUser key={data._id} data={data} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
