import { Response, Request, NextFunction } from "express";
import {
    Tokens,
    CheckCredentials,
    IUser,
    Update
} from "../interfaces";
import {
    generateTokens,
    deleteToken,
    verifyToken,
    generateRecoveryToken,
    getUsernameByResetToken,
    removeTokenExpired
} from "../services/token.service";
import { getUserByName, updateUser } from "../services/user.service";
import { sendRecoveryEmail } from "../services/email.service";
import { checkCredentials } from "../services/auth.service";
import { encryptPassword } from "../services/helper.service";

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
    async logout(req:Request, res:Response, next:NextFunction) {
        try {
            await deleteToken(req.body.refreshToken, "refresh");
            await removeTokenExpired();
            res.status(200).json({
                success: true
            });
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
    async requestNewToken(req:Request, res:Response, next:NextFunction) {
        try {
            const refreshtoken = req.headers.refreshtoken as string;
            const tokenDocument = await verifyToken(refreshtoken.toString());
            if (tokenDocument === undefined || tokenDocument === null) {
                res.status(404).json({
                    success: false
                })
                return
            };
            const user: IUser = await getUserByName(tokenDocument.username);
            if (!user) {
                res.status(404).json({
                    success: false
                })
                return
            };
            const { accessToken, refreshToken }:Tokens = await generateTokens(tokenDocument.username, user.password);
            await tokenDocument.remove();
            res.status(200).json({
                success: true,
                accessToken,
                refreshToken
            })    
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
     *        402:
     *          description: Wrong credentials
     *                  
     */
    async login(req:Request, res:Response, next:NextFunction) {
        try {
            const { username, password } = req.body;
            const { success, userActive, userRole, userId }:CheckCredentials = await checkCredentials(username, password);
            if (success) {
                const { accessToken, refreshToken }:Tokens = await generateTokens(username, encryptPassword(password));
                res.cookie("accessToken", accessToken);
                res.cookie("refreshToken", refreshToken);
                res.status(200).json({
                    accessToken,
                    refreshToken,
                    userActive,
                    userRole,
                    userId,
                    success: true
                });
            } else {
                res.status(402).json({
                    success: false,
                    message: message.wrongCredentials
                });
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
     *        name: password
     *        required: true
     *      - in: body
     *        name: resetToken
     *        required: true
     * 
     *      responses:
     *        200:
     *          description: Password changed
     *        400:
     *          description: Impossibile to update password
     *                  
     */
    async recoveryPassword(req:Request, res:Response, next:NextFunction) {
        try {

            const { password, resetToken } = req.body;
            const username = await getUsernameByResetToken(resetToken);
            if (!username) throw message.wrongToken;
            const userDocument:IUser = await getUserByName(username);
            if (!userDocument) throw message.userNotFound;
            const payload:object = {
                ...userDocument,
                password: encryptPassword(password)
            }
            const { nModified }:Update = await updateUser(payload, { username })
            if (nModified > 0) {
                await deleteToken(resetToken, "reset");
                res.status(200).json({
                    success: true
                });
                return;
            }
            res.status(400).json({
                success: false,
                message: message.errorAddNewPassword
            });
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
    async reset(req:Request, res:Response, next:NextFunction) {
        try {
            const { email } = req.body;
            const { recoveryToken, id, username, info, success } = await generateRecoveryToken(email);
            if (success) {
                const emailResult: any = await sendRecoveryEmail(recoveryToken, email, id, username);
                if (emailResult.accepted) {
                    res.status(200).json({ success: true, id });
                    return
                }
                throw {
                    emailResult,
                    success: false,
                    message: message.errorSendEmail
                };
            }
            throw {
                message: info,
                success: false
            };
        } catch (error) {
            next(error);
        }
    }

};

export default new Auth();