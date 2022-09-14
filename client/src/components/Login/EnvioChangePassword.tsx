import styled from "styled-components";
import NavBar from "../NavBar/NavBar";


export default function EnvioChangePassword() {
  

  return (
    
       <Body>
          <NavBar />
          <Form >
            <Title>
              ¿Olvidaste tu contraseña?
            </Title>
            <Text>
                Ingresá tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </Text>

            <Input3
              type="email"
              name="email"
              placeholder="Ingrese su Correo"
            />
           
            
            <Button >Restablecer la contraseña</Button>
            <P>
              <a href="/Signup">¿No tienes cuenta? Registrate</a>
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

const Text = styled.p`
    position: absoluta;
    font-size: 16px;
    margin: 10px auto;
    padding: auto;
    color: black;
    text-align: center;
    justify-content: center;
    align-items: center;
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

const P = styled.div`
  text-align: center;
  margin-top: 15px;
  font-weight: bolder;

  > a {
    text-decoration: none;
    color: #335d90;
  }
`;

