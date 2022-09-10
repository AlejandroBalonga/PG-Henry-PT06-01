import StartRating from "../StarRating/StarRating";
import NavBar from "../NavBar/NavBar";
import metodo from "../../../img/metodopago.png";
import logo from "../../../img/Logo.png";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Container,
  Panel,
  Column,
  Galeria,
  Description,
  Section,
  Producto,
  Estado,
  Name,
  Price,
  CardEnvio,
  CheckIcon,
  Stock,
  ButtonComprar,
  ButtonCarrito,
  Button,
  MetodoPago,
  Categoria,
  Form,
  Input,
  Img,
  Parrafo,

  /*  ProductoVenta,
  InfoVendedor
 */
} from "./styles";

export default function Pagar() {
  interface datos {
    id: string;
  }

  const [datos, setDatos] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/mercadopago")
      .then((data) => {
        setDatos(data.data.id);
        console.info("Contenido de data:", data);

        // console.log('DATOS' + datos.id)
      })
      .catch((err) => console.error(err));
  }, []);

  console.log("DATOS" + datos);

  // function handlerSubmit() {
  //     window.location.assign("https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1191162786-887db42c-eb06-405d-b0f6-bb12389b2dbd")

  // }

  const carrito = JSON.parse(localStorage.getItem("carrito"));
  let preciofinal = 0;
  preciofinal = carrito?.reduce((sum, b) => sum + Number(b.precioTotal), 0);

  const items_ml = carrito.map((i) => ({
    name: i.name,
    price: i.price,
    quantity: i.totalCount,
    totalPrice: i.precioTotal,
  }));

  return (
    <>
      <NavBar />
      <Container>
        <Panel>
          <Column>
            <Galeria>
              {/* <img
             src={detail?.img} 
              //src="https://http2.mlstatic.com/D_NQ_NP_2X_611808-MCO45374942353_032021-F.webp" 
              alt="img"
            /> */}

              <Form>
                <h3>Datos del comprador</h3>
                <Input
                  type="text"
                  name="name"
                  placeholder="Ingrese su nombre"
                />

                <Input
                  type="text"
                  name="surname"
                  placeholder="Ingrese su Apellido"
                />
                <Input
                  type="text"
                  name="direccion"
                  placeholder="Ingrese su Dirección"
                />
                <Input type="string" name="zip" placeholder="Ingrese su CP" />
                <Input
                  type="text"
                  name="telefono"
                  placeholder="Ingrese su Teléfono"
                />
              </Form>
            </Galeria>

            {/* <Info /> */}
          </Column>
          <Column>
            {/*  <InfoProducto/> */}
            <Producto>
              {items_ml.map((it, i) => (
                <ul key={i}>
                  <li>
                    <b>{it.name}</b>
                  </li>
                  <li>Cantidad: {it.quantity}</li>
                  <li>
                    Precio: $<b>{it.price?.toFixed(2)}</b>
                  </li>
                  <li>
                    Precio Total: $<b>{it.totalPrice?.toFixed(2)}</b>
                  </li>

                  <li>&nbsp;</li>
                </ul>
              ))}
              <div>
                <p>
                  <b>${preciofinal?.toFixed(2)}</b>
                </p>
              </div>

              {/* 
              <StartRating /> */}

              {!datos ? (
                <p>....</p>
              ) : (
                <ButtonCarrito as="a" href={datos} target="_blank">
                  <Button>Pagar</Button>
                </ButtonCarrito>
              )}
            </Producto>
          </Column>
        </Panel>
      </Container>
    </>
  );
}
