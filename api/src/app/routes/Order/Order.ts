import { Router } from 'express';
import prisma from '../../../db';
import nodemailer from 'nodemailer';
import ejs  from "ejs";




const backofficeRoutesOrder = Router();

backofficeRoutesOrder.post('/', async (req, res) => {
  try {
    const { amount, status, userId } = req.body;

    const newOrder = await prisma.order.create({
      data: {
        amount: amount,
        status: status,
        userId: userId,
      },
    });

    res.status(200).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: `post Order fail ${error}` });
    return;
  }
});

backofficeRoutesOrder.get('/', async (req, res) => {
  //  const id = req.query.name;

  let allOrders = await prisma.order.findMany();
  if (allOrders) {
    res.status(200).send(allOrders);
  } else {
    res.status(404).send('error');
  }
});

backofficeRoutesOrder.get('/:id', async (req, res) => {
  const orderId = Number(req.params.id);

  const orderUnique = await prisma.order.findUnique({
    where: { id: orderId },
    include: { user: true },
  });
  if (orderUnique) {
    res.status(200).send(orderUnique);
  } else {
    res.status(404).send('error');
  }
});

backofficeRoutesOrder.put('/:id', async (req, res) => {
  const orderlId = Number(req.params.id);
  const { amount, status } = req.body;

  let orderToChange = await prisma.order.update({
    where: { id: orderlId },
    data: {
      amount: amount,
      status: status,
    },
  });

  res.status(200).json(orderToChange);
});

backofficeRoutesOrder.delete('/:id', async (req, res) => {
  //PROBAR CUANDO ESTE LISTA LA RUTA DE USER

  try {
    const orderId = Number(req.params.id);
    //const { name } = req.body;

    let orderToDelete = await prisma.order.delete({
      where: { id: orderId },
    });
    res.json(orderToDelete);
  } catch (error) {
    res.send(`No se pudo eliminar la orden, ${error}`);
  }
});


/* Creating a transport object that will be used to send the email. */
var transport = {
  host: 'smtp.gmail.com',
  auth: {
      user: 'compustorehenry@gmail.com',
      pass: "dnybnopwvxliapcc"
  }
}

  //valor predeterminado




backofficeRoutesOrder.post('/checkout', async (req, res, next) => {
  // const [datauser, products] = req.body

  

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
  auth: {
      user: 'compustorehenry@gmail.com',
      pass: "dnybnopwvxliapcc"
    },
  });

  transporter.verify((error:any, success: any) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"CompuStore 👻" <compustorehenry@gmail.com>', // sender address
    to: "caribosio72@gmail.com", // list of receivers
    subject: "Hola!!! Su compra fue realizada con Exito! ✔", // Subject line
    text: "Felicitaciones. Su compra fue realizada con éxito!. Cualquier duda comuníquese por este medio. Muchas gracias.", // plain text body
    // html: , // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


// main().catch(console.error);





  // var name = req.body.nombre
  //var email = req.body.dataUser.email
  // var message = req.body.message

  // const ejs = require("ejs");

  // ejs.renderFile(__dirname + "/Checkout.ejs", function (err:any, data:any) {
  //     if (err) {
  //         console.log(err);
  //     } else {
  //         var mainOptions = {
  //             from: 'compustorehenry@gmail.com',
  //             to: email,
  //             subject: `Hola!!! Su compra fue realizada con Exito!`,
  //             html: data
  //         };
  //         console.log("html data ======================>", mainOptions.html);

  //         await transporter.sendMail(mainOptions, function (err:any, info: any) {
  //             if (err) {
  //                 res.json({
  //                     msg: 'fail'
  //                 })
  //             } else {
  //                 res.json({
  //                     msg: 'success'
  //                 })
  //             }
  //         });
  //     }
  // });

})
export default backofficeRoutesOrder;
