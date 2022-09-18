import { Navigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../NavBar/NavBar";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/index";
import { useSelector } from "react-redux";
import { ReduxState } from "../../reducer";
import { BsGoogle } from "react-icons/bs";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as Yup from 'yup';
import swal from 'sweetalert2';

export default function Signup() {
  const dispatch = useDispatch<any>();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const user = useSelector((state: ReduxState) => state.user);
  const errorLogin = useSelector((state: ReduxState)=>state.error)
console.log(errorLogin)
  

const [resetState,setResetState]=useState(errorLogin)


  useEffect(()=>{
    if(errorLogin ==='Usuario no existe'){
      swal.fire({
        title: 'Error',
        text:'Usuario Ingresado no Existe',
        icon: 'error',
        position:'center',
        timer: 3000,
        timerProgressBar:true
      });
   /*    window.location.reload(); */
   setResetState('')
    }
    if(errorLogin==='Password Incorrecto'){
      swal.fire({
        title: 'Error',
        text:'La Contraseña Ingresa es Incorrecta',
        icon: 'error',
        position:'center',
        timer: 3000,
        timerProgressBar:true
      });
      setResetState('')
    }
    
  },[errorLogin])

 

   //creamos la esque de validacion
   const validationSchema = Yup.object({
    email: Yup.string()
    .email('E-mail no es Valido')
    .required('E-mail es Requerido'),
    password : Yup.string()
    .required('Contraseña es Requerido')
    .min(6,'debe contener al menos 6 Caracteres')
   })
// creamos el estado local de Errores
   const [error, setError] = useState({
    email: '',
    password: '',
  });

  // Funcion para Validar los Campos
  function validadora(e){
    const newInput = {
      ...input,
      [e.target.name]: e.target.value,
    };
    const newError = { email: '', password: '' };
    try {
      validationSchema.validateSync(newInput, { abortEarly: false });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((err) => {
          const name = err.path;
          if (name && !newError[name]) {
            newError[name] = err.message;
          }
        });
      }
    }
    setError(newError);
    setInput(newInput); 

  }
  
  

  function handleChange(e) {
    e.preventDefault();
    validadora(e)
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(input));
    validadora(e)
  }

  function redirect() {
    window.location.href = "http://localhost:3001/auth/google";
  }

  const [showPwd2, setShowPwd2] = useState(false);

  function handleShowPwd2(e) {
    e.preventDefault();
    setShowPwd2(!showPwd2);
  }

  return (
    <div>
      {user?.role === "CLIENT" ? (
        <Navigate to={"/home"} />
      ) : user?.role === "ADMIN" ? (
        <Navigate to={"/admin"} />
      ) : (
        <Body>
          <NavBar />
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Saludo>
              ¡Hola! Para seguir, Ingresá los Datos con los que te Registraste.
            </Saludo>

            <Input3
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
              placeholder="Ingrese su E-mail"
            />
             <Span>{error.email}</Span>
            <Div1>
              <Input4
                type={showPwd2 ? "text" : "password"}
                  id="password"
                  name="password"
                onChange={(e) => handleChange(e)}
                placeholder="Ingresa tu  Contraseña"
              />
              <Span>{error.password}</Span>

              <Icon4 onClick={handleShowPwd2}>
                {showPwd2 ? (
                  <AiFillEye color="black" />
                ) : (
                  <AiFillEyeInvisible color="black" />
                )}
              </Icon4>
            </Div1>

            <Recuerdo>
              <a href="login/checkmail/enviochangepassword">
                ¿Olvidaste tu Contraseña?
              </a>
            </Recuerdo>

              {
                !input.email || !input.password 
                ? 
                <Button type="submit" className="inactivo" disabled>Iniciar Sesión</Button>
                :
                <Button type="submit" className="activo">Iniciar Sesión</Button>
              }    


            <O> O Continuar Con </O>

            <Button onClick={redirect}>
              <DivIcon>
                <BsGoogle />
              </DivIcon>
              Iniciar Sesión con Google
            </Button>

            <P>
              <a href="/Signup">¿No Tienes Cuenta? Registrate</a>
            </P>
          </Form>
        </Body>
      )}
    </div>
  );
}

const Body = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  box-sizing: border-box;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  /* max-width: 25%; */
  width: 40%;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 50px;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.3);
  /* background-color: rgba(255, 255, 255, 0.1); */
  background-color: #ffffff;
  backdrop-filter: blur(1rem);
  border-radius: 10px;
  color: #fff;
`;

const Title = styled.h1`
  position: absoluta;
  font-size: 18px;
  margin: auto;
  padding: auto;
  color: #335d90;

  text-transform: uppercase;
  justify-content: center;
  align-items: center;
`;

const Saludo = styled.div`
  color: black;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px;
`;

const Input3 = styled.input`
  display: block;
  width: 95%;
  height: 40px;
  padding: 5px 6px;
  margin: 10px auto;
  border: 1px solid black;
  outline: none;
  border-radius: 5px;
  background-color: inherit;
  &:focus {
    border: 2px solid #335d90;
  }
`;
const Input4 = styled.input`
  display: block;
  width: 95%;
  height: 40px;
  padding: 5px 6px;
  /* margin-bottom: 15px; */
  margin: 10px auto;
  border: 1px solid black;
  outline: none;
  border-radius: 5px;
  background-color: inherit;
  &:focus {
    border: 2px solid #335d90;
  }
`;

const Recuerdo = styled.p`
  text-align: center;
  margin-bottom: 15px;
  margin-top: 15px;

  font-size: 15px;
  color: #335d90;

  > a {
    text-decoration: none;
    color: #335d90;
  }
`;

const Button = styled.button`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  /* display: block;
  margin: 10px auto; */
  width: 100%;
  height: 40px;
  background-color: #335d90;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  color: #fff;
  &.inactivo {
 background-color: #cbced1;
}
 &.activo {
  background-color:#335d90;
  &:hover {
    background-color: #183659;
  }
}
`;

const P = styled.div`
  text-align: center;
  margin-top: 15px;
  font-weight: bolder;

  > a {
    text-decoration: none;
    color: #335d90;
  }
`;

const DivIcon = styled.div`
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 5px;
  font-size: 20px;
  color: #fff;
`;

const O = styled.div`
  font-size: 15px;
  color: black;
  margin: 10px 0;
`;

const Div1 = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
`;

const Icon4 = styled.div`
  position: absolute;
  cursor: pointer;
  /* top: 29%; */
  right: 5%;
  justify-content: right;
  align-items: right;
`;

const Span = styled.span`
  color: red;
`;



