import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Articulo, ArticuloCarrito } from "../../actions";
import NavBar from "../../components/NavBar/NavBar";
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
  preciofinal = productosCarrito?.reduce((sum, b) => sum + Number(b.price), 0);
  //let carrito = JSON.parse(localStorage.getItem('carrito'));
  if (!productosCarrito) {
    productosCarrito = [];
  }

  const [articulo, setArticulo] = useState([productosCarrito]);

  function handlerPrecioCantidadSuma(detalle) {
    //console.log(detalle)
    setArticulo(detalle);

    const index = productosCarrito.findIndex((art) => art.id === detalle.id);
    let precioUnitario = detail.price;

    let carritoAux = JSON.parse(localStorage.getItem("carrito"));
    carritoAux[index].totalCount = carritoAux[index].totalCount + 1;
    carritoAux[index].precioTotal =
      carritoAux[index].price * carritoAux[index].totalCount;
    localStorage.setItem("carrito", JSON.stringify(carritoAux));
  }

  function handlerPrecioCantidadResta(detalle) {
    setArticulo(detalle);

    const index = productosCarrito.findIndex((art) => art.id === detalle.id);
    let precioUnitario = detail.price;

    let carritoAux = JSON.parse(localStorage.getItem("carrito"));
    carritoAux[index].totalCount = carritoAux[index].totalCount - 1;
    carritoAux[index].precioTotal =
      carritoAux[index].price * carritoAux[index].totalCount;
    localStorage.setItem("carrito", JSON.stringify(carritoAux));
  }

  function handlerDelete(detalle) { //en esta funcion defino el poder elimiar un articulo de carrito
    setArticulo(detalle);

//me guardo lo que tengo en LocalStorage(LS) en una variable
    let carritoDelete = JSON.parse(localStorage.getItem("carrito"));
//creo otra variable para recorrer la posicion dentro de la variable anterior
    let carritoIndex = carritoDelete.findIndex((el)=> el.id === detalle.id);
// utlizo el metodo splice para eliminar el elemento encontrado
    carritoIndex.splice(carritoIndex, 1)
    //console.log("quiero eliminar este", carritoIndex)
//cargo de nuevo al LS la variable con la nueva informacion
    localStorage.setItem("carrito", JSON.stringify(carritoDelete));

    //en resumidas cuentas esto es lo que hago paso a paso, me esta dando error ya que me dice que no reconoce el metodo splice, espero que con esto les sirva
    //para orientar y puedan sacarlo, los veo a la noche cuando vuelva, les deseo un hermoso y maravilloso día, y que diosito les de bastante sabiduria para 
    //sacar este problema adelante
  }


  const index = productosCarrito?.findIndex((art) => art.id === detalle.id);
  const controllerDisabledButon =
    productosCarrito[index]?.totalCount <= 1 ? true : false;

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
            </DivTitulo>

            {productosCarrito?.map((p, i) => (
              <DivProduct key={i}>
                <DivUnidad>
                  <img src={p.img} alt="img" width="80px" />
                  <h3>{p.name}</h3>
                  <ButtonComprar onClick={() => handlerPrecioCantidadSuma(p)}>
                    +
                  </ButtonComprar>
                  <h3>{p.totalCount}</h3>
                  {/* <Cantidad value={p.totalCount}></Cantidad> */}
                  <ButtonComprar
                    /*disabled={controllerDisabledButon}*/ onClick={() =>
                      handlerPrecioCantidadResta(p)
                    }
                  >
                    -
                  </ButtonComprar>
                  <Unidad>${p.price?.toFixed(2)}</Unidad>unidad
                  <Unidad>${p.precioTotal?.toFixed(2)}</Unidad>total
                  {/* //<p>{p.price * p.totalCount}</p> */}
                  {/* <ButtonComprar  onClick={()=>handlerPrecioCantidadSuma(p)}>+</ButtonComprar> */}
                </DivUnidad>
                <Decision>
                  <ButtonComprar onClick={() => handlerDelete(p)}>Delete</ButtonComprar>

                  <ButtonComprar>Comprar ahora</ButtonComprar>
                </Decision>
              </DivProduct>
            ))}
            <DivResumen>
              <Total>Total</Total>
              <Precio>${preciofinal?.toFixed(2)}</Precio>
            </DivResumen>
            <ButtonCompra>
              <Button>
                <Link to="/PruebaCarrito">Continuar compra</Link>
              </Button>
            </ButtonCompra>
          </Column>
        )}
      </Container>
    </>
  );
}
