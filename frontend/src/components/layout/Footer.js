import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-dark text-light p-3 footer'>
      <h3 className='text-center'>Mern stack &copy; WEB-DEV</h3>
       <p className='text-center mt-3'>
         <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
         <Link to="/category">Category</Link>        
       </p>
    </div>
  )
}

export default Footer