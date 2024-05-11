import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-4 footer" >
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Contact Details</h5>
            <ul className="">
              <li>Address:Medinipur,West Bengal,India</li>
              <li>Email: suvadipm@gmail.com</li>
              <li>Phone:+917679680406</li>
              
            </ul>
          </div>
          <div className="col-md-6">
            <h5>About Us</h5>
            <ul className="">
              <li>
                At BuySite, we're passionate about providing you
                with an exceptional online shopping experience. From the moment
                you land on our website, our goal is to make you feel welcomed,
                informed, and confident in your purchasing decisions.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
