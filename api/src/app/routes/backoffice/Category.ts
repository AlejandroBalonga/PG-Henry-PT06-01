import { Router } from "express";
import prisma from "../../../db";
import { Prisma } from "@prisma/client";

const categoryRoutes = Router();

categoryRoutes.post("/", async (req, res) => {
  try {
    const { id, name } = req.body;
    if (typeof name !== "string") {
      res.status(400).json({ message: `the 'name' must be a string` });
      return;
    }

    const newCategory = await prisma.category.upsert({
      where: { id },
      update: {
        name: name,
      },
      create: {
        name: name
      },
    });

    res.status(200).json(newCategory);
  } catch (error) {
    console.log("post category fail", error);
    res.status(400).json({ message: `post category fail ${error}` });
    return;
  }
});


categoryRoutes.get("/", async (req, res) => {
  let {
    page = 1,
    pageSize = 12,
    name,
    order = "id",
    direction = "desc",
    filter,
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
    order !== "name" 
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
  if (filter) {
    const filter_field = String(filter).split("-")[0];
    const filter_val = String(filter).split("-")[1];
    if (filter_field === "state" && filter_val !== "null") {
      where.state = String(filter_val);
    }
  }
  
  if (name) {
    where.name = {
      contains: name,
      mode: "insensitive",
    };
  }

  const searchcategories = await prisma.category.findMany({
    skip: (pageNumber - 1) * pageSizeNumber,
    take: pageSizeNumber,
    where: where,
    orderBy: { [order]: direction }
  });
  const totalCuantity = await prisma.category.count({
    where: where,
  });
  console.log(searchcategories);
  res.status(200).json([totalCuantity, searchcategories]);
});

categoryRoutes.put("/:id", async (req, res) => {
  const categoryId = Number(req.params.id);
  const { name } = req.body;

  let categoryToChange = await prisma.category.update({
    where: { id: categoryId },
    data: {
      name: name,
    },
  });

  res.status(200).json(categoryToChange);
});

categoryRoutes.delete("/:id", async (req, res) => {
  try {
    const categoryId = Number(req.params.id);

    let categoryToDelete = await prisma.category.delete({
      where: { id: categoryId },
    });
    res.json(categoryToDelete);
  } catch (error) {
    res.send(`No se pudo eliminar la categoria, ${error}`);
  }
});

export default categoryRoutes;
