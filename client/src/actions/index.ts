import axios from 'axios';
import { FaJediOrder } from 'react-icons/fa';
import { Dispatch } from 'redux';

import {
    GET_ARTICULOS,
    GET_DETAIL_PRODUCT,
    GET_CATEGORIES,
    GET_TOTALARTICULOS,
    SET_ERROR
} from "./actiontype"

export interface Articulo{
    id:number,    
    name:String,
    brand:String,    
    stock: number,
    price: number,
    img:String,
    state:String,
    categoryId:number,
    totalCount:number
}

export interface Category{
    id:number,    
    name:String
}


export interface params{
    page: number
    pageSize: number
    name: string
    order: string
    direction: string
}


export function getArticulos({page, pageSize, name, order, direction}:params) {
    return async function (dispatch: Dispatch) {
        try {
            var json = await axios.get<Articulo[]>("http://localhost:3001/product",{
                params:{
                    page: page,
                    pageSize: pageSize,
                    name: name,
                    order: order,
                    direction: direction
                }
            });
            
            return [
                dispatch({ type: GET_ARTICULOS, payload: json.data[1] }),
                dispatch({ type: GET_TOTALARTICULOS, payload: json.data[0] })

            ]
            //
        }
        catch (error) {
                       
            return dispatch({ type: SET_ERROR, payload: "error" })

        }
    }
}


export function getCategorias() {
   
    
    return async function (dispatch: Dispatch) {
        try {
            var json = await axios.get<Category[]>("http://localhost:3001/category");
           
           
            return dispatch({ type: GET_CATEGORIES, payload: json.data })
        }
        catch (error) {
            
            return dispatch({ type: SET_ERROR, payload: "error" })

        }
    }
}

export function postProduct(payload){
    return function (dispatch){
        return axios.post('http://localhost:3001/product',payload)
        .then(response =>response)
        .catch(error =>{dispatch({type: SET_ERROR, payload: error})})
    }
}

export function detailsProduct(id: String){
    //console.log("id action", id);
        return async function (dispatch: Dispatch){
        try {
            var json = await axios.get<Articulo[]>(`http://localhost:3001/product/${id}`)
            //console.log("json action", json);
            return dispatch({ type: GET_DETAIL_PRODUCT, payload: json.data })
        } catch (error) {
            return dispatch({ type: SET_ERROR, payload: "error" })
        }
    }
}