import { UserState } from '@prisma/client';
import { Router } from 'express';
import jwtdecode from "jwt-decode";
import prisma from '../../../db';
import sendemail from '../../services/enviomail';

const bcrypt = require('bcrypt');

const accountRoutes = Router()

export interface TokenUser {
  id: number,
  email: string,
  role: string,
  iat: number
}

// accountRoutes.post('/confirm', (req, res) => {
//     const {email, name, surname} = req.query
//     const mail = String(email)
//     const namemail = String(name)
//     const surnamemail = String(surname)
//     console.log('estoy llegando al confirm', name, surname);
    
//     let transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//     auth: {
//         user: 'compustorehenry@gmail.com',
//         pass: "dnybnopwvxliapcc"
//       },
//     });

//     let mailOption={
//         from: 'compustorehenry@gmail.com',
//         to: mail,
//         subject: "Hola!!! Su cuenta fue creada con Exito! ✔",
//         html:  // html body
//     `
//     <wrapper class="header">
//     <container>
//       <row class="collapse">
//         <columns small="6">
//           <!-- <img src="https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849825_1280.jpg"> -->
//            <center><img src="https://res.cloudinary.com/carina-bosio/image/upload/v1662390071/Logo-removebg-preview_wjozut.png"
//           style="padding-top:5px" alt="" border="0" ></center>

//         </columns>
//       </row>
//     </container>
//   </wrapper>
//    <container>
  
//     <row>
//       <columns small="12" >
        
//         <table class="one-column" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-bottom:1px solid #e8e7e5; padding: 10px" bg="#FFFFFF">
          
//           <div width="350" height="150" align="center" style="-moz-border-radius: 30px; -webkit-border-radius: 30px; border-radius: 50%;">
//             <a href="www.google.com" style="width:250; display:block; text-decoration:none; border:0; text-align:center; font-weight:bold;font-size:18px; font-family: Arial, sans-serif; color: #ffffff" class="button_link">
//                 <img src="http://www.pickmaid.com/dubai/assets/images/success-icon.png" width="60" height="60" style="padding-top:5px" alt="" border="0"/>
//             </a>
//           </div>
        
//           <tr>
//               <td align="center" style="padding:0px 40px 40px 40px"><p style="color:#262626; font-size:32px; text-align:center; font-family: Verdana, Geneva, sans-serif">Hola! <br>  ${namemail} ${surnamemail} </p>
//                   <b style="color:#000000; font-size:16px; text-align:left; font-family: Verdana, Geneva, sans-serif; line-height:22px ">
//                   Felicitaciones!!!</b><br/>
//                   Su Compra fue realizada con exito!</br>
//                   Cualquier duda comuniquese por este medio. Muchas gracias.
//                   <br />
//                </p></td>
//           </tr>
//           <tr style="margin-bottom: 20px">
//               <td align="center">
//                   <table border="0" cellpadding="0" cellspacing="0" style="Margin:0 auto;">
//                       <tr>
//                           <td width="250" height="60" align="center" bgcolor="#2f9780" style="-moz-border-radius: 30px; -webkit-border-radius: 30px; border-radius: 30px;">
//                               <a href="http://localhost:3000/Home" style="width:250; display:block; text-decoration:none; border:0; text-align:center; font-weight:bold;font-size:18px; font-family: Arial, sans-serif; color: #ffffff" class="button_link">Ir a la Tienda
//                                   <img src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/73ac4376-78ab-4d32-a0b5-b8195202e51f.jpg" width="32" height="17" style="padding-top:5px" alt="" border="0"/>
//                               </a>
//                           </td>
//                       </tr>
//                   </table>
//               </td>
//           </tr>
//         </table>
//       </columns>
//     </row>
//     <wrapper class="secondary">
//       <spacer size="16"></spacer>
  
