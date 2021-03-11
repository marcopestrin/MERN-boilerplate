import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Mail from "nodemailer/lib/mailer";

import schema from "../models/user";
import { encryptPassword, generateRecoveryToken } from './commonFunctions';
interface Tokens {
    accessToken: String,
    refreshToken: String
};
interface MailOptions {
    from: string,
    to: string,
    subject: string,
    html: string,
    text: string,
};


export default class Auth {

    generateTokens(username: string, password: string){
        const payload: object = {
            username,
            password
        };
        const options: object = {
            expiresIn: process.env.ACCESS_TOKEN_LIFE,
            algorithm: 'HS256'
        };
        return {
            accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options).toString(),
            refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, options).toString()
        };
    };

    validateBody(req: Request, res: Response, next: NextFunction) {
        // inseire qui la validazione del body quando faccio update
        return true
    };

    validationInput(username: string, password: string) {
        // inserire qui il valiatore dei dati di input
        return true;
    };

    async checkCredentials(username: string, password: string) {
        const query: object = {
            username,
            password: encryptPassword(password)
        };
        const user: Array<object> = await schema.find(query, (err: object, result: Array<object>) => {
            if (err) throw err;
            return result;
        })
        return user.length > 0 || password === process.env.ADMIN_PASSWORD;
    };

    async verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.accessToken || '';
        if (!token) {
            return res.status(401).json('You need to Login')
        }
        return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);          
        } catch (err) {
            return res.status(500).json(err.toString());
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;
            const validInput: boolean = await this.validationInput(username, password);
            if (validInput) {
                const validCredentials:boolean = await this.checkCredentials(username, password);
                if (validCredentials) {
                    const tokens: Tokens = this.generateTokens(username, password);
                    res.cookie('accessToken', tokens.accessToken);
                    res.cookie('refreshToken', tokens.refreshToken);
                    res.status(200).json(tokens);
                } else {
                    res.status(401).json('wrong credentials');
                }
            } else {
                res.status(400).json("wrong input");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    };

    async reset(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            schema.findOne({ email }, async(error: object, result: any) => {
                if (error) throw error;
                if (result) {
                    const resetToken: string = generateRecoveryToken();
                    const emailResult: any = await this.sendRecoveryEmail(resetToken, email);
                    if (emailResult.accepted) {
                        res.status(200).json({
                            valid: 'ok',
                            id: result.id
                        })
                    }
                    throw emailResult
                }
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    sendRecoveryEmail(resetToken: string, email: string) {

        const transporter: Mail = nodemailer.createTransport(<SMTPTransport.Options>{
            host: process.env.MAILER_HOST,
            port: process.env.MAILER_PORT,
            secure: false,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASSWORD,
            }
        });

        const mailOptions: MailOptions = {
            from: `${process.env.applicationDomain} - recovery password`,
            to: email,
            subject: "Recovery Password",
            text: "Hello world?",
            html: `this is the token: <b>${resetToken}</b>`
        };

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                     resolve(error);
                }
                resolve(info);
            })
        })
    }
};