import nodemailer from 'nodemailer';

export interface ConfirmMail {
  name: string,
    surname: string
    email: string;
    token: string
  }

export default function resetpassword ({name, surname, email, token}: ConfirmMail){

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
      auth: {
          user: 'compustorehenry@gmail.com',
          pass: "dnybnopwvxliapcc"
        },
      });
  
      let mailOption={
          from: 'compustorehenry@gmail.com',
          to: email,
          subject: "CompuStore - Instrucciones para restablecer la contraseña",
          // text: `http://localhost:3000/login/checkmail/changepassword/${token}`,
          html:`
          <div class="one-div" border="0" cellpadding="0" cellspacing="0" width="70%" style="border-spacing:0; border-left:1px solid #495057; border-right:1px solid #495057; border-bottom:1px solid #495057; border-top:1px solid #495057; margin: 20px 200px; padding: 0 20px 20px 20px" bg="#FFFFFF">
    <wrapper class="header" >
    <container >
      <row class="collapse">
        <columns small="6">
          <center><img src="https://res.cloudinary.com/carina-bosio/image/upload/v1662390071/Logo-removebg-preview_wjozut.png"
          style="padding-top:5px; padding-bottom:5px"  alt="" border="0" ></center>

        </columns>
      </row>
    </container>
  </wrapper>
   <container>
  
    <row>
      <columns small="12" >
        
        <table class="one-column" border="0" cellpadding="0" cellspacing="0"  style="border-top:1px solid #495057; margin: 15px; padding: 20px" bg="#FFFFFF">
          
          <div width="350" height="150" align="center" style="-moz-border-radius: 30px; -webkit-border-radius: 30px; border-radius: 50%; style="border-spacing:0; border-top:1px solid #495057; margin: auto; padding: 20px" bg="#FFFFFF">
          <img src="http://www.pickmaid.com/dubai/assets/images/success-icon.png" width="60" height="60" style="padding-top:5px" alt="" border="0"/>
            </a>
          </div>
        
          <tr>
              <td align="center" style="padding:0px 40px 40px 40px"><p style="color:#262626; font-size:32px; text-align:center; font-family: Verdana, Geneva, sans-serif">Hola! <br>  ${name} ${surname} </p>
                  <b style="color:#000000; font-size:18px; text-align:left; font-family: Verdana, Geneva, sans-serif; line-height:22px ">
                  Se envió su solicitud para restablecer su contraseña. </br>
                  Si no realizó esta solicitud, simplemente ignore este correo electrónico. <br/>
                  Si realizó esta solicitud, simplemente haga clic en el siguiente enlace:</b><br/>
                  
               </p></td>
          </tr>
          <tr style="margin-bottom: 20px">
              <td align="center">
                  <table border="0" cellpadding="0" cellspacing="0" style="Margin:0 auto;">
                      <tr>
                          <td width="250" height="60" align="center" bgcolor="#2f9780" style="-moz-border-radius: 30px; -webkit-border-radius: 30px; border-radius: 30px;">
                              <a href="http://localhost:3000/login/checkmail/changepassword/${token}" style="width:250; display:block; text-decoration:none; border:0; text-align:center; font-weight:bold;font-size:18px; font-family: Arial, sans-serif; color: #ffffff" class="button_link">Restablecer contraseña</a>
                              
                                 
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
<tr>
              <td align="center" style="padding:40px 0px 0px 40px">
                  <b style="color:#000000; font-size:16px; text-align:left; font-family: Verdana, Geneva, sans-serif; line-height:22px ">
                  Si el botón no funciona por algún motivo, también puede hacer click o pegar lo siguiente en su navegador:
                  <br />
<br />
                  <Link to="/login/checkmail/changepassword/${token}">http://localhost:3000/login/checkmail/changepassword/${token}</Link>
               </p></td>
          </tr>
          <tr>
              <td align="center" style="padding:20px 0px 0px 40px">
                  <b style="color:#000000; font-size:16px; text-align:left; font-family: Verdana, Geneva, sans-serif; line-height:22px ">
                  
                  Si sigue teniendo problemas, póngase en contacto con nosotros.
                 
               </p></td>
          </tr>
        </table>
      </columns>
    </row>
    
  </container>
  </div> `

      
      }
  
      transporter.sendMail(mailOption, (error, info)=>{
          if(error){
               return (error.message)
          }else{
             return email
          }
      })
  
}