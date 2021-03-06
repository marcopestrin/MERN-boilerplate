import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import passport from 'passport'
import schema from './schema/user';
import { Strategy, ExtractJwt } from 'passport-jwt';

interface tokens {
    accessToken: String,
    refreshToken: String
};

export const applyPassportStrategy = () => {
    const options: any = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = 'ciao';
    // passport.use(
    //   new Strategy(options, (payload, done) => {
    //     schema.findOne({ email: payload.email }, (err, user) => {
    //       if (err) {
    //         return done(err, false);
    //       }
    //       if (user) {
    //         return done(null, {
    //           email: user.email,
    //         });
    //       }
    //       return done(null, false);
    //     });
    //   })
    // );
  };
  
export default class Auth {

    generateTokens(username: string, password: string){
        console.log("Generate tokens");
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
        console.log("validate input");
        return true;
    };

    checkCredentials(username: string, password: string) {
        // verificare se le credenziali sono corrette
        console.log('checkCredentials');
        return true;
    };

    verifyToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("verifyToken")
            const token = req.cookies.accessToken || '';
        if (!token) {
            return res.status(401).json('You need to Login')
        }
        return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);          
        } catch (err) {
            return res.status(500).json(err.toString());
        }
    };


    login(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("login inizio");
            const { username, password } = req.body;
            if (this.validationInput(username, password)) {
                if (this.checkCredentials(username, password)) {
                    const tokens: tokens = this.generateTokens(username, password);
                    res.cookie('accessToken', tokens.accessToken);
                    res.cookie('refreshToken', tokens.refreshToken);
                    console.log("fine login")
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