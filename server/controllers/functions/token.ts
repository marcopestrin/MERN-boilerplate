import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

import schema from "../../models/user";
import { Update } from "../../interfaces";

const message = require("../message.json");

export const generateTokens = (username: string, password: string) => {
    const payload: object = {
        username,
        password
    };
    const optionsAccessToken: object = {
        expiresIn: process.env.ACCESS_TOKEN_LIFE, //50s
        algorithm: 'HS256'
    };
    const optionsRefreshToken: object = {
        expiresIn: process.env.REFRESH_TOKEN_LIFE, //50d
        algorithm: 'HS256'
    };
    return {
        accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, optionsAccessToken).toString(),
        refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, optionsRefreshToken).toString()
    };
};

export const verifyToken = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.accessToken || '';
        if (!token) {
            res.status(401).json(message.tokenNotSet);
        }
        return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);          
    } catch (error) {
        next(error);
    }
}

export const getUserByRefreshToken = async(refreshToken: string) => {
    try {
        const user = await schema.findOne({ refreshToken }, (error: object, result: any) => {
            if (error) throw error;
            return result
        })
        return {
            success: true,
            error: null,
            user
        }
    } catch (error) {
        return {
            success: false,
            user: {},
            error
        }
    }
}

export const saveRefreshToken = async(refreshToken: String, next: NextFunction) => {
    const { ok }: Update  = await schema.updateOne({ refreshToken }, (err: object, result: object) => {
        if (err) throw err;
        return result
    })
    return ok ? true : false;
};