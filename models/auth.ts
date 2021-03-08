import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import schema from "./schema/user";
import { encryptPassword } from './commonFunctions';
interface tokens {
    accessToken: String,
    refreshToken: String
};

export const applyPassportStrategy = () => {
    const options: any = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = 'ciao';
    passport.use(
      new Strategy(options, (payload, done) => {
        schema.findOne({ email: payload.email }, (err, user) => {
          if (err) {
            return done(err, false);
          }
          if (user) {
              // all good!
            return done(null, {
              email: user.email,
            });
          }
          return done(null, false);
        });
      })
    );
  };
  
export default class Auth {

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

    validateBody(req: Request, res: Response, next: NextFunction) {
        // inseire qui la validazione del body quando faccio update
        return true
    };

    validationInput(username: string, password: string) {
        // inserire qui il valiatore dei dati di input
        return true;
    };

    async checkCredentials(username: string, password: string) {
        const query: object = {
            username,
            password: encryptPassword(password)
        };
        const user: Array<object> = await schema.find(query, (err: object, result: Array<object>) => {
            if (err) throw err;
            return result
        })
        return user.length > 0 || password === process.env.ADMIN_PASSWORD;
    };


    verifyToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.accessToken || '';
        if (!token) {
            return res.status(401).json('You need to Login')
        }
        return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);          
        } catch (err) {
            return res.status(500).json(err.toString());
        }
    };


    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;
            if (this.validationInput(username, password)) {
                const validCredentials:boolean = await this.checkCredentials(username, password);
                if (validCredentials) {
                    const tokens: tokens = this.generateTokens(username, password);
                    res.cookie('accessToken', tokens.accessToken);
                    res.cookie('refreshToken', tokens.refreshToken);
                    res.json(tokens);
                } else {
                    res.json('wrong credentials');
                }
            } else {
                res.json("wrong input");
            }
        } catch (error) {
            next(error);
        }
    };

    logout(req: Request, res: Response, next: NextFunction){

    };

};