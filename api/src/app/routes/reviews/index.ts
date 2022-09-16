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

reviewsRouter.get("/userreviews", async (req, res) => {
  const { userId } = req.query;
  const id = Number(userId);
  const reviewsuser = await prisma.review.findMany({
    where: {
      userId: id,
    },
  });
  if (!reviewsuser) {
    res.status(400).send("no efectuo reviews");
  }
  res.status(200).json(reviewsuser);
});

reviewsRouter.put(
  "/viewed",
  ...forClient,
  async (req, res) => {
    const { idreview } = req.body;
    const id = Number(idreview);
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

export default reviewsRouter;
