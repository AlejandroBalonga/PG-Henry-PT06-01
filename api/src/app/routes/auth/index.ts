import { Router } from 'express';
import prisma from '../../../db';
import jwt, { JwtPayload } from 'jsonwebtoken';
import auth from '../../middlewares/passport';
import validateuser from '../../services/validateuser';
import { UserState } from '@prisma/client'

const bcrypt = require('bcrypt');

const authRouter = Router();

export interface TokenPayload {
  id: Number;
  email: string;
  role: string;
}

function createToken({ id, email, role }: TokenPayload) {
  return jwt.sign(
    { id: id, email: email, role: role },
    process.env.JWT_SECRETE || 'Abacabb22'
  );
}

authRouter.post('/signup', async (req, res) => {
  const { email, password, name, surname } = req.body;
  //hasheamos el password
  let salt = await bcrypt.genSalt(10);
  let passwordHash = await bcrypt.hash(password, salt);
  if (!name) {
    return res.status(400).json({ msg: 'el nombre es requerido' });
  } else if (!surname) {
    return res.status(400).json({ msg: 'el Surname es requerido' });
  } else if (!/^.{6,30}$/.test(password)) {
    return res.status(400).json({ msg: 'debe contener de 6 a 12 digitos' });
  } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
    return res.status(400).json({ msg: 'el email es incorrectos' });
  }
  const trueUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!trueUser) {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        surname: surname,
        email: email,
        password: passwordHash,
        state: UserState.NOTCONFIRMED
      },
      
    }
    );
    res.status(200).send({msg:'usuario creado exitoso'})

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if(user){
      const token = createToken({id: user.id, email: user.email, role: user.role})
      validateuser({name: user.name, surname: user.surname, email: user.email, token: token})
    }
    // sendemail({email:newUser.email, name:newUser.name, surname: newUser.surname })

  } else {
    res.status(400).json({msg:'el usuario ya existe'});
  }
});

authRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send('ingrese usuario y contraseña');
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    res.status(400).send('el usuario no existe');
    return;
  }else if(user.state === UserState.NOTCONFIRMED){
    res.status(400).send('usuario no confirmado')
  }else {
    // revisar el pasword------/
    const passworCorrecto = await bcrypt.compare(password, user.password);
    if (!passworCorrecto) {
      res.status(400).send('Password Incorrecto');
      return;
    } else {
      res.status(200).json({ token: createToken(user) });
    }
    /* if(user.password === password){

      res.status(200).json({token: createToken(user)})
    }else{
      res.status(400).send("la contraseña no es valida");
    } */
  }
});

authRouter.get(
  '/google',
  auth.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get('/google/success', auth.authenticate('google',{session :false}), (req,res)=>{
  // res.status(200).json({token: createToken(req.user as TokenPayload)})
  const token = createToken(req.user as TokenPayload)
  return res.redirect(`http://localhost:3000/checkgoogle/${token}`)
})

authRouter.post('/google/logout', (req, res, next) => {
  console.log(req);
});

export default authRouter;
