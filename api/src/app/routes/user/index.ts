import { Role } from "@prisma/client";
import { Router } from "express";
import prisma from "../../../db";

const userRoutes = Router();
const bcrypt = require("bcrypt");

/* This is a route handler. It is a function that is called when a request is made to the specified
route. */
userRoutes.get("/", async (req, res) => {
  try {
    const allUser = await prisma.user.findMany({
      // include: { role: true },
    });

    res.status(200).send(allUser);
  } catch (error) {
    res.send(400).send(error);
  }
});

userRoutes.get("/:id", async (req, res) => {
  const userId = Number(req.params.id);
  const userUnique = await prisma.user.findUnique({
    where: { id: userId },
  });

  userUnique
    ? res.status(200).send(userUnique)
    : res.send(400).send("no se reconoce el usuario");
});

export interface user {
  name: string;
  surname: string;
  email: string;
  username: String;
  password: String;
  state: Boolean;
}
userRoutes.post("/", async (req, res, next) => {
  const { name, surname, email, username, password } = req.body;
  //hasheamos el password
  let salt = await bcrypt.genSalt(10);
  let passwordHash = await bcrypt.hash(password, salt);
  /* let passwordHash = await bcryptjs.hash(password, 10); // hasheo pasword */
  let existsEmail = await prisma.user.findFirst({
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
  }
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
