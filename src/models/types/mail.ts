export interface ISendGridMessage {
    from: string;
    html: string;
    to: string;
    subject: string;
    text: string
}

export interface IBrevoMessage {
    sender: string;
    htmlContent: string;
    to: string;
    subject: string;
    textContent: string;
}

export interface IMailService {
    html: string;
    to: string;
    subject: string;
    text: string;
}
