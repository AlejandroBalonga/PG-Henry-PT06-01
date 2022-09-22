import axios from "axios"

const { REACT_APP_API_URL = "http://localhost:3001" } = process.env

export interface addProductToCartOptions {
    token: string;    
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
}

export default function addProductToCartInAPI({ token, orderId, productId, quantity, price }: addProductToCartOptions) {
    return axios.post(
        REACT_APP_API_URL + "/backoffice/order/addProductCart/",
        {  orderId, productId, quantity, price },
        { headers: { authorization: `Bearer ${token}` } }
    ).then((response) => response.data)
}