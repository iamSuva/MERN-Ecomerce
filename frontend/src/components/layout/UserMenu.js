import React from 'react'
import Layout from './Layout'
import { NavLink } from 'react-router-dom'
const UserMenu = () => {
  return (
  
        <div className="text-center">
      <div className="list-group">
        <h4>User Dashboard</h4>
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action"
        >
          Myprofile
        </NavLink>
        <NavLink
          to="/dashboard/user/order"
          className="list-group-item list-group-item-action"
        >
         Myorder
        </NavLink>
       
      </div>
    </div>
 
  
  )
}

export default UserMenu