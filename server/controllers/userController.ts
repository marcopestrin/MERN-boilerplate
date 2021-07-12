import { Response, Request, NextFunction } from "express";
import {
    IUser,
    Update,
    CreateUserInput,
    RequestData
} from "../interfaces";
import { 
    getUserList,
    getUserById,
    createUser,
    updateUser,
    checkActiveCode,
    removeUserById,
    checkDataOnEdit
} from "../services/user.service";
import {
    encryptPassword,
    generateActiveCode,
    generateUserId,
    getContentByDocument,
    checkCurrentPassword
} from "../services/helper.service";
import { sendRegistrationEmail } from "../services/email.service";
import {
    removeTokensByUsername,
    getRoleByRefreshToken,
    getUserIdByRefreshToken
} from "../services/token.service";

const message = require("./message.json");
class User {

    /**
     * @swagger
     * /v1/user/confirmEmail/{activeCode}:
     *   get:
     *      summary: Validate the user
     *      tags: [User]
     * 
     *      parameters:
     *      - in: path
     *        name: activeCode
     *        required: true
     * 
     *      responses:
     *        200:
     *          description: User confirmed
     *                  
     */
    async confirmEmail(req:Request, res:Response, next:NextFunction) {
        try {
            const activeCode = req.params.activeCode as string;
            const user:IUser = await checkActiveCode(activeCode);
            if (!user) return;
            const payload = {
                ...getContentByDocument(user),
                active: true,
                activeCode: ""
            }
            const result:Update = await updateUser(payload, { activeCode });
            if (result.ok) {
                res.status(200).json({
                    success: true,
                    message: message.userActivated
                });
                return;
            }
            res.status(400).json({
                success: false
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * @swagger
     * /v1/user/create:
     *   post:
     *      summary: Create a new identity
     *      tags: [User]
     * 
     *      parameters:
     *      - in: body
     *        name: password
     *        required: true
     *      - in: body
     *        name: username
     *        required: true
     *      - in: body
     *        name: email
     *        required: true
     * 
     *      responses:
     *        422:
     *          description: User already exist
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  success:
     *                    type: boolean
     *                    example: false
     *                  messaage:
     *                    type: string
     *        500:
     *          description: email not sended
     *        200:
     *          description: User confirmed
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  email:
     *                    type: string
     *                  username:
     *                    type: string
     *                  success:
     *                    type: boolean
     *                  
     */
    async createNewUser(req:Request, res:Response, next:NextFunction) {
        try {
            const password = req.body.password as string;
            const username = req.body.username as string;
            const email = req.body.email as string;
            const activeCode:string = generateActiveCode(password, email);

            const payload:CreateUserInput = {
                username,
                password: encryptPassword(password),
                email,
                id: generateUserId(email),
                activeCode
            };            
            const result:RequestData = await createUser(payload);
            if (!result.success) {
                res.status(400).json({
                    success: false,
                    message: result.error,
                });
                return;
            }
            const isSended = await sendRegistrationEmail(email, activeCode);
            if (!isSended) {
                res.status(400).json({
                    success: false,
                    message: message.errorSendEmail
                });
                return
            }
            res.status(200).json({
                success: true
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * @swagger
     * /v1/user/getAllUser:
     *   get:
     *      summary: Return the list of all users
     *      tags: [User]
     * 
     *      responses:
     *        200:
     *          description: Return an array of users
     *          content:
     *            application/json:
     *              schema:
     *                type: array      
     *                item: object            
     */
    async getAllUsers(req:Request, res:Response, next:NextFunction) {
        try {
            const data: Array<object> = await getUserList();
            res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * @swagger
     * /v1/user/getUserById:
     *   get:
     *      summary: Return a specific user
     *      tags: [User]
     * 
     *      parameters:
     *      - in: query
     *        name: id
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
     *                  email:
     *                    type: string    
     *                  username:
     *                    type: string    
     *                  password:
     *                    type: string    
     *                  id:
     *                    type: string       
     */
    async getUserById(req:Request, res:Response, next:NextFunction) {
        try {
            const id = req.query.id as string;
            const data:IUser = await getUserById(id);
            res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * @swagger
     * /v1/user/active:
     *   put:
     *      summary: Active user
     *      tags: [User]
     * 
     *      parameters:
     *      - in: query
     *        name: id
     *        required: true 
     * 
     *      responses:
     *        200:
     *          description: User activated  
     * 
     *  
     * /v1/user/disable:
     *   put:
     *      summary: Disable user
     *      tags: [User]
     * 
     *      parameters:
     *      - in: query
     *        name: id
     *        required: true 
     * 
     *      responses:
     *        200:
     *          description: User disabled
     *        403:
     *          description: You don't have the right permit
     */
    async toggleActiveUser(req:Request, res:Response, next:NextFunction) {
        try {
            const id = req.query.id as string;
            const refreshtoken = req.headers.refreshtoken as string;
            const user:IUser = await getUserById(id);
            const role: number = await getRoleByRefreshToken(refreshtoken);
            const isAdmin = role === 1;
            if (isAdmin) {
                if (user === null) {
                    res.status(400).json({
                        success: false,
                        message: message.userNotFound
                    });
                    return;
                }
                const payload = {
                    ...getContentByDocument(user),
                    active: req.path === "/active"
                };
                const result:Update = await updateUser(payload, { id });
                if (result.ok) {
                    res.status(200).json({
                        success: true
                    });
                    return;
                }
                res.status(400).json({
                    success: false
                });
                return;
            } else {
                res.status(403).json({
                    success: false,
                    message: message.youMustBeAnAdmin
                })
            }
        } catch (error) {
            next(error);
        }
    };
    
    /**
     * @swagger
     * /v1/user/delete:
     *   delete:
     *      summary: Remove a specific user
     *      tags: [User]
     * 
     *      parameters:
     *      - in: query
     *        name: id
     *        required: true 
     * 
     *      responses:
     *        200:
     *          description: User Removed
     *        403:
     *          description: You don't have the right permit
     */
    async deleteUser(req:Request, res:Response, next:NextFunction){
        try {
            const id = req.query.id as string;
            const refreshtoken = req.headers.refreshtoken as string;
            const { username } = await getUserById(id);
            const role: number = await getRoleByRefreshToken(refreshtoken);
            const isAdmin = role === 1;
            if (isAdmin) {
                await removeUserById(id);
                await removeTokensByUsername(username);
                res.status(200).json({
                    success:true
                });
            } else {
                res.status(403).json({
                    success: false,
                    message: message.youMustBeAnAdmin
                })
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * @swagger
     * /v1/user/update:
     *   post:
     *      summary: Change informations profile of user
     *      tags: [User]
     * 
     *      parameters:
     *      - in: query
     *        name: id
     *        required: true 
     *      - in: body
     *        name: username
     *        required: true 
     *      - in: body
     *        name: password
     *        required: true 
     *      - in: body
     *        name: email
     *        required: true 
     *      - in: body
     *        name: currentPassword
     *        required: false
     * 
     *      responses:
     *        200:
     *          description: User Updated
     *        400:
     *          description: Current password wrong
     *        403:
     *          description: You don't have the right permit
     */
    async updateUser(req:Request, res:Response, next:NextFunction) {
        try {
            const id = req.query.id as string;
            const refreshtoken = req.headers.refreshtoken as string;
            const payload = req.body;
            const { password, currentPassword, admin, username, email } = payload;
            const token = req.headers.refreshtoken as string;
            const validData = await checkDataOnEdit(email, username, id);
            const role: number = await getRoleByRefreshToken(refreshtoken);
            const idAction: string | null = await getUserIdByRefreshToken(refreshtoken);
            const isAdmin = role === 1;
            if (isAdmin || id === idAction) {
                // posso modificare un utente solo se sono admin oppure le informazioni di me stesso
                if (!validData.success) {
                    res.status(400).json({
                        success: false,
                        message: validData.error
                    });
                    return;
                }
                if (password && currentPassword) {
                    if (await checkCurrentPassword(token, currentPassword)) {
                        // si vuole anche modificare la password dell'utente
                        payload.password = encryptPassword(password);
                    } else {
                        res.status(400).json({
                            success: false,
                            message: message.errorCurrentPassword
                        });
                        return;
                    }
                } else {
                    // in queato caso non si dovrà aggiornare la password
                    delete payload.password;
                }
                payload.role = admin ? 1 : 2;
                const result:Update = await updateUser(payload, { id });
                if (result.ok) {
                    res.status(200).json({
                        success: true
                    });
                    return;
                }
            } else {
                res.status(403).json({
                    success: false,
                    message: message.youMustBeAnAdmin
                })
                return;
            }
            res.status(400).json({
                success: false,
                message: message.genericError
            });
        } catch (error) {
            next(error);
        }
    }

};

export default new User();