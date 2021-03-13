import passport from "passport";
import schema from "./models/user";

const JwtStrategy = require('passport-jwt').Strategy;


export const applyPassportStrategy = () => {

    const cookieExtractor = (req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['accessToken'];
        }
        return token;
    }

    const options: object = {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        passReqToCallback: true
    };

    console.log("applyPassportStrategy --- qui dentro ci passo solo all'inizio");
    passport.use(
        new JwtStrategy(options, async(req, payload, done) => {
            try {
                console.log("applyPassportStrategy --- qui dentro ci passo ogni volta che uso la strategia");
                const query: object = { username: payload.username };
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