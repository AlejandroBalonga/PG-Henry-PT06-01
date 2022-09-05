import axios from "axios";
import { Dispatch } from "redux";

import {
  GET_ARTICULOS,
  GET_DETAIL_PRODUCT,
  GET_CATEGORIES,
  GET_MANUFACTURER,
  GET_TOTALARTICULOS,
  SET_ERROR,
} from "./actiontype";


export interface Articulo{
    id:number,    
    name:String,
    brand:String,    
    stock: number,
    price: number,
    img:string,
    state:String,
    categoryId:number,
    category:Category,
    totalCount:number

}

export interface Category {
  id: number;
  name: String;
}
export interface Manufacturer {
  id: number;
  name: String;
}

export interface params {
  page: number;
  pageSize: number;
  name: string;
  order: string;
  direction: string;
  categoryId: number;
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
      var json = await axios.get<Articulo[]>("http://localhost:3001/product", {
        params: {
          page: page,
          pageSize: pageSize,
          name: name,
          order: order,
          direction: direction,
          categoryId: categoryId,
        },
      });
      console.log(json.data[1]);

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

export function getCategorias() {
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.get<Category[]>("http://localhost:3001/category");

      return dispatch({ type: GET_CATEGORIES, payload: json.data });
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function getManufacturer() {
  return async function (dispatch: Dispatch) {
    try {
      var json = await axios.get<Manufacturer[]>("http://localhost:3001/manufacturer");

      return dispatch({ type: GET_MANUFACTURER, payload: json.data });
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}

export function postProduct(payload) {
  return function (dispatch) {
    return axios
      .post("http://localhost:3001/product", payload)
      .then((response) => response)
      .catch((error) => {
        dispatch({ type: SET_ERROR, payload: error });
      });
  };
}

export function postCategory(payload) {
  return function (dispatch) {
    return axios
      .post("http://localhost:3001/category", payload )
      .then((response) => response)
      .catch((error) => {
        dispatch({ type: SET_ERROR, payload: error });
      });
  };
}

export function postManufacturer(payload) {
  return function (dispatch) {
    return axios
      .post("http://localhost:3001/manufacturer", payload)
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
        `http://localhost:3001/product/${id}`
      );
      //console.log("json action", json);
      return dispatch({ type: GET_DETAIL_PRODUCT, payload: json.data });
    } catch (error) {
      return dispatch({ type: SET_ERROR, payload: "error" });
    }
  };
}
