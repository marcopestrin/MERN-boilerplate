import schema from './schema/user';
import { Response, Request, NextFunction } from "express";

export default class User {
    createNewUser(req: Request, res: Response, next: NextFunction) {
        const payload: any = req.body;
        try {
            schema.create(payload, (err: object, result: object) => {
                if (err) throw err;
                res.json(result);
            })
        } catch (error) {
            console.log("error", error)
        }
    }
};