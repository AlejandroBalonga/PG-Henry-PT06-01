import { Router } from "express";
import prisma from "../../../db";
const {CLIENT_URL= "http://localhost:3000", API_URL="http://localhost:3001"}  =process.env
// 

const mercadoPagoRoutes = Router();

// SDK de Mercado Pago
const mercadopago = require("mercadopago");

const { ACCESS_TOKEN } = process.env.ACCESS_TOKEN
  ? process.env
  : {
      ACCESS_TOKEN:
        "APP_USR-3263904536875930-090311-fd28a9b6fbcac8b8bb2d897c1a864c88-1191162786",
    };

//Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

mercadoPagoRoutes.get("/", (req, res) => {
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
  const id_orden = "2";

  const carrito = [
    { title: "Teclado", quantity: 3, price: 150 },
    { title: "Mouse", quantity: 2, price: 200 },
    { title: "Diskette 5 1/4", quantity: 4, price: 200 }
]
  const items_ml = carrito.map((i) => ({
    title: i.title,
    unit_price: i.price,
    quantity: i.quantity,
  }));

  // Crea un objeto de preferencia
  let preference = {
    items: items_ml,
    external_reference: id_orden, //es una referencia que le pasamos. En este caso el N° Orden.
    
    payment_methods: {
      excluded_payment_types: [
        // excluyo el pago por cajero automatico.
        {
          id: "atm",
        },
      ],
      installments: 3, //Cantidad máximo de cuotas
    },
    back_urls: {
      success: API_URL +"/mercadopago/pagos",
      failure: API_URL +"/mercadopago/pagos",
      pending: API_URL +"/mercadopago/pagos",
    },
  };

  mercadopago.preferences
    .create(preference)

    .then(function (response: any) {
      console.info('respondio')
    
      //global.id = response.body.id;
      console.log(response.body);
      console.log('eXtErnAlrEfERENCE: ' + response.body.external_reference);
      
      res.json({ id: response.body.init_point }); 
    })
    .catch(function (error: any) {
      console.log(error);
    });
});

//Ruta que recibe la información del pago
mercadoPagoRoutes.get("/pagos", async (req, res) => {
  console.log("HOLA: " + req.query.payment_id);
  console.log("HOLA: " + req.query.status);
  console.log("HOLA: " + req.query.payment_type);
  console.log(req.query.external_reference);
  console.log("ESTOY EN RUTA/PAGOS ");

  const payment_id: any = req.query.payment_id;
  const payment_status: any = req.query.status;
  const payment_type: any = req.query.payment_type;
  const external_reference: any = Number(req.query.external_reference);

  console.log(req.query.payment_id);
  console.log(payment_id);
  console.log('EXTERNAL REFERENCE: ' + external_reference);
  
  let orderUpdate = await prisma.order.update({
    where: { id: Number(external_reference) },
    data: {
      payment_id: payment_id,
      payment_status: payment_status,
      payment_type: payment_type,
    },
  });
  return res.redirect( CLIENT_URL+"/ResultadoCompra?paystatus=ok");
});

export default mercadoPagoRoutes;