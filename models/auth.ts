import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import schema from './schema/user';

export default class Auth {

    constructor() {
        this.generateAccessToken = this.generateAccessToken.bind(this);
        this.validationInput = this.validationInput.bind(this);
    };

    generateAccessToken(username: string, password: string){
        const payload: object = {
            username,
            password
        };
        const options: object = {
            expiresIn: process.env.ACCESS_TOKEN_LIFE,
            algorithm: 'HS256'
        };
        return {
            accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options).toString(),
            refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, options).toString()
        };
    };

    validationInput(username: string, password: string) {
        return true;
    };

    login(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;
        const validate: boolean = this.validationInput(username, password);
        if (validate){
            const tokens: object = this.generateAccessToken(username, password);
            res.json(tokens);
        } else {
            res.json("wrong input")
        }
    };

    logout(req: Request, res: Response, next: NextFunction){

    };

};