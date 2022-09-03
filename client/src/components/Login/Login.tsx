import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NavBar from '../NavBar/NavBar';

export default function Login() {
  return (

    <Body>
    <NavBar />
  <Form action="">
    <Title>Formulario de inicio de sesión</Title>
    {/* <Input1 type="text" placeholder="Ingrese su nombre"/>
    <Input2 type="text" placeholder="Ingrese su Apellido"/> */}
    <Input3 type="email" placeholder="Ingrese su Correo" />
    <Input4 type="password" placeholder="Ingrese su contraseña" />
    <Acuerdo>Estoy de acuerdo con terminos y condiciones</Acuerdo>
    <Button>Inicio</Button>
    <Button>Iniciar con Google</Button>

    <p>
      <a href="/Signup" >¿No tienes cuenta?</a>
    </p>
          
    
  </Form>
</Body>






    // <FormLogin>
    //   <Link to="/Home">
    //     {" "}
    //     <ButonToHome>Volver a home</ButonToHome>{" "}
    //   </Link>
    //   <ContainerFormLogin>
    //     <label>Name</label>
    //     <InputLogin type="text" />
    //     <label>Email</label>
    //     <InputLogin type="email" />
    //     <ButtonLoginSubmit>Login</ButtonLoginSubmit>
    //   </ContainerFormLogin>
    // </FormLogin>
  );
}

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







// const InputLogin = styled.input`
// height: 1.5rem;
// `;

// const ButtonLoginSubmit = styled.button`
// font-family: "Kalam", cursive;
//   font-size: 15px;
//   font-size: bold;
//   height: 2rem;
//   width: 15rem;
//   margin:auto;
//   background-color: #335d90;
//   border: none;
//   color: white;
//   letter-spacing: 0.1rem;
  
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-size: 16px;
//   border-radius: 0.4rem;

//   &:hover {
//     //box-shadow: 0 0 8px 0 #335d90 inset, 0 0 8px 4px #335d90;
//     transform: scale(1.1);
//     border: 1px solid rgba(255, 255, 255, 0.3);
//   }
// `;

// const ContainerFormLogin = styled.div`
//   position: relative;
//   justify-content: center;
//   align-items: center;
//   display: grid;
//   text-align: left;
//   margin: auto; 
//   margin-top: 2rem;
//   padding: 1rem;
//   //padding-left: 1rem;

//   /* margin: 3rem; */

//   width: 320px;
//   height: 200px;
//   border-radius: 16px;
//   box-shadow: rgba(0, 0, 0, 0.5) 0px 54px 55px,
//     rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
//     rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
//   /* backdrop-filter: blur(16px) saturate(180%);
//   -webkit-backdrop-filter: blur(16px) saturate(180%); */
//   border: 1px solid rgba(209, 213, 219, 0.3);
// `;

// const ButonToHome = styled.button`
//   font-family: "Kalam", cursive;
//   font-size: 15px;
//   font-size: bold;
//   height: 65px;
//   margin: 8px;
//   background-color: #335d90;
//   border: none;
//   color: white;
//   padding: 15px 32px;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-size: 16px;
//   border-radius: 0.4rem;

//   &:hover {
//     box-shadow: 0 0 10px 0 #335d90 inset, 0 0 10px 4px #335d90;
//     transform: scale(1.1);
//     border: 1px solid rgba(255, 255, 255, 0.3);
//   }
// `;

// const FormLogin = styled.div`
//   font-family: "Kalam", cursive;
//   font-size: 15px;
//   font-size: bold;

//   height: 65px;
//   margin: 8px;
//   align-items: center;
//   max-width: 700px;
//   margin: auto;
//   margin-top: 1rem;
//   text-align: center;
//   justify-content: center;
// `;
