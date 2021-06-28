import crypto from "crypto";
import { Document } from "mongoose";

import { verifyToken } from "../services/token.service";
import { getUserByName } from "../services/user.service";

export const encryptPassword = (password:string) => {
    return crypto
    .createHash("md5")
    .update(password)
    .digest("hex") as string
};

export const generateActiveCode = (password:string, email:string) => {
    return crypto
    .createHash("sha256")
    .update(password.concat(email))
    .digest("hex") as string
};

export const generateUserId = (email:string) => {
    return crypto
    .createHash("sha256")
    .update(email)
    .digest("hex") as string
};

export const getContentByDocument = (document:Document) => {
    return document.toObject();
}

export const checkCurrentPassword = async(token:string, password:string) => {
    const document = await verifyToken(token);
    if (document !== null || document !== undefined) {
        const userDocument = await getUserByName(document!.username);
        const encryptedPassword = encryptPassword(password);
        return userDocument!.password === encryptedPassword
    }
    return false
}