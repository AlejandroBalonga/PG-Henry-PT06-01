import React from "react";
import styled from "styled-components";
import { MdComputer } from "react-icons/md";
import { useSelector } from "react-redux";
import { ReduxState } from "../../reducer";

export interface TopMenuProps {
  onClickOpcion: Function;
}

export default function TopMenu({ onClickOpcion }: TopMenuProps) {
  const allCategorias = useSelector((state: ReduxState) => state.categorias);
  //provisorio hasta tener bien los datos en la base
  const arrayPrueba = allCategorias.slice(0, 10);

  return (
    <TopMenuContainer>
      {/* armo menu */}

      {arrayPrueba.map((cat, i) =>
        i === 0 ? (
          <DivLeft onClick={(e) => onClickOpcion(cat.id)}>{cat.name}</DivLeft>
        ) : i === 9 ? (
          <DivRight onClick={(e) => onClickOpcion(cat.id)}>{cat.name}</DivRight>
        ) : (
          <Div onClick={(e) => onClickOpcion(cat.id)}> {cat.name} </Div>
        )
     ) }
    </TopMenuContainer>
  );
}

const TopMenuContainer = styled.header`
  width: 80vw;
  height: 7.5vh;
  background-color: white;
  color: black;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 5vh;
`;

const Div = styled.div`
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-top-left: 1rem;
  border-bottom-left: 1rem;
  border: 1px solid rgba(154, 196, 237, 0.85);
  padding: 15px;
  box-shadow: 0 0 40px 40px #335d90 inset, 0 0 0 0 #335d90;
  -webkit-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out;
  color: white;
  width: 80vw;
  height: 6vh;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-size: 0.8vw;

  &:hover {
    box-shadow: 0 0 10px 0 #335d90 inset, 0 0 10px 4px #335d90;
    color: #335d90;
  }

  &:active {
    box-shadow: 0 0 10px 0 #335d90 inset, 0 0 10px 4px #335d90;
    color: #335d90;
  }
`;
//!Herencia
const DivLeft = styled(Div)`
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
`;

const DivRight = styled(Div)`
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

const Icon = styled.div`
  font-size: 30px;
  color: white;
`;
