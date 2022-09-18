import axios from "axios";

const { REACT_APP_API_URL = "http://localhost:3001" } = process.env;

//export default function Services (numeroOder) {


    export async function eliminarProductos(numeroOder) {
        const eliminado = await axios.delete(
          REACT_APP_API_URL + "/backoffice/order/orderProduct/" + numeroOder
        );
        //console.log("emininado: " + eliminado);
      }

      export async function actualizarOrder(checkOrderUser, ordenPorEnviar) {
        // ACTULIZAR TABLA ORDER
        const actualizado = await axios.put(
          REACT_APP_API_URL + "/backoffice/order/" + checkOrderUser,
          {
            amount: ordenPorEnviar.amount,
            status: ordenPorEnviar.status,
            carritoOrden: ordenPorEnviar.carritoOrden,
          }
        );
        //console.log("actualizado: " + actualizado);
        localStorage.removeItem('carrito')
        return actualizado;
      }
    
    export async  function crearOrder(ordenPorEnviar, token1){

        return await axios.post(
            REACT_APP_API_URL + "/backoffice/order",
            ordenPorEnviar,
            {
              headers: { authorization: `Bearer ${token1}` },
            }
           
          )
        

      }

    //  export async function verificarSiHayOrderAbierta(userid) {
    //     const orderCheck = await axios.get(
    //       REACT_APP_API_URL + "/backoffice/order/checkorder/" + userid
    //     );
    //     //console.log("orderCheck EN SERIVCE:" , orderCheck.data);
        
    //     if (orderCheck.data === "") {
    //       return "sin ordenes abiertas";
    //     } else {
    //       return orderCheck.data
    //     }
    //   }
    

   

//}