import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cartContex";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [similarProducts,setSimilarProducts]=useState([]);
  const params = useParams();
const navigate=useNavigate();
  const {carts,setCarts}=useCart();

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
          console.log("similar product ",data.products);
          if(data.success)
          {
            setSimilarProducts(data.products);
          }
    } catch (error) {
        console.log(error);
    }
  }
  const handleCart=(product)=>{
    alert(product.name);
    const updatedCarts=carts ? [...carts,product]: [product];
    setCarts(updatedCarts);
    localStorage.setItem("carts",JSON.stringify(updatedCarts));
    toast.success("added to cart");

  }


  useEffect(() => {
    getProduct();
  }, [params.slug]);
  return (
    <Layout>
      <div className="row container ">
        <div className="col-md-6 mt-4 product-box ">
          <img
            src={`${process.env.REACT_APP_API_URL}/${product.productImage}`}
            class="card-img-top"
            alt={product.name}
            style={{ width: "150px", height: "150px",borderRadius:"10px" }}
            />
        </div>
        <div className="col-md-6 product-details">
            <h4 className="text-center">Product details</h4>
            <p>Name: {product.name}</p>
            <p>Description: {product.description}</p>
            <p>Price: Rs:- {product.price}/- </p>
            <p>Category: {product.category?.name}</p>
            <button className="btn btn-info "
            onClick={()=>handleCart(product)}
            >Add to cart</button>
            </div>
      </div>
       <hr/>
      <div className="row mt-3 mx-2 similar-product-box">
        <h4 className="text-center">Similar products</h4>
        {
            similarProducts?.map((product) => (
              
                  <div className="card m-2 similar-product" style={{ width: "15rem" }}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/${product.productImage}`}
                      class="card-img-top"
                      alt="product image"
                      style={{ width: "80px", height: "80px" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      <p>Price: {product.price} Rs/-</p>
                      <button className="btn btn-secondary m-1"
                    onClick={()=>navigate(`/product/${product.slug}`)}
                    >view</button>
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
