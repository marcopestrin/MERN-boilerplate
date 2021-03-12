import { Response, Request, NextFunction } from "express";
import schema from '../models/user';
import { encryptPassword, generateActiveCode, MailOptions, sendEmail } from './commonFunctions';
class User {

    confirmEmail(req: Request, res: Response) {
        try {
            const { email, activeCode } = req.query;
            const query: object = {
                email,
                activeCode
            };
            const set: object = { $set: {
                activeCode: '',
                active: true
            }}
            schema.findOneAndUpdate(query, set)
            .exec((err: object, result: any) => {
                if (err) throw err;
                res.status(200).json({
                    active: result.active,
                    username: result.username
                })
            })
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }

    };

    createNewUser(req: Request, res: Response) {
        try {
            const { password, username, email, id } = req.body;
            const activeCode: string = generateActiveCode(password)
            const payload: object = {
                password: encryptPassword(password),
                activeCode,
                username,
                email,
                id,
            };
            schema.create(payload, async(err: any, result: object) => {
                if (err) {
                    if (11000 === err.code && err.name === 'MongoError') {
                        res.status(422).json({
                            succes: false,
                            message: 'User already exist!'
                        });
                    }
                    throw err;
                }

                const isSended = await this.sendRegistrationEmail(email, activeCode);
                if (isSended) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json('errore da gestire');
                }
            });
        } catch (error) {
            res.status(500).send(error);
        }
    };

    getAllUser(req: Request, res: Response) {
        try {
            schema.find({}, (err: object, result: object) => {
                if (err) throw err;
                res.status(200).json(result);
            })
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    };

    getUserById(req: Request, res: Response) {
        try {
            const { id } = req.query;
            const fieldsToReturn: string = "username password id email -_id";
            const query: object = { id };
            schema.find(query, fieldsToReturn)
            .exec((err: object, result: object) => {
                if (err) throw err;
                res.status(200).json(result);
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    };

    toggleActiveUser(req: Request, res: Response) {
        try {
            let active: boolean;
            if (req.path === "/disable") {
                active = false
            } else if (req.path === "/active") {
                active = true
            } else {
                throw new Error('path not found')
            }
            const { id } = req.query;
            const query: object = { id };
            const set: object = { $set:
                { active }
            }
            schema.updateOne(query, set)
            .exec((err: object, result:object) => {
                if (err) throw err;
                res.status(200).json(result);
            })
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    };

    deleteUser(req: Request, res: Response){
        try {
            const { id } = req.query;
            const query: object = { id };
            schema.deleteOne(query)
            .exec((err: object, result: object) => {
                if (err) throw err;
                res.status(200).json(result);
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    updateUser(req: Request, res: Response) {
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
            console.log(error);
            res.status(500).json(error);
        }
    }

    sendRegistrationEmail (email: string, activeCode: string) {
        const url: string = `http://${process.env.HOST_APPLICATION}:${process.env.PORT}/confirmEmail?email=${email}&activeCode=${activeCode}}`;
        const mailOptions: MailOptions = {
            from: `${process.env.applicationDomain}`,
            to: email,
            subject: "Confirm Email",
            text: "Hello world?",
            html: `Click <a href='${url}'>here</a> to activate the account`
        };
        return sendEmail(mailOptions);
    };

};

export default new User();