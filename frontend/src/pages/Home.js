import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
// import {useAuth} from "../context/authContext.js";
import axios from "axios";
import { Button, Checkbox, Radio } from "antd";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Price } from "../components/layout/Price";
import { useCart } from "../context/cartContex";
import SlideShow from "./SlideShow";


const Home = () => {
  // const {auth,setAuth}=useAuth();
  // const data=JSON.stringify(auth);
  const navigate=useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredIds, setFilteredIds] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, settotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setloading] = useState(false);

 //add to cart
 const {carts,setCarts}=useCart();



  const getAllProducts = async () => {
    try {
      setloading(true);
      // const { data } = await axios.get(
      //   `${process.env.REACT_APP_API_URL}/api/product/get-allproducts`
      // );
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product/product-page/${page}`
      );
      // console.log("pagination data ",data);
      if (data.success) {
        setProducts(data.products);
      }
      setloading(false);
    } catch (error) {
      setloading(false);
      toast.error("error is fetching proudcts");
    }
  };
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/category/get-allcategory`
      );
      if (data?.success) {
        setCategories(data?.allcategory);
        // console.log(categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };
  //handle filter operation
  const handleFilter = (val, id) => {
    let allIds = [...filteredIds];
    if (val) {
      //if click on checkbox
      allIds.push(id);
    } else {
      //uncheck remove from array

      allIds = allIds.filter((cid) => cid != id);
    }
    setFilteredIds(allIds);
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product/product-count`
      );

      settotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // filtered products fetched
  const getFilteredProducts = async () => {
    try {
      console.log("filter ids and radio ", radio);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/product/get-filters`,
        { filteredIds, radio }
      );
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("could not filtered");
    }
  };

  //paginatio
  const loadmore = async () => {
    try {
      setloading(true);

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product/product-page/${page}`
      );
      if (data.success) {
        setProducts([...products, ...data?.products]);
      }
      setloading(false);
    } catch (error) {
      setloading(false);
      toast.error("error is fetching proudcts");
    }
  };
  useEffect(() => {
    // Load more products when page changes
    if (page > 1) {
      loadmore();
    }
  }, [page]);

  useEffect(() => {
    // Fetch categories and total count only if no filters are applied
    if (!filteredIds.length && !radio.length) {
      getAllCategory();
      getTotal();
    }
  }, [filteredIds.length, radio.length]);

  useEffect(() => {
    // Fetch products based on filters whenever they change
    if (filteredIds.length || radio.length) {
      getFilteredProducts();
    } else {
      // Fetch all products if no filters are applied
      getAllProducts();
    }
  }, [filteredIds, radio]);

  const resetFilter = () => {
    window.location.reload();
  };
  return (
    <Layout title="BuYsite-Home page">
      <SlideShow/>
      <div className="row mt-3 mx-3 ">
        <div className="col-md-2">
          <h4>Filter by category :</h4>
          <div className="d-flex flex-column mx-4">
            {categories?.map((cat) => {
              return (
                <Checkbox
                  key={cat._id}
                  onChange={(e) => handleFilter(e.target.checked, cat._id)}
                >
                  {cat.name}
                </Checkbox>
              );
            })}
          </div>
          <h4>Filter by price :</h4>
          <div className="d-flex flex-column mx-4">
            {
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Price?.map((p) => (
                  <div key={p.id}>
                    <Radio value={p.range}>{p.price}</Radio>
                  </div>
                ))}
              </Radio.Group>
            }
          </div>
          <div className="d-flex flex-column mx-4">
            <button className="btn btn-info" onClick={resetFilter}>
              Reset filter
            </button>
          </div>
        </div>
        <div className="col-md-10">
          <h1 className="text-center">All products </h1>
          {/* {
               JSON.stringify(filteredIds)
              // JSON.stringify(radio)
            } */}
          <div className="d-flex flex-wrap">
            {products?.map((product) => (
              // <Link
              //   key={product._id}
              //   to={`/dashboard/admin/product/${product.slug}`}
              //   className="product-link"
              // >
                <div className="card m-2 product-card">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/api/product/get-productImage/${product._id}`}
                    class="card-img-top product-image"
                    alt="product image"
                    style={{ width: "150px", height: "120px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p>Price: {product.price} Rs/-</p>
                    <Button className="btn btn-secondary m-1"
                    onClick={()=>navigate(`/product/${product.slug}`)}
                    >More</Button>
                    <Button className="btn btn-info"
                    onClick={()=>
                      {
                        const updatedCarts = carts ? [...carts, product] : [product];
                        setCarts(updatedCarts);
                        localStorage.setItem("carts", JSON.stringify(updatedCarts));
                        toast.success("Added to cart");
                      }
                      }
                    >Add Cart</Button>
                  </div>
                </div>
              // </Link>
            ))}
          </div>
        </div>
        <div className="m-2 p-3 d-flex justify-content-center">
          {products && products.length < total && (
            <button
              className="btn btn-warning "
             
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "loading..." : "Load more"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
