import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Orders,
  Articulo,
  ArticuloCarrito,
  getDetailOrder,
} from "../../actions";
import NavBar from "../NavBar/NavBar";
import { ReduxState } from "../../reducer";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

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
import { ButtonCantidad, ButtonDelete } from "./stylesCart";

const { REACT_APP_API_URL = "http://localhost:3001" } = process.env;
export default function ShoppingCart() {
  let detail = useSelector((state: ReduxState) => state.detailsProduct);
  const user = useSelector((state: ReduxState) => state.user);
  const token1 = useSelector((state: ReduxState) => state.token);
  const carritoDB = useSelector((state: ReduxState) => state.detailOrder);
  const dispatch = useDispatch<any>();
  const history = useNavigate();

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

  useEffect(() => {
    if (user) {
      dispatch(getDetailOrder(user?.id));
    }
  }, []);

  let preciofinal = 0;
  let productosCarrito = JSON.parse(localStorage.getItem("carrito"));
  //suma el precio total de los productos en carrito
  preciofinal = productosCarrito?.reduce(
    (sum, b) => sum + Number(b.precioTotal),
    0
  );
///------- estamos trabajando aqui------------------------


  // if (carritoDB) {
  //   if (productosCarrito) {
  //     //hacemos lo que esta pensando el mejor jefe de todos los jefes

  //     function juntarProductosBDconLS(productosBd) {
  //       // pasarle los productos de la BD

  //       const productosBdformateados = [];
  //       console.log(
  //         "CANTIDAD DE PRODUCTOS BD: ",
  //         productosBd.order_detail.length
  //       );
  //       for (let i = 0; i < productosBd.order_detail.length; i++) {
  //         productosBdformateados.push({
  //           id: productosBd.order_detail[i].product.id,
  //           name: productosBd.order_detail[i].product.name,
  //           brand: productosBd.order_detail[i].product.brand,
  //           stock: productosBd.order_detail[i].product.stock,
  //           price: productosBd.order_detail[i].product.price,
  //           img: productosBd.order_detail[i].product.img,
  //           state: productosBd.order_detail[i].product.state,
  //           categoryId: productosBd.order_detail[i].product.categoryId,
  //           category: productosBd.order_detail[i].product.brand, // esto esta mal
  //           totalCount: productosBd.quantity,
  //           precioTotal: 0,
  //         });
  //       }
  //       productosBdformateados.map((e) => console.log("eeeeee:", e));
  //       let carritofinal = productosCarrito.concat(productosBdformateados);
  //     }
  //   } else {
  //     productosCarrito = { ...carritoDB };
  //   }
  // } else {
  //   productosCarrito = [];
  // }

  const [articulo, setArticulo] = useState([productosCarrito]);

  //modifica la cantidad de items
  function handlerCantidadItem(detalle, signo: string) {
    setArticulo(detalle);
    const index = productosCarrito.findIndex((art) => art.id === detalle.id);
    let carritoAux = JSON.parse(localStorage.getItem("carrito"));
    signo === "+"
      ? (carritoAux[index].totalCount = carritoAux[index].totalCount + 1)
      : signo === "-"
      ? (carritoAux[index].totalCount = carritoAux[index].totalCount - 1)
      : (carritoAux[index].totalCount = carritoAux[index].totalCount);
    carritoAux[index].precioTotal =
      carritoAux[index].price * carritoAux[index].totalCount;
    localStorage.setItem("carrito", JSON.stringify(carritoAux));
  }

  //elimina items del carrito LS
  function handlerDelete(detalle) {
    setArticulo(detalle);
    let carritoDelete = JSON.parse(localStorage.getItem("carrito"));
    let carritoIndex = carritoDelete.findIndex((el) => el.id === detalle.id);
    carritoDelete.splice(carritoIndex, 1);
    localStorage.setItem("carrito", JSON.stringify(carritoDelete));
  }

  //deshabilita el boton de disminuir cantidad si es <= 1
  function habilitarBoton(i) {
    return productosCarrito[i]?.totalCount <= 1 ? true : false;
  }

  const carritoOrden = productosCarrito?.map((p) => {
    return {
      productId: p.id,
      price: p.price,
      quantity: p.totalCount,
    };
  });

  const ordenPorEnviar = {
    amount: preciofinal,
    userId: user?.id,
    status: "Abierto",
    carritoOrden: carritoOrden,
  };

  //verifica si hay orden abierta en BD
  async function verificarSiHayOrderAbierta() {
    const orderCheck = await axios.get(
      REACT_APP_API_URL + "/backoffice/order/checkorder/" + user.id
    );

    if (orderCheck.data === "") {
      return "sin ordenes abiertas";
    } else {
      return orderCheck.data.id;
    }
  }

  async function actualizarOrder(checkOrderUser, ordenPorEnviar) {
    // ACTULIZAR TABLA ORDER
    const actualizado = await axios.put(
      REACT_APP_API_URL + "/backoffice/order/" + checkOrderUser,
      {
        amount: ordenPorEnviar.amount,
        status: ordenPorEnviar.status,
        carritoOrden: ordenPorEnviar.carritoOrden,
      }
    );
    //console.log("actualizado: " + actualizado);
  }

  async function eliminarProductos(numeroOder) {
    const eliminado = await axios.delete(
      REACT_APP_API_URL + "/backoffice/order/orderProduct/" + numeroOder
    );
    //console.log("emininado: " + eliminado);
  }

  async function sendOrderToDB(e) {
    //BOTON FINALIZA COMPRA
    e.preventDefault();

    if (user?.id) {
      const checkOrderUser = await verificarSiHayOrderAbierta(); // verifica si hay orden abierta
      ////console.log("checkOrderUser: " + checkOrderUser);

      if (checkOrderUser === "sin ordenes abiertas") {
        var order = await axios.post(
          REACT_APP_API_URL + "/backoffice/order",
          ordenPorEnviar,
          {
            headers: { authorization: `Bearer ${token1}` },
          }
        );
        history("/pagar?order=" + order.data.id);
        ////console.log("vamos avanzando", order);
      } else {
        eliminarProductos(checkOrderUser);
        actualizarOrder(checkOrderUser, ordenPorEnviar);
        history("/pagar?order=" + checkOrderUser);
      }
    } else {
      history("/login");
    }
  }

  return (
    <>
      <NavBar />
      <Container>
        {!carritoDB ? (
          <DivTitulo>
            <h3>No hay productos en el carrito</h3>
          </DivTitulo>
        ) : (
          <Column>
            <DivTitulo>
              <h3>Mi CARRITO ({carritoDB?.order_detail.length})</h3>
              <DivNombreColumnas>
                <h5></h5>
                <h5>Producto</h5>
                <h5>Cantidad</h5>
                <h5>Precio Unidad</h5>
                <h5>Precio Cantidad</h5>
                <h5></h5>
              </DivNombreColumnas>
            </DivTitulo>

            {carritoDB?.order_detail?.map((p, i) => (
              <DivProduct key={i}>
                <DivUnidad>
                  <img src={p.product.img} alt="img" width="80px" />
                  <h3>{p.product.name}</h3>
                  <ContainerCantidad>
                    <ButtonCantidad
                      value={i}
                      disabled={habilitarBoton(i)}
                      onClick={() => handlerCantidadItem(p, "-")}
                    >
                      -
                    </ButtonCantidad>
                    <h4>{p.product.totalCount}</h4>
                    <ButtonCantidad onClick={() => handlerCantidadItem(p, "+")}>
                      +
                    </ButtonCantidad>
                  </ContainerCantidad>
                  <Unidad>${p.product.price?.toFixed(2)}</Unidad>
                  <Unidad>${p.product.price?.toFixed(2)}</Unidad>{" "}
                  {/*verificar esta liunea y colocar el importe total por la cantidad de articulos*/}
                  <ButtonDelete onClick={() => handlerDelete(p)}>
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
                <Button>
                  <Link to="/home">Seguir comprando</Link>
                </Button>
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
