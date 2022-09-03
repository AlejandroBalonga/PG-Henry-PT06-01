import React from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import NavBar from '../NavBar/NavBar';

export default function Signup() {
  return (
    
    // <p>Holaaaaaaaa</p>
    <Body>
        <NavBar />
      <Form action="">
        <Title>Formulario de Registro </Title>
        {/* <Input1 type="text" placeholder="Ingrese su nombre"/>
        <Input2 type="text" placeholder="Ingrese su Apellido"/> */}
        <Input3 type="email" placeholder="Ingrese su Correo" />
        <Input4 type="password" placeholder="Ingrese su contraseña" />
        <Acuerdo>Estoy de acuerdo con terminos y condiciones</Acuerdo>
        <Button>Registrarse</Button>
        <Button>Iniciar con Google</Button>

        <p>
          <a href="/Login" >¿Ya tienes cuenta?</a>
        </p>
              
        
      </Form>
    </Body>
  );
}

// *{
//     padding: 0;
//     margin: 0;
//     box-sizing: border-box;

// }
const Body = styled.div`
  width: 100%;
  height: 100vh;
  /* background: #335d90;
  background: linear-gradient(#335d90, 80%, #11e95b); */
  /* font-family: "Roboto", sans-serif; */
  margin: 0;
  box-sizing: border-box;
`;

const Form = styled.form`
display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  max-width: 25%;
  width: 25%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 50px;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1rem);
  border-radius: 10px;
  color: #fff;
`;

const Title = styled.h1`
  position: absoluta;
  font-size: 18px;
  /* margin-bottom: 15px;
  padding-bottom: 7px; */
  margin: auto;
  padding: auto;
  color: #335d90;
  
  text-transform: uppercase;
  justify-content: center;
  align-items: center;

`;

// const Input1 = styled.input`
//   display: block;
//   width: 100%;
//   height: 40px;
//   padding: 5px 6px;
//   margin-bottom: 15px;
//   border: none;
//   outline: none;
//   border-radius: 1px;
// `;
// const Input2 = styled.input`
//   display: block;
//   width: 100%;
//   height: 40px;
//   padding: 5px 6px;
//   margin-bottom: 15px;
//   border: none;
//   outline: none;
//   border-radius: 1px;
// `;
const Input3 = styled.input`
  display: block;
  width: 95%;
  height: 40px;
  padding: 5px 6px;
  /* margin-bottom: 15px; */
  margin: 20px auto;
  border: 3px solid #335d90;
  outline: none;
  border-radius: 1px;

  &:hover:focus {
    box-shadow: 0 0 8px 0 #335d90 inset, 0 0 8px 4px #335d90;
    transform: scale(1.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;
const Input4 = styled.input`
  display: block;
  width: 95%;
  height: 40px;
  padding: 5px 6px;
  /* margin-bottom: 15px; */
  margin: 20px auto;
  border: 3px solid #335d90;
  outline: none;
  border-radius: 1px;

  &:hover:focus {
    box-shadow: 0 0 8px 0 #335d90 inset, 0 0 8px 4px #335d90;
    transform: scale(1.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;

const Acuerdo = styled.p`
  text-align: center;
  margin-bottom: 15px;
  font-size: 15px;
`;

const Button = styled.button`
  display: block;
  margin: 20px auto;
  width: 100%;
  height: 40px;
  background-color: #335d90;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  color: #fff;

  &:hover {
    box-shadow: 0 0 8px 0 #335d90 inset, 0 0 8px 4px #335d90;
    transform: scale(1.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;

const p = styled.link`
  text-align: center;
  margin-top: 15px;
  font-weight: bolder;
  
`;
