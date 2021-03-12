import crypto from "crypto";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const encryptPassword = (password: string) => {
    return crypto
    .createHash("md5")
    .update(password)
    .digest("hex")
};

export const generateRecoveryToken = () => {
    // da valutare se prendere in input qualche dato per renderlo "univoco"
    return crypto
    .randomBytes(32)
    .toString("hex")
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