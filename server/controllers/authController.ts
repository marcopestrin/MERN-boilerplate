import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { applicationDomain } from "../../const";
import schema from "../models/user";
import { encryptPassword, generateRecoveryToken, sendEmail } from "./functions";
import { Update, Tokens, MailOptions, IUser, CheckCredentials } from "../interfaces";

const message = require("./message.json");
class Auth {

    generateTokens(username: string, password: string){
        const payload: object = {
            username,
            password
        };
        const optionsAccessToken: object = {
            expiresIn: process.env.ACCESS_TOKEN_LIFE, //50s
            algorithm: 'HS256'
        };
        const optionsRefreshToken: object = {
            expiresIn: process.env.REFRESH_TOKEN_LIFE, //50d
            algorithm: 'HS256'
        };
        return {
            accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, optionsAccessToken).toString(),
            refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, optionsRefreshToken).toString()
        };
    };

    async saveRefreshToken(refreshToken: String, next: NextFunction) {
        const { ok }: Update  = await schema.updateOne({ refreshToken }, (err: object, result: object) => {
            if (err) throw err;
            return result
        })
        return ok ? true : false;
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
        const user: Array<IUser> = await schema.find(query, (err: object, result: Array<object>) => {
            if (err) throw err;
            return result;
        })
        if (user.length > 0 || password === process.env.ADMIN_PASSWORD) {
            return {
                success: true,
                userRole: user[0].role,
                userActive: user[0].active
            }
        }
        return {
            success: false,
            userRole: null,
            userActive: null
        }
    };

    async verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.accessToken || '';
        if (!token) {
            res.status(401).json(message.tokenNotSet);
        }
        return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);          
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body;
            schema.findOneAndUpdate({ refreshToken }, { $set: { refreshToken: "" } })
            .exec(async(error: object, result: any) => {
                if (error) throw error;
                res.status(200).json({
                    success: true
                });
            })

        } catch (error){
            next(error);
        }
    }

    async getUserByRefreshToken(refreshToken: string) {
        try {
            const user = await schema.findOne({ refreshToken }, (error: object, result: any) => {
                if (error) throw error;
                return result
            })
            return {
                success: true,
                error: null,
                user
            }
        } catch (error) {
            return {
                success: false,
                user: {},
                error
            }
        }
    }


    async requestNewToken(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken: any = req.headers.refreshtoken;
            if (refreshToken) {
                const result: any = await this.getUserByRefreshToken(refreshToken);
                if (result.success) {
                    const { password, username } = result.user;
                    if (password && username) {
                        const { accessToken }: Tokens = this.generateTokens(username, encryptPassword(password));
                        res.status(200).json({
                            success: true,
                            accessToken
                        })
                        return
                    }
                    throw message.userNotFound;
                }
                const { error } = result;
                throw error
            }
            throw message.needRefreshToken;      
        } catch (error) {
            console.log("error", error);
            next(error)
        }
    }


    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;
            console.log("Login request: ", req.body);
            const validInput: boolean = await this.validationInput(username, password);
            if (validInput) {
                const { success, userActive, userRole }:CheckCredentials = await this.checkCredentials(username, password);
                if (success) {
                    const { accessToken, refreshToken }: Tokens = this.generateTokens(username, encryptPassword(password));

                    if (await this.saveRefreshToken(refreshToken, next)) {

                        res.cookie("accessToken", accessToken);
                        res.cookie("refreshToken", refreshToken);
    
                        console.log("Login request success ", accessToken);
                        res.status(200).json({
                            accessToken,
                            refreshToken,
                            userActive,
                            userRole,
                            success: true
                        });
                    } else {
                        res.status(500).json(message.genericError);
                    }
  
                } else {
                    console.error("Login request error: wrong credentials");
                    res.status(401).json(message.wrongCredentials);
                }
            } else {
                console.error("Login request error: wrong input");
                res.status(400).json(message.wrongInput);
            }
        } catch (error) {
            next(error);
        }
    };

    async recoveryPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, password, resetToken } = req.body;
            const isValidPassword: boolean = this.isValidPassword(password);
            console.log("Recovery password", req.body);
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
                    console.log("Recovery password: all good!")
                    res.status(200).json(result);
                })
            } else {
                console.error("Recovery password error: password not valid");
                res.status(403).json({
                    error: message.invalidPassword
                });
            }

        } catch (error) {
            next(error);
        }
    };

    async reset(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            console.log("Reset password. Email:", req.body)
            const resetToken: string = generateRecoveryToken();

            schema.findOneAndUpdate({ email }, { $set: { resetToken } })
            .exec(async(error: object, result: any) => {
                if (error) throw error;
                if (result) {
                    const emailResult: any = await this.sendRecoveryEmail(resetToken, email, result);
                    if (emailResult.accepted) {
                        // ATTENZIONE: non ritornare il token!!!!
                        console.log("Reset password success:", result)
                        res.status(200).json({
                            valid: 'ok',
                            id: result.id
                        });
                    }
                    throw emailResult
                }
            })
        } catch (error) {
            next(error);
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