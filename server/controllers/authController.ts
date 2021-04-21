import { Response, Request, NextFunction } from "express";

import { applicationDomain } from "../../const";
import schema from "../models/user";
import { encryptPassword, generateRecoveryToken, sendEmail } from "./functions";
import { Tokens, MailOptions, CheckCredentials, RequestData } from "../interfaces";
import { getUserByRefreshToken, saveRefreshToken } from "./functions/token";
import { isValidPassword } from "./functions/validation";
import { checkCredentials } from "../services/auth.service";
import { generateTokens } from "../services/token.service";

const message = require("./message.json");
class Auth {

    /**
     * @swagger
     * /v1/auth/logout:
     *   post:
     *      summary: Logout request
     *      tags: [Auth]
     * 
     *      parameters:
     *      - in: body
     *        name: refreshToken
     *        required: true
     * 
     *      responses:
     *        200:
     *          description: Logged out
     *                  
     */
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

    /**
     * @swagger
     * /v1/auth/requestNewToken:
     *   post:
     *      summary: Use this endpoint when access token is expired
     *      tags: [Auth]
     * 
     *      parameters:
     *      - in: headers
     *        name: refreshToken
     *        required: true
     * 
     *      responses:
     *        200:
     *          description: Generated new access token
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  accessToken:
     *                    type: string
     *                  success:
     *                    type: boolean
     *                  
     */
    async requestNewToken(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken: any = req.headers.refreshtoken;
            if (refreshToken) {
                const { success, data, error }: RequestData = await getUserByRefreshToken(refreshToken);
                if (success && data !== null) {
                    const { password, username } = data;
                    if (password && username) {
                        const { accessToken }: Tokens = await generateTokens(username, encryptPassword(password));
                        res.status(200).json({
                            success: true,
                            accessToken
                        })
                        return
                    }
                    throw message.userNotFound;
                }
                throw error
            }
            throw message.needRefreshToken;      
        } catch (error) {
            next(error)
        }
    }

    /**
     * @swagger
     * /v1/auth/login:
     *   post:
     *      summary: Get tokens and access to private area
     *      tags: [Auth]
     * 
     *      parameters:
     *      - in: body
     *        name: username
     *        required: true
     *      - in: body
     *        name: password
     *        required: true
     * 
     *      responses:
     *        200:
     *          description: Correct credentials
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  accessToken:
     *                    type: string
     *                  refreshToken:
     *                    type: string
     *                  userActive:
     *                    type: boolean
     *                  userRole:
     *                    type: number
     *                  success:
     *                    type: boolean
     *        500:
     *          description: Server error
     *        400:
     *          description: Wrong input
     *        401:
     *          description: Wrong credentials
     *                  
     */
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;
            const { success, userActive, userRole }:CheckCredentials = await checkCredentials(username, password);
            if (success) {
                const { accessToken, refreshToken }: Tokens = await generateTokens(username, encryptPassword(password));
                res.cookie("accessToken", accessToken);
                res.cookie("refreshToken", refreshToken);
                res.status(200).json({
                    accessToken,
                    refreshToken,
                    userActive,
                    userRole,
                    success: true
                });
            } else {
                res.status(401).json(message.wrongCredentials);
            }
        } catch (error) {
            next(error);
        }
    };

    /**
     * @swagger
     * /v1/auth/recoveryPassword:
     *   post:
     *      summary: Use this endpoint to change password after applying
     *      tags: [Auth]
     * 
     *      parameters:
     *      - in: body
     *        name: id
     *        required: true
     *      - in: body
     *        name: password
     *        required: true
     *      - in: body
     *        name: resetToken
     *        required: true
     * 
     *      responses:
     *        200:
     *          description: Password changed
     *        403:
     *          description: Invalid password
     *                  
     */
    async recoveryPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, password, resetToken } = req.body;
            const passwordValid: boolean = isValidPassword(password);
            const query: object = {
                resetToken,
                id
            };
            // il token deve essere eliminato
            const set: object = {
                $set: { resetToken: '' },
                password: encryptPassword(password)
            };

            if (passwordValid) {
                schema.updateOne(query, set)
                .exec((err: object, result:object) => {
                    if (err) throw err;
                    // all good!!
                    res.status(200).json(result);
                })
            } else {
                res.status(403).json({
                    error: message.invalidPassword
                });
            }
        } catch (error) {
            next(error);
        }
    };

    /**
     * @swagger
     * /v1/auth/reset:
     *   post:
     *      summary: Use this endpoint to to require a token to reset password
     *      tags: [Auth]
     * 
     *      parameters:
     *      - in: body
     *        name: email
     *        required: true
     * 
     *      responses:
     *        200:
     *          description: Email sended
     *                  
     */
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