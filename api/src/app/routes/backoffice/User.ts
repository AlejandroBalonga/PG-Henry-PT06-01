import { Prisma, UserState } from "@prisma/client";
import { Router } from "express";
import prisma from "../../../db";

const userRoutes = Router();
const bcrypt = require("bcrypt");

/* This is a route handler. It is a function that is called when a request is made to the specified
route. */

export interface user {
  name: string;
  surname: string;
  email: string;
  username: String;
  password: String;
  state: Boolean;
}

userRoutes.post("/", async (req, res, next) => {
  const { id, name, surname, email, password, state, role } = req.body;
  //hasheamos el password
  /* let passwordHash = await bcryptjs.hash(password, 10); // hasheo pasword */
  let passUpdate;
  let passwordHash = null;
  let existsEmail;

  if (password) {
    let salt = await bcrypt.genSalt(10);
    passwordHash = await bcrypt.hash(password, salt);
    passUpdate = passwordHash;
  } else {
    existsEmail = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!existsEmail) {
      return res
        .status(400)
        .send("There is already a registered user with the email");
    }
    passUpdate = existsEmail?.password;
  }

  try {
    const newUser = await prisma.user.upsert({
      where: { id: id },
      update: {
        name: name,
        surname: surname,
        email: email,
        state: state,
        password: passUpdate,
        role: role,
      },
      create: {
        name: name,
        surname: surname,
        email: email,
        state: state,
        password: passUpdate,
        role: role,
      },
    });
    res.status(200).send(newUser);
  } catch (error) {
    return next(error);
  }
  /* existsEmail = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (existsEmail) {
    return res
      .status(400)
      .send("There is already a registered user with the email");
  } else {
    try {
      const newUser = await prisma.user.create({
        data: {
          name: name,
          surname: surname,
          email: email,
          password: passwordHash,
        },
      });
      res.status(200).send(newUser);
    } catch (error) {
      return next(error);
    }
  } */
});

userRoutes.delete("/:id", async (req, res) => {
  try {
    const userId = Number(req.params.id);
    //const { name } = req.body;

    let userToDelete = await prisma.user.delete({
      where: { id: userId },
    });
    res.json(userToDelete);
  } catch (error) {
    res.send(`No se pudo eliminar el producto, ${error}`);
  }
});

userRoutes.get("/", async (req, res) => {
  let {
    page = 1,
    pageSize = 12,
    name,
    order = "id",
    direction = "desc",
    filter,
    id
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
    order !== "email" &&
    order !== "surname"
  ) {
    res.status(400).json({
      message: `the 'order' must be 'id', 'name', 'email', 'surname'`,
    });
    return;
  }
  if (direction !== "asc" && direction !== "desc") {
    res
      .status(400)
      .json({ message: `the 'direction' must be 'asc' or 'desc'` });
    return;
  }

  const where: Prisma.UserWhereInput = {};
  if (filter) {
    const filter_field = String(filter).split("-")[0];
    const filter_val = String(filter).split("-")[1];
    if (
      filter_field === "state" &&
      (filter_val === UserState.ACTIVE ||
        filter_val === UserState.BLOCKED ||
        filter_val === UserState.NOTCONFIRMED)
    ) {
      where.state = filter_val;
    }
  }
  if (name) {
    if (name !== "") {
      where.name = {
        contains: String(name),
        mode: "insensitive",
      };
    }
  }

  if (id) { where.id = Number(id); }

  const searchuser = await prisma.user.findMany({
    skip: (pageNumber - 1) * pageSizeNumber,
    take: pageSizeNumber,
    where: where,
    orderBy: { [order]: direction },
    include: { orderU: true },
  });

  const totalCuantity = await prisma.user.count({
    where: where,
  });
  console.log(searchuser);

  res.status(200).json([totalCuantity, searchuser]);
});

userRoutes.put("/", async (req, res) => {
  const { email, role } = req.body;

  try {
    let actualizeUser = await prisma.user.update({
      where: { email: email },
      data: {
        role: role,
      },
    });

    res.status(200).send(actualizeUser);
  } catch (error) {
    res.send(400).send(error);
  }
});
export default userRoutes;
