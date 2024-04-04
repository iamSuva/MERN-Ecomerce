import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product/get-allproducts`
      );
      if (data.success) {
        console.log(data);
        setProducts(data.products);
      }
    } catch (error) {
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fuild ">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 ">
            <h1 className="text-center">All products list</h1>
            <div className="table-responsive table-container">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img
                          src={`${process.env.REACT_APP_API_URL}/${product.productImage}`}
                          alt="product"
                          style={{ width: "100px", height: "80px" }}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>
                        <Link
                          to={`/dashboard/admin/product/${product.slug}`}
                          className="btn btn-primary"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
