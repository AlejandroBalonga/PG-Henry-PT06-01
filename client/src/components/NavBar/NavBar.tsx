import React from "react";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png";
import { clearState } from "../../actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ReduxState } from "../../reducer";

export interface NavBarProps {}

export default function NavBar({}: NavBarProps) {
  const dispatch = useDispatch<any>();

  function handleLogout() {
    localStorage.clear();
    dispatch(clearState());
  }

  const token = useSelector((state: ReduxState) => state.token);
  const user = useSelector((state: ReduxState) => state.user);

  let productosCarrito = JSON.parse(localStorage.getItem('carrito'));

  return (
    <NavBarContainer>
      <div>
        <div>
          <Img id="logo" src={Logo} alt="" />
        </div>

        <Img id="logo" src={Logo} alt="" />
      </div>

      <ContainerButtons>
       {user?
        <div>hola {user?.email}</div>: null}
        {user?.role === "ADMIN" ? (
          <Link to="/admin">
            <ButtonLogin>Admin</ButtonLogin>
          </Link>
        ) : null}
        {token ? (
          <Link to="/Home">
            <ButtonLogin onClick={handleLogout}>Logout</ButtonLogin>
          </Link>
        ) : (
          <Link to="/Login">
            <ButtonLogin>Ingresá</ButtonLogin>
          </Link>
        )}
        <Link to="/ShoppingCart">
        <Shop><Numerito>{productosCarrito.length} </Numerito>
        <FiShoppingCart />
          

          
        </Shop>
      </Link>
      </ContainerButtons>
    </NavBarContainer>
  );
}
const ContainerButtons = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-right: 5px;
`;

const ButtonLogin = styled.button`
  width: 5.5rem;
  height: 42px;
  background: transparent;
  border-radius: 0.313rem;
  border: 0.13rem solid black;
  justify-content: center;
  align-items: center;

  margin-right: 1rem;
  padding: 2px;
  display: inline-block;
  -webkit-appearance: none;
  cursor: pointer;
  font-size: 0.8rem;
  color: black;

  -webkit-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out;
  &:hover,
  &:focus {
    box-shadow: 0 0 10px 0 #335d90 inset, 0 0 10px 4px #335d90;
    background-color: white;
    color: #335d90;
  }
  &:active {
    box-shadow: 0 0 10px 0 #335d90 inset, 0 0 10px 4px #335d90;
  }
`;

const Shop = styled.button`
  width: 3rem;
  height: 42px;
  background: transparent;
  border-radius: 0.313rem;
  margin-right: 2rem;
  padding: 5px;
  display: inline-block;
  -webkit-appearance: none;
  border: 0.13rem solid black;
  cursor: pointer;
  font-size: 25px;
  color: black;

  -webkit-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out;
  &:hover,
  &:focus {
    box-shadow: 0 0 10px 0 #335d90 inset, 0 0 10px 4px #335d90;
    background-color: white;
    color: #335d90;
  }
  &:active {
    box-shadow: 0 0 10px 0 #335d90 inset, 0 0 10px 4px #335d90;
  }
`;

const NavBarContainer = styled.header`
  height: 70px;
  width: 100vw;
  /* top: 10px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: trasparent;
  /* opacity: 0.5; */
  /* border-radius: 16px; */
  /* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); */
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  justify-items: center;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  z-index: 0;
`;

const Img = styled.img`
  width: 140px;
  height: 140px;
  /* top="10px" */
  margin-top: -80px;
  margin-left: 20px;
  z-index: 1;
`;

const Numerito = styled.div`
font-size: 12px;

`;