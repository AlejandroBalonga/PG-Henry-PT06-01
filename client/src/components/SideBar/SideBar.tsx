import { useState } from "react";
import { TbSortAscendingLetters, TbSortAscendingNumbers, TbSortDescendingLetters, TbSortDescendingNumbers } from "react-icons/tb";
import { ImSearch } from "react-icons/im";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { ReduxState } from "../../reducer";
import React from "react";

export interface SideBarProps {
  filterOreder: Function;
  homeState: {
    order;
    direction;
    categoryId;
  };
}

export default function SideBar({ homeState, filterOreder }: SideBarProps) {
  const [searchName, setSearchName] = useState("");
  const allCategorias = useSelector((state: ReduxState) => state.categorias);

  const handlerchange = (order, direction) => {
    if (homeState.order === order && homeState.direction === direction) {
      filterOreder({
        order: "name",
        direction: "asc",
      });
    } else {
      filterOreder({
        order,
        direction,
      });
    }
  };

  return (
    <SideBarContainer>
      {/* <SearchBarContainer>
        <input
          placeholder="Buscar"
          autoFocus
          onChange={(e) => setSearchName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              filterOreder({ name: searchName });
            }
          }}
        />
        <button onClick={() => filterOreder({ name: searchName })}>
          <ImSearch />
        </button>
      </SearchBarContainer> */}
      <OrderContainer>
        <legend>Orden:</legend>
        <div>
          {/* <label htmlFor="types">{">"}Ordenar por nombre</label> */}
          <div>
            <OrderButton onClick={() => handlerchange("name", "asc")} active={homeState.order === "name" && homeState.direction === "asc"}>
              <TbSortAscendingLetters style={{ width: 30, height: 30 }} />
            </OrderButton>
            <OrderButton onClick={() => handlerchange("name", "desc")} active={homeState.order === "name" && homeState.direction === "desc"}>
              <TbSortDescendingLetters style={{ width: 30, height: 30 }} />
            </OrderButton>
          </div>
        </div>
        <div>
          {/* <label htmlFor="types">{">"}Ordenar por precio</label> */}
          <div>
            <OrderButton onClick={() => handlerchange("price", "asc")} active={homeState.order === "price" && homeState.direction === "asc"}>
              <TbSortAscendingNumbers style={{ width: 30, height: 30 }} />
            </OrderButton>
            <OrderButton onClick={() => handlerchange("price", "desc")} active={homeState.order === "price" && homeState.direction === "desc"}>
              <TbSortDescendingNumbers style={{ width: 30, height: 30 }} />
            </OrderButton>
          </div>
        </div>
        {/* <div>
          <label htmlFor="types">{">"}Ordenar por marca</label>
          <div>
            <button
              onClick={() => handlerchange("brand", "asc")}
              style={{ backgroundColor: homeState.order === "brand" && homeState.direction === "asc" ? "lightblue" : "", margin: 5 }}>
              <TbSortAscendingLetters style={{ width: 30, height: 30 }} />
            </button>
            <button
              onClick={() => handlerchange("brand", "desc")}
              style={{ backgroundColor: homeState.order === "brand" && homeState.direction === "desc" ? "lightblue" : "", margin: 5 }}>
              <TbSortDescendingLetters style={{ width: 30, height: 30 }} />
            </button>
          </div>
        </div> */}
      </OrderContainer>
      <fieldset style={{ margin: 5 }}>
        <legend>Categorias:</legend>
        {allCategorias.map((cat, i) => (
          <Category key={i}>
            <input
              id={`${i}`}
              type="checkbox"
              onChange={(e) => filterOreder(homeState.categoryId === cat.id ? { categoryId: "" } : { categoryId: cat.id })}
              checked={homeState.categoryId === cat.id}
            />
            <label htmlFor={`${i}`}>{cat.name}</label>
          </Category>
        ))}
      </fieldset>
    </SideBarContainer>
  );
}
const SideBarContainer = styled.div`
  /* background-color: rgb(235, 235, 335); */
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  /* width: 15px; */
  overflow: hidden;
  transition: width 0.2s linear;
  /* border-radius: 0.3rem; */
  /* border: 0.13rem solid black; */
  /* &:hover {
    width: 215px;
    box-shadow: 50px 50px 100vw 0 #000000;
  } */
  margin-left: 10px;
  /*  */
  //   width: auto;
  //   height: 2rem;
  /*  */
  //   padding: 0.313rem;
  //   margin: 0.3rem;
  //   /* margin: 0.625rem 0 -1.25rem 0; */
  //   -webkit-appearance: none;
  //   cursor: pointer;
  //   -webkit-transition: all 150ms ease-in-out;
  //   transition: all 150ms ease-in-out;
  //   border: none;
  //   position: relative;
  //   color: #f0f0f1;
  //   z-index: 0;
`;
const SearchBarContainer = styled.div`
  display: flex;
  width: 200px;
  margin: 5px;
  margin-top: 15px;
`;
const Category = styled.div`
  display: flex;
  width: 200px;
`;
const OrderContainer = styled.fieldset`
  width: 200px;
  margin: 5px;
`;
const OrderButton = styled.button<{ active?: boolean }>`
  ${({ active }) =>
    active &&
    css`
      background-color: lightblue;
    `}
  margin: 5px;
`;
