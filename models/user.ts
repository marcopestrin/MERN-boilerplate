import schema from './schema/user';
import { Response, Request, NextFunction } from "express";

export default class User {

    createNewUser(req: Request, res: Response) {
        const payload: any = req.body;
        try {
            schema.create(payload, (err: object, result: object) => {
                if (err) throw err;
                res.json(result);
            })
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    };

    getAllUser(req: Request, res: Response) {
        try {
            schema.find({}, (err: object, result: object) => {
                if (err) throw err;
                res.json(result);
            })
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    };

    getUserById(req: Request, res: Response) {
        const { id } = req.query;
        const fieldsToReturn: string = "username password id email -_id";
        const query: object = { id };

        try {
            schema.find(query, fieldsToReturn)
            .exec((err: object, result: object) => {
                if (err) throw err;
                res.json(result);
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    };

    activeUserById(req: Request, res: Response) {
        const { id } = req.query;
        const query: object = { id };
        const set: object = { $set: { active: true } }

        try {
            schema.updateOne(query, set)
            .exec((err: object, result:object) => {
                res.json(result);
            })
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    };
};