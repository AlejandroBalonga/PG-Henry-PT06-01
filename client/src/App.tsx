import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import ErrorCard from "./components/ErrorCard/ErrorCard";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import DetailCardProduct from "./components/CardProduct/DetailCardProduct";
import { useSelector } from "react-redux";
import { ReduxState } from "./reducer/index";
import { Navigate } from "react-router-dom";
import Details from "./components/CardProduct/DetailCardProduct/Details";
import Buy from "./components/CardProduct/DetailCardProduct/Buy";
import Dashboard from "./components/Dashboard/index";
import PruebaCarrito from "./components/PruebaCarrito/PruebaCarrito";
import ShoppingCart from "./components/Carrito/ShoppingCart";
import CheckGoogle from "./components/Login/CheckGoogle";
import Pagar from "./components/Carrito/Pagar";
import ResultadoCompra from "./components/Carrito/ResultadoCompra";
import Terminos from "./components/Signup/Terminos";
import CheckMail from "./components/Login/CheckMail";
import ChangePassword from "./components/Login/ChangePassword";
import EnvioChangePassword from "./components/Login/EnvioChangePassword";

export default function App() {
  const user = useSelector((state: ReduxState) => state.user);

  // prettier-ignore
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="ShoppingCart" element={<ShoppingCart />} />
        {/* <Route path="PruebaCarrito" element={<PruebaCarrito />} /> */}
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={user?.role === "ADMIN" ? <div><Dashboard /> </div> : <Navigate to="/home" />} />
        <Route path="history" element={user?.role === "CLIENT" ? <div><Dashboard /> </div>: <Navigate to="/home" />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<ErrorCard />} />
        <Route path="CreateProduct" element={user?.role === "ADMIN" ? <CreateProduct /> : <Navigate to="/login" />} />
       {/* <Route path="product/:id" element={<DetailCardProduct />} /> */}
        <Route path="detail/:id" element={<Details />} />
        {/* <Route path="buy" element={<Buy />} /> */}
        <Route path="checkgoogle/:token" element={<CheckGoogle />} />
        <Route path="resultadocompra" element={<ResultadoCompra />} /> 
        <Route path="Pagar" element={<Pagar/>}/>
        <Route path="terminos-y-condiciones" element={<Terminos/>} />
        <Route path="login/checkmail/:token" element={<CheckMail/>}/>
        <Route path="login/checkmail/changepassword/:token" element={<ChangePassword/>}/>
        <Route path="login/checkmail/enviochangepassword" element={<EnvioChangePassword/>}/>

      </Routes>
    </BrowserRouter>
  );
}
