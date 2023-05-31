import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { ServicoDeEmail } from "../../services/ServicoDeEmail";

const enviarEmail = expressAsyncHandler(async (req: Request, res: Response) => {
    const { to, subject, text } = req.body;
 
    let html = text;
     //construir mensagem
    const msg = {
         html,
         to,
         subject,
         text
    };
    console.log("msg", msg);
    // enviar email
    await ServicoDeEmail(msg);

    res.json("Mail sent"); 
});

export { enviarEmail };