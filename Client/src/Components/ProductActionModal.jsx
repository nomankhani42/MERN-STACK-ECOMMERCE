import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux';

const ProductActionModal = ({ setProductModalFlag, data , getProducts}) => {
  const [categoryText, setCategoryText] = useState('Select Category');
  const [dropdownBool, setDropDownBool] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const user=useSelector(state=>state.user)
  
  // states to send data to database 
  const [photo,setPhoto]=useState();
  const [title,setTitle]=useState(data.title);
  const [description,setDescription]=useState(data.description);
  const [quantity,setQuantity]=useState(data.quantity);
  const [price,setPrice]=useState(data.price);
  const [category,setCategory]=useState(data.category);


  const formData=new FormData();
//  formData.append('photo',photo) ;
  formData.append('title',title);
  formData.append('description',description);
  formData.append('category',category);
  formData.append('quantity',quantity);
  formData.append('price',price);
  

  const addProductToServer=async()=>{
        
  if(photo){
     formData.append('photo',photo) ;
  }


    const res=await axios.put(`/api/product/update-product/${data._id}`,formData,{
      headers:{
        Authorization :user.token
      }
    });
         
    if(res.data.success){
      getProducts()
     setProductModalFlag(false)
      
    }
  }

  const deleteProduct=async()=>{
    const res=await axios.delete(`/api/product/delete-product/${data._id}`,{
      headers:{
        Authorization :user.token
      }

      
    });
    if(res.data.success){
      getProducts()
     setProductModalFlag(false)
      
    }
  }
  const closeModal = (e) => {
    if (e.target.id === 'wrapper') setProductModalFlag(false)
  }

  const getCategories = async () => {
    try {
      const res = await axios.get("/api/category/get-categories");

      if (res.data.success) {
        console.log(res);
        setCategoriesList(res.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };
 const getDefaultCategory=async()=>{
  try {
       const response=await axios.get(`/api/category/get-single-category/${data.category}`);

       if(response.data.success){
        setCategoryText(response.data.singleCategory.category)
        console.log(response.data)
       }
  }
   catch (error) {
       console.log(error)
  }
 }
  useEffect(() => {
    getDefaultCategory()
    getCategories();
  }, []);
  return (
    <div id='wrapper' onClick={closeModal} className=' z-[100] fixed   inset-0 bg-black bg-opacity-25 backdrop-blur flex justify-center items-center'>
      <div >
        <div className='flex justify-end' onClick={() => setProductModalFlag(false)}>
          <IoMdClose className=' text-white text-2xl cursor-pointer ' />
        </div>
        <div className='bg-white w-full mt-10 lg:mt-0'>
           {photo ?  <img className='h-[300px] w-[200px] block m-auto' src={URL.createObjectURL(photo)} alt="" /> :
            <img className='h-[300px] w-[200px] block m-auto' src={`/api/product/get-product-photo/${data._id}`} alt="" />}
        </div>
        <div className=' bg-white overflow-auto px-5 py-6 flex lg:flex-row flex-col  gap-6'>
          <div className='lg:w-[350px] w-[80%] px-2'>

           <div>
              <p>Change Photo : {'( If You Want ) '}</p>
              <input onChange={(e)=>setPhoto(e.target.files[0])} type="file" className='w-full mt-2 bg-slate-300 py-2 px-4 rounded' />
           </div>
            <div className='my-2'>
              <p>Title : </p>
              <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className='w-full px-3 outline-none bg-gray-300 py-2 rounded' />
            </div>
            <div className='my-2'>
              <p>Description : </p>
              <textarea rows={7} type="text" value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full px-3 outline-none bg-gray-300 py-2 rounded' />
            </div>
          </div>
          <div className='w-[350px] pt-2'>
            {/* this is our category dropdown selector */}
            <div className=' relative'>
               <p className=''>Select Category :</p>
              <div onClick={() => setDropDownBool(!dropdownBool)} className=" flex justify-between transition-all duration-[2s] items-center bg-slate-300 py-2 px-4">
                <p>{categoryText}</p>
                {!dropdownBool ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
              </div>

              {
                dropdownBool ?
                  <div className={!dropdownBool ? " transition-all absolute w-full bg-white top-[-400px] duration-[2s]  mt-[40px]  " : " transition-all absolute w-full bg-white top-10 duration-[2s]  mt-[20px]  "}>
                    {categoriesList.map((e) => {
                      return <div key={e._id} onClick={() => {
                        setCategoryText(e.category)
                        setCategory(e._id)
                        setDropDownBool(false)
                      }} className="py-3 border-b-2 px-4 w-full bg-slate-300">
                        <p className=" cursor-pointer">{e.category}</p>
                      </div>
                    })}
                  </div>
                  : null
              }
            </div>
            <div className='my-2'>
              <p>Quantity : </p>
              <input type="text" value={quantity} onChange={(e)=>setQuantity(e.target.value)} className='w-full px-3 outline-none bg-gray-300 py-2 rounded' />
            </div>
            <div className='my-2'>
              <p>Price : </p>
              <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} className='w-full px-3 outline-none bg-gray-300 py-2 rounded' />
            </div>
            {/* this is action btns  */}
            <div>
              <button onClick={addProductToServer} className='px-6 py-2 bg-green-400 my-5 mr-4 rounded text-white font-semibold'>Save</button>
              <button onClick={deleteProduct} className='px-4 py-2 bg-red-500 my5 rounded text-white font-semibold'>Delete</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductActionModal
