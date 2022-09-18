import React from "react";
import styled from "styled-components";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../img/Logo.png";
import LogoMobile from "../../img/Logo-mobile.png";
import { clearState, getUserID } from "../../actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ReduxState } from "../../reducer";
import { useEffect } from "react";
import { BsPersonCheck, BsPersonDash } from "react-icons/bs";
import { RiHome2Line } from "react-icons/ri";
import SearchBar from "../SearchBar/SearchBar";
import { FaRegBell } from "react-icons/fa";

export default function NavBar() {
  const dispatch = useDispatch<any>();

  function handleLogout() {
    dispatch(clearState());
  }

  const location = useLocation();

  const user = useSelector((state: ReduxState) => state.user);
  const user2 = useSelector((state: ReduxState) => state.detailsUser);
  let carritoDB = useSelector((state: ReduxState) => state.detailOrder);
  let productosCarrito = JSON.parse(localStorage.getItem("carrito"));

  let totalItemsCarrito;
  if (user) {
    if (!carritoDB?.order_detail) {
      totalItemsCarrito = productosCarrito;
    } else {
      if (!productosCarrito) {
        totalItemsCarrito = carritoDB?.order_detail;
      } else {
        totalItemsCarrito = productosCarrito?.concat(carritoDB?.order_detail);
      }
    }
  } else {
    totalItemsCarrito = productosCarrito;
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(getUserID(user?.id));
    }
  }, []);

  return (
    <NavBarContainer>
      <div>
        <Link to="/home">
          <Img id="logo" height="140px" src={Logo} alt="" />
          <ImgMobile id="logo-mobile" height="140px" src={LogoMobile} alt="" />
        </Link>
      </div>
      <SearchBar />
      <ContainerButtons>
        <Encabezado>
          {user ? (
            <Saludo>
              Hola!!!
              <Nombre>{user2?.name}</Nombre>
            </Saludo>
          ) : null}
        </Encabezado>
        {location.pathname !== "/home" && (
          
            <DivButtonsNavBar>
              <Link to="/home">
              <RiHome2Line style={{color: 'black'}}/>
              <ButtonLogin>Home</ButtonLogin>
              </Link>
            </DivButtonsNavBar>
          
        )}
        {location.pathname !== "/admin" && user?.role === "ADMIN" && (
          <Link to="/admin">
            <DivButtonsNavBar>
              <ButtonLogin>Admin</ButtonLogin>
            </DivButtonsNavBar>
          </Link>
        )}
        {user?.role === "CLIENT" ? (
         
            <DivButtonsNavBar>
               <Link to="/history">
              <FiShoppingBag/>
              <ButtonLoginCompras>Mis compras</ButtonLoginCompras>
              </Link>
            </DivButtonsNavBar>
         
        ) : null}
        {user ? (
         
            <DivButtonsNavBar>
               <Link to="/home">
              <BsPersonDash />
              <ButtonLogin onClick={handleLogout}>Logout</ButtonLogin>
              </Link>
            </DivButtonsNavBar>
          
        ) : (
          
            <DivButtonsNavBar>
              <Link to="/Login">
              <BsPersonCheck style={{color: 'black', content:'center' }}/>
              <ButtonLogin>Ingresá</ButtonLogin>
              </Link>
            </DivButtonsNavBar>
          
        )}
        <DivButtonsNavBar>
          <NumeritoNotif>1 </NumeritoNotif>
          <FaRegBell />
        </DivButtonsNavBar>
        <Link to="/ShoppingCart">
          <DivButtonsNavBar>
            <Shop />
            <Numerito> {totalItemsCarrito?.length} </Numerito>
            <FiShoppingCart />
          </DivButtonsNavBar>
        </Link>
      </ContainerButtons>
    </NavBarContainer>
  );
}

// FiShoppingBag  - bolsa de compras

const NavBarContainer = styled.header`
  /* overflow: hidden; */
  position: fixed;
  top: 0;
  overflow-x: hidden;
  /* display: inline-flex; */
  flex-wrap: wrap;
  justify-content: space-between;
  height: 4.6rem;
  width: 100vw;
  display: flex;
  /* justify-content: space-between; */
  /* align-items: center; */
  /* padding: 0 20px; */
  flex-wrap: nowrap;
  background-color: #ffffff;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  justify-items: center;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  z-index: 1;
`;

