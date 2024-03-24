import React from 'react'
import Layout from '../components/layout/Layout'

const Contact = () => {
  return (
    <Layout title='Contact page'>
   <div className='row'>
      <div className='col-md-8'>
            <img src="/images/banner2.jpg" alt="contact" style={{width:"100%",height:"80vh"}}/>
      </div>
      <div className='col-md-4 mt-4 '>
            <h2 className='bg-dark text-center p-2 text-white'>Contact us</h2>
            <p className='mt-3'>
              Email: Suvadipm200@gmail.com
            </p>
            <p className='mt-3'>
              Contact: 7679680406
            </p>
      </div>
   </div>

    </Layout>
  )
}

export default Contact