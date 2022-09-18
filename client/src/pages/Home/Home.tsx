import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CardProduct from "../../components/CardProduct/CardProduct";
import { useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar/SearchBar";
import TopMenu from "../../components/TopMenu/TopMenu";
import { useDispatch } from "react-redux";
import { getArticulos, getCategorias, getDetailOrder } from "../../actions";
import { ReduxState } from "../../reducer";
import Paginado from "../../components/Paginado/Paginado";
import OrderName from "../../components/SideBar/OrderName";
import OrderPrice from "../../components/SideBar/OrderPrice";
import OrderBrand from "../../components/SideBar/OrderBrand";
import NavBar from "../../components/NavBar/NavBar";
import Carousel from "../../components/Carousel/Carousel";
import SideBar from "../../components/SideBar/SideBar";
import { ArticuloCarrito } from "../../actions";
import { eliminarProductos, actualizarOrder, crearOrder } from "../../components/Carrito/Services";

export default function Home() {
  const [state, setState] = useState({
    page: 1,
    pageSize: 12,
    name: undefined,
    order: "name",
    direction: "asc",
    categoryId: undefined,
  });

  const allProducts = useSelector((state: ReduxState) => state.articulos);

  const totalCount = useSelector((state1: ReduxState) => state1.totalCount);

  const user = useSelector((state: ReduxState) => state.user);

  const carritoDB = useSelector((state: ReduxState) => state.detailOrder);

  const token1 = useSelector((state: ReduxState) => state.token);

  const dispatch = useDispatch<any>();



  const carritoOrden = carritoDB?.order_detail?.map((p) => {
    return {
      productId: p.productId,
      price: p.price,
      quantity: p.quantity,
    };
  });

  const ordenPorEnviar = {
    amount: carritoDB?.amount,
    userId: user?.id,
    status: "Abierto",
    carritoOrden: carritoOrden,
  };

  console.log("OrdenAbierta fuera", carritoDB?.id)
  useEffect(() => {

    if (user) {

      dispatch(getDetailOrder(user?.id)); // devuelve orden abierta de usuario. 
      //si hay orden. 
      if (carritoDB?.id !== undefined) {
        eliminarProductos(carritoDB?.id);
        actualizarOrder(carritoDB?.id, ordenPorEnviar)
      } 


    }
    dispatch(getCategorias());
    dispatch(
      getArticulos({
        page: state.page,
        pageSize: state.pageSize,
        name: state.name,
        order: state.order,
        direction: state.direction,
        categoryId: state.categoryId,
      })
    );
  }, [
    dispatch,
    state.page,
    state.pageSize,
    state.name,
    state.order,
    state.direction,
    state.categoryId,


  ]);

  function redirect() {
    window.location.href =
      "https://api.whatsapp.com/send?phone=5493512322922&&text=%C2%A1Hola%20%F0%9F%91%8B!%20Te%20doy%20la%20bienvenida%20al%20canal%20de%20atenci%C3%B3n%20de%20CompuStore.";
  }

  return (

    <div>
      <head>
        <link rel="stylesheet" href="fontello.css" />
      </head>
      <NavBar />
      <Carousel />
      <HomeContainer>
       <ProductBar>
        <SideBar
          homeState={state}
          filterOreder={(FOState) =>
            setState({ ...state, page: 1, ...FOState })
          }
        />
        {/* <SearchBar onSearch={(search) => setState({ ...state, page: 1, name: search })} />
        <TopMenu onClickOpcion={(categoryid) => setState({ ...state, page: 1, categoryId: categoryid })} />
        <Ordenamientos>
          <OrderName onDirection={(direction) => setState({ ...state, page: 1, order: "name", direction: direction })} />
          <OrderPrice onDirection={(direction) => setState({ ...state, page: 1, order: "price", direction: direction })} />
          <OrderBrand onDirection={(direction) => setState({ ...state, page: 1, order: "brand", direction: direction })} />
        </Ordenamientos> */}
        <CardsProducts>
          {allProducts.map((art) => (
            <CardProduct key={art.id} articulo={art} />
          ))}

          {totalCount > state.pageSize ? (
            <Paginado
              onPageChange={(page) => setState({ ...state, page })}
              totalCount={totalCount}
              pageSize={state.pageSize}
            />
          ) : (
            ""
          )}
        </CardsProducts>
        <BtnWsp onClick={redirect}>
          <IoLogoWhatsapp />
        </BtnWsp>
        <div dangerouslySetInnerHTML={{ __html: `
        <df-messenger
          intent="WELCOME"
          chat-title="CompuBot"
          agent-id="8d3c03bd-3633-48fe-a805-eade4a8af416"
          chat-icon="https://res.cloudinary.com/carina-bosio/image/upload/v1663334659/CompuBot_kepb4d.png"
          language-code="es"
        ></df-messenger>

        `}} />
         </ProductBar>
      {totalCount > state.pageSize ? (
        <Paginado
          onPageChange={(page) => setState({ ...state, page })}
          totalCount={totalCount}
          pageSize={state.pageSize}
        />
      ) : (
        ""
      )}
      </HomeContainer>
    </div>
 
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  /* overflow-x: hidden; */
`;

const CardsProducts = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
  width: 100%;
`;

const ProductBar = styled.div`
  display: flex;
`;

const BtnWsp = styled.div`
  position: fixed;
  width: 55px;
  height: 55px;
  /* line-height: 55px; */
  bottom: 80px;
  right: 23px;
  /* padding: -20px; */
  background: #0df053;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  justify-content: center;
  font-size: 30px;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.3);
  z-index: 100;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    color: #0df053;
    background: #fff;
  }
`;
