import axios from "axios";

const { REACT_APP_API_URL = "http://localhost:3001" } = process.env;



//ELIMINA PRODUCTO SEGUN ORDEN PASADA
export async function eliminarProductos(numeroOder) {
    const eliminado = await axios.delete(
        REACT_APP_API_URL + "/backoffice/order/orderProduct/" + numeroOder
    );
}

//ACTUACLIZA ORDEN SE LE PASA LA ORDEN Y LOS PRODUCTOS .
export async function actualizarOrder(checkOrderUser, ordenPorEnviar) {

    const actualizado = await axios.put(
        REACT_APP_API_URL + "/backoffice/order/" + checkOrderUser,
        {
            amount: ordenPorEnviar.amount,
            status: ordenPorEnviar.status,
            carritoOrden: ordenPorEnviar.carritoOrden,
        }
    );
    localStorage.removeItem('carrito')
    return actualizado;
}

//CREA UNA ORDEN
export async function crearOrder(ordenPorEnviar, token1) {
    return await axios.post(
        REACT_APP_API_URL + "/backoffice/order",
        ordenPorEnviar,
        {
            headers: { authorization: `Bearer ${token1}` },
        }
    )
}
//verifica si hay orden abierta en BD
export async function verificarSiHayOrderAbierta(userid) {
    const orderCheck = await axios.get(
        REACT_APP_API_URL + "/backoffice/order/checkorder/" + userid
    );

    if (orderCheck.data === "") {
        return "sin ordenes abiertas";
    } else {
        return orderCheck.data.id;
    }
}



