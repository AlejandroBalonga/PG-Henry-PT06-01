import { Router } from "express";
import prisma from "../../../db";

const manufacturerRoutes = Router();

manufacturerRoutes.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (typeof name !== "string") {
      res.status(400).json({ message: `the 'name' must be a string` });
      return;
    }

    const newBrand = await prisma.brand.create({
      data: {
        name: name
      },
    });
    res.status(200).json(newBrand);
  } catch (error) {
    console.log("post category fail", error);
    res.status(400).json({ message: `post brand fail ${error}` });
    return;
  }
});

/////obtengo todas las categorias.
manufacturerRoutes.get("/", async (req, res) => {
  const name = req.query.name;

  let allBrand = await prisma.brand.findMany();
  if (allBrand) {
    res.status(200).send(allBrand);
  } else {
    res.status(404).send([]);
  }
});

manufacturerRoutes.put("/:id", async (req, res) => {
  const categoryId = Number(req.params.id);
  const { name } = req.body;

  let categoryToChange = await prisma.category.update({
    where: { id: categoryId },
    data: {
      name: name
    },
  });

  res.status(200).json(categoryToChange);
});

manufacturerRoutes.delete('/:id', async (req, res) => {
  
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

export default manufacturerRoutes;
