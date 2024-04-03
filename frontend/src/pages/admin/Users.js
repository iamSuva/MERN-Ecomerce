import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import Sidebar from "../../components/layout/Sidebar";

const Users = () => {
  return (
    <Layout title={"Admin-all users"}>
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="card w-60 p-3">
            <h1>All users</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
