import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import passport from 'passport'
import schema from './schema/user';
import { applicationDomain, expiresAccessToken } from '../const';
import { json } from "body-parser";

const LocalStrategy = require('passport-local').Strategy
interface tokens {
    accessToken: String,
    refreshToken: String
}
export default class Auth {

    // constructor() {
    //     this.generateAccessToken = this.generateAccessToken.bind(this);
    //     this.validationInput = this.validationInput.bind(this);
    // };

    generateTokens(username: string, password: string){
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


    initializePassport() {
        const authenticateUser = async(username: string, password: string, done: Function) => {
            try {
                const user: any = await schema.find({ username }, (err: object, res: object) => {
                    if (err) {
                        throw err;   
                    }
                    console.log(res)
                    return res
                });
                if (user === null) {
                    return done(null, false, {
                        message: 'user not found'
                    });
                }
                if (password === user.password) {
                    // PASS !!
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'password wrong'
                    });
                }
            } catch (error) {
                done(error);
            }
        };

        passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password' 
        }, authenticateUser))
    };

    login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;
            const validate: boolean = this.validationInput(username, password);
            if (validate) {
                const tokens: tokens = this.generateTokens(username, password);
                const options: object = {
                    domain: applicationDomain,
                    expires: new Date(Date.now() + expiresAccessToken)
                };
                console.log("tokens", tokens);
                this.initializePassport() 

                res.cookie('accessToken', tokens.accessToken, options)
                .cookie('refreshToken', tokens.refreshToken, options);
                res.json(tokens);

            } else {
                res.json("wrong input")
            }
        } catch (error) {
            next(error);
        }
    };

    logout(req: Request, res: Response, next: NextFunction){

    };

};