import axios from "axios"
import { Articulo } from "../../actions";

const { REACT_APP_API_URL = "http://localhost:3001" } = process.env
export interface removeProductfromCartOptions {
    token: string;
    orderId: number;
    productId: number;
    quantity: number;
}


export function removeProductfromCartInAPI(  { token, orderId, productId }: removeProductfromCartOptions) {
   // console.log("productId: " ,productId ) 
    return axios.delete<Articulo>(
        REACT_APP_API_URL + "/backoffice/order/orderProductCart/" + orderId,  {data: {productId:productId }, 
            headers: { authorization: `Bearer ${token}` }
          })
          .then((response) => response.data)
}