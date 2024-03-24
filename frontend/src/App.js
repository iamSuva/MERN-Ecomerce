import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Pagenotfound from "./pages/Pagenotfound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Privateroutes from "./routes/Privateroutes";
import ForgetPassword from "./pages/ForgetPassword";
import Adminroutes from "./routes/Adminroutes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/AddProduct";
import AddCategory from "./pages/admin/AddCategory";
import Users from "./pages/admin/Users";
import Profile from "./pages/dashboard/Profile";
import Order from "./pages/dashboard/Order";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Searchpage from "./pages/Searchpage";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import SingleCategory from "./pages/SingleCategory";
import Cartpage from "./pages/Cartpage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderController from "./pages/admin/OrderController";
// import Searchpage from "./pages/Searschpage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Searchpage/>} />
        <Route path="/product/:slug" element={<ProductDetails/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/category/:slug" element={<SingleCategory/>} />
        <Route path="/cart" element={<Cartpage/>}/>
        
        <Route path="/dashboard" element={<Privateroutes />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/order" element={<Order />} />
          <Route path="user/checkout" element={<CheckoutPage/>} />
        </Route>
        <Route path="/dashboard" element={<Adminroutes />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/addProduct" element={<AddProduct />} />
          <Route path="admin/addCategory" element={<AddCategory />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/users-orders" element={<OrderController/>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
