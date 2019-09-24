
// secret tem listas de emails,
import secret from '../secret.json' 
// "PERSONAL_EMAIL"
// "LIST_CONFIRM_EMAILS"

function post(url, body,callback) {
  var req = new XMLHttpRequest();
  req.open("POST", url, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.addEventListener("load", function () {
    if (req.status < 400) {
      callback(true);
    } else {
        console.log("Request failed: " + req.statusText)
      callback(false);
    }
  });
  req.send(JSON.stringify(body));
 
}

// TODO: CALLBACK muito feio, refazer melhor
export function sendMinionsRequest (email,name,buylist,callback){
    const send_url ="https://nl9x48put6.execute-api.us-east-1.amazonaws.com/dev/email/send"
   
    //Gerando conteudo do email
    var content = `Muito Obrigado ${email} pela Resarva \n\n Sua Reserva: \n`
    buylist.forEach(minion => { 
        content = content +" - "+minion.name+"\n"   
    });
    content = content+"\n Atenciosamente Minion E-Commerce"

    //Gerando lista de emails
    //secret.LIST_CONFIRM_EMAILS é uma lista secreta de strings
    var listOfEmails = secret.PERSONAL_EMAIL
    listOfEmails.push(email)

    const body ={
        listEmails: listOfEmails,
        name: name,
        content: content,
        title: "Minion E-Commerce confirmando seu pedido"
    }

    post(send_url, body, callback)
}

