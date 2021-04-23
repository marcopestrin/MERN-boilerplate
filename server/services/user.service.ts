import { IUser, Update } from "../interfaces/index"
import schema from "../models/user";

export const getUserByName = async(username:string) => {
    return await schema.findOne({ username }) as IUser; 
}

export const getUserByEmail = async(email:string) => {
    return await schema.findOne({ email }) as IUser; 
}

export const updateUser = async(payload: object, query: object) => {
    return await schema.updateOne(query, {
        $set: {  ...payload }
    }) as Update;
}
