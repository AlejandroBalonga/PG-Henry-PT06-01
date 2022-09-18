import { Router } from "express";
import prisma from "../../../db";
import { forClient } from "../../middlewares/forRoles";

import auth from "../../middlewares/passport";
import { TokenPayload } from "../auth";

const reviewsRouter = Router();

//llevar esta logica al finalizar orden
reviewsRouter.post("/create", async (req, res) => {
  const { idproduct, iduser } = req.body;
  const review = await prisma.review.create({
    data: {
      productId: idproduct,
      userId: iduser,
    },
  });
  if (!review) {
    res.status(400).send("error al crear review");
  }
  res.status(200).json(review);
});

reviewsRouter.get("/average", async (req, res) => {
  const { idproduct } = req.query;
  const id = Number(idproduct);
  const aggregations = await prisma.review.aggregate({
    where: {
      productId: id,
    },
    _avg: {
      value: true,
    },
  });
  console.log(aggregations);
  res.status(200).json(aggregations._avg.value);
});

reviewsRouter.get("/userreviews/all", auth.authenticate('jwt',{session :false}),async (req, res) => {
  const user = req.user as TokenPayload;
  const reviewsuser = await prisma.review.findMany({
    where: {
      userId: user.id,
    },
  });
  if (!reviewsuser) {
    res.status(400).send("no efectuo reviews");
  }
  res.status(200).json(reviewsuser);
});

reviewsRouter.get("/userreviews",  auth.authenticate('jwt',{session :false}),async (req, res) => {
  const user = req.user as TokenPayload;
  const reviewsuser = await prisma.review.findMany({
    where: {
      userId: user.id,
      state:{
        not: 'COMPLETED'
      }
    },
  });
  if (!reviewsuser) {
    res.status(400).send("no existen reviews pendientes");
  }
  res.status(200).json(reviewsuser);
});

//borrar
// reviewsRouter.put(
//   "/viewed",
//   auth.authenticate('jwt',{session :false}),
//   async (req, res) => {
//     const { idproduct } = req.body;
//     const id = Number(idproduct);
//     const user = req.user as TokenPayload;
//     console.log(id, user);
    
//     const review = await prisma.review.update({
//       data: {
//         state: "COMPLETED",
//       },
//       where: {
//         userId_productId: { userId: user.id, productId: id },
//       },
//     });
//     res.status(200).json(review);
//   }
// );

reviewsRouter.put(
  "/viewed",
  auth.authenticate('jwt',{session :false}),
  async (req, res) => {
    const { idproduct } = req.body;
    const id = Number(idproduct);
    const user = req.user as TokenPayload;
    const review = await prisma.review.update({
      data: {
        state: "VIEWED",
      },
      where: {
        userId_productId: { userId: user.id, productId: id },
      },
    });
    res.status(200).json(review);
  }
);

reviewsRouter.delete('/', auth.authenticate('jwt',{session :false}), async (req,res) => {
  const { idproduct } = req.body;
  const id = Number(idproduct);
  const user = req.user as TokenPayload;
  const reviewdelete = await prisma.review.delete({
    where:{
      userId_productId: { userId: user.id, productId: id },
    }
  })
  if(!reviewdelete){
    res.status(400).send('review inexistente no se eliminara')
  }
  res.status(200).send('se borro correctamente')
})

reviewsRouter.put('/completed', ...forClient, async ( req ,res ) =>{
  const { idproduct, value } = req.body;
  const id = Number(idproduct);
  const num = Number(value)
  console.log(id, num);
  
  const user = req.user as TokenPayload;
  const reviewcompleted = await prisma.review.update({
    data: {
      state: 'COMPLETED',
      value: num
    },
    where:{
      userId_productId: { userId: user.id, productId: id }
    }
  })
  if(!reviewcompleted){
    res.status(400).send('este producto no esta disponible')
  }
  res.status(200).json(reviewcompleted)
})

export default reviewsRouter;
