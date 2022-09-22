import axios from "axios"

const { REACT_APP_API_URL = "http://localhost:3001" } = process.env

export interface setProductQuantityfromCartOptions {
    token: string;
    orderId: number;
    productId: number;
    quantity: number;
}

export default function setProductQuantityfromCartInAPI({ token, orderId, productId, quantity }: setProductQuantityfromCartOptions) {
    return axios.put(
        REACT_APP_API_URL +  "/backoffice/order/orderProductCartQuantity/",
        { orderId, productId, quantity },
        { headers: { authorization: `Bearer ${token}` } }
    ).then((response) => response.data)
}