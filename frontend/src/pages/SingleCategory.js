import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const SingleCategory = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  const navigate=useNavigate();
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product/product-bycategory/${params.slug}`
      );

      if (data.success) {
        setCategory(data.category);
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container">
        <h5 className="text-center">Category : {category?.name}</h5>
        <p className="text-center">{products?.length} products found.🙂</p>

        <div className="d-flex flex-wrap">
          {products?.map((product) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`${process.env.REACT_APP_API_URL}/${product.productImage}`}
                class="card-img-top"
                alt="product image"
                style={{ width: "150px", height: "120px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p>Price: {product.price} Rs/-</p>
                <button
                  className="btn btn-secondary m-1"
                  onClick={() => navigate(`/product/${product.slug}`)}
                >
                  More
                </button>
                <button className="btn btn-info">Add Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SingleCategory;
