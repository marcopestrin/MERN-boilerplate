import crypto from "crypto";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Mail from "nodemailer/lib/mailer";

import { MailOptions } from "../../interfaces";

export const encryptPassword = (password:string) => {
    return crypto
    .createHash("md5")
    .update(password)
    .digest("hex") as string
};

export const getTransporterEmail = () => {
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

export const sendEmail = (mailOptions:MailOptions) => {
    const transporter: Mail = getTransporterEmail();
    
    return new Promise((resolve) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                 resolve(error);
            }
            resolve(info);
        })
    })
}

export const generateUserId = (email:string) => {
    return crypto
    .createHash("sha256")
    .update(email)
    .digest("hex") as string
}