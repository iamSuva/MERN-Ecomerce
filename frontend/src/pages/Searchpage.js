import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/searchContext";
import { useNavigate } from "react-router-dom";
const Searchpage = () => {
  const { search } = useSearch();
  console.log("search ", search);
  const navigate=useNavigate();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h4>Your search products are here</h4>
          <h5>
            {search?.results.lenght < 1
              ? "No found found"
              : `${search.results.length} products found`}
          </h5>
          <div className="d-flex flex-wrap">
            {search?.results.map((product) => (
          
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
                    <button className="btn btn-info">Add Cart</button>
                  </div>
                </div>
             
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Searchpage;
