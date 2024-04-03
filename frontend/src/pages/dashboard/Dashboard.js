import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/authContext";
import Usersidebar from "../../components/layout/Usersidebar";

const Dashboard = () => {
  const { auth } = useAuth();
  return (
    <Layout title={"BuYsite-DashBoard"}>
      <div className="container-fuild ">
        <div className="row">
          <div className="col-md-3">
            <Usersidebar />
          </div>
          <div className="col-md-9">
            <div className="card w-60 p-3">
              <h3>welcome user :{auth?.user?.username} </h3>
              <h4>Email :{auth?.user?.email} </h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
