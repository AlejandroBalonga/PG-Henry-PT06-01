import axios from "axios";
import { Dispatch } from "redux";

import {
  GET_ARTICULOS,
  GET_DETAIL_PRODUCT,
  GET_CATEGORIES,
  GET_CATEGORIESBO,
  GET_USERS,
  DELETE_CATEGORY,
  DELETE_USER,
  GET_TOTALARTICULOS,
  GET_TOTALCATEGORIASBO,
  GET_TOTALUSERS,
  SET_DASHBOARDMENU,
  DELETE_PRODUCT,
  SET_ERROR,
  POST_SIGNIN,
  CLEAR_STATE,
  GET_GOOGLE,
  GET_ORDERS,
  GET_TOTALORDERS,
  GET_DETAIL_USER,
  REGISTRO_EXITOSO,
  GET_DETAIL_ORDERS,
} from "./actiontype";

const { REACT_APP_API_URL = "http://localhost:3001" } = process.env;

export interface OrdersBO {
  id: number;
  amount: number;
  date: Date;
  status: String;
  userId: number;
  payment_id: number;
  payment_status: String;
  payment_type: String;
  order_detail: OrderDetailsBO[];
  user: User;
}

export interface OrderDetailsBO {
  id: number;
  orderId: number;
  productId: number;
  price: number;
  quantity: number;
  product: ArticuloBO;
}

export interface User {
  id: number;
  name: String;
  surname: String;
  email: String;
  password: String;
  state: String;
  role: String;
}

export interface Orders {
  id: number;
  amount: number;
  date: Date;
  status: String;
  userId: number;
  payment_id: number;
  payment_status: String;
  payment_type: String;
  order_detail: OrderDetails[];
}

export interface OrderDetails {
  id: number;
  orderId: number;
  productId: number;
  price: number;
  quantity: number;
  product: Articulo;
}

export interface ArticuloBO {
  id: number;
  name: String;
  brand: String;
  stock: number;
  price: number;
  priceSpecial: number;
  img: string;
  state: String;
  categoryId: number;
  category: Category;
  totalCount: number;
}

export interface Articulo {
  id: number;
  name: String;
  brand: String;
  stock: number;
  price: number;
  img: string;
  state: String;
  categoryId: number;
  category: Category;
  totalCount: number;
}

export interface ArticuloCarrito {
  id: number;
  name: String;
  brand: String;
  stock: number;
  price: number;
  img: string;
  state: String;
  categoryId: number;
  category: Category;
  totalCount: number;
  precioTotal: number;
}

export interface Category {
  id: number;
  name: String;
}

export interface paramsOrders {
  page: number;
  pageSize: number;
  name: string;
  order: string;
  direction: string;
  userId: number;
  filter: string;
}

export interface paramsUser {
  page: number;
  pageSize: number;
  name: string;
  order: string;
  direction: string;
  filter: string
  userId: number;
}

export interface paramsCatBO {
  page: number;
  pageSize: number;
  name: string;
  order: string;
  direction: string;
  filter: any;
}

export interface paramsArtBO {
  page: number;
  pageSize: number;
  name: string;
  order: string;
  direction: string;
  categoryId: number;
  filter: any;
}

export interface params {
  page: number;
  pageSize: number;
  name: string;
  order: string;
  direction: string;
  categoryId: number;
}

export interface DetailOrder{
  id: number;
  amount: number;
  date: Date;
  status: String;
  userId: number;
  payment_id: number;
  payment_status: String;
  payment_type: String;
  order_detail: OrderDetails[];
  orderId: number;
  productId: number;
  price: number;
  quantity: number;
  name: String;
  brand: String;
  stock: number;
  img: string;
  state: String;
  categoryId: number;
  category: Category;
  totalCount: number;
}

