
import dotenv from "dotenv";
dotenv.config();

import Sib from "sib-api-v3-sdk";

declare var process : {
    env: {
      SENDGRID: string,
      EMAIL: string,
      EMAILSERVICE: string,
      BREVO: string
    }
  }

const client = Sib.ApiClient.instance;

const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO;


import { MailService } from "@sendgrid/mail";



let envSendGrid = process.env.SENDGRID;

const sendgridClient = new MailService();
sendgridClient.setApiKey(envSendGrid);

interface ISendGridMessage {
    from: string;
    html: string;
    to: string;
    subject: string;
    text: string
}

interface IBrevoMessage {
    sender: string;
    htmlContent: string;
    to: string;
    subject: string;
    textContent: string;
}


interface IServicoDeEmail {
    html: string;
    to: string;
    subject: string;
    text: string;
}


const EnviarEmailSendinblue = (msg: IBrevoMessage) => {
    const tranEmailApi = new Sib.TransactionalEmailsApi();
    let sendSmtpEmail = new Sib.SendSmtpEmail();
    sendSmtpEmail = {
        sender: { email: process.env.EMAIL },
        to: [
          {
            email: msg.to,
            name: "Site User",
          },
        ],
        subject: msg.subject,
        htmlContent: msg.subject,
      };
      tranEmailApi.sendTransacEmail(sendSmtpEmail).then(
        function (data: any) {
          console.log("API chamada com sucesso. Dados retornados: " + JSON.stringify(data));
        },
        function (error: Error) {
          console.error(error);
        }
      );
};

const EnviarEmailSendgrid = async (msg: ISendGridMessage) => {

    const msgEnviada : ISendGridMessage = {
        from: msg.from,
        html: msg.html,
        to: msg.to,
        subject: msg.subject,
        text: msg.text
    }
    await sendgridClient.send(msgEnviada);
};


//defaut: SengGrid
// O email a ser utilizado dependerá da variável de ambiente EMAILSERVICE,
// que é configurada no script no package.json.
const ServicoDeEmail = async(msg: IServicoDeEmail) => {
    console.log(envSendGrid);
    console.log(process.env.EMAILSERVICE);

    let msgSendGrid: ISendGridMessage = {
        from: process.env.EMAIL,
        html: msg.text,
        to: msg.to,
        subject: msg.subject,
        text: msg.text
     }   
    if (process.env.EMAILSERVICE==="SENDGRID") {
     await EnviarEmailSendgrid(msgSendGrid);

} else if(process.env.EMAILSERVICE==="BREVO"){
    let msgSendInBlue: IBrevoMessage = {
        sender: process.env.EMAIL,
        htmlContent: msg.html,
        to: msg.to,
        subject: msg.subject,
        textContent: msg.text
    }
    await EnviarEmailSendinblue(msgSendInBlue)
} else {
  await EnviarEmailSendgrid(msgSendGrid);
}
}

export { ServicoDeEmail };
