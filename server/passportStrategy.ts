import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
const LocalStrategy = require("passport-local").Strategy;
import schema from "../models/schema/user";

export const applyLocalStrategy = () => {
    const options: object = {
        usernameField: 'email'
    }
    passport.use(
        new LocalStrategy(options,
            async(email: string, password: string, done: any) => {
                try {
                    schema.findOne({ email }, (err, user) => {
                        if (err) throw err;
                        if (user) {
                            // all good!
                            return done(null, user);
                        }
                        return done(null, false);
                    })
                } catch (error) {
                    done(error, false);
                }
            }
        )
    )
};


export const applyPassportStrategy = () => {
    const options: object = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'ciao'
    };
    passport.use(
      new Strategy(options,
        async(payload, done) => {
            const query: object = { email: payload.email };
            try {
                schema.findOne(query, (err, user) => {
                    if (err) throw err;
                    if (user) {
                        // all good!
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