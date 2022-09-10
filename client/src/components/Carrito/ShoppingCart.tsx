import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Articulo, ArticuloCarrito } from "../../actions";
import NavBar from "../NavBar/NavBar";
import { ReduxState } from "../../reducer";
import {AiOutlineDelete} from "react-icons/ai";

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
  ContainerCantidad,
  DivNombreColumnas,
} from "./stylesCart";
import { ButtonsWayToShop } from "./styles";
import { ButtonCantidad, ButtonDelete } from './stylesCart';

export default function ShoppingCart() {
  let detail = useSelector((state: ReduxState) => state.detailsProduct);

  let detalle: ArticuloCarrito = {
    id: detail?.id,
    name: detail?.name,
    brand: detail?.brand,
    stock: detail?.stock,
    price: detail?.price,
    img: detail?.img,
    state: detail?.state,
    categoryId: detail?.categoryId,
    category: detail?.category,
    totalCount: 1,
    precioTotal: detail?.price,
  };

  let preciofinal = 0;
  let productosCarrito = JSON.parse(localStorage.getItem("carrito"));
  preciofinal = productosCarrito?.reduce(
    (sum, b) => sum + Number(b.precioTotal),
    0
  );

  //let carrito = JSON.parse(localStorage.getItem('carrito'));
  if (!productosCarrito) {
    productosCarrito = [];
  }

  const [articulo, setArticulo] = useState([productosCarrito]);

  function handlerCantidadItem(detalle, signo: string) {
    setArticulo(detalle);

    const index = productosCarrito.findIndex((art) => art.id === detalle.id);
    let precioUnitario = detail.price;

    let carritoAux = JSON.parse(localStorage.getItem("carrito"));
    signo === "+"
      ? (carritoAux[index].totalCount = carritoAux[index].totalCount + 1)
      : (carritoAux[index].totalCount = carritoAux[index].totalCount - 1);
    carritoAux[index].precioTotal =
      carritoAux[index].price * carritoAux[index].totalCount;
    localStorage.setItem("carrito", JSON.stringify(carritoAux));
  }

  function handlerDelete(detalle) {
    //en esta funcion defino el poder elimiar un articulo de carrito
    setArticulo(detalle);

    //me guardo lo que tengo en LocalStorage(LS) en una variable
    let carritoDelete = JSON.parse(localStorage.getItem("carrito"));
    //creo otra variable para recorrer la posicion dentro de la variable anterior
    let carritoIndex = carritoDelete.findIndex((el) => el.id === detalle.id);
    // utlizo el metodo splice para eliminar el elemento encontrado
    carritoDelete.splice(carritoIndex, 1);
    //console.log("quiero eliminar este", carritoIndex)
    //cargo de nuevo al LS la variable con la nueva informacion
    localStorage.setItem("carrito", JSON.stringify(carritoDelete));

    //en resumidas cuentas esto es lo que hago paso a paso, me esta dando error ya que me dice que no reconoce el metodo splice, espero que con esto les sirva
    //para orientar y puedan sacarlo, los veo a la noche cuando vuelva, les deseo un hermoso y maravilloso día, y que diosito les de bastante sabiduria para
    //sacar este problema adelante
  }

  const index = productosCarrito?.findIndex((art) => art.id === detalle.id);
  const controllerDisabledButon = productosCarrito[index]?.totalCount <= 1;

  return (
    <>
      <NavBar />
      <Container>
        {!productosCarrito ? (
          <DivTitulo>
            <h3>No hay productos en el carrito</h3>
          </DivTitulo>
        ) : (
          <Column>
            <DivTitulo>
              <h3>Mi CARRITO ({productosCarrito?.length})</h3>
              <DivNombreColumnas>
                <h5></h5>
                <h5>Producto</h5>
                <h5>Cantidad</h5>
                <h5>Precio Unidad</h5>
                <h5>Precio Cantidad</h5>
                <h5></h5>
              </DivNombreColumnas>
            </DivTitulo>

            {productosCarrito?.map((p, i) => (
              <DivProduct key={i}>
                <DivUnidad>
                  <img src={p.img} alt="img" width="80px" />
                  <h3>{p.name}</h3>
                  <ContainerCantidad>
                    <ButtonCantidad
                      disabled={controllerDisabledButon}
                      onClick={() => handlerCantidadItem(p, "-")}
                    >
                      -
                    </ButtonCantidad>
                    <h4>{p.totalCount}</h4>
                    <ButtonCantidad onClick={() => handlerCantidadItem(p, "+")}>
                      +
                    </ButtonCantidad>
                  </ContainerCantidad>
                  <Unidad>${p.price?.toFixed(2)}</Unidad>
                  <Unidad>${p.precioTotal?.toFixed(2)}</Unidad>
                  <ButtonDelete onClick={() => handlerDelete(p)}>
                    <AiOutlineDelete/>
                  </ButtonDelete>
                </DivUnidad>
                <Decision></Decision>
              </DivProduct>
            ))}
            <DivResumen>
              <Total>Total</Total>
              <Precio>${preciofinal?.toFixed(2)}</Precio>
            </DivResumen>
            <DivResumen>
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
            </DivResumen>
          </Column>
        )}
      </Container>
    </>
  );
}
