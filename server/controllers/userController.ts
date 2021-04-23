import { Response, Request, NextFunction } from "express";
import schema from "../models/user";
import { generateUserId } from "./functions";
import { IUser } from "../interfaces";
import { getUserList, getUserById, createUser } from "../services/user.service";
import { encryptPassword, generateActiveCode } from "../services/helper.service";
import { sendRegistrationEmail } from "../services/email.service";

const message = require("./message.json");
class User {

    /**
     * @swagger
     * /v1/user/confirmEmail/{email}/{activeCode}:
     *   get:
     *      summary: Validate the user
     *      tags: [User]
     * 
     *      parameters:
     *      - in: path
     *        name: email
     *        required: true
     *      - in: path
     *        name: activeCode
     *        required: true
     * 
     *      responses:
     *        200:
     *          description: User confirmed
     *                  
     */
    confirmEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const query: object = {
                activeCode: req.params.activeCode,
                email: req.params.email
            };
            const set: object = { $set: {
                activeCode: '',
                active: true
            }};
            schema.updateOne(query, set)
            .exec((err: object, result: any) => {
                if (err) throw err;
                if (result.ok) {
                    if (result.nModified){
                        res.status(200).send(message.userActivated);
                    } else {
                        res.status(200).send(message.good);
                    }
                }
                throw result
            })
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
    async createNewUser(req: Request, res: Response, next: NextFunction) {
        try {
            const password:string = req.body;
            const username:string = req.body;
            const email:string = req.body;
            const activeCode:string = generateActiveCode(password, email);

            const payload:IUser = {
                username,
                password: encryptPassword(password),
                email,
                id: generateUserId(email),
                activeCode
            };
            const result:IUser | null = await createUser(payload);
            if (!result) {
                res.status(400).json({
                    success: false
                });
                return
            }
            const isSended = sendRegistrationEmail(email, activeCode);
            if (!isSended) {
                res.status(400).json({
                    success: false
                });
                return
            }
            res.status(200).json({
                success: true,
                data: result
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
    async getAllUsers(req: Request, res: Response, next: NextFunction) {
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
    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const data: IUser = await getUserById(req.query.id);
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
     */
    toggleActiveUser(req: Request, res: Response, next: NextFunction) {
        try {
            let active: boolean;
            if (req.path === "/disable") {
                active = false
            } else if (req.path === "/active") {
                active = true
            } else {
                throw new Error('path not found')
            }
            const query: object = {
                id: req.query.id
            };
            const set: object = { $set:
                { active }
            };
            schema.updateOne(query, set)
            .exec((err: object, result:object) => {
                if (err) throw err;
                res.status(200).json(result);
            })
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
     */
    deleteUser(req: Request, res: Response, next: NextFunction){
        try {
            const { id } = req.query;
            const query: object = { id };
            schema.deleteOne(query)
            .exec((err: object, result: object) => {
                if (err) throw err;
                res.status(200).json(result);
            });
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
     * 
     *      responses:
     *        200:
     *          description: User Updated
     */
    updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password, email } = req.body;
            const { id } = req.query;
            const query: object = { id };
            const set: object = { $set: {
                username,
                password,
                email
            } }
            schema.updateOne(query, set)
            .exec((err: object, result:object) => {
                if (err) throw err;
                res.status(200).json(result);
            })
        } catch (error) {
            next(error);
        }
    }

};

export default new User();