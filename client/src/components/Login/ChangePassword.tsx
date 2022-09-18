import axios from 'axios';
import { useParams ,useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../NavBar/NavBar';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import * as Yup from 'yup';
import swal from 'sweetalert2';

export default function ChangePassword() {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const history = useNavigate();

  const validationSchema = Yup.object({
    password: Yup.string()
      .required('Contraseña Requerida')
      .min(6, 'Debe Contener al Menos 6 Caracteres')
      .oneOf([Yup.ref('passwordconfirm')], 'Las Contraseñas no son Iguales'),
    passwordconfirm: Yup.string()
      .required('contraseña Requerida')
      .min(6, 'Debe Contener al Menos 6 Caracteres')
      .oneOf([Yup.ref('password')], 'las contraseñas no son iguales'),
  });

  function handleShowPwd(e) {
    setShowPwd(!showPwd);
  }

  function handleShowPwd2(e) {
    setShowPwd2(!showPwd2);
  }

  const { token } = useParams<{ token: string }>();
  const [input, setInput] = useState({
    password: '',
    passwordconfirm: '',
  });
  const [error, setError] = useState({
    password: '',
    passwordconfirm: '',
  });

  // Funcion para Validar los Campos
  function validadora(e){
    const newInput = {
      ...input,
      [e.target.name]: e.target.value,
    };
    const newError = { password: '', passwordconfirm: '' };
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

    

  }

  function handleChange(e) {
    e.preventDefault();
    axios.post(`http://localhost:3001/auth/confirmnewpassword?token=${token}`, {
      password: input.password,
      passwordconfirm: input.passwordconfirm,
    });
    validadora(e);
    swal.fire({
      title: 'Exito',
      text:`Contraseña Restablecida Exitosa`,
      icon: 'success',
      position:'center',
      timer: 5000,
      timerProgressBar:true
    });
setTimeout(() => {
  history('/login'); 
}, 5000);
  }

  return (
    <Body>
      <NavBar />
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Title>Restablecer su contraseña</Title>
        <Div1>
          <Input3
            type={showPwd ? 'text' : 'password'}
            name="password"
            id="password"
            placeholder="Ingresa tu nueva contraseña"
            onChange={(e) => handleChange(e)}
            value={input.password}
          />
          <Span>{error.password}</Span>
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
            onChange={(e) => handleChange(e)}
            value={input.passwordconfirm}
          />
          <Span>{error.passwordconfirm}</Span>
          <Icon4 onClick={handleShowPwd2}>
            {showPwd2 ? (
              <AiFillEye color="black" />
            ) : (
              <AiFillEyeInvisible color="black" />
            )}
          </Icon4>
        </Div1>

        {!input.password || !input.passwordconfirm  || input.password !== input.passwordconfirm ? (
          <Button disabled className='inactivo'>Restablecer  Contraseña</Button>
        ) : (
          <Button className='activo'>Restablecer  Contraseña</Button>
        )}
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

const Span = styled.span`
  color: red;
`;
