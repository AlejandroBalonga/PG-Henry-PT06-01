import { Router } from 'express';
import prisma from '../../../db';
import jwt, { JwtPayload } from 'jsonwebtoken';
import auth from '../../middlewares/passport';
import validateuser from '../../services/validateuser';
import { UserState } from '@prisma/client'
import resetpassword from '../../services/resetpassword';
import { TokenUser } from '../mails/confirmaccount';
import jwtDecode from 'jwt-decode';

const bcrypt = require('bcrypt');

const authRouter = Router();

export interface TokenPayload {
  id: number;
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
  console.log(email, password);
  
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

authRouter.get('/resetpassword', async (req,res)=>{
  const { email } = req.query
  const useremail = String(email)
  const user = await prisma.user.findUnique({
    where : {email: useremail}
  })
  if(!user){
    res.status(400).send('el correo no esta registrado como usuario')
    return
  }else{
    const token = createToken({id: user.id, email: user.email, role: user.role})
    resetpassword({name: user.name, surname: user.surname, email: user.email, token: token})
  }
})

authRouter.post('/confirmnewpassword',async (req,res) => {
  const { password, passwordconfirm } = req.body
  console.log('password',password);
  console.log('confirmpassword',passwordconfirm);
  const { token } = req.query
  const tokenid = String(token)
  const usertoken: TokenUser = jwtDecode(tokenid)
  if(password === passwordconfirm){
    let salt = await bcrypt.genSalt(10);
    let passwordHash = await bcrypt.hash(password, salt);
    const user = await prisma.user.findUnique({
      where: {
        email: usertoken.email,
      },
    });
    if(!user){
      res.status(400).send('usuario no verificado')
    }else if(user.id === usertoken.id){
      console.log('llego aca'); 
      await prisma.user.update({
        where: { email: user.email },
        data: {
          password: passwordHash
        },
      });
     }
      res.status(200).send('su contraseña se cambio con exito')
      return
  }
  res.status(400).send('las passwords no coindicen')
})

authRouter.get(
  '/google',
  auth.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get('/google/success', auth.authenticate('google',{session :false}), (req,res)=>{
  // res.status(200).json({token: createToken(req.user as TokenPayload)})
  const token = createToken(req.user as TokenPayload)
  return res.redirect(`http://localhost:3000/checkgoogle/${token}`)
})


export default authRouter;
