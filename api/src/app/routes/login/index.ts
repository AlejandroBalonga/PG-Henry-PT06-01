import { Router, Request } from "express";
import prisma from '../../../db';

type Body = {
  username: string;
  password: string;
};

type ResponseUser = {
  singin: boolean;
}

const login = Router();

login.post('/', async (req: Request, res) => {
    const bcrypt = require("bcrypt");
    const { password, username } = req.body as Body;
    bcrypt.hash(password, 10, function (err:any, hash:any) {
      // Store hash in your password DB.
      console.log(hash)
    });
  
    const userPass = await prisma.user.findUnique({
      where: { username },
      select:{ password:true }
    });
    if (userPass) {
      
      const match = await bcrypt.compare(password, userPass?.password);
      const ResponseUser: ResponseUser = {
        singin: match,
      };
      res.status(200).send(ResponseUser); 
    } else {
      res.status(200).send(false); 
    }
     
});

export default login;