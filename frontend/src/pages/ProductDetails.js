import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [similarProducts,setSimilarProducts]=useState([]);
  const params = useParams();
const navigate=useNavigate();
console.log(product);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product/get-product/${params.slug}`
      );
      if (data.success) {
        setProduct(data.product);
        getSimilarProducts(data.product._id,data.product.category._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProducts=async(pid,catid)=>{
    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/product/similar-products/${catid}/${pid}`
          );
          if(data.success)
          {
            setSimilarProducts(data.products);
          }
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(() => {
    getProduct();
  }, [params.slug]);
  return (
    <Layout>
      <div className="row container ">
        <div className="col-md-6 mt-4 product-box">
          <img
            src={`${process.env.REACT_APP_API_URL}/${product.productImage}`}
            class="card-img-top"
            alt={product.name}
            style={{ width: "300px", height: "250px",borderRadius:"10px" }}
            />
        </div>
        <div className="col-md-6 product-details">
            <h3 className="text-center">Product details</h3>
            <h3>Name: {product.name}</h3>
            <h3>Description: {product.description}</h3>
            <h3>Price: Rs:- {product.price}/- </h3>
            <h3>Category: {product.category?.name}</h3>
            <button className="btn btn-secondary ">Add to cart</button>
            </div>
      </div>
      <div className="row mt-3">
        <h1>Similar products</h1>
        {
            similarProducts?.map((product) => (
              
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
                      <button className="btn btn-secondary m-1"
                    onClick={()=>navigate(`/product/${product.slug}`)}
                    >More</button>
                      {/* <Button className="btn btn-info">Add Cart</Button> */}
                    </div>
                  </div>
                
              ))
        }
      </div>
    </Layout>
  );
};

export default ProductDetails;
