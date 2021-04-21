import jwt from "jsonwebtoken";
import moment from "moment";
import { Tokens } from "../interfaces";
import schema from "../models/token";
import { secretKeyAccessToken, secretKeyRefreshToken, accessTokenLife, refreshTokenLife } from "../../const";


const generateToken = (payload:object, secret:string, life:string) => {
    const options: object = {
        expiresIn: life, //senza unità di misura fa riferimento ai secondi
        algorithm: "HS256"
    }
    return jwt.sign(payload, secret, options);
}

const saveToken = async(token:string, username:string, expires:any, type:string) => {
    const document = await schema.create({
        token,
        username,
        expires: expires.toDate(),
        type
    })
    return document;
}


export const generateTokens = async(username:string, password:string) => {
    const payload: object = { username, password };
    const accessToken = generateToken(payload, secretKeyAccessToken, accessTokenLife).toString();
    const refreshToken = generateToken(payload, secretKeyRefreshToken, refreshTokenLife).toString();
    const refreshTokenExpires: moment.Moment = moment().add(refreshTokenLife, "s");
    await saveToken(refreshToken, username, refreshTokenExpires, "refresh");
    return { accessToken, refreshToken } as Tokens;
};