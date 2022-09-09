import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Articulo } from "../../actions";
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

  let detalle : Articulo =   {
    id: detail?.id,
    name:detail?.name ,
    brand:detail?.brand ,
    stock:detail?.stock ,
    price:detail?.price ,
    img:detail?.img ,
    state:detail?.state ,
    categoryId:detail?.categoryId ,
    category:detail?.category ,
    totalCount: 1,
   }

  let preciofinal = 0;
  let productosCarrito = JSON.parse(localStorage.getItem("carrito"));
  preciofinal = productosCarrito?.reduce((sum, b) => sum + Number(b.price), 0);
  //let carrito = JSON.parse(localStorage.getItem('carrito'));
  if (!productosCarrito) {
    productosCarrito = [];
  }

  const [articulo, setArticulo] = useState([productosCarrito])

  function handlerPrecioCantidad(detalle){
    setArticulo(detalle)
    
    const index = productosCarrito.findIndex((art) => art.id === detalle.id)
    let precioUnitario = detail.price
    
    let carritoAux = JSON.parse(localStorage.getItem('carrito'));
      carritoAux[index].totalCount = carritoAux[index].totalCount + 1;
      carritoAux[index].price = carritoAux[index].totalCount * precioUnitario
      localStorage.setItem('carrito', JSON.stringify(carritoAux))
  }

  // function handlerPrecioCantidadMenos(detalle){
  //   setArticulo(detalle)
    
  //   const index = productosCarrito.findIndex((art) => art.id === detalle.id)
  //   let precioUnitario = detail.price
    
  //   let carritoAux = JSON.parse(localStorage.getItem('carrito'));
  //     carritoAux[index].totalCount = carritoAux[index].totalCount - 1;
  //     carritoAux[index].price = carritoAux[index].totalCount / precioUnitario
  //     localStorage.setItem('carrito', JSON.stringify(carritoAux))
  // }

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
                  <Cantidad type="number" min="1" value="1"></Cantidad>
                  <Unidad>${p.price?.toFixed(2)}</Unidad>
                  {/* //<p>{p.price * p.totalCount}</p> */}
                  <ButtonComprar  onClick={()=>handlerPrecioCantidad(p)}>+</ButtonComprar>
                  {/* <ButtonComprar  onClick={()=>handlerPrecioCantidadMenos(p)}>-</ButtonComprar> */}

                </DivUnidad>
                <Decision>
                  <ButtonComprar>Delete</ButtonComprar>

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
