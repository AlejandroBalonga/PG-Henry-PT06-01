import { Router } from 'express';
import prisma from '../../../db';

const userRoutes = Router();

/* This is a route handler. It is a function that is called when a request is made to the specified
route. */
userRoutes.get('/', async (req, res) => {
  try {
    const allUser = await prisma.user.findMany({
      // include: { role: true },
    });
    res.status(200).send(allUser);
  } catch (error) {
    res.send(400).send(error);
  }
});

export default userRoutes;


