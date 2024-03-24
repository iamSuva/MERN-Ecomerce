import React from 'react'
import Layout from "../../components/layout/Layout";
import AdminMenu from '../../components/layout/AdminMenu';
import { useAuth } from '../../context/authContext';
const AdminDashboard = () => {
    const{auth}=useAuth();
  return (
    <Layout>
        <div className='container-fluid m-3 p-3 '>
            <div className='row'>
              <div className='col-md-3'>
                    <AdminMenu/>
              </div>
              <div className='col-md-9'>
              <div className='card w-60 p-3'>
                   <h3>Admin : {auth?.user?.username}</h3>
                   <h3>AdminEmail : {auth?.user?.email}</h3>
              </div>
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard;