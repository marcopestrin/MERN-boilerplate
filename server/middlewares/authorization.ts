import { Response, Request, NextFunction } from "express";
import passport from "passport";
import jsonwebtoken from "jsonwebtoken";

export const checkAuthorization = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req && req.headers && req.headers.authorization) {
            const tokenParts = req.headers.authorization.split(' ');
            if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {
                const verification = jsonwebtoken.verify(tokenParts[1], process.env.ACCESS_TOKEN_SECRET, { algorithms: ['HS256'] });

            } else {
                const passportJWT = passport.authenticate('jwt', { session: false });
                if (passportJWT) {
                    next();
                }
                throw new Error("Not Authorized");
            }
        }
    } catch (error) {
        res.status(401).json({
            error
        })
    }


}