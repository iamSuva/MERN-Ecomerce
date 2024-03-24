import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product/get-allproducts`
      );
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      toast.error("error is fetching proudcts");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All products list</h1>
            <div className="d-flex">

          {products?.map((product) => (
            <Link key={product._id} to={`/dashboard/admin/product/${product.slug}`}
            className="product-link"
            >
              <div class="card" style={{width:"18rem"}} >
              <img src={`${process.env.REACT_APP_API_URL}/api/product/get-productImage/${product._id}`}class="card-img-top" alt="product image" style={{width:"150px",height:"120px"}}/>
              <div class="card-body">
                <h5 class="card-title">{product.name}</h5>
                <p class="card-text">
                    {product.description}
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
               
              </div>
            </div>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
