import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import Sidebar from "../../components/layout/Sidebar";
function OrderController() {
  const [allOrders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/product/get-allorders`
        );
        console.log("all orders ", response.data.orders);
        setOrders(response.data.orders);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);
  const handleOrderStatus=async(orderid,status)=>{
      console.log("order is ",orderid);
      console.log("order status is ",status);
     const id=orderid;
      try {
        const response=await axios.put(
          `${process.env.REACT_APP_API_URL}/api/product/order-status/${id}`,
          {status});
        const data=response.data;
        console.log(data);

        if(data.success)
          {
            console.log("order status updated");
            const updatedOrder=allOrders.map((item)=>{
              if(item._id===orderid)
                {
                  return {
                    ...item,
                    status:status
                  }
                }
                return item;
            })
            setOrders(updatedOrder);
          }
        
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <Layout>
      <div className="container-fuild ">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
              <h1 >Admin Dashboard</h1>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Email & Mobile</th>
                    <th>Address</th>
                    <th>Product Details</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Order Date</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.customer.username}</td>
                      <td>
                        <p>
                          {order.customer.email}
                          </p>
                          <p>
                            {order.mobileNumber}
                          </p>
                      </td>
                      <td>
                        <ul>
                          <li>
                            {order.streetAddress}, {order.city},{" "}
                            {order.postalCode}
                          </li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          {order.products.map((product) => (
                            <li key={product._id}>
                              {product.name} - {product.price}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>{order.payment.totalAmount}</td>
                      <td>
                      <select
                          value={order.status}
                          onChange={(e) => handleOrderStatus(order._id, e.target.value)}
                        >
                          <option value="Not process">Not Process</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancel">Cancel</option>
                        </select>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleString()}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default OrderController;
