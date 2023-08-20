import { MailService as MailServiceSendGrid } from "@sendgrid/mail";
import Sib from "sib-api-v3-sdk";
import { logger } from "../../utils/logger";
import { IBrevoMessage, ISendGridMessage, IMailService } from "../types/mail";
import { SENDGRID, EMAIL, SENDINBLUE, EMAILSERVICE } from "../../constants";

class MailService {
  private apiKey: any
  private readonly envSendGrid: string
  private sendgridClient: MailServiceSendGrid;

  constructor () {
    this.envSendGrid = SENDGRID
    this.sendgridClient = new MailServiceSendGrid();
    this.apiKey = Sib.ApiClient.instance.authentications['api-key']

    console.log(this.apiKey , SENDGRID)
    if (!this.apiKey || !this.envSendGrid) {
      logger.error("Ocorreu um erro ao inicializar o MailService, ausência de variáveis de ambiente")
    }

    this.apiKey.apiKey = SENDINBLUE;

    this.sendgridClient.setApiKey(this.envSendGrid);
  }

  public sendMail = async(mailPayload: IMailService) => {
    logger.info(EMAILSERVICE);

    const msgSendGrid: ISendGridMessage = {
        from: EMAIL,
        html: mailPayload.text,
        to: mailPayload.to,
        subject: mailPayload.subject,
        text: mailPayload.text
     }   
    if (EMAILSERVICE === "SENDGRID") {
        
      await this.handleEmailSendGrid(msgSendGrid);

    } else if (EMAILSERVICE === "BREVO"){
        const msgSendInBlue: IBrevoMessage = {
            sender: EMAIL,
            htmlContent: mailPayload.html,
            to: mailPayload.to,
            subject: mailPayload.subject,
            textContent: mailPayload.text
        }
        await this.handleEmailSendInBlue(msgSendInBlue)
    } else {
      await this.handleEmailSendGrid(msgSendGrid);
    }
}

private handleEmailSendInBlue = (msg: IBrevoMessage) => {
  const tranEmailApi = new Sib.TransactionalEmailsApi();
  let sendSmtpEmail = new Sib.SendSmtpEmail();
  sendSmtpEmail = {
      sender: { email: EMAIL },
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
        logger.alert("API chamada com sucesso. Dados retornados: " + JSON.stringify(data));
      },
      function (error: Error) {
        logger.error(error);
      }
    );
};

private handleEmailSendGrid = async (msg: ISendGridMessage) => {

  const msgEnviada : ISendGridMessage = {
      from: msg.from,
      html: msg.html,
      to: msg.to,
      subject: msg.subject,
      text: msg.text
  }
  await this.sendgridClient.send(msgEnviada);
};
}

const mailService = new MailService();

export { mailService };

declare var process : {
  env: {
    SENDGRID: string,
    EMAIL: string,
    EMAILSERVICE: string,
    BREVO: string
  }
}