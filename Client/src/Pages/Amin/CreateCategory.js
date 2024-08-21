import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import AdminMenu from "./AdminMenu";
import CategoryForm from "./CategoryForm";
import axios from "axios";
import toast from "react-hot-toast";
import EditCategoryModal from "../../Components/EditCategoryModal";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";

const CreateCategory = () => {
  const [addCategory, setAddCategory] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [updateValue, setUpdateValue] = useState('');
  const [updateId, setUpdateId] = useState('');
  const user= useSelector((state) => state.user);

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

  const addSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/category/create-category",
        {
          catName: addCategory,
        },
        {
          headers: {
            authorization: user.token,
          },
        }

      );
      console.log(res);
      if (res.data.success) {
        getCategories();
        setAddCategory('')
        toast.success("Catogry Added Successfully");

      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/delete-category/${id}`, {
        headers: {
          authorization: user.token,
        },
      });

      if (res.data.success) {
        getCategories();
        toast.success("Category Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async () => {
    try {
      const response = await axios.put(`/api/category//update-category/${updateId}`, { updateCat: updateValue }, {
        headers: {
          Authorization: user.token
        }
      });

      if (response.data.success) {
        getCategories();
        setEditModal(false);
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <div className=" lg:mt-5 lg:p-20 p-4">
        <h2 className=" text-center font-bold text-3xl">Admin Dashboard - Categories</h2>
        <div className=" grid grid-cols-12 pt-5">
          <div className=" lg:col-span-3 col-span-6">
            <AdminMenu activeMenu={1} />
          </div>
          <div className="lg:col-span-8 col-span-12 p-5">
            <div>
              <CategoryForm
                value={addCategory}
                setValue={setAddCategory}
                submitHandle={addSubmit}
                btnText={"Add Category"}
              />
            </div>
            <div className="pt-5">
              {categoriesList.map((c) => {
                return (
                  <div
                    key={c._id}
                    className="grid grid-cols-12 pt-4 pb-2 border-b-[1px] border-gray-400 mr-16"
                  >
                    <div className="col-span-6 text-lg">{c.category}</div>
                    <div className="col-span-3">
                      <button onClick={() => {
                        setUpdateId(c._id)

                        setUpdateValue(c.category)
                        setEditModal(true)

                      }} className=" py-2 px-3 bg-yellow-300 text-white rounded">
                        Edit
                      </button>
                    </div>
                    <div className="col-span-3">
                      <button
                        onClick={() => deleteCategory(c._id)}
                        className="py-2 px-3 bg-red-600 text-white rounded-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <EditCategoryModal submitUpdate={updateCategory} visible={editModal} input={updateValue} setInput={setUpdateValue} setVisible={setEditModal}></EditCategoryModal>
    </Layout>
  );
};

export default CreateCategory;
