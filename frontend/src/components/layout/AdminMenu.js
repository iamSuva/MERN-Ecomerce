import React from "react";

import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center">
      <div className="list-group">
        <h4>Admin Action</h4>
        <NavLink
          to="/dashboard/admin/addCategory"
          className="list-group-item list-group-item-action"
        >
          Add category
        </NavLink>
        <NavLink
          to="/dashboard/admin/addProduct"
          className="list-group-item list-group-item-action"
        >
          Add product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action"
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action"
        >
          Users
        </NavLink>
        <NavLink
          to="/dashboard/admin/users-orders"
          className="list-group-item list-group-item-action"
        >
          All users orders
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
