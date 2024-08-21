import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const ProductForm = () => {

  const [categoryText,setCategoryText]=useState('Select Category');
  const [dropdownBool,setDropDownBool]=useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const Navigation =useNavigate();
  const user=useSelector(state=>state.user)

  const [photo,setPhoto]=useState();
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [quantity,setQuantity]=useState('');
  const [price,setPrice]=useState('');
  const [category,setCategory]=useState();

  // states for error validation 

// form data for backend 
const [photoError,setPhotoError]=useState(false);
const  [titleError,setTitleError]=useState(false);
const  [descriptionError,setDescriptionError]=useState(false);
const  [quantityError,setQuantityError]=useState(false);
const  [priceError,setPriceError]=useState(false);
const  [categoryError,setCategoryError]=useState(false);





  const formData=new FormData();
  formData.append('photo',photo);
  formData.append('title',title);
  formData.append('description',description);
  formData.append('category',category);
  formData.append('quantity',quantity);
  formData.append('price',price);

  // add product to server function 

  const addProductToServer=async()=>{
        
    if(!photo){
      return setPhotoError(true);
    }
    else{
      setPhotoError(false)
    }
    if(!title){
      return setTitleError(true);
    }
    else{
      setTitleError(false)
    }
    if(!description){
      return setDescriptionError(true)
    }
    else{
      setDescriptionError(false)
    }
    if(!category){
      return setCategoryError(true)
    }
    else{
      setCategoryError(false)
    }
    if(!quantity){
    return  setQuantityError(true)
    }
    else{
      setQuantityError(false)
    }
    if(!price){
      return setPriceError(true)
    }
    else{
      setPriceError(false)
    }


    const res=await axios.post('/api/product/add-product',formData,{
      headers:{
        Authorization :user.token
      }
    });
         
    if(res.data.success){

       Navigation('/dashboard/add-product')
      toast.success('Product Added Successfully')
    }
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
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div>
          {/* this is our form wrapper  */}
          <div className='md:w-[600px] md:px-16 px-5 pt-5 mx-auto'>
  {photo && (
    <div className='mb-4 flex justify-center'>
      <img className='w-[200px] h-[200px] object-cover rounded-md shadow-lg' src={URL.createObjectURL(photo)} alt="Product Preview" />
    </div>
  )}

  <div className='my-4'>
    <input
      onChange={(e) => setPhoto(e.target.files[0])}
      type="file"
      className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md border border-gray-300 hover:bg-gray-300 transition-colors duration-300'
      placeholder='Product Photo'
    />
    {photoError && <p className="text-red-500 font-semibold text-sm mt-1">Photo is required</p>}
  </div>

  <div className='my-4'>
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      type="text"
      className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md border border-gray-300 hover:bg-gray-300 transition-colors duration-300'
      placeholder='Product Title'
    />
    {titleError && <p className="text-red-500 font-semibold text-sm mt-1">Title is required</p>}
  </div>

  <div className='my-4'>
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      rows={5}
      className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md border border-gray-300 hover:bg-gray-300 transition-colors duration-300'
      placeholder='Product Description'
    ></textarea>
    {descriptionError && <p className="text-red-500 font-semibold text-sm mt-1">Description is required</p>}
  </div>

  <div className='relative'>
    <div
      onClick={() => setDropDownBool(!dropdownBool)}
      className="flex justify-between items-center bg-gray-200 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-300 transition-colors duration-300 cursor-pointer"
    >
      <p>{categoryText || 'Select Category'}</p>
      {dropdownBool ? <IoMdArrowDropup className='text-gray-600' /> : <IoMdArrowDropdown className='text-gray-600' />}
    </div>
    {categoryError && <p className="text-red-500 font-semibold text-sm mt-1">Category is required</p>}
    {dropdownBool && (
      <div className="absolute top-full left-0 mt-1 bg-gray-200 border border-gray-300 rounded-md shadow-lg z-10">
        {categoriesList.map((e) => (
          <div
            key={e._id}
            onClick={() => {
              setCategoryText(e.category);
              setCategory(e._id);
              setDropDownBool(false);
            }}
            className="py-2 px-4 border-b border-gray-300 hover:bg-gray-300 cursor-pointer"
          >
            <p>{e.category}</p>
          </div>
        ))}
      </div>
    )}
  </div>

  <div className='my-4'>
    <input
      value={quantity}
      onChange={(e) => setQuantity(e.target.value)}
      type="number"
      className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md border border-gray-300 hover:bg-gray-300 transition-colors duration-300'
      placeholder='Product Quantity'
    />
    {quantityError && <p className="text-red-500 font-semibold text-sm mt-1">Quantity is required</p>}
  </div>

  <div className='my-4'>
    <input
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      type="number"
      className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md border border-gray-300 hover:bg-gray-300 transition-colors duration-300'
      placeholder='Product Price'
    />
    {priceError && <p className="text-red-500 font-semibold text-sm mt-1">Price is required</p>}
  </div>

  <button
    onClick={addProductToServer}
    className='bg-green-500 py-2 px-5 text-md rounded-md text-white font-semibold hover:bg-green-600 transition-colors duration-300'
  >
    Add Product
  </button>
</div>

    </div>
  )
}

export default ProductForm
