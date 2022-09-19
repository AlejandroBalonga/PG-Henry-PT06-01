import axios from "axios"

const { REACT_APP_API_URL = "http://localhost:3001" } = process.env

export interface removeProductfromCartOptions {
    token: string;
    orderId: number;
    productId: number;
    quantity: number;
}

export default function removeProductfromCartInAPI({ token, orderId, productId, quantity }: removeProductfromCartOptions) {
    return axios.post(
        REACT_APP_API_URL + "/???",
        { orderId, productId, quantity },
        { headers: { authorization: `Bearer ${token}` } }
    ).then((response) => response.data)
}