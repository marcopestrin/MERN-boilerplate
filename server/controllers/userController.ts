import { Response, Request, NextFunction } from "express";
import {
    IUser,
    Update,
    CreateUserInput
} from "../interfaces";
import { 
    getUserList,
    getUserById,
    createUser,
    updateUser,
    checkActiveCode,
    removeUserById
} from "../services/user.service";
import {
    encryptPassword,
    generateActiveCode,
    generateUserId
} from "../services/helper.service";
import { sendRegistrationEmail } from "../services/email.service";

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
    async confirmEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const activeCode = req.params.activeCode as string;
            const user: IUser = await checkActiveCode(activeCode);
            if (!user) return;
            const payload = {
                ...user,
                active: true,
                activeCode: ""
            }
            const result: Update = await updateUser(payload, { activeCode });
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
    async createNewUser(req: Request, res: Response, next: NextFunction) {
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
            const id = req.query.id as string;
            const data: IUser = await getUserById(id);
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
    async toggleActiveUser(req:Request, res:Response, next:NextFunction) {
        try {

            const id = req.query.id as string;
            const user:IUser = await getUserById(id);
            const payload = {
                ...user,
                active: req.path === "/active"
            };
            const result: Update = await updateUser(payload, { id })
            if (result.ok) {
                res.status(200).json({
                    success: true
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
    async deleteUser(req:Request, res:Response, next:NextFunction){
        try {
            const id = req.query.id as string;
            await removeUserById(id);
            // da rimuovere anche tutti i token associati a quell'utente
            res.status(200).json({
                success:true
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
    async updateUser(req:Request, res:Response, next:NextFunction) {
        try {
            const id = req.query.id as string;
            const payload = req.body.payload;
            const result: Update = await updateUser(payload, { id });
            if (result.ok) {
                res.status(200).json({
                    success: true
                });
                return;
            }
            res.status(400).json({
                success: false
            });
        } catch (error) {
            next(error);
        }
    }

};

export default new User();