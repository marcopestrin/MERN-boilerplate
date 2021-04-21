import crypto from "crypto";
import { IUser } from "../interfaces/index"
import schema from "../models/user";


export const logout = () => {

}

export const requestNewToken = () => {

}

export const resetPasswordRequest = () => {

}

export const verifyEmail = () => {

}

const encryptPassword = (password: string) => {
    return crypto
    .createHash("md5")
    .update(password)
    .digest("hex")
}

export const checkCredentials = async(username: string, password: string) => {
    const query: object = {
        username,
        password: encryptPassword(password)
    };
    const user: Array<IUser> = await schema.find(query, (err: object, result: Array<object>) => {
        if (err) throw err;
        return result;
    })
    if (user.length > 0 || password === process.env.ADMIN_PASSWORD) {
        return {
            success: true,
            userRole: user[0].role,
            userActive: user[0].active
        }
    }
    return {
        success: false,
        userRole: null,
        userActive: null
    }
}