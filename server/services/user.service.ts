import { IUser, Update } from "../interfaces/index"
import schema from "../models/user";

export const getUserByName = async(username:string) => {
    return await schema.findOne({ username }) as IUser; 
}

export const getUserByEmail = async(email:string) => {
    return await schema.findOne({ email }) as IUser; 
}

export const getUserById = async(id:string) => {
    return await schema.findOne({ id }) as IUser;
}

export const getUserList = async() => {
    return await schema.find({}) as Array<object>;
}

export const updateUser = async(payload:object, query:object) => {
    return await schema.updateOne(query, {
        $set: {  ...payload }
    }) as Update;
}

export const createUser = async(payload:IUser) => {
    const user = getUserByEmail(payload.email);
    if (!user) {
        return await schema.create(payload) as IUser;
    }
    return null
}