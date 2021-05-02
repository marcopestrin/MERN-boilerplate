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
export const sendRecoveryEmail = async(token, email, id, username) => {
    const url:string = `http://${process.env.HOST_APPLICATION}:${process.env.PORT}/reset?id=${id}&resetToken=${token}&username=${username}}`;
    const mailOptions:MailOptions = {
        from: `${applicationDomain} - recovery password`,
        to: email,
        subject: "Recovery Password",
        text: "Hello world?",
        html: `this is the token: <b>${token}</b>; this is the id: ${id}. Click <a target='_blank' href='${url}'>here</a>`
    };
    return await sendEmail(mailOptions);
}

export const sendRegistrationEmail = async(email, activeCode) => {
    const url:string = `http://${process.env.HOST_APPLICATION}:${process.env.PORT}/v1/user/confirmEmail/${activeCode}`;
    const mailOptions:MailOptions = {
        from: `${applicationDomain}`,
        to: email,
        subject: "Confirm Email",
        text: "Hello world?",
        html: `Click <a target='_blank' href='${url}'>here</a> to activate the account`
    };
    return await sendEmail(mailOptions); 
}

