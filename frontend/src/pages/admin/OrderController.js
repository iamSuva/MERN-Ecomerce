import React,{useState,useEffect} from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
function OrderController() {
  const [allOrders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/get-allorders`);
          console.log("all orders ",response.data.orders);
        setOrders(response.data.orders);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div>
              <h1>Admin Dashboard</h1>
              <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Email</th>
            <th>Address</th>
            <th>Product Details</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.customer.username}</td>
              <td>{order.customer.email}</td>
              <td>
                <ul>
                  <li>
                    {order.streetAddress}, {order.city}, {order.postalCode}
                  </li>
                </ul>
              </td>
              <td>
                <ul>
                  {order.products.map(product => (
                    <li key={product._id}>
                      {product.name} - {product.price}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{order.payment.totalAmount}</td>
              <td>{order.status}</td>
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
