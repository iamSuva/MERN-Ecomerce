import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
      
      <div className="d-flex flex-column sidebar">
        <Link to="/dashboard/admin/addCategory">Add category</Link>
        <Link to="/dashboard/admin/addProduct">Add product</Link>
        <Link to="/dashboard/admin/products">Products</Link>
        <Link to="/dashboard/admin/users">Users</Link>
        <Link to="/dashboard/admin/users-orders">All users orders</Link>
      </div>
    
  );
}

export default Sidebar;
