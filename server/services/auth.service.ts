import { IUser, CheckCredentials } from "../interfaces/index"
import schema from "../models/user";
import { encryptPassword } from "./helper.service";

export const checkCredentials = async(username:string, password:string) => {
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
            userActive: user[0].active,
            userId: user[0].id
        } as CheckCredentials;
    }
    return {
        success: false,
        userRole: null,
        userActive: null
    } as CheckCredentials;
}