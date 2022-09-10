import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import StartRating from "../StarRating/StarRating";
import { Articulo } from "../../actions";
import { BsCartPlus } from "react-icons/bs";
export interface CardProductProps {
  articulo: Articulo;
}

export default function CardProduct({ articulo }: CardProductProps) {
  return (
    <CardLink to={`/detail/${articulo.id}`}>
      <Tarjeta>
        <Body>
          <img src={articulo.img} width="180" height="127" alt="img" />
        </Body>
        <Footer>
          <CarritoImgButoon>
            <BsCartPlus />
          </CarritoImgButoon>
          <span>|</span>

          <div>
            <Price>${articulo.price.toFixed(2)}</Price>
          </div>
        </Footer>

        <Header>
          <Start>
            <StartRating />
          </Start>
          <Name>{articulo.name}</Name>
        </Header>
      </Tarjeta>
    </CardLink>
  );
}

const CardLink = styled(Link)`
  text-decoration: none;
  color: #333333;
`;

const Tarjeta = styled.div`
  width: 240px;
  height: 450px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.5);
  margin: 15px;
  border-radius: 10px;
  padding-top: 35px;
  border: 1px solid rgba(209, 213, 219, 0.3);
  z-index: 0;
  justify-items: center;
  text-align: center;
  vertical-align: center;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const Body = styled.div`
  > img {
    width: 240px;
    height: 224px;
    border-bottom: 1px solid #d0d2d1;
    padding-bottom: 10px;
  }
`;

const Name = styled.div`
  font-family: Proxima Nova, -apple-system, Helvetica Neue, Helvetica, Roboto,
    Arial, sans-serif;
  font-size: 14px;
  height: 100px;
  margin: 8px;
  text-transform: lowercase;
  ::first-letter {
    text-transform: uppercase;
  }
`;

const Price = styled.span`
  font-size: 24px;
  font-weight: 400;
  line-height: 1;
  font-family: Proxima Nova, -apple-system, Helvetica Neue, Helvetica, Roboto,
    Arial, sans-serif;
`;

const Start = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  > span {
    color: #d0d2d1
    margin-left: 50px;
  }
`;

const Footer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  > span {
    color: #d0d2d1;
  }
`;

const Header = styled.div``;

const CarritoImgButoon = styled.button`
  margin-left: 3px;
  border: none;
  background-color: white;
  font-size: 20px;
  cursor: pointer;
`;