const Img = styled.img`
  height: 140px;
  margin-top: -45px;
  margin-left: 20px;
  z-index: 1;
  object-fit: contain;
  @media (max-width: 600px) {
    display: none;
  }
`;

const ImgMobile = styled.img`
  height: 3rem;
  margin: 0.8rem 0 0.8rem 20px;
  object-fit: contain;
  z-index: 1;
  @media (min-width: 600px) {
    display: none;
  }
`;

const ContainerButtons = styled.div`
  display: inline-flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  /* margin-right: 1.5rem; */
`;

const Encabezado = styled.div`
  border-right: 1px solid #000;
  padding-right: 10px;
  margin-right: 10px;
  margin-top: 1.8rem;
  font-size: 14px;
  margin-bottom: 25px;
  width: 4rem;
`;

const Saludo = styled.div`
  /* justify-content: center;
  align-items: center; */
  font-weight: bold;
`;

const Nombre = styled.div``;

const DivButtonsNavBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 0.5rem;
  margin-top: 1.8rem;
  font-size: 14px;
  margin-bottom: 14px;


  /* display: flex;
  flex-direction: column; */
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 1.5rem;
  margin-top: 1.5rem;
  color: black;
  text-decoration: none;
 
`;

const ButtonLoginCompras = styled.button`
  width: 6rem;
 height: 40px;
  background: transparent;
  justify-content: center;
  align-items: center;
  border: none;
  //margin: 0 0.5rem 24px;
  /* padding: 3px; */
  cursor: pointer;
  font-size: 0.9rem;
  font-family: "Proxima Nova", -apple-system, Roboto, Arial, sans-serif;
  color: black;
  text-decoration:none;

  /* background-image: linear-gradient(currentColor, currentColor);
  background-position: 0% 100%;
  background-repeat: no-repeat;
  background-size: 0% 2px;
  transition: background-size 0.3s; */

  -webkit-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out;
  &:hover,
  &:focus {
    background-size: 100% 2px;
  }
`;

const ButtonLogin = styled.button`
  width: 3.5rem;
  /* width: fit-content; */
  height: 40px;
  /* text-decoration:none; */
  background: transparent;
  justify-content: center;
  align-items: center;
  border: none;
  margin: 0 
  /* padding: 3px; */
  cursor: pointer;
  font-size: 0.9rem;
  font-family: "Proxima Nova", -apple-system, Roboto, Arial, sans-serif;
  color: black;
  

  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0% 100%;
  background-repeat: no-repeat;
  background-size: 0% 2px;
  transition: background-size 0.3s;

  -webkit-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out;
  &:hover,
  &:focus {
    background-size: 100% 2px;
  }
`;

const NumeritoNotif = styled.div`
  font-size: 12px;
  position: absolute;
  z-index: 1;
  width: fit-content;
  height: fit-content;
  border-radius: 9999px;
  background-color: black;
  color: white;
  /* margin: auto 20px; */
  padding-left: 6px;
  padding-right: 6px;
  top: 15px;
  right: 10px;
`;

const Numerito = styled.div`
  font-size: 12px;
  position: absolute;
  z-index: 1;
  width: fit-content;
  height: fit-content;
  border-radius: 9999px;
  background-color: black;
  color: white;
  /* margin: auto 20px; */
  padding-left: 6px;
  padding-right: 6px;
  top: 15px;
  right: 10px;
`;
const Shop = styled.button`
  width: 3rem;
  height: 42px;
  background: transparent;
  /* border-radius: 0.313rem; */
  margin-right: 2rem;
  margin-bottom: 35px;
  padding: 5px;
  display: inline-block;
  -webkit-appearance: none;
  /* border: 0.13rem solid black; */
  border: none;
  cursor: pointer;
  font-size: 25px;
  color: black;

  -webkit-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out;
`;
/* &:hover,
  &:focus {
    box-shadow: 0 0 10px 0 #335d90 inset, 0 0 10px 4px #335d90;
    background-color: white;
    color: #335d90;
  }
  &:active {
    box-shadow: 0 0 10px 0 #335d90 inset, 0 0 10px 4px #335d90;
  }

const NavBarContainer = styled.header`
  height: 70px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: trasparent;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  justify-items: center;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 10px 20px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  z-index: 0;
  
`;

const Img = styled.img`
  width: 140px;
  height: 140px;
  margin-top: -80px;
  margin-left: 20px;
  z-index: 1;
`;
*/
