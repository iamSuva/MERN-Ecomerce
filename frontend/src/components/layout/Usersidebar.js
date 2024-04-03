import React from "react";
import { Link } from "react-router-dom";
function Usersidebar() {
  return (
    <div>
      <div className="d-flex flex-column sidebar">
        <h4>User Dashboard</h4>
        <Link exact to="/dashboard/user">
          Myself
        </Link>
        <Link to="/dashboard/user/profile">Myprofile</Link>
        <Link to="/dashboard/user/order">Myorder</Link>
      </div>
    </div>
  );
}

export default Usersidebar;
