import { Handler } from "express";
import { TokenPayload } from "../../routes/auth";
import auth from "../passport";

export const forClient: Handler[] = [
  auth.authenticate("jwt", { session: false }),
  function (req, res, next) {
    const user = req.user as TokenPayload;
    if (user.role !== "CLIENT") {
      return res
        .status(401)
        .send("el usuario debe ser un cliente para usar esta ruta");
    }
    next();
  },
];

export const forAdmin: Handler[] = [
  auth.authenticate("jwt", { session: false }),
  function (req, res, next) {
    const user = req.user as TokenPayload;
    if (user.role !== "ADMIN") {
      return res
        .status(401)
        .send("el usuario debe ser un admin para usar esta ruta");
    }
    next();
  },
];

export const forClientOrAdmin: Handler[] = [
  auth.authenticate("jwt", { session: false }),
  function (req, res, next) {
    const user = req.user as TokenPayload;
    if (user.role !== "ADMIN" && user.role !== "CLIENT") {
      return res
        .status(401)
        .send("el usuario debe ser un cliente o un admin para usar esta ruta");
    }
    next();
  },
];
