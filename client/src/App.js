import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./context/userContext";

import "../src/App.css";
// import Navbar from "./components/inc/Navbar";
import Login from "./pages/Login";
// import Category from "./components/pages/Category";
import Register from "./pages/Register";
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/Home";
import DetailProduct from "./pages/DetailProduct";
import Product from "./pages/Product";
import EditCategory from "./components/category/EditCategory";
import EditProduct from "./components/product/EditProduct";
import ProductList from "./components/product/ProductList"
import CategoryList from "./components/category/CategoryList"
// import EditProductProps from "./components/inc/EditProductProps";
import Profile from "./pages/Profile";
import AdminComplain from "./pages/AdminComplain";
import UserComplain from "./pages/UserComplain";
// import ErrorPage from "./components/pages/ErrorPage";
import AddCategory from "./components/category/AddCategory";
import AddProduct from "./components/product/AddProduct";
import Category from "./pages/Category"

// Init token on axios every time the app is refreshed here ...
import { setAuthToken, API } from "../src/config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const navigate = useNavigate();
  // Init user context
  const [state, dispatch] = useContext(UserContext);
  console.log(state);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/login");
    } else {
      if (state.user.status === "admin") {
        navigate("/user-complain");
      } else if (state.user.status === "customer") {
        navigate("/home");
      }
    }
  }, [state]);

  // Create function for "check user token"
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    // <div>
    // <Login/>
    // <Register/>
    // <Home/>
    // <Product/>
    // <Category/>
    // <AdminComplain/>
    // <UserComplain/>
    // <DetailProduct/>
    // <Profile/>
    // <EditCategory/>
    // <EditProduct/>
    // <AddCategory/>
    // <AddProduct/>
    // </div>
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Register />} />
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Home />} />
    
    <Route path="/product" element={<Product />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/admin-complain" element={<AdminComplain />} />
    <Route path="/user-complain" element={<UserComplain />} />
    
    <Route path="/category" element={<Category />} />
    <Route path="/edit-category/:id" element={<EditCategory />} />
    <Route path="/add-category" element={<AddCategory />} />
    <Route path="/add-product" element={<AddProduct />} />
    <Route path="/edit-product/:id" element={<EditProduct />} />
    <Route path="/detail-product/:id" element={<DetailProduct />} />
    <Route path="/profile" element={<Profile />} />
    </Routes>
    );
  }
  // <Route path="*" element={<ErrorPage />} />


export default App;
