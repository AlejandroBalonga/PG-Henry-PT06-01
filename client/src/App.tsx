import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import ErrorCard from "./components/ErrorCard/ErrorCard";
//import CreateProduct from "./pages/CreateProduct/CreateProduct";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/index";

import CreateProduct from "./components/Dashboard/CreateProduct";
import CreateCategory from "./components/Dashboard/CreateCategory";
import CreateManufacturer from "./components/Dashboard/CreateManufacturer";

import DetailCardProduct from "./components/CardProduct/DetailCardProduct";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route>
          <NavBar /> */}
        {/* <Routes> */}
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route path="*" element={<ErrorCard />} />
        <Route path="CreateProduct" element={<CreateProduct />} />
        <Route path="CreateCategory" element={<CreateCategory />} />
        <Route path="CreateManufacturer" element={<CreateManufacturer />} />
        <Route path="product/:id" element={<DetailCardProduct />} />
        <Route path="admin" element={<Dashboard />} />
        {/* </Routes> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