export function getOrders({
  page,
  pageSize,
  name,
  order,
  direction,
}: paramsOrders) {
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.get<Orders[]>(
        REACT_APP_API_URL + "/backoffice/order",
        {
          params: {
            page: page,
            pageSize: pageSize,
            name: name,
            order: order,
            direction: direction,
          },
        }
      );
      // console.log(json.data[1]);

      return [
        dispatch({ type: GET_ORDERS, payload: json.data[1] }),
        dispatch({ type: GET_TOTALORDERS, payload: json.data[0] }),
      ];
      //
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function getDetailOrder(id: Number) {
  console.log("id action--------------", id);
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.get<DetailOrder>(
        REACT_APP_API_URL + `/backoffice/order/checkorder/${id}`
      );
      console.log("json action---------------------", json);
      return dispatch({ type: GET_DETAIL_ORDERS, payload: json.data });
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function getArticulos({
  page,
  pageSize,
  name,
  order,
  direction,
  categoryId,
}: params) {
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.get<Articulo[]>(REACT_APP_API_URL + "/product", {
        params: {
          page: page,
          pageSize: pageSize,
          name: name,
          order: order,
          direction: direction,
          categoryId: categoryId,
        },
      });
      // console.log(json.data[1]);

      return [
        dispatch({ type: GET_ARTICULOS, payload: json.data[1] }),
        dispatch({ type: GET_TOTALARTICULOS, payload: json.data[0] }),
      ];
      //
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function deleteUser(id) {
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.delete<User[]>(REACT_APP_API_URL + `/user/${id}`);

      return dispatch({ type: DELETE_USER, payload: json.data });
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function getUsers({
  page,
  pageSize,
  name,
  order,
  direction,
}: paramsUser) {
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.get<User[]>(REACT_APP_API_URL + "/user", {
        params: {
          page: page,
          pageSize: pageSize,
          name: name,
          order: order,
          direction: direction,
        },
      });
      // console.log(json.data[1]);

      return [
        dispatch({ type: GET_USERS, payload: json.data[1] }),
        dispatch({ type: GET_TOTALUSERS, payload: json.data[0] }),
      ];
      //
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function getUserID(id) {
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.get<User[]>(REACT_APP_API_URL + `/user/${id}`);
      return dispatch({ type: GET_DETAIL_USER, payload: json.data });
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function getCategorias() {
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.get<Category[]>(REACT_APP_API_URL + "/category");

      return dispatch({ type: GET_CATEGORIES, payload: json.data });
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function deleteCategory(id) {
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.delete<Category[]>(
        REACT_APP_API_URL + `/category/${id}`
      );

      return dispatch({ type: DELETE_CATEGORY, payload: json.data });
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function deleteProduct(id) {
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.delete<Category[]>(
        REACT_APP_API_URL + `/product/${id}`
      );

      return dispatch({ type: DELETE_PRODUCT, payload: json.data });
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function setDashboardMenu(payload) {
  return async function (dispatch: Dispatch) {
    try {
      return dispatch({ type: SET_DASHBOARDMENU, payload: payload });
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function postProduct(token, payload) {
  return function (dispatch) {
    return axios
      .post(REACT_APP_API_URL + "/product", payload, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => response)
      .catch((error) => {
        dispatch({ type: SET_ERROR, payload: error });
      });
  };
}

export function postUser(token, payload) {
  return function (dispatch) {
    return axios
      .post(REACT_APP_API_URL + "/user", payload, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => response)
      .catch((error) => {
        dispatch({ type: SET_ERROR, payload: error });
      });
  };
}

export function postCategory(token, payload) {
  return function (dispatch) {
    return axios
      .post(REACT_APP_API_URL + "/category", payload, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => response)
      .catch((error) => {
        dispatch({ type: SET_ERROR, payload: error });
      });
  };
}

export function detailsProduct(id: String) {
  //console.log("id action", id);
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.get<Articulo[]>(
        REACT_APP_API_URL + `/product/${id}`
      );
      //console.log("json action", json);
      return dispatch({ type: GET_DETAIL_PRODUCT, payload: json.data });
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function createUser(payload) {
  return function (dispatch) {
    return axios
      .post(REACT_APP_API_URL + "/auth/signup", payload)
      .then((response) => /* response */
         dispatch({
          type: REGISTRO_EXITOSO,
          payload:response.data.msg
         })
      )
      .catch((error) => {
         /* const alerta ={
          msg:error.response.data.msg
        }   */
        const alerta = error.response.data.msg 
        dispatch({ type: SET_ERROR, payload:  alerta});
        console.log(alerta)
      });
  };
}

export function loginUser(payload) {
  return function (dispatch) {
    return (
      axios
        .post(REACT_APP_API_URL + "/auth/signin", payload)
        .then((res) => {
          dispatch({ type: POST_SIGNIN, payload: res.data.token });
        })
        //.then(res =>{console.log(res.data.token)})
        .catch((error) => {
          dispatch({ type: SET_ERROR, payload: error.response.data });
          //  .catch(res =>{console.log(res.response.data)})
        })
    );
  };
}

export function loginGoogle(token) {
  return function (dispatch) {
    dispatch({ type: GET_GOOGLE, payload: token });
  };
}

export function clearState() {
  return function (dispatch) {
    dispatch({
      type: CLEAR_STATE,
    });
  };
}
////////////back office jvqh//////////////////////////////////////////////////////////////////////
export function postProductBO(token, payload) {
  return function (dispatch) {
    return axios
      .post(REACT_APP_API_URL + "/backoffice/product", payload, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => response)
      .catch((error) => {
        dispatch({ type: SET_ERROR, payload: error });
      });
  };
}

export function deleteProductBO(id) {
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.delete<Category[]>(
        REACT_APP_API_URL + `/backoffice/product/${id}`
      );

      return dispatch({ type: DELETE_PRODUCT, payload: json.data });
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function getUsersBO({
  page,
  pageSize,
  name,
  order,
  direction,
  filter,
  userId
}: paramsUser) {
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.get<User[]>(
        REACT_APP_API_URL + "/backoffice/user",
        {
          params: {
            page: page,
            pageSize: pageSize,
            name: name,
            order: order,
            direction: direction,
            filter: filter,
            id: userId
          },
        }
      );
      // console.log(json.data[1]);

      return [
        dispatch({ type: GET_USERS, payload: json.data[1] }),
        dispatch({ type: GET_TOTALUSERS, payload: json.data[0] }),
      ];
      //
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function postUserBO(token, payload) {
  return function (dispatch) {
    return axios
      .post(REACT_APP_API_URL + "/backoffice/user", payload/* , {
        headers: { authorization: `Bearer ${token}` },
      } */)
      .then((response) => {
        //response
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: SET_ERROR, payload: error });
      });
  };
}

export function deleteUserBO(id) {
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.delete<User[]>(
        REACT_APP_API_URL + `/backoffice/user/${id}`
      );

      return dispatch({ type: DELETE_USER, payload: json.data });
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function postCategoryBO(token, payload) {
  return function (dispatch) {
    return axios
      .post(REACT_APP_API_URL + "/backoffice/category", payload, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => response)
      .catch((error) => {
        dispatch({ type: SET_ERROR, payload: error });
      });
  };
}

export function deleteCategoryBO(id) {
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.delete<Category[]>(
        REACT_APP_API_URL + `/backoffice/category/${id}`
      );

      return dispatch({ type: DELETE_CATEGORY, payload: json.data });
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function getOrdersBO({
  page,
  pageSize,
  name,
  order,
  direction,
  userId,
  filter
}: paramsOrders) {
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.get<OrdersBO[]>(
        REACT_APP_API_URL + "/backoffice/orders",
        {
          params: {
            page: page,
            pageSize: pageSize,
            name: name,
            order: order,
            direction: direction,
            userId: userId,
          },
        }
      );
      return [
        dispatch({ type: GET_ORDERS, payload: json.data[1] }),
        dispatch({ type: GET_TOTALORDERS, payload: json.data[0] }),
      ];
      //
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function getArticulosBO({
  page,
  pageSize,
  name,
  order,
  direction,
  categoryId,
  filter
}: paramsArtBO) {
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.get<Articulo[]>(REACT_APP_API_URL + "/backoffice/product", {
        params: {
          page: page,
          pageSize: pageSize,
          name: name,
          order: order,
          direction: direction,
          categoryId: categoryId,
          filter: filter
        },
      });
      // console.log(json.data[1]);

      return [
        dispatch({ type: GET_ARTICULOS, payload: json.data[1] }),
        dispatch({ type: GET_TOTALARTICULOS, payload: json.data[0] }),
      ];
      //
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function getCategoriasBO({
  page,
  pageSize,
  name,
  order,
  direction,
  filter,
}: paramsCatBO) {
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.get<Category[]>(
        REACT_APP_API_URL + "/backoffice/category",
        {
          params: {
            page: page,
            pageSize: pageSize,
            name: name,
            order: order,
            direction: direction,
            filter: filter,
          },
        }
      );
      // console.log(json.data[1]);

      return [
        dispatch({ type: GET_CATEGORIESBO, payload: json.data[1] }),
        dispatch({ type: GET_TOTALCATEGORIASBO, payload: json.data[0] }),
      ];
      //
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}
//////////////////////back office/////////////////////////////////////////////////////////////////
