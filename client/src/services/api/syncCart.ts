import axios from "axios"
import { Cart } from "../../actions"

const { REACT_APP_API_URL = "http://localhost:3001" } = process.env

export interface syncCartOptions {
    token: string;
    cart: Cart
    orderId: number
}
let res: Promise<any>

export default function syncCart({ token, cart, orderId }: syncCartOptions) {
    if (res) return res
    res = axios.post(
        REACT_APP_API_URL + "/backoffice/order/orderProductSync/" + orderId,
       {cart},
        { headers: { authorization: `Bearer ${token}` } }
    ).then((response) => response.data)
    return res
}
