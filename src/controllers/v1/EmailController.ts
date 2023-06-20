import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { mailService } from "../../models/services/MailService";
import { Controller } from "../../models/types/controller";
import { logger } from "../../utils/logger";


export default class MailController{
    
    sendMail = expressAsyncHandler<Controller>(async (req, res) => {
        const { to, subject, text } = req.body;

        const html = text;
         //construir mensagem
        const msg = {
             html,
             to,
             subject,
             text
        };
        logger.info(`msg ${msg}`);
        // enviar email
        await mailService.sendMail(msg);
    
        res.status(200).json({ message: "Mail sent" }); 
    });
}

const mailController = new MailController()

export { mailController };