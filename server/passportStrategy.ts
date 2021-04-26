import passport from "passport";
import schema from "./models/user";

const JwtStrategy = require('passport-jwt').Strategy;

export const applyPassportStrategy = () => {

    const cookieExtractor = (req) => {
        let token = "";
        if (req && req.cookies) {
            token = req.cookies['accessToken'];
        }
        return token as string;
    }

    const tokensExtractor = (req) => {
        let token = "";
        if (req && req.headers) {
            token = req.headers.accesstoken
        }
        return token as string;
    }

    const options: object = {
        //jwtFromRequest: cookieExtractor,
        jwtFromRequest: tokensExtractor,
        secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        passReqToCallback: true
    };

    passport.use(
        new JwtStrategy(options, async(req, payload, done) => {
            try {
                const query: object = { username: payload.username };
                schema.findOne(query, (err, user) => {
                    if (err) throw err;
                    if (user) {
                        return done(null, {
                            email: user.email,
                        });
                    }
                    return done(null, false);
                });
            } catch (error) {
                done(error, false);
            }
        })
    );
};