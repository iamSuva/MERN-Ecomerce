import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const AddProduct = () => {
  const {auth}=useAuth();
  const navigate=useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  //get all categories
  const getAllcategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/category/get-allcategory`
      );
      if (response.data.success) {
        console.log("category" + response.data);
        setCategories(response.data.allcategory);
      }
    } catch (error) {
      console.log(error);
      toast.error("something wrong in fetching category");
    }
  };
  useEffect(() => {
    getAllcategory();
  }, []);

  const handleAddProduct=async(e)=>{
    e.preventDefault();
    try {
         const formdata=new FormData();
         formdata.append("name",name);
         formdata.append("price",price);
         formdata.append("description",description);
         formdata.append("quantity",quantity);
         formdata.append("category",category);
         formdata.append("productImage",photo);
         console.log(formdata.get("name"));
         const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/product/add-product`,formdata,{headers:{Authorization:`Bearer ${auth.token}`}}
        );
        if(response.data?.success) {
          toast.success("product added successfully");
          navigate("/dashboard/admin/products")
        }else{
          toast.error(response.data.error);
        }
    } catch (error) {
      console.log(error);
      toast.error("something wrong in adding product");
    }
  }


  return (
    <Layout title={"Admin-add product"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="card w-80 p-3">
            <h1>Add Product</h1>
            <div className="mb-3">
              <Select
                variant="false"
                placeholder="select a category"
                //  size="large"
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                showSearch
              >
                {categories?.map((cat) => {
                  return (
                    <Option value={cat._id} key={cat._id}>
                      {cat.name}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div className="mb-3 ">
              <input
                type="text"
                placeholder="Enter Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Enter Product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Enter Product quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <textarea
              className="form-control"
                type="description"
                placeholder="Enter Product quantity"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="btn btn-outline-info ">
                {photo ? photo.name : "Upload image"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              <div className="text-center">
                {photo && (
                  <img src={URL.createObjectURL(photo)} alt="product image" />
                )}
              </div>
            </div>
            <div>
              <button className="btn btn-secondary" onClick={handleAddProduct}>Add product</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
