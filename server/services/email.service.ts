import Mail from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { applicationDomain } from "../../const";
import { MailOptions } from "../interfaces";

const getTransporterEmail = () => {
    return nodemailer.createTransport(<SMTPTransport.Options>{
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: false,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASSWORD,
        }
    });
};

const sendEmail = (mailOptions:MailOptions) => {
    const transporter:Mail = getTransporterEmail();
    return new Promise((resolve) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                 resolve(error);
            }
            resolve(info);
        })
    })
}
export const sendRecoveryEmail = async(token:string, email:string, id:string, username:string) => {
    const url:string = `${process.env.FRONTEND_URL}/recoveryPassword/${id}/${token}/${username}`;
    const mailOptions:MailOptions = {
        from: `${applicationDomain}`,
        to: email,
        subject: `${applicationDomain} - Recovery Password`,
        text: `${applicationDomain} - Recovery Password`,
        html: `This is the token: <b>${token}</b>;<br />This is the id: <b>${id}</b>. Click <a target='_blank' href='${url}'>here</a> to set a new password.`
    };
    return await sendEmail(mailOptions);
}

export const sendRegistrationEmail = async(email:string, activeCode:string) => {
    const url:string = `http://${process.env.HOST_APPLICATION}:${process.env.PORT}/v1/user/confirmEmail/${activeCode}`;
    const mailOptions:MailOptions = {
        from: `${applicationDomain}`,
        to: email,
        subject: `${applicationDomain} - Confirm your account`,
        text: `${applicationDomain} - Confirm your account`,
        html: `Click <b><a target='_blank' href='${url}'>here</a></b> to activate the account`
    };
    return await sendEmail(mailOptions); 
}