//       <row>
//         <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8f7f7">
//           <tr>
//               <td height="30">&nbsp;</td>
//           </tr>
//           <tr>
//               <td class="two-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;text-align:center;font-size:0;"><!--[if (gte mso 9)|(IE)]>
//                   <table width="100%" style="border-spacing:0" >
//                       <tr>
//                           <td width="50%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
//                   <![endif]-->
//                   <!-- <div class="column" style="width:100%;max-width:399px;display:inline-block;vertical-align:top;">
//                       <table class="contents" style="border-spacing:0; width:100%">
//                           <tr>
//                               <td width="39%" align="right" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"><a href="#" target="_blank"><img src="https://www.studentsforliberty.org/wp-content/uploads/2016/11/logo-footer.png" alt="" width="100" height="100" style="border-width:0; max-width:59px;height:auto; display:block; padding-right:20px" /></a></td>
//                               <td width="61%" align="left" valign="middle" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"><p style="color:#787777; font-size:13px; text-align:left; font-family: Verdana, Geneva, sans-serif"> No. 100, Kandy Rd,<br />
//                                       Malabe, Sri Lanka<br />
//                                       http://findmyfare.com</p></td>
//                           </tr>
//                       </table>
//                   </div> -->
                  
//                   <div class="column" style="width:100%;max-width:399px;display:inline-block;vertical-align:top;">
//                       <table width="100%" style="border-spacing:0">
//                           <tr>
//                               <td class="inner" style="padding-top:0px;padding-bottom:10px; padding-right:10px;padding-left:10px;">
//                                 <table class="contents" style="border-spacing:0; width:100%">
//                                     <tr>
//                                         <td width="32%" align="center" valign="top" style="padding-top:10px">
//                                           <table width="150" border="0" cellspacing="0" cellpadding="0">
//                                               <tr>
//                                                   <td width="33" align="center"><a href="https://www.facebook.com/HENRY-108437840594440/" target="_blank"><img src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/51f10cc9-b6d3-409d-9a64-4080a155b8c7.jpg" alt="facebook" width="36" height="36" border="0" style="border-width:0; max-width:36px;height:auto; display:block; max-height:36px"/></a></td>
//                                                   <td width="34" align="center"><a href="https://twitter.com/soyhenry_ok" target="_blank"><img src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/f910c3b7-2369-4b33-87e8-90ba1748d47a.jpg" alt="twitter" width="36" height="36" border="0" style="border-width:0; max-width:36px;height:auto; display:block; max-height:36px"/></a></td>
//                                                   <td width="33" align="center"><a href="https://www.linkedin.com/school/soyhenry/" target="_blank"><img src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/0efcd6de-1324-4e05-871b-a93f6056f00e.jpg" alt="linkedin" width="36" height="36" border="0" style="border-width:0; max-width:36px;height:auto; display:block; max-height:36px"/></a></td>
//                                               </tr>
//                                           </table>
//                                         </td>
//                                     </tr>
//                                 </table>
//                               </td>
//                           </tr>
//                       </table>
//                   </div>
//               </td>
//           </tr>
//           <tr>
//               <td height="30">&nbsp;</td>
//           </tr>
//         </table>
//       </row>

        
//     </wrapper>
//   </container>


//     `,
//     }

//     transporter.sendMail(mailOption, (error, info)=>{
//         if(error){
//             res.status(500).send(error.message)
//         }else{
//             res.status(200).json(email)
//         }
//     })

// })

accountRoutes.post('/confirmtrue/', async (req,res)=>{
  const token = req.query
  const tokenid = String(token.token)
  const usertoken: TokenUser = jwtdecode(tokenid)
  
  const user = await prisma.user.findUnique({
    where: {
      email: usertoken.email,
    },
  });
  if(!user){
    res.status(400).send('usuario no verificado')
  }else if(user.id === usertoken.id){
    await prisma.user.update({
      where: { email: usertoken.email },
      data: {
        state: UserState.ACTIVE,
      },
    });
    sendemail({email: user.email, name: user.name, surname: user.surname})
    res.status(200).send('usuario autenticado')
  }
})

export default accountRoutes