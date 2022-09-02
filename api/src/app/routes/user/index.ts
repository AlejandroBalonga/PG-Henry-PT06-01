import { Router } from 'express';
import prisma from '../../../db';

const userRoutes = Router();

userRoutes.get('/', async (req, res) => {
  try {
    /* const allUser = await prisma.user.findMany({
      include: { role: true },
    });
    res.status(200).send(allUser); */
  } catch (error) {
    res.send(400).send(error);
  }
});

export default userRoutes;
