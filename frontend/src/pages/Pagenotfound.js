import React from 'react'
import Layout from '../components/layout/Layout'
import { Link } from 'react-router-dom'
//this compo imoprt layout componet and pass the children
const Pagenotfound = () => {
  return (
    <Layout title='page not found'>
      <div className="pagenotfound text-center mt-5">
         <h1>404!</h1>
          <h3>Oops! Page not found.</h3>
          <Link to="/" className='btn btn-info'>
          Back Home
          </Link>
      </div>
    </Layout>
  )
}

export default Pagenotfound