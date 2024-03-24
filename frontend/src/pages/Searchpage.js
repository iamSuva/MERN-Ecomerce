import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/searchContext";

const Searchpage = () => {
  const { search } = useSearch();
  console.log("search ", search);
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Products</h1>
          <h2>
            {search?.results.lenght < 1
              ? "No found found"
              : `${search.results.length} products found`}
          </h2>
          <div className="d-flex flex-wrap">
            {search?.results.map((product) => (
          
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/api/product/get-productImage/${product._id}`}
                    class="card-img-top"
                    alt="product image"
                    style={{ width: "150px", height: "120px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p>Price: {product.price} Rs/-</p>
                    <button className="btn btn-secondary m-1">More</button>
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
