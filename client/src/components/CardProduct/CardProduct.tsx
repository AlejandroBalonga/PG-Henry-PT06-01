import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import StartRating from "../StarRating/StarRating";
import { Articulo, ArticuloCarrito } from "../../actions";
import { BsCartPlus } from "react-icons/bs";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../reducer";
import { addProductToCart, setProductQuantityfromCart } from "../../actions";
import addProductToCartInAPI from "../../services/api/addProductToCart";
import { crearOrder, getUserOrderId } from "../Carrito/Services";

export interface CardProductProps {
  articulo: Articulo;
}

export default function CardProduct({ articulo }: CardProductProps) {
  const navigate = useNavigate();
  const detalle: ArticuloCarrito = {
    id: articulo?.id,
    name: articulo?.name,
    brand: articulo?.brand,
    stock: articulo?.stock,
    price: articulo?.price,
    img: articulo?.img,
    state: articulo?.state,
    categoryId: articulo?.categoryId,
    category: articulo?.category,
    totalCount: 1,
    precioTotal: articulo?.price,
  };

  const dispatch = useDispatch();
  const user = useSelector((state: ReduxState) => state.user);
  const token = useSelector((state: ReduxState) => state.token);
  let cart = useSelector((state: ReduxState) => state.cart);
  const carritoDB = useSelector((state: ReduxState) => state.detailOrder);


  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  //agrega item al carrito
  async function handlerButtonCarrito(e, detalle: ArticuloCarrito) {
    e.preventDefault();

    if (user) {
      // TRABAJO EN BD
      //CUANDO SE LOGEA VERIFICA SI HAY ORDEN O NO Y LA CREA
      // SINCRONIZA EN CASO DE QUE HAYUA CARRITO Y SIGUE ACA
      const checkOrderUser = await getUserOrderId(user?.id);

      //Hay una orden abierta?
      if (checkOrderUser === "sin ordenes abiertas") {
        var order = await crearOrder(
          {
            amount: 0,
            userId: user?.id,
            status: "Abierto",
            carritoOrden: [],
          },
          token
        );
      
        await addProductToCartInAPI({
          // ESTA RUTA DEBERIA BUISCAR IGUAL Y SUMAR O AGREGAR
          token,
          productId: detalle.id,
          quantity: 1,
          orderId: order.data.id,
          price: detalle.price,
        });
      } else {
        await addProductToCartInAPI({
          // ESTA RUTA DEBERIA BUISCAR IGUAL Y SUMAR O AGREGAR
          token,
          productId: detalle.id,
          quantity: 1,
          orderId: checkOrderUser,
          price: detalle.price,
        });
      }
    }
      // NO HAY USUARIO USO EL LS
      const cartOrderDetail = cart?.order_detail?.find(
        (orderDetail) => orderDetail.productId === detalle.id
      );
      if (!cartOrderDetail) {
        //CHEQUEA SI EL PROD ESTA EN CART, sino esta....
        dispatch(addProductToCart(detalle));
      } else {
        dispatch(
          setProductQuantityfromCart(detalle, cartOrderDetail.quantity + 1)
        );
      }
   
    Toast.fire({
      icon: "success",
      title: "Se agregó el prodcuto al carrito",
    });
    navigate("/home");
  }
  // e.preventDefault();
  // console.log(detalle);
  // const cartOrderDetail = cart?.order_detail?.find(
  //   (orderDetail) => orderDetail.productId === detalle.id
  // );
  // if (!cartOrderDetail) {
  //   const checkOrderUser = await verificarSiHayOrderAbierta(user?.id);
  //   if (user) {
  //     if (checkOrderUser) {//si hay orden abierta, agrega producto en bd
  //       console.log("Si hay orden abierta, agrega producto en bd");

  //       await addProductToCartInAPI({
  //         token,
  //         productId: detalle.id,
  //         quantity: 1,
  //         orderId: checkOrderUser,
  //         price: detalle.price,
  //       });
  //     } else {
  //       // Si no hay orden abierta crea una
  //       console.log("Si no hay orden abierta crea una");

  //       let carritoOrden = {
  //         productId: detalle.id,
  //         price: detalle.price,
  //         quantity: 1,
  //       };
  //       //crea una nueva orden pasandole 1 producto solamente, ESTOY EN CARD, POR ESO
  //       var order = await crearOrder(
  //         {
  //           amount: detalle.price,
  //           userId: user?.id,
  //           status: "Abierto",
  //           carritoOrden: carritoOrden,
  //         },
  //         token
  //       );
  //       console.log("AGREGUE UN PRODUCTO", order);
  //     }

  //   } else {
  //     dispatch(addProductToCart(detalle));
  //   }
  // } else { //si encuentra un producto igual en la orden... lo suma
  //   if (user ) {

  //     let index = cart.order_detail.findIndex((art) => art.productId === detalle.id);
  //     console.log(cart.order_detail[index].quantity )
  //     let cant = cart.order_detail[index].quantity
  //     await setProductQuantityfromCartInAPI({
  //       token,
  //       productId: detalle.id,
  //       quantity: (cant + 1),
  //       orderId: cart.id,
  //     });
  //   }
  //   //si no hay usuario - suma al carrito
  //   dispatch(
  //     setProductQuantityfromCart(detalle, cartOrderDetail.quantity + 1)
  //   );
  // }
  // const Toast = Swal.mixin({
  //   toast: true,
  //   position: 'top-end',
  //   showConfirmButton: false,
  //   timer: 1300,
  //   timerProgressBar: true,
  //   didOpen: (toast) => {
  //      toast.addEventListener('mouseleave', Swal.resumeTimer)
  //   }
  // })

  return (
    <CardLink to={`/detail/${articulo.id}`}>
      <Tarjeta>
        <Body>
          <img src={articulo.img} width="180" height="127" alt="img" />
        </Body>
        <Footer>
          <CarritoImgButoon onClick={(e) => handlerButtonCarrito(e, detalle)}>
            <BsCartPlus />
          </CarritoImgButoon>
          <span>|</span>

          <div>
            <Price>${articulo.price.toFixed(2)}</Price>
          </div>
        </Footer>

        <Header>
          <Start>
            <StartRating />
          </Start>
          <Name>{articulo.name}</Name>
        </Header>
      </Tarjeta>
    </CardLink>
  );
}

