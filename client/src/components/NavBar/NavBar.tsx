import React from "react";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ReduxState } from "../../reducer";

export interface NavBarProps {}

export default function NavBar({ }: NavBarProps) {
  const cartItems = useSelector((state: ReduxState) => state.cartItems);
  console.log(cartItems)
  return (
    <NavBarContainer>
      <LogoNav>
        <h2>Logo</h2>
      </LogoNav>
      <ContainerButtons>
      <Link to="/Login">
        <ButtonLogin>Login</ButtonLogin>
        </Link>
        ({cartItems.length})
        <Shop>
          <FiShoppingCart />
        </Shop>
      </ContainerButtons>
    </NavBarContainer>
  );
}

const LogoNav = styled.div`
  margin-left: 1rem;
  justify-content: center;
  font-size: 1.36vw;
`;

const ContainerButtons = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ButtonLogin = styled.button`
  width: 7vw;
  height: 6vh;
  background: transparent;
  border-radius: 0.313rem;
  border: 0.13rem solid white;

  margin-right: 1rem;
  padding: 0.06rem;
  display: inline-block;
  -webkit-appearance: none;
  cursor: pointer;
  font-size: 1.6vw;
  color: white;

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
  width: 5.4vw;
  height: 6vh;
  background: transparent;
  border-radius: 0.313rem;
  margin-right: 1rem;
  padding: 5px;
  display: inline-block;
  -webkit-appearance: none;
  border: 0.13rem solid white;
  cursor: pointer;
  font-size: 2.14vw;
  color: white;

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
  width: 100%;
  height: 8vh;
  background-color: #1e212a;
  color: #c9cace;
  display: flex;
  align-items: center;
  justify-content: space-between;
 //padding: 0px 16px;
// padding-left: 3rem;

`;
