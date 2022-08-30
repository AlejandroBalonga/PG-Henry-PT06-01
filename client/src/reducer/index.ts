import { SET_ERROR, GET_ARTICULOS, GET_CATEGORIES, GET_TOTALARTICULOS, GET_DETAIL_PRODUCT, ADD_CART } from '../actions/actiontype';
import {  Articulo, Category}from '../actions';

export interface ReduxState {
  cartItems: Articulo[];
  articulos: Articulo[];
  categorias: Category[];
  detailsProduct: Articulo;
  page: number;
  pageSize: number;
  totalCount: number;
}

interface actionI {
    type: string;
    payload: []
}

const initialState: ReduxState = {
  cartItems: [],
  articulos: [],
  categorias: [],
  detailsProduct: undefined,
  page: 1,
  pageSize: 12,
  totalCount: 0,
};

function rootReducer(state = initialState, action: actionI) {
    switch (action.type) {

        case GET_ARTICULOS:
            return {
                ...state,
                articulos: action.payload,
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categorias: action.payload,
            }
        case GET_TOTALARTICULOS:
            return {
                ...state,
                totalCount: action.payload,
            }
        case ADD_CART:
            return {
              ...state,
              cartItems: [...state.cartItems, action.payload],
            };
        case GET_DETAIL_PRODUCT:
            //console.log("reducer action33",state.detailsProduct);
            return{
                ...state,
                detailsProduct: action.payload                
            }
            
        default:
            return state;
    }
}

export default rootReducer;