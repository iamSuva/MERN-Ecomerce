import React from 'react'
import Layout from "../../components/layout/Layout";

import { useAuth } from '../../context/authContext';
import Sidebar from '../../components/layout/Sidebar';

const AdminDashboard = () => {
    const{auth}=useAuth();
  return (
    <Layout>
        <div className="container-fuild ">

            <div className='row'>
              <div className='col-md-3'>
                  
                    <Sidebar/>
              </div>
              <div className='col-md-9'>
                <div className='p-3'>
                    <h4>Welcome Admin</h4>
                    <p>Please Select action from Sidebar</p>
                    {/* <h3>Admin : {auth?.user?.username}</h3>
                    <h3>AdminEmail : {auth?.user?.email}</h3> */}
                </div>
              </div>
            </div>
        
        </div>
    </Layout>
  )
}

export default AdminDashboard;