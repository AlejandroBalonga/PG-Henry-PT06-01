import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import NavBar from '../NavBar/NavBar';
import { createUser } from '../../actions/index';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../reducer';
import swal from 'sweetalert2';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const dispatch = useDispatch<any>();

  const error = useSelector((state: ReduxState) => state.error);
  const mensaje = useSelector((state: ReduxState)=>state.mensaje)
  const history = useNavigate();

  // verifico si existe un cambio en mi state
  useEffect(()=>{
    if(mensaje){
     history("/login/checkmail/checkmailsignup")

    }
    if(error){
      swal.fire({
        title: 'Error',
        text:`${error}`,
        icon: 'error',
        position:'center',
        timer: 5000,
        timerProgressBar:true
      });
      window.location.reload();
    }
  },[error,mensaje])

  const formik = useFormik({
    initialValues: {

      name: '',
      surname: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es Requerido'),
      surname: Yup.string().required('El surname es Requerido'),
      email: Yup.string()
        .email('El Email no es Valida')
        .required('El email es obligatorio'),
      password: Yup.string()
        .required('El Password Es Requerido')
        .min(6, 'debe contener al menos 6 Caracteres'),
    }),
    onSubmit: (formData, { resetForm }) => {
      dispatch(createUser(formData));
      resetForm();
    }
  });

  const [showPwd2, setShowPwd2] = useState(false);

  function handleShowPwd2(e) {
    e.preventDefault();
    setShowPwd2(!showPwd2);
  }

  /* const [input, setInput] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  })
 */
  /* function handleChange(e){
    e.preventDefault()
    setInput({
      ...input,
    [e.target.name]:e.target.value})
  } */

  /*   function handleSubmit(e){
      
    dispatch(createUser(input))
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Su registración fue exitosa',
        showConfirmButton: false,
        timer: 1500
      })
  } */

  return (
    <Body>
      <NavBar />

      <Form onSubmit={/* (e)=>handleSubmit(e) */ formik.handleSubmit}>
        {/* <Title>Formulario de Registro </Title> */}
        <Saludo>
          ¡Hola! Registrate en nuestro sitio para obtener todos los beneficios.
        </Saludo>
        <Input1
          type="text"
          name="name"
          /*   onChange={(e)=>handleChange(e)} */
          placeholder="Ingrese su nombre"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <Span>{formik.errors.name}</Span>
        ) : null}

        <Input2
          type="text"
          name="surname"
          /*   onChange={(e)=>handleChange(e)} */
          placeholder="Ingrese su Apellido"
          value={formik.values.surname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.surname && formik.errors.surname ? (
          <Span>{formik.errors.surname}</Span>
        ) : null}
        <Input3
          type="email"
          name="email"
          /*        onChange={(e)=>handleChange(e)} */
          placeholder="Ingrese su Correo"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <Span>{formik.errors.email}</Span>
        ) : null}

        <Div1>
        <Input4
          type={showPwd2 ? "text" : "password"}
          name="password"
          /* onChange={(e)=>handleChange(e)} */
          placeholder="Ingrese su contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Icon4 onClick={handleShowPwd2}>
                {showPwd2 ? (
                  <AiFillEye color="black" />
                ) : (
                  <AiFillEyeInvisible color="black" />
                )}
              </Icon4>
        {formik.touched.password && formik.errors.password ? (
          <Span>{formik.errors.password}</Span>
        ) : null}
        </Div1>
        <Acuerdo>
          Acepto los{' '}
          <a href="/terminos-y-condiciones">términos y condiciones</a>
        </Acuerdo>

        <Button type="submit">Registrarse</Button>
        {/* <Button>Iniciar con Google</Button> */}

        <P>
          <a href="/Login">¿Ya tienes cuenta?</a>
        </P>
      </Form>
    </Body>
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
  padding: 30px;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.3);
  /* background-color: rgba(255, 255, 255, 0.1); */
  background-color: #ffffff;
  backdrop-filter: blur(1rem);
  border-radius: 10px;
  color: #fff;
`;

// const Title = styled.h1`
//   position: absoluta;
//   font-size: 18px;
//   margin: auto;
//   padding: auto;
//   color: #335d90;

//   text-transform: uppercase;
//   justify-content: center;
//   align-items: center;
// `;

const Saludo = styled.div`
  color: black;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const Input1 = styled.input`
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
const Input2 = styled.input`
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
  outline: none;
  border-radius: 1px;
  margin: 10px auto;
  border: 1px solid black;
  outline: none;
  border-radius: 5px;
  background-color: inherit;
  &:focus {
    border: 2px solid #335d90;
  }
`;

const Acuerdo = styled.p`
  text-align: center;
  margin-bottom: 15px;
  font-size: 15px;
  color: black;
  > a {
    color: #335d90;
    text-decoration: none;
  }
`;

const Button = styled.button`
  display: block;
  margin: 10px auto;
  width: 100%;
  height: 40px;
  background-color: #335d90;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  color: #fff;

  &:hover {
    /* box-shadow: 0 0 8px 0 #335d90 inset, 0 0 8px 4px #335d90;
    transform: scale(1.1);
    border: 1px solid rgba(255, 255, 255, 0.3); */
    background-color: #183659;
  }
`;

const Span = styled.span`
color:red;
font-size: 10px;
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
