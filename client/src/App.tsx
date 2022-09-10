
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import ErrorCard from "./components/ErrorCard/ErrorCard";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import DetailCardProduct from "./components/CardProduct/DetailCardProduct";
import { useSelector } from 'react-redux';
import { ReduxState } from './reducer/index';
import { Navigate } from "react-router-dom";
import Details from './components/CardProduct/DetailCardProduct/Details';
import Dashboard from "./components/Dashboard/index";
import Pagar from "./components/Carrito/Pagar";
import ShoppingCart from "./components/Carrito/ShoppingCart";
import ResultadoCompra from "./components/Carrito/ResultadoCompra";


export default function App() {

  const user = useSelector((state: ReduxState) =>  state.user)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route>
          <NavBar /> */}

          {/* <Routes> */}
          <Route path="ShoppingCart" element={<ShoppingCart/>}/>
          <Route path="Pagar" element={<Pagar/>}/>
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="admin" element={ user?.role === "ADMIN" ?  <Dashboard /> : <Navigate to="/home"/ >} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<ErrorCard/>} />
            <Route path="CreateProduct" element={ user?.role === "ADMIN" ? <CreateProduct/> : <Navigate to="/login" />   }/>
            <Route path="product/:id" element={< DetailCardProduct/>}/>
            <Route path="detail/:id" element={<Details />} /> 
            <Route path="resultadocompra" element={<ResultadoCompra />} /> 

            

          {/* </Routes> */}

        
      </Routes>
    </BrowserRouter>
  );
}
