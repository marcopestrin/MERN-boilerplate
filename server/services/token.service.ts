import jwt from "jsonwebtoken";
import crypto from "crypto";
import moment from "moment";
import { Tokens, IToken, IUser } from "../interfaces";
import schema from "../models/token";
import {
    secretKeyAccessToken,
    secretKeyRefreshToken,
    accessTokenLife,
    refreshTokenLife
} from "../../const";
import { getUserByEmail, getUserByName } from "./user.service";

const generateToken = (payload:object, secret:string, life:string) => {
    const options: object = {
        expiresIn: life, //senza unità di misura fa riferimento ai secondi
        algorithm: "HS256"
    }
    return jwt.sign(payload, secret, options);
}

const saveToken = async(token:string, username:string, expires:any, type:string) => {
    await schema.create({
        token,
        username,
        expires: expires.toDate(),
        type
    })
}

export const verifyToken = async(token:string) => {
    const refreshToken = jwt.verify(token, secretKeyRefreshToken);
    if (!refreshToken) return;
    const document = await schema.findOne({
        token
    });
    if (!document) return;
    return document as IToken;
}

export const deleteToken = async(token:string, type:string) => {
    const document = await schema.findOne({ token, type });
    if (!document) return;
    await document.remove();
}

export const generateResetToken = async(name:string) => {
    const { username, password, id }:IUser = await getUserByEmail(name);
    try {
        const resetToken: string = crypto
            .createHash("md5")
            .update(username.concat(password))
            .digest("hex");
        const expires: moment.Moment = moment()
            .add("60", "m");
        await saveToken(resetToken, username, expires, "reset");
        return {
            success: true,
            info: "ok",
            resetToken,
            id,
            username
        };
    } catch (e) {
        return {
            success: false,
            info: "User not found",
            resetToken: "",
            id,
            username
        };
    }

}

export const generateTokens = async(username:string, password:string) => {
    const payload: object = { username, password };
    const accessToken = generateToken(payload, secretKeyAccessToken, accessTokenLife).toString();
    const refreshToken = generateToken(payload, secretKeyRefreshToken, refreshTokenLife).toString();
    const refreshTokenExpires: moment.Moment = moment().add(refreshTokenLife, "s");
    await saveToken(refreshToken, username, refreshTokenExpires, "refresh");
    return { accessToken, refreshToken } as Tokens;
};

export const getUsernameByResetToken = async(token:string) => {
    const document:IToken | null = await schema.findOne({ token, type: "reset" });
    if (!document) return;
    return document.username
};

export const removeTokenExpired = () => {
    const currentDate = moment().toDate();
    schema.deleteMany({expires: { $lte: currentDate }});
};

export const removeTokensByUsername = async(username:string) => {
    return await schema.deleteMany({ username });
};

export const getRoleByRefreshToken = async(token: string) => {
    const document:IToken | null = await schema.findOne({ token });
    if (!document) {
        return 0 as number
    }
    const { role } = await getUserByName(document.username);
    return role as number;
};

export const getUserIdByRefreshToken = async(token: string) => {
    const document:IToken | null = await schema.findOne({ token, type: "refresh" });
    if (!document) {
        return null;
    }
    const { id } = await getUserByName(document.username);
    return id as string;
};