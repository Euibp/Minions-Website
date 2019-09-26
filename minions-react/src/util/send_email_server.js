import secret from '../secret.json' 

import nodemailer from 'nodemailer'

async function send(body){
  //var testAccount = await nodemailer.createTestAccount();
  console.log("onde")
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
      host: 'Gmail',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: secret.GMAIL_USER, // generated ethereal user
          pass: secret.PASSWORD // generated ethereal password
      }
  });
  console.log("foi")
  var info = await transporter.sendMail(body);
  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  console.log("erro")
  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}


export function sendMinionsRequest (email,name,buylist,callback){

    //Gerando conteudo do email
    var content = `Muito Obrigado ${name} pela Resarva \n\n Sua Reserva: \n`
    buylist.forEach(minion => { 
        content = content +" - "+minion.name+"\n"   
    });
    content = content+"\n Atenciosamente Minion E-Commerce"

    //Gerando lista de emails
    //secret.LIST_CONFIRM_EMAILS é uma lista secreta de strings
    var listOfEmails = secret.PERSONAL_EMAIL
    listOfEmails.push(email)
    console.log(email)
    const body ={
      from: secret.GMAIL_USER,
      to: email,
      subject: "Minion E-Commerce confirmando seu pedido",
      text: content
  }
    console.log("OI")
    send(body)
      .then(()=>{callback(true)})
      .catch(()=>{callback(false)})

}



