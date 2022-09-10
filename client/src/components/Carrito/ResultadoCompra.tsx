import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



import NavBar from "../NavBar/NavBar";
import { ReduxState } from "../../reducer";

import {
  Container,
  Column,
  ButtonComprar,
  Button,
  DivProduct,
  DivResumen,
  DivTitulo,
  Decision,
  ButtonCompra,
  Total,
  Precio,
  Cantidad,
  Unidad,
  DivUnidad,
} from "./stylesCart";
import { ButtonsWayToShop } from "./styles";
import { Link } from "react-router-dom";

export default function ResultadoCompra() {
  


  return (
    <>
      <NavBar />
      <Container>
        <h1>Probando... Tu compra fue exitosa!! </h1>
        <ButtonCompra>
                <Button>
                  <Link to="/home">Seguir comprando</Link>
                </Button>
              </ButtonCompra>
        {/* {!productosCarrito ? (
          <DivTitulo>
            <h3>No hay productos en el carrito</h3>
          </DivTitulo>
        ) : (
          <Column>
            <DivTitulo>
              <h3>Mi CARRITO ({productosCarrito?.length})</h3>
            </DivTitulo>

            {productosCarrito?.map((p, i) => (
              <DivProduct key={i}>
                <DivUnidad>
                  <img src={p.img} alt="img" width="80px" />
                  <h3>{p.name}</h3>
                  <ButtonComprar onClick={() => handlerCantidadItem(p, "+")}>
                    +
                  </ButtonComprar>
                  <h3>{p.totalCount}</h3>
                  <ButtonComprar
                    disabled={controllerDisabledButon}
                    onClick={() => handlerCantidadItem(p, "-")}
                  >
                    -
                  </ButtonComprar>
                  <Unidad>${p.price?.toFixed(2)}</Unidad>unidad
                  <Unidad>${p.precioTotal?.toFixed(2)}</Unidad>total
                </DivUnidad>
                <Decision>
                  <ButtonComprar onClick={() => handlerDelete(p)}>
                    Delete
                  </ButtonComprar>
                </Decision>
              </DivProduct>
            ))}
            <DivResumen>
              <Total>Total</Total>
              <Precio>${preciofinal?.toFixed(2)}</Precio>
            </DivResumen>
            <ButtonsWayToShop>
              <ButtonCompra>
                <Button>
                  <Link to="/home">Seguir comprando</Link>
                </Button>
              </ButtonCompra>
              <ButtonCompra>
                <Button>
                  <Link to="/pagar">Finalizar compra</Link>
                </Button>
              </ButtonCompra>
            </ButtonsWayToShop>
          </Column>
        )} */}
      </Container>
    </>
  );
}
