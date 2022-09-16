import React from "react";
import styled from "styled-components";

export default function Paginado({ totalCount, pageSize, onPageChange }) {
  return (
    <ContainerPage>
      {Array.from({ length: Math.ceil(totalCount / pageSize) }, (e, i) => i + 1).map((i) => (
        <Button key={i} onClick={() => onPageChange(i)}>
          {i}
        </Button>
      ))}
    </ContainerPage>
  );
}

const ContainerPage = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  justify-content: center;
  /* margin: 0 150px; */
`;

const Button = styled.button`
  margin: 2px;
  width: 30px;
  /* border-radius: 5px; */

  text-transform: uppercase;
  text-decoration: none;
  color: rgb(27, 27, 27);
  padding: 5px;
  border: none;
  border-radius: 5px;
  display: inline-block;
  transition: all 0.2s;
  position: relative;
  cursor: pointer;
  &:hover {
    /* box-shadow: 0 0 10px 0  #335d90  inset, 0 0 10px 4px  #335d90 ;
  color: black; */
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(27, 27, 27, 0.5);
  }

  /* &:focus {
  box-shadow: 0 0 10px 0  #335d90  inset, 0 0 10px 4px  #335d90 ;
  color: black;
} */

  &:focus {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(27, 27, 27, 0.5);
  }

  &:after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 100px;
    top: 0;
    left: 0;
    position: absolute;
    z-index: -1;
    transition: all 0.3s;
  }
`;
