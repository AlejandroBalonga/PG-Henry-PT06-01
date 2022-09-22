import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  ArticuloCarrito,
  clearStateCart,
  getDetailOrder,
  setProductQuantityfromCart,
} from "../../actions";
import NavBar from "../NavBar/NavBar";
import { ReduxState } from "../../reducer";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import {
  eliminarProductos,
  actualizarOrder,
  crearOrder,
  getUserOrderId,
  modificarAmount,
} from "./Services";

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

import { ButtonCantidad, ButtonDelete } from "./stylesCart";
import { useDispatch } from "react-redux";
import setProductQuantityfromCartInAPI from "../../services/api/setProductQuantityfromCart";
import {
  removeProductfromCartInAPI,
  removeProductfromCartOptions,
} from "../../services/api/removeProductfromCart";
import { removeProductfromCart, setNumNavBar } from "../../actions/index";
import Swal from "sweetalert2";
import { setLocalstorageState } from "../../utils/localstorage";
const { REACT_APP_API_URL = "http://localhost:3001" } = process.env;

export default function ShoppingCart() {
  let detail = useSelector((state: ReduxState) => state.detailsProduct);
  const user = useSelector((state: ReduxState) => state.user);
  const token = useSelector((state: ReduxState) => state.token);
  const carritoDB = useSelector((state: ReduxState) => state.detailOrder);
  const cart = useSelector((state: ReduxState) => state.cart);
  const numNav = useSelector((state: ReduxState) => state.numNavBar);

  const history = useNavigate();
  const dispach = useDispatch<any>();

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
  let productosCarrito;
  let productosBdformateados = [];
  const [articulo, setArticulo] = useState([]);

  useEffect(() => {
    if (user) {
      dispach(getDetailOrder(user?.id));
    }
    dispach(setNumNavBar(productosCarrito?.length));
  }, [articulo]);

  //ELMINIO DUPLICADOS Y SUMO CANTIDADES

  //   let carritoSort = carritofinal.sort((a, b) => a.name.localeCompare(b.name))

  //  for (let i = 0; i < carritoSort.length; i++) {
  //      for (let j =1 ; j < carritoSort.length; j++){

  //        if (carritoSort[i]?.id === carritoSort[j]?.id){
  //          carritoSort[i].totalCount = carritoSort[i].totalCount + carritoSort[j].totalCount
  //          carritoSort.splice(j,1)
  //        }
  //      }
  //  }

  if (user) {
    // HAY USUARIO???
    for (let i = 0; i < carritoDB?.order_detail?.length; i++) {
      productosBdformateados.push({
        id: carritoDB.order_detail[i].product.id,
        name: carritoDB.order_detail[i].product.name,
        brand: carritoDB.order_detail[i].product.brand,
        stock: carritoDB.order_detail[i].product.stock,
        price: carritoDB.order_detail[i].product.price,
        img: carritoDB.order_detail[i].product.img,
        state: carritoDB.order_detail[i].product.state,
        categoryId: carritoDB.order_detail[i].product.categoryId,
        category: carritoDB.order_detail[i].product.brand, // esto esta mal
        totalCount: carritoDB.order_detail[i].quantity,
        precioTotal:
          carritoDB.order_detail[i].quantity *
          carritoDB.order_detail[i].product.price,
      });
    }

    productosCarrito = productosBdformateados;
  } else {
    // NO HAY USUARIO
    let productosFormatLS = [];

    for (let i = 0; i < cart?.order_detail.length; i++) {
      productosFormatLS.push({
        id: cart?.order_detail[i].product.id,
        name: cart?.order_detail[i].product.name,
        brand: cart?.order_detail[i].product.brand,
        stock: cart?.order_detail[i].product.stock,
        price: cart?.order_detail[i].product.price,
        img: cart?.order_detail[i].product.img,
        state: cart?.order_detail[i].product.state,
        categoryId: cart?.order_detail[i].product.categoryId,
        category: cart?.order_detail[i].product.brand, // esto esta mal
        totalCount: cart?.order_detail[i].quantity,
        precioTotal:
          cart?.order_detail[i].quantity * cart?.order_detail[i].product.price,
      });
    }
    productosCarrito = productosFormatLS;
  }

  //suma el precio total de los productos en carrito
  preciofinal = productosCarrito?.reduce(
    (sum, b) => sum + Number(b.precioTotal),
    0
  );

  //modifica la cantidad de items
  async function handlerCantidadItem(e, detalle, signo: string) {
    e.preventDefault();
    setArticulo(detalle);
    if (user) {
      //SI HAY USUARIO
      const cartOrderDetailDB = carritoDB?.order_detail?.find(
        (orderDetail) => orderDetail.productId === detalle.id
      );
      signo === "+"
        ? await setProductQuantityfromCartInAPI({
            token,
            productId: detalle.id,
            quantity: cartOrderDetailDB?.quantity + 1,
            orderId: cartOrderDetailDB?.orderId,
          })
        : await setProductQuantityfromCartInAPI({
            token,
            productId: detalle.id,
            quantity: cartOrderDetailDB?.quantity - 1,
            orderId: cartOrderDetailDB?.orderId,
          });
    }
    // NO HAY USUARIO USO EL LS
    let index = cart?.order_detail?.findIndex(
      // busco el indice del producto
      (art) => art.productId === detalle.id
    );
    signo === "+"
      ? dispach(
          setProductQuantityfromCart(
            detalle,
            cart?.order_detail[index]?.quantity + 1
          )
        )
      : dispach(
          setProductQuantityfromCart(
            detalle,
            cart?.order_detail[index]?.quantity - 1
          )
        );
  }

  //elimina items del carrito LS.
  async function handlerDelete(e, orderId, productId) {
    e.preventDefault();
    setArticulo(productId);
    if (user) {
      await removeProductfromCartInAPI({
        token,
        orderId,
        productId: productId?.id,
        quantity: productId.totalCount,
      } as removeProductfromCartOptions);
    }
    // si no hay usuario borra el local storage
    dispach(removeProductfromCart(productId));

    // window.location.reload()
    Swal.fire({
      icon: "success",
      title: "Se eliminó producto del carrito",
    });
  }

  //deshabilita el boton de disminuir cantidad si es <= 1
  function habilitarBoton(i) {
    return productosCarrito[i]?.totalCount <= 1 ? true : false;
  }

  //al modificar la cantidad en carrito, al finalizar compra....

  //BOTON FINALIZA COMPRA
  async function sendOrderToDB(e) {
    e.preventDefault();
    if (user?.id) {
      // si hay usuario logueado.

      const checkOrderUser = await getUserOrderId(user.id); // verifica si hay orden abiert

      modificarAmount(checkOrderUser, preciofinal, token);

      //CHequear  que hay o no stock

      history("/pagar?order=" + checkOrderUser);
    } else {
      // si no hay usuario logueado, voy a login.
      history("/login");
    }
  }

  async function handlerVaciarCarrito(e, orderId) {
    e.preventDefault();
    setArticulo([]);

    if (user) {
      await eliminarProductos(orderId?.id);
      // window.location.assign("/ShoppingCart")
      Swal.fire({
        icon: "success",
        title: "Se vació el carrito",
      });
    } 
    dispach(clearStateCart());
      // window.location.assign("/ShoppingCart")
      Swal.fire({
        icon: "success",
        title: "Se vació el carrito",
      });
    
  }

  return (
    <>
      <NavBar />
      <Container>
        {!productosCarrito.length ? (
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
                <h5 onClick={(e) => handlerVaciarCarrito(e, carritoDB)}>
                  VaciarCarrito
                </h5>
              </DivNombreColumnas>
            </DivTitulo>

            {productosCarrito?.map((p, i) => (
              <DivProduct key={i}>
                <DivUnidad>
                  <img src={p.img} alt="img" width="80px" />
                  <h3>{p.name}</h3>
                  <ContainerCantidad>
                    <ButtonCantidad
                      value={i}
                      disabled={habilitarBoton(i)}
                      onClick={(e) => handlerCantidadItem(e, p, "-")}
                    >
                      -
                    </ButtonCantidad>
                    <h4>{p.totalCount}</h4>
                    <ButtonCantidad
                      onClick={(e) => handlerCantidadItem(e, p, "+")}
                    >
                      +
                    </ButtonCantidad>
                  </ContainerCantidad>
                  <Unidad>${p.price?.toFixed(2)}</Unidad>
                  <Unidad>${p.precioTotal?.toFixed(2)}</Unidad>{" "}
                  {/*verificar esta liunea y colocar el importe total por la cantidad de articulos*/}
                  <ButtonDelete
                    onClick={(e) => handlerDelete(e, carritoDB?.id, p)}
                  >
                    <AiOutlineDelete />
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
                <Link to="/home">
                  <Button>Seguir comprando</Button>
                </Link>
              </ButtonCompra>
              <ButtonCompra>
                <Button
                  onClick={(e) => {
                    sendOrderToDB(e);
                  }}
                >
                  Finalizar compra
                </Button>
              </ButtonCompra>
            </DivResumen>
          </Column>
        )}
      </Container>
    </>
  );
}
