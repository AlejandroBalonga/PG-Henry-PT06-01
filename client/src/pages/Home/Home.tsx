import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CardProduct from "../../components/CardProduct/CardProduct";
import { useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar/SearchBar";
import TopMenu from "../../components/TopMenu/TopMenu";
import { useDispatch } from "react-redux";
import {
  clearStateCart,
  getArticulos,
  getCategorias,
  getDetailOrder,
} from "../../actions";
import { ReduxState } from "../../reducer";
import Paginado from "../../components/Paginado/Paginado";
import OrderName from "../../components/SideBar/OrderName";
import OrderPrice from "../../components/SideBar/OrderPrice";
import OrderBrand from "../../components/SideBar/OrderBrand";
import NavBar from "../../components/NavBar/NavBar";
import Carousel from "../../components/Carousel/Carousel";
import SideBar from "../../components/SideBar/SideBar";
import syncCart from "../../services/api/syncCart";
import { syncCartOptions } from "../../services/api/syncCart";
import {
  setLocalstorageState,
  LocalestorageState,
} from "../../utils/localstorage";
import { crearOrder, getUserOrderId } from "../../components/Carrito/Services";
import { setCart } from "../../actions/index";

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

  const token = useSelector((state: ReduxState) => state.token);

  const cart = useSelector((state: ReduxState) => state.cart);

  const dispatch = useDispatch<any>();

  async function inicializarCarrito() {
    if (!user || !cart) return;

    const orderId = await getUserOrderId(user.id);
    const hasTheUserAOpenOrder = !!orderId;
    console.log(hasTheUserAOpenOrder);
    
    if (!hasTheUserAOpenOrder) {
      var cartDB = await crearOrder(
        {
          amount: 0,
          userId: user.id,
          status: "Abierto",
          carritoOrden: cart.order_detail,
        },
        token
      );
      
      dispatch(setCart(cartDB));
    } else {
      const cartDB = await syncCart({
        token,
        cart: cart,
        orderId: orderId,
      });
      dispatch(setCart(cartDB));
    }
  }

  useEffect(() => {
    if (user) {
      inicializarCarrito();
    }
  }, [user]);

  //inicializarCarrito()
  useEffect(() => {
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

  return (
    <HomeContainer>
      <NavBar />
      <Carousel />
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
          {allProducts?.map((art) => (
            <CardProduct key={art.id} articulo={art} />
          ))}
        </CardsProducts>
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
