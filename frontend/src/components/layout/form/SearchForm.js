import React from "react";
import { useSearch } from "../../../context/searchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const {search,setSearch}=useSearch();
 const navigate= useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        const {data}=await axios.get(`${process.env.REACT_APP_API_URL}/api/product/product-search/${search.keyword}`)
       console.log("se ",data);
        if(data.success)
        {
            setSearch({...search,results:data.products});
            navigate("/search")
        }
     
    } catch (error) {
        
    }
  }
  return (
    <div>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
              
          aria-label="Search"
          value={search.keyword}
          onChange={(e)=>setSearch({...search,keyword:e.target.value})}
          placeholder="Enter product title"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
