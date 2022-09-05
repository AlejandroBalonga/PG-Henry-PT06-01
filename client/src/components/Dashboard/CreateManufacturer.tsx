// import { privateDecrypt } from "crypto";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { postManufacturer } from "../../actions";

export default function CreateProduct() {
  const dispatch = useDispatch<any>();
  const [input, setInput] = useState({
    name: "",
  });

  function handlechange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handelSubmit(e) {
    e.preventDefault();
    dispatch(postManufacturer(input));
  }

  return (
    <Container>
      <Link to="/Home">
        {" "}
        <ButonToHome>Volver a home</ButonToHome>{" "}
      </Link>

      <form onSubmit={(e) => handelSubmit(e)}>
        <Form>
          <div>
            <Label>Nombre</Label>
            <Input1 type="text" name="name" onChange={(e) => handlechange(e)} />
          </div>

          <Button type="submit">CREAR</Button>
        </Form>
      </form>
    </Container>
  );
}

const ButonToHome = styled.button`
  font-family: "Kalam", cursive;
  font-size: 15px;
  font-size: bold;
  height: 65px;
  margin: 8px;
  background-color: #335d90;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 0.4rem;

  &:hover {
    box-shadow: 0 0 10px 0 #335d90 inset, 0 0 10px 4px #335d90;
    transform: scale(1.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;

const Container = styled.div`
  margin: 0;
  background-attachment: initial;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: auto;
  /* width: 100vw; */
  z-index: -1;
  min-height: 120vh;
  text-align: center;
  vertical-align: center;
`;

const Form = styled.div`
  position: absolute;
  top: 130px;
  left: 35%;
  display: block;
  margin-bottom: 20px;
  padding: 25px;
  width: 450px;
  height: 600px;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;

  background: rgba(255, 255, 255, 0);
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  /* background-color: rgba(255, 255, 255, 0.15); */
  /* border-radius: 12px; */
  border: 1px solid rgba(209, 213, 219, 0.3);
  font-size: 20px;
  z-index: 1;
`;

const Label = styled.div`
  /* font-family: "Kalam", cursive; */
  font-size: 20px;
  text-shadow: 3px 3px 3px #5f5e5e;
  background: none !important;
  font-weight: bold;
  color: black;
  pointer-events: none;
  /* transform: translateY(1rem); */
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const Input1 = styled.input`
  type: text;
  font-size: 15px;
  /* font-weight: bold; */
  border: solid 1px black !important;
  border-radius: 5px !important;
  background: none !important;
  padding: 10px !important;
  margin: 10px;
  width: 80%;
  text-align: center;
  /* color: #495057!important; */
  transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const Button = styled.button`
  margin: 35px;
  font-size: 20px;
  padding: 10px;
  box-shadow: 0 0 40px 40px #335d90 inset, 0 0 0 0 #335d90;
  -webkit-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out;
  color: white;
  &:hover {
    box-shadow: 0 0 10px 0 #335d90 inset, 0 0 10px 4px #335d90;
    color: #335d90;
  }

  &:active {
    box-shadow: 0 0 10px 0 #335d90 inset, 0 0 10px 4px #335d90;
    color: #335d90;
  }
`;
