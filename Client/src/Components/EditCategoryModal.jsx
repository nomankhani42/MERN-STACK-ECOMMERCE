import React from 'react';
import { IoMdClose } from "react-icons/io";

const EditCategoryModal = ({visible,setVisible,input,setInput,submitUpdate}) => {
         console.log(visible)
    if(!visible) return null;
    const closeByWrapperClick=(e)=>{
                if(e.target.id==='wrapper') setVisible(false)
    }
  return (
    <div onClick={closeByWrapperClick} id='wrapper' className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur flex justify-center items-center'>
       <div>
          <div className='flex justify-end'>
          <IoMdClose className=' text-white text-2xl cursor-pointer ' onClick={()=>setVisible(false)} />
          </div>
       <div className='bg-white w-[350px] sm:w-[500px] px-5 py-2'>
         
              <input required type="text" value={input} onChange={(e)=>setInput(e.target.value)} className='my-5 bg-[#d5d7db] px-5 outline-none py-3 w-full rounded-sm ' />
              <button onClick={submitUpdate} className='bg-green-500  text-white text-md font-bold px-2 py-2'>Save</button>
           
        </div>
       </div>
    </div>
  )
}

export default EditCategoryModal; 