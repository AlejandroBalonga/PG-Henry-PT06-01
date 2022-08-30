import { Prisma } from '@prisma/client';
import { Router } from "express";
import prisma from "../../../db";

const productRoutes = Router();

productRoutes.post("/", async (req, res) => {
  const { name, brand, categoryId, stock, price, img, state } = req.body;

  if (typeof name !== "string") {
    res.status(400).json({ message: `the 'name' must be a string` });
    return;
  }
  if (typeof brand !== "string") {
    res.status(400).json({ message: `the 'brand' must be a string` });
    return;
  }
  if (typeof categoryId !== "number" || categoryId < 1) {
    res.status(400).json({ message: `the 'categoryId' must be a number > 0` });
    return;
  }
  if (typeof stock !== "number" || categoryId < 1) {
    res.status(400).json({ message: `the 'stock' must be a number > 0` });
    return;
  }
  if (typeof price !== "number" || categoryId < 1) {
    res.status(400).json({ message: `the 'price' must be a number > 0` });
    return;
  }
  if (typeof img !== "string") {
    res.status(400).json({ message: `the 'img' must be a string` });
    return;
  }
  if (typeof state !== "string") {
    res.status(400).json({ message: `the 'state' must be a string` });
    return;
  }
  const newProduct = await prisma.product.create({

    data: {
      name: name,
      brand: brand,
      categoryId: categoryId,
      stock: stock,
      price: price,
      img: img,
      state: state,
    },
  });
  res.status(200).send(newProduct);
});

productRoutes.get("/", async (req, res) => {
  let {
    page = 1,
    pageSize = 12,
    name,
    order = "name",
    direction = "asc",
  } = req.query;
  const pageNumber = Number(page);
  const pageSizeNumber = Number(pageSize);
  if (!Number.isFinite(pageNumber) || page < 1) {
    res.status(400).json({ message: `the 'page' must be a number > 0` });
    return;
  }
  if (!Number.isFinite(pageSizeNumber) || pageSize < 1) {
    res.status(400).json({ message: `the 'pageSize' must be a number > 0` });
    return;
  }
  if (name && typeof name !== "string") {
    res.status(400).json({ message: `the 'name' must be a string` });
    return;
  }
  if (
    order !== "id" &&
    order !== "name" &&
    order !== "brand" &&
    order !== "stock" &&
    order !== "price" &&
    order !== "state"
  ) {
    res.status(400).json({
      message: `the 'order' must be 'id', 'name', 'brand', 'stock', 'price' or 'state'`,
    });
    return;
  }
  if (direction !== "asc" && direction !== "desc") {
    res
      .status(400)
      .json({ message: `the 'direction' must be 'asc' or 'desc'` });
    return;
  }

  const where: Prisma.ProductWhereInput = {};
  if (name) {
    where.name = {
      contains: name,
      mode: "insensitive",
    };
  }

  const searchproducts = await prisma.product.findMany({
    skip: (pageNumber - 1) * pageSizeNumber,
    take: pageSizeNumber,
    where: where,
    orderBy: { [order]: direction },
    include: { category: true },
  });
  const totalCuantity = await prisma.product.count();
  res.status(200).json([totalCuantity, searchproducts]);
});

productRoutes.get("/:id", async (req, res) => {
  //console.log("estoy aqui", req.params.id)
  const productId = Number(req.params.id);
  //console.log("2estoy", productId)
  const productUnique = await prisma.product.findUnique({
    where: { id: productId },
    include: { category: true },
  });

  productUnique
    ? res.status(200).send(productUnique)
    : res.status(404).send("no existe id buscado");
});

export default productRoutes;
