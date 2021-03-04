import { Response, Request, NextFunction } from "express";
import schema from './schema/user';

export default class User {

    createNewUser(req: Request, res: Response) {
        try {
            const payload: object = req.body;
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
        try {
            const { id } = req.query;
            const fieldsToReturn: string = "username password id email -_id";
            const query: object = { id };
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
            const set: object = { $set: { active } }
            schema.updateOne(query, set)
            .exec((err: object, result:object) => {
                if (err) throw err;
                res.json(result);
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
                res.json(result);
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
};