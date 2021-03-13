import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { applicationDomain } from '../../const';
import schema from "../models/user";
import { encryptPassword, generateRecoveryToken, sendEmail, MailOptions } from './commonFunctions';
interface Tokens {
    accessToken: String,
    refreshToken: String
};

class Auth {

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

    isValidPassword(password: string) {
        // validatore della password in caso di recovery
        return true
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
            res.status(401).json('You need to Login');
        }
        return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);          
        } catch (err) {
            res.status(500).json(err.toString());
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

    async recoveryPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, password, resetToken } = req.body;
            const isValidPassword: boolean = this.isValidPassword(password);

            const query: object = {
                resetToken,
                id
            };

            // il token deve essere eliminato
            const set: object = {
                $set: { resetToken: '' },
                password: encryptPassword(password)
            };

            if (isValidPassword) {
                schema.updateOne(query, set)
                .exec((err: object, result:object) => {
                    if (err) throw err;
                    // all good!!
                    res.status(200).json(result);
                })
            } else {
                res.status(403).json({
                    error: 'password not valid'
                });
            }

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    };

    async reset(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const resetToken: string = generateRecoveryToken();

            schema.findOneAndUpdate({ email }, { $set: { resetToken } })
            .exec(async(error: object, result: any) => {
                if (error) throw error;
                if (result) {
                    const emailResult: any = await this.sendRecoveryEmail(resetToken, email, result);
                    if (emailResult.accepted) {
                        // ATTENZIONE: non ritornare il token!!!!
                        res.status(200).json({
                            valid: 'ok',
                            id: result.id
                        });
                    }
                    throw emailResult
                }
            })
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async sendRecoveryEmail(resetToken: string, email: string, result: any) {
        const url: string = `http://${process.env.HOST_APPLICATION}:${process.env.PORT}/reset?id=${result.id}&resetToken=${resetToken}&username=${result.username}}`;

        const mailOptions: MailOptions = {
            from: `${applicationDomain} - recovery password`,
            to: email,
            subject: "Recovery Password",
            text: "Hello world?",
            html: `this is the token: <b>${resetToken}</b>; this is the id: ${result.id}. Click <a target='_blank' href='${url}'>here</a>`
        };

        const ex: any = await sendEmail(mailOptions);
        return ex
    }
};

export default new Auth();