const CardLink = styled(Link)`
  text-decoration: none;
  /* color: #333333; */
  color: black;
`;

const Tarjeta = styled.div`
  width: 240px;
  height: 460px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.5);
  margin: 10px;
  border-radius: 10px;
  padding-top: 25px;
  border: 1px solid rgba(209, 213, 219, 0.3);
  z-index: 0;
  justify-items: center;
  text-align: center;
  vertical-align: center;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const Body = styled.div`
  > img {
    width: 240px;
    height: 224px;
    border-bottom: 1px solid #d0d2d1;
    padding-bottom: 10px;
  }
`;

const Name = styled.div`
  font-family: Proxima Nova, -apple-system, Helvetica Neue, Helvetica, Roboto,
    Arial, sans-serif;
  font-size: 14px;
  height: 100px;
  margin: 8px;
  color: black;
  text-transform: lowercase;
  ::first-letter {
    text-transform: uppercase;
  }
`;

const Price = styled.span`
  font-size: 24px;
  font-weight: 400;
  line-height: 1;
  font-family: Proxima Nova, -apple-system, Helvetica Neue, Helvetica, Roboto,
    Arial, sans-serif;
  color: black;
`;

const Start = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  > span {
    color: #d0d2d1;
    margin-left: 50px;
  }
`;

const Footer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  > span {
    color: #d0d2d1;
  }
`;

const Header = styled.div``;

const CarritoImgButoon = styled.button`
  margin-left: 3px;
  border: none;
  background-color: white;
  font-size: 20px;
  cursor: pointer;
`;
