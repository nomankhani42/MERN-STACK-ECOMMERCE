import React from "react";

const CategoryForm = ({ value, setValue, submitHandle, btnText }) => {
  return (
    <div>
      <form className=" pt-1 " onSubmit={submitHandle}>
        <input
          className=" py-3 bg-gray-300 focus:outline-none mr-2 px-5 rounded-md lg:w-[75%] w-[60%]"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder=" Add New  Category"
        />
        <button className=" bg-yellow-300 font-semibold py-3 px-2 relative rounded-r-md right-4">
          {btnText}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
