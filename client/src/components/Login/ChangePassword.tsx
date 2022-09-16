import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../NavBar/NavBar';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import * as Yup from 'yup';
import { useFormik } from "formik";
import Swal from "sweetalert2";


export default function ChangePassword() {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  //validamos con formik y Yup
  const formik = useFormik({
    initialValues : {
      password: "",
    passwordconfirm:"",
    },
    validationSchema: Yup.object({
      password: Yup.string()
      .required('Contraseña Requerida')
      .min(6, 'debe contener al menos 6 Caracteres')
      .oneOf([Yup.ref('passwordconfirm')],"las contraseñas no son iguales"), 
      passwordconfirm: Yup.string()
      .required('contraseña Requerida')
      .min(6, 'debe contener al menos 6 Caracteres')
      .oneOf([Yup.ref('password')],"las contraseñas no son iguales")
     }),
     onSubmit:(formData)=>{
    axios.post(`http://localhost:3001/auth/confirmnewpassword?token=${token}`,{
        password: formik.values.password,
        passwordconfirm: formik.values.passwordconfirm
       
  }) 
  alert("eXITOSO")
     }

  })

  

   const [showPwd, setShowPwd] = useState(false)
   const [showPwd2, setShowPwd2] = useState(false)



  function handleShowPwd(e) {
    // e.preventDefault()
    setShowPwd(!showPwd);
  }

  function handleShowPwd2(e) {
    // e.preventDefault()
    setShowPwd2(!showPwd2);
  }

  const { token } = useParams<{ token: string }>();
  const [input, setInput] = useState({
    password: '',
    passwordconfirm: '',
  });

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post(`http://localhost:3001/auth/confirmnewpassword?token=${token}`, {
      password: formik.values.password,
      passwordconfirm: formik.values.passwordconfirm
      /* password: input.password,
      passwordconfirm: input.passwordconfirm, */
    });
   
  }

  return (
    <Body>
      <NavBar />
      <Form onSubmit={/* (e) => handleSubmit(e) */ formik.handleSubmit }>
        <Title>Restablecer su contraseña</Title>
        <Div1>
          <Input3
            type={showPwd ? 'text' : 'password'}
            name="password"
            id="password"
            placeholder="Ingresa tu nueva contraseña"
    axios.post(`http://localhost:3001/auth/confirmnewpassword?token=${token}`,{
      password: input.password,
      passwordconfirm: input.passwordconfirm
      
    })
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Contraseña cambiada con éxito',
        showConfirmButton: false,
        timer: 2000
        })
  }

  return (
    
       <Body>
          <NavBar />
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Title>
              Restablecer tu contraseña
            </Title>
            <Div1>
            <Input3
              type={showPwd ? "text" : "password"}
              name="password"
              id= "password"
              placeholder="Ingresa tu nueva contraseña"

            //   id="password"
            /* onChange={(e) => handleChange(e)} */

            value={formik.values.password}
             onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
           {formik.touched.password && formik.errors.password ? (
          <Span>{formik.errors.password}</Span>
            ) : null}

          <Icon3 onClick={handleShowPwd}>
            {showPwd ? (
              <AiFillEye color="black" />
            ) : (
              <AiFillEyeInvisible color="black" />
            )}
          </Icon3>
        </Div1>
        <Div1>
          <Input4
            type={showPwd2 ? 'text' : 'password'}
            name="passwordconfirm"
            id="passwordconfirm"
            placeholder="Ingresa tu nueva contraseña"
            //   id="password"

           /*  onChange={(e) => handleChange(e)} */
            value={formik.values.passwordconfirm}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          />
            {formik.touched.passwordconfirm && formik.errors.passwordconfirm ? (
          <Span>{formik.errors.passwordconfirm}</Span>
            ) : null}
          <Icon4 onClick={handleShowPwd2}>
            {showPwd2 ? (
              <AiFillEye color="black" />
            ) : (
              <AiFillEyeInvisible color="black" />
            )}
          </Icon4>
        </Div1>

        <Button>Restablecer la contraseña</Button>
      </Form>
    </Body>
  );
}

const Body = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  /* box-sizing: border-box; */
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Form = styled.form`
  display: inline-flex;

  justify-content: center;
  /* display: flex; */
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

const Div1 = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
`;

const Input3 = styled.input`
  position: relative;
  display: block;
  width: 120%;
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

const Icon3 = styled.div`
  position: absolute;
  cursor: pointer;
  /* top: 29%; */
  right: 5%;
  justify-content: right;
  align-items: right;
`;
const Input4 = styled.input`
  display: block;
  width: 100%;
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

const Icon4 = styled.div`
  position: absolute;
  cursor: pointer;
  /* top: 29%; */
  right: 5%;
  justify-content: right;
  align-items: right;
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
  margin: 20px auto 0;

  &:hover {
    background-color: #183659;
  }
`;


const Span = styled.span`
color:red;
`
