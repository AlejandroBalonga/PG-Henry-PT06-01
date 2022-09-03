import React from "react";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png"

export interface NavBarProps {}

export default function NavBar({}: NavBarProps) {
  return (
    <NavBarContainer>
      <div>
       
        <div>
        <Img
          id="logo"
          src={Logo}
          alt=""
        />
      </div>
      </div>
      <ContainerButtons>
      <Link to="/CreateProduct">
        <ButtonLogin>Create</ButtonLogin>
      </Link>
      <Link to="/Login">
        <ButtonLogin>Login</ButtonLogin>
      </Link>
      <Link to="/Signup">
        <ButtonLogin>Signup</ButtonLogin>
      </Link>
        <Shop>
          <FiShoppingCart />
        </Shop>
      </ContainerButtons>
    </NavBarContainer>
  );
}
const ContainerButtons = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ButtonLogin = styled.button`
  width: 4rem;
  height: 42px;
  background: transparent;
  border-radius: 0.313rem;
  border: 0.13rem solid black;

  margin-right: 1rem;
  padding: 5px;
  display: inline-block;
  -webkit-appearance: none;
  cursor: pointer;
  font-size: 1rem;
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
    background-color:  trasparent ;
    /* opacity: 0.5; */
    /* border-radius: 16px; */
    /* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); */
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    justify-items: center;

    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    z-index: 0;
`;

const Img = styled.img`
width:140px;
height:140px;
/* top="10px" */
margin-top: -11px;
margin-left: 30px;
z-index:1;
          
`;

