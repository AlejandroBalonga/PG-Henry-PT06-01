import nodemailer from "nodemailer";

export interface UserEmail {
  email: string;
  name: string;
  surname: string;
}

export default function sendemail({ email, name, surname }: UserEmail) {
  // const mail = String(email)
  // const namemail = String(name)
  // const surnamemail = String(surname)
  // console.log('estoy llegando al confirm', name, surname);

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "compustorehenry@gmail.com",
      pass: "dnybnopwvxliapcc",
    },
  });

  let mailOption = {
    from: '"CompuStore 💻🛒👍" <compustorehenry@gmail.com>',
    to: email,
    subject: "Hola!!! Su cuenta fue creada con Exito! ✔",
    // html body
    html: `
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
              <td align="center" style="padding:0px 40px 40px 40px"><p style="color:#262626; font-size:32px; text-align:center; font-family: Verdana, Geneva, sans-serif">Felicidades! <br>  ${name} ${surname} </p>
                  <b style="color:#000000; font-size:18px; text-align:left; font-family: Verdana, Geneva, sans-serif; line-height:22px ">
                  Bienvenido!!! </br>
Estamos muy felices de tenerte 😊</b><br/>
                  <b style="color:#000000; font-size:15px; text-align:left; font-family: Verdana, Geneva, sans-serif; line-height:22px " >
</br>
                  Tu cuenta en CompuStore ya está registrada.  </br>
                  Cualquier duda comunicate por este medio. </br>
                  No dudes en escribirnos, ¡siempre estamos aquí para ayudarte!.
                  </b><br />
               </p></td>
          </tr>
          <tr style="margin-bottom: 20px">
              <td align="center">
                  <table border="0" cellpadding="0" cellspacing="0" style="Margin:0 auto;">
                      <tr>
                          <td width="250" height="60" align="center" bgcolor="#2f9780" style="-moz-border-radius: 30px; -webkit-border-radius: 30px; border-radius: 30px;">
                              <a href="http://localhost:3000/Home" style="width:250; display:block; text-decoration:none; border:0; text-align:center; font-weight:bold;font-size:18px; font-family: Arial, sans-serif; color: #ffffff" class="button_link">Ir a la Tienda
                                  <img src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/73ac4376-78ab-4d32-a0b5-b8195202e51f.jpg" width="32" height="17" style="padding-top:5px" alt="" border="0"/>
                              </a>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
        </table>
      </columns>
    </row>
    
  </container>
  </div>

    `,
  };

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      return error.message;
    } else {
      return email;
    }
  });
}
