import { Router } from "express";
import prisma from "../../../db";


const mercadoPagoRoutes = Router();

// SDK de Mercado Pago
const mercadopago = require('mercadopago');

const { ACCESS_TOKEN } = process.env;

//Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN
});

mercadoPagoRoutes.get('/', (req, res) => {
// TENGO QUE RECIBIR POR BODY
// ARRAY DE OBJETOS DE PRODUCTOS -> carrito
//  {
//   NOMBRE DEL PRODUCTO ->title
//   PRECIO  -> price
//   CANTIDAD -->quantity
// }

// ID DE ORDEN (PARA LO CUAL HAY QUE GUARDARLA CUANDO SE CREA EL CARRITO)

  //DESCOMENTAR CUANDO SE HAGA EL FRONT

  // let carrito = req.body.carrito
  // let id_orden = req.body.id_orden

  //DE 36 A 43 COMENTAR CUANDO ESTE EL FRONT
  const id_orden = 2
  
  const carrito = [
    { title: "Chorizo", quantity: 3, price: 150 },
    { title: "Morcilla", quantity: 2, price: 200 },
    { title: "Pan", quantity: 4, price: 200 }
  ]

  const items_ml = carrito.map(i => ({
    title: i.title,
    unit_price: i.price,
    quantity: i.quantity,
  }))

  // Crea un objeto de preferencia
  let preference = {
    items: items_ml,
    external_reference: `${id_orden}`,  //es una referencia que le pasamos. En este caso el N° Orden. 
    payment_methods: {
      excluded_payment_types: [ // excluyo el pago por cajero automatico. 
        {
          id: "atm"
        }
      ],
      installments: 3  //Cantidad máximo de cuotas
    },
    back_urls: {
      success: 'http://localhost:3001/mercadopago/pagos',
      failure: 'http://localhost:3001/mercadopago/pagos',
      pending: 'http://localhost:3001/mercadopago/pagos',
    },
  };

  mercadopago.preferences.create(preference)

    .then(function (response: any) {
      console.info('respondio')
      //Este valor reemplazará el string"<%= global.id %>" en tu HTML
      //global.id = response.body.id;
      console.log(response.body)
      // res.json({ id: global.id });
    })
    .catch(function (error: any) {
      console.log(error);
    })


})



//Ruta que recibe la información del pago
mercadoPagoRoutes.get("/pagos", async (req, res) => {
  console.log("HOLA: "+req.query.payment_id)
  console.log("HOLA: "+req.query.status);
  console.log("HOLA: "+req.query.payment_type);
  console.log("HOLA: "+req.query.external_reference);
  console.log("ESTOY EN RUTA/PAGOS ")
  
  
  const payment_id:any = req.query.payment_id
  const payment_status:any = req.query.status
  const payment_type:any = req.query.payment_type
  const external_reference:any = req.query.external_reference

  console.log(req.query.payment_id)
  console.log(payment_id)
  let orderUpdate = await prisma.order.update({
    where: { id: Number(external_reference) },
    data: {
      payment_id : payment_id,
      payment_status : payment_status,
      payment_type : payment_type
    }
  })
    return res.redirect("http://localhost:3000")

})




export default mercadoPagoRoutes;