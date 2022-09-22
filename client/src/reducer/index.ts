import {
  SET_ERROR,
  GET_ARTICULOS,
  GET_CATEGORIES,
  GET_CATEGORIESBO,
  GET_USERS,
  SET_DASHBOARDMENU,
  GET_TOTALARTICULOS,
  GET_TOTALORDERS,
  GET_TOTALUSERS,
  GET_TOTALCATEGORIAS,
  GET_TOTALCATEGORIASBO,
  DELETE_PRODUCT,
  DELETE_CATEGORY,
  DELETE_USER,
  GET_ORDERS,
  GET_DETAIL_PRODUCT,
  POST_SIGNIN,
  CLEAR_STATE,
  CLEAR_STATE_CART,
  GET_GOOGLE,
  GET_DETAIL_USER,
  REGISTRO_EXITOSO,
  GET_DETAIL_ORDERS,
  SET_CART,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  SET_PRODUCT_QUANTITY_FROM_CART,
  ALTER_NUM_NAV
} from "../actions/actiontype";
import {
  getLocalstorageState,
  setLocalstorageState,
} from "../utils/localstorage";
import { ArticuloBO, Articulo, Category, User, Orders, OrdersBO, getDetailOrder, DetailOrder, Cart } from "../actions";
import jwtdecode from "jwt-decode";
import { string } from "yup";

export interface ReduxState {
  ordersBO: OrdersBO[];
  orders: Orders[];
  users: User[];
  detailsUser: User;
  dashboardmenu: String;
  articulos: Articulo[];
  articulosbo: ArticuloBO[];
  categorias: Category[];
  categoriasbo: Category[];
  detailsProduct: Articulo;
  page: number;
  pageSize: number;
  totalCount: number;
  totalUser: number;
  totalOrders: number;
  totalCategorias: number;
  totalCategoriasbo: number;
  token: string;
  user?: { id: number; email: string; iat: number; role: string };
  error: string;
  mensaje: string;
  useregistrado: boolean;
  detailOrder: DetailOrder;
  cart: Cart | undefined;
  numNavBar: number | undefined
}

interface actionI {
  type: string;
  payload: any;
}

const initialCart: Cart = {amount:0, order_detail:[] }

const initialState: ReduxState = {
  ordersBO: [],
  orders: [],
  users: [],
  detailsUser: undefined,
  dashboardmenu: "products",
  articulos: [],
  articulosbo: [],
  categorias: [],
  categoriasbo: [],
  detailsProduct: undefined,
  page: 1,
  pageSize: 12,
  totalCount: 0,
  totalCategorias: 0,
  totalCategoriasbo: 0,
  totalUser: 0,
  totalOrders: 0,
  token: "",
  user: undefined,
  error: null,
  mensaje: null,
  useregistrado: null,
  detailOrder: undefined,
  cart: initialCart,
  numNavBar: undefined
};



function rootReducer(state: ReduxState, action: actionI) {
   switch (action.type) {
    case REGISTRO_EXITOSO:
      return {
        ...state,
        mensaje: action.payload,
        useregistrado: true,
      };

    case GET_ARTICULOS: 
      return {
        ...state,
        articulos: action.payload,
        articulosbo: action.payload,
      };
    case SET_DASHBOARDMENU:
      return {
        ...state,
        dashboardmenu: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_DETAIL_USER:
      return {
        ...state,
        detailsUser: action.payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categorias: action.payload,
      };
    case GET_CATEGORIESBO:
      return {
        ...state,
        categoriasbo: action.payload,
      };
    case GET_TOTALCATEGORIASBO:
      return {
        ...state,
        totalCategoriasbo: action.payload,
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        ordersBO: action.payload,
      };
    case GET_DETAIL_ORDERS:
      return {
        ...state,
        detailOrder: action.payload,
      }
    case GET_TOTALUSERS:
      return {
        ...state,
        totalUsers: action.payload,
      };
    case GET_TOTALARTICULOS:
      return {
        ...state,
        totalCount: action.payload,
      };
    case GET_TOTALCATEGORIAS:
      return {
        ...state,
        totalCategorias: action.payload,
      };
    case GET_TOTALORDERS:
      return {
        ...state,
        totalOrders: action.payload,
      };
    case GET_DETAIL_PRODUCT:
      return {
        ...state,
        detailsProduct: action.payload,
      };

    case POST_SIGNIN:
      setLocalstorageState({ token: action.payload });
      let user;
      try {
        user = jwtdecode(action.payload);
      } catch (error) {
        console.warn(error);
      }
      return {
        ...state,
        user: user,
        token: action.payload,
      };

    case CLEAR_STATE:
      setLocalstorageState({ token: undefined });
      return {
        ...state,
        user: undefined,
        token: "",
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_GOOGLE:
      setLocalstorageState({ token: action.payload });
      let usergoogle;
      try {
        usergoogle = jwtdecode(action.payload);
      } catch (error) {
        console.warn(error);
      }
      return {
        ...state,
        user: usergoogle,
        token: action.payload,
      };
    case SET_CART: {
      return {
        ...state,
        cart: action.payload
      }
    }
    case ADD_PRODUCT_TO_CART: {
      const newProduct = action.payload as Articulo;
      const newCart = {
        ...state.cart,
        amount: 0,
        order_detail: (state.cart?.order_detail || []).concat(
          {
            productId: newProduct.id,
            price: newProduct.price,
            quantity: 1,
            product: newProduct
          }
        )
      }
      setLocalstorageState({ cart: newCart })
      return {
        ...state,
        cart: newCart
      }
    }
    case REMOVE_PRODUCT_FROM_CART: {
      const productToRemove = action.payload as Articulo;
    
      const newCart = {
        ...state.cart,
        amount: 0,
        order_detail: (state.cart?.order_detail || []).filter(orderDetail =>
          orderDetail.productId !== productToRemove.id
        )
      }
      setLocalstorageState({ cart: newCart })
      return {
        ...state,
        cart: newCart
      }
    }
    case SET_PRODUCT_QUANTITY_FROM_CART: {
      const product = action.payload.product as Articulo;
      const quantity = action.payload.quantity as number;
      if (!state.cart) return state
      const order_detail = [...state.cart.order_detail];
      const index = order_detail.findIndex((orderDetail) =>
        orderDetail.productId === product.id
      )
      if (index === -1) return state
      order_detail[index].quantity = quantity
      const newCart = {
        ...state.cart,
        amount: 0,
        order_detail: order_detail
      }
      setLocalstorageState({ cart: newCart })
      return {
        ...state,
        cart: newCart
      }
    }
    
    case CLEAR_STATE_CART: 
      
      setLocalstorageState({ cart: initialCart })
       return {
        ...state.cart,
        cart: initialCart
      };

    case ALTER_NUM_NAV:{
      console.log("REDUCERRRRRRRRRRRRRRRRRR", action.payload, state.numNavBar);
      
      return {
        ...state,
        numNavBar: action.payload
       }
    }

    default:
      if (!state) {
        const localState = getLocalstorageState();
        let user;
        if (localState?.token) {
          try {
            user = jwtdecode(localState.token);
          } catch (error) {
            console.warn(error);
          }
        }
        return {
          ...initialState,
          user: user,
          token: localState?.token,
          cart: localState?.cart || initialCart
        };
      }

      return state;
  }
}

export default rootReducer;
