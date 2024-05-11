import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import SearchForm from "./form/SearchForm";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cartContex";

const Header = () => {
  const { carts, setCarts } = useCart();
  const { auth, setAuth } = useAuth();
  const categories = useCategory();
  console.log("all cat ", categories);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("loginUser");
    toast.success("Logout is successfull");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand navlogo text-light" to="/">
              BuYsite
            </Link>
            <NavLink className="nav-link" aria-current="page" to="/">
              Home
            </NavLink>
            <ul className="navbar-nav  me-auto mb-2 mb-lg-0">  
         
                <li class="nav-item dropdown">
                  <Link
                    class="nav-link dropdown-toggle"
                    href="/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Category
                  </Link>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    {categories?.map((cat) => {
                      return (
                        <li key={cat._id}>
                          <Link
                            class="dropdown-item"
                            to={`/category/${cat.slug}`}
                          >
                            {cat.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              
              </ul>
            
              <SearchForm />
            <ul className="navbar-nav mb-2 mb-lg-0 mx-3">
              <li>

              </li>

              
             
             
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="/dashboard"
                      id="navbarDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth.user.username}
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === "admin" ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/login"
                          onClick={handleLogout}
                        >
                          Logout
                        </NavLink>
                      </li>
                      
                    </ul>

                  </li>
                </>
              )}
               <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  Cart ({carts?.length})
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
