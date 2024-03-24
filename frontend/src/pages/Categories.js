import React from "react";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All categories"}>
      <h1 className="text-center">All categories</h1>
      <div className="container">
        <div className="row">
          {categories?.map((cat) => {
           return <div className="col">
              <Link to={`/category/${cat.slug}`}
              className="btn btn-secondary"
              >{cat.name}</Link>
            </div>;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
