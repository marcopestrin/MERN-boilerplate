import { IUser, Update, CreateUserInput, RequestData } from "../interfaces/index"
import schema from "../models/user";

export const getUserByName = async(username:string) => {
    return await schema.findOne({ username }) as IUser; 
};

export const getUserByEmail = async(email:string) => {
    return await schema.findOne({ email }) as IUser; 
};

export const getUserById = async(id:string) => {
    return await schema.findOne({ id }) as IUser;
};

export const getUserList = async() => {
    return await schema.find({}) as Array<object>;
};

export const updateUser = async(payload:object, query:object) => {
    return await schema.updateOne(query, {
        $set: {  ...payload }
    }) as Update;
};

export const checkActiveCode = async(activeCode:string) => {
    return await schema.findOne({ activeCode }) as IUser;
};

export const removeUserById = async(id:string) => {
    return await schema.deleteOne({ id });
};

export const createUser = async(payload:CreateUserInput) => {
    try {
        const validEmail:boolean = await checkAvailableEmail(payload.email)
        if (validEmail) {
            const validUsername:boolean = await checkAvailableUsername(payload.username);
            if (validUsername) {
                const data = await schema.create(payload) as IUser;
                return {
                    success: true,
                    data,
                    error: null
                } as RequestData;
            }
            throw "Existing username"
        }
        throw "Existing email";
        
    } catch (error) {
        return {
            success: false,
            error,
            data: null
        } as RequestData;
    }
};

export const checkAvailableUsername = async(username:string) => {
    const result = await schema.find({ username });
    if (result.length > 0) {
        return false as boolean;
    }
    return true as boolean;
};

export const checkAvailableEmail = async(email:string) => {
    const user = await getUserByEmail(email);
    if (!user) {
        return true as boolean;
    }
    return false as boolean;
};

export const checkValidEmail = async(email:string) => {
    const user = await getUserByEmail(email);
    if (!user) {
        return false as boolean;
    }
    return true as boolean;
};

export const checkDataOnEdit = async(email:string, username:string, id:string) => {
    const userByUsername = await schema.find({ username });
    if (userByUsername.length === 0 || (userByUsername.length === 1 && userByUsername[0].id === id)) {
        const userByEmail = await schema.find({ email });
        if (userByEmail.length === 0 || (userByEmail.length === 1 && userByEmail[0].id === id)) {
            return {
                success: true,
                error: null,
                data: null
            } as RequestData
        }
        return {
            success: false,
            error: "Email address not available",
            data: null
        } as RequestData
    }
    return {
        success: false,
        error: "Username not available",
        data: null
    } as RequestData
};