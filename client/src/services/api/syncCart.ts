import axios from "axios"
import { Cart } from "../../actions"

const { REACT_APP_API_URL = "http://localhost:3001" } = process.env

export interface syncCartOptions {
    token: string;
    cart: Cart
}

export default function syncCart({ token, cart }: syncCartOptions) {
    return axios.post(
        REACT_APP_API_URL + "/???",
        cart,
        { headers: { authorization: `Bearer ${token}` } }
    ).then((response) => response.data)
}
