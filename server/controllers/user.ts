import { Response, Request, NextFunction } from "express";
import crypto from "crypto";
import schema from '../models/user';
import { encryptPassword, generateActiveCode, MailOptions, sendEmail } from './commonFunctions';
class User {

    confirmEmail(req: Request, res: Response) {
        console.log("Confirm email request", req.params)
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
                        console.log("Confirm email: all good!")
                        res.status(200).send('all good!! user activated');
                    } else {
                        console.log("Confirm email: user already activated!")
                        res.status(200).send('good');
                    }
                }
                throw result
            })
        } catch (error) {
            console.error("Confirm email:", error);
            res.status(500).json(error);
        }
    };

    generateUserId(email: string) {
        return crypto
        .createHash("sha256")
        .update(email)
        .digest("hex")
    }

    createNewUser(req: Request, res: Response, next: NextFunction) {
        console.log("Create new user:", req.body);
        try {
            const { password, username, email } = req.body;
            const activeCode: string = generateActiveCode(password)

            const payload: object = {
                password: encryptPassword(password),
                activeCode,
                username,
                email,
                id: this.generateUserId(email)
            };
            schema.create(payload, async(err: any, result: any) => {
                if (err) {
                    if (11000 === err.code && err.name === 'MongoError') {
                        console.error("Create new user: user already exist");
                        res.status(422).json({
                            succes: false,
                            message: 'User already exist!'
                        });
                    }
                    throw err;
                }
                const isSended = await this.sendRegistrationEmail(email, activeCode);
                if (isSended) {
                    console.log("Create new user: all good");
                    res.status(200).json({
                        email: result.email,
                        username: result.username
                    });
                } else {
                    res.status(500).json('errore da gestire');
                }
            });

        } catch (error) {
            console.error("Create new user error", error);
            res.status(500).send(error);
        }
    };

    getAllUser(req: Request, res: Response) {
        try {
            console.log("Get all user request");
            schema.find({}, (err: object, result: object) => {
                if (err) throw err;
                res.status(200).json(result);
            })
        } catch (error) {
            console.error("Get all user request error:", error);
            res.status(500).json(error);
        }
    };

    getUserById(req: Request, res: Response) {
        try {
            console.log("Get user by id request", req.query);
            const { id } = req.query;
            const fieldsToReturn: string = "username password id email -_id";
            const query: object = { id };
            schema.find(query, fieldsToReturn)
            .exec((err: object, result: object) => {
                if (err) throw err;
                console.log("Get user by id: success", result);
                res.status(200).json(result);
            });
        } catch (error) {
            console.error("Get user by id: error", error);
            res.status(500).json(error);
        }
    };

    toggleActiveUser(req: Request, res: Response) {
        try {
            console.log("Toggle user request", req.query);
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
                console.log("Toggle user success", result);
                res.status(200).json(result);
            })
        } catch (error) {
            console.error("Toggle user", error);
            res.status(500).json(error);
        }
    };

    deleteUser(req: Request, res: Response){
        try {
            console.log("Delete user request", req.query);
            const { id } = req.query;
            const query: object = { id };
            schema.deleteOne(query)
            .exec((err: object, result: object) => {
                if (err) throw err;
                console.log("Delete user success", result);
                res.status(200).json(result);
            });
        } catch (error) {
            console.error("Delete user error", error);
            res.status(500).json(error);
        }
    }

    updateUser(req: Request, res: Response) {
        try {
            console.log("Update user request", req.body);
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
                console.log("Update user success", result);
                res.status(200).json(result);
            })
        } catch (error) {
            console.error("Update user error", error);
            res.status(500).json(error);
        }
    }

    sendRegistrationEmail (email: string, activeCode: string) {
        const url: string = `http://${process.env.HOST_APPLICATION}:${process.env.PORT}/v1/user/confirmEmail/${email}/${activeCode}`;
        const mailOptions: MailOptions = {
            from: `${process.env.applicationDomain}`,
            to: email,
            subject: "Confirm Email",
            text: "Hello world?",
            html: `Click <a target='_blank' href='${url}'>here</a> to activate the account`
        };
        return sendEmail(mailOptions);
    };

};

export default new User();