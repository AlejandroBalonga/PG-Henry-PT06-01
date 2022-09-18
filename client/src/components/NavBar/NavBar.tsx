import React from "react";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../img/Logo.png";
import LogoMobile from "../../img/Logo-mobile.png";
import { clearState, getUserID } from "../../actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ReduxState } from "../../reducer";
import { useEffect , useState } from "react";
import { BsPerson, BsPersonX } from "react-icons/bs";
import { RiHome2Line } from "react-icons/ri";
import SearchBar from "../SearchBar/SearchBar";

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



  // if (user?.id) {
  //   dispatch(getUserID(user?.id));
  // }

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
              Hola
              <Nombre>{user2?.name}</Nombre>
            </Saludo>
          ) : null}
        </Encabezado>
        {location.pathname !== "/home" && (
          <Link to="/home">
            <DivButtonsNavBar>
              <RiHome2Line />
              <ButtonLogin>Home</ButtonLogin>
            </DivButtonsNavBar>
          </Link>
        )}
        {location.pathname !== "/admin" && user?.role === "ADMIN" && (
          <Link to="/admin">
            <DivButtonsNavBar>
              <ButtonLogin>Admin</ButtonLogin>
            </DivButtonsNavBar>
          </Link>
        )}
        {user?.role === "CLIENT" ? (
          <Link to="/history">
            <DivButtonsNavBar>
              <ButtonLogin>Mis compras</ButtonLogin>
            </DivButtonsNavBar>
          </Link>
        ) : null}
        {user ? (
          <Link to="/home">
            <DivButtonsNavBar>
              <BsPersonX />
              <ButtonLogin onClick={handleLogout}>Logout</ButtonLogin>
            </DivButtonsNavBar>
          </Link>
        ) : (
          <Link to="/Login">
            <DivButtonsNavBar>
              <BsPerson />
              <ButtonLogin>Ingresá</ButtonLogin>
            </DivButtonsNavBar>
          </Link>
        )}
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

const DivButtonsNavBar = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  justify-content: center;
  margin-right: 1rem;
  /* margin-right: 1px; */
  /* margin-bottom: 25px; */
  color: black;
`;

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
  font-size: 14px;
  margin-bottom: 25px;
  width: 4rem;
`;

const Saludo = styled.div`
  /* justify-content: center;
  align-items: center; */
`;

const Nombre = styled.div``;

const ButtonLogin = styled.button`
  /* width: 3.5rem; */
  width: fit-content;
  height: 40px;
  background: transparent;
  justify-content: center;
  align-items: center;
  border: none;
  //margin: 0 0.5rem 24px;
  padding: 3px;
  cursor: pointer;
  font-size: 0.8rem;
  font-family: "Proxima Nova", -apple-system, Roboto, Arial, sans-serif;
  color: black;
  text-decoration: none;
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

const ButtonSignup = styled.button`
  width: 5.5rem;
  height: 40px;
  background: transparent;
  justify-content: center;
  align-items: center;
  border: none;
  margin: 0 0.5rem 24px;
  padding: 2px;
  cursor: pointer;
  font-size: 0.8rem;
  font-family: "Proxima Nova", -apple-system, Roboto, Arial, sans-serif;
  color: black;
  text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0% 100%;
  background-repeat: no-repeat;
  background-size: 0% 2px;
  transition: background-size 0.3s;

  -webkit-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out;
  &:hover,
  &:focus {
    /* box-shadow: 0 0 10px 0 #335d90 inset, 0 0 10px 4px #335d90;
    background-color: white;
    color: #335d90; */
    background-size: 100% 2px;
  }
  /* &:active {
    box-shadow: 0 0 10px 0 #335d90 inset, 0 0 10px 4px #335d90;
  } */
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
  margin: auto 20px;
  padding-left: 6px;
  padding-right: 6px;
  /* top: 3px;
      right: 3px; */
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
