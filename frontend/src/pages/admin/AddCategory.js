import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
// import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryForm from "../../components/layout/form/CategoryForm";
import { useAuth } from "../../context/authContext";
import { Modal } from "antd";
import Sidebar from "../../components/layout/Sidebar";

const AddCategory = () => {
  const { auth } = useAuth();

  const [categories, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updated, setUpdated] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert("vkk");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/category/add-category`,
        { name },
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );
      setName("");
      console.log("post " + response);
      if (response.data.success) {
        console.log(response.data);
        toast.success(`${name} is added`);
        getAllcategory();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something wrong in addin category");
    }
  };
  const getAllcategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/category/get-allcategory`
      );
      if (response.data.success) {
        console.log("category" + response.data);
        setCategory(response.data.allcategory);
      }
    } catch (error) {
      console.log(error);
      toast.error("something wrong in fetching category");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/category/update-category/${selected}`,
        { name: updated },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setSelected(null);
        setUpdated("");
        setVisible(false);
        getAllcategory();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something wrong in updating category");
    }
  };
  const handleDelete = async (cid) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/category/delete-category/${cid}`,

        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
       
        getAllcategory();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something wrong in deleteing category");
    }
  };
  useEffect(() => {
    getAllcategory();
  }, []);

  return (
    <Layout title={"Admin-Add category"}>
      <div className="row">
        <div className="col-md-3">
          <Sidebar/>
        </div>
        <div className="col-md-9">
          <div className="card p-3">
            <h3>Add Category</h3>
            <div className="w-50 p-3">
              <div className="p-3">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
            </div>
            <div className="w-75">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => {
                    return (
                      <>
                        <tr key={cat._id}>
                          <td>{cat.name}</td>
                          <td>
                            <button
                              className="btn btn-info"
                              onClick={() => {
                                setVisible(true);
                                setUpdated(cat.name);
                                setSelected(cat._id);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-success"
                              onClick={()=>handleDelete(cat._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updated}
                setValue={setUpdated}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
