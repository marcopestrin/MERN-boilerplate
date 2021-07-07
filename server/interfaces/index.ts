import { Document } from "mongoose";

export interface MailOptions {
    from: string,
    to: string,
    subject: string,
    html: string,
    text: string,
};

export interface Tokens {
    accessToken: string,
    refreshToken: string
};

export interface Update {
    ok: number,
    n: number,
    nModified: number
}

export interface IUser extends Document {
    username: string,
    password: string,
    email: string,
    id: string,
    activeCode: string,
    active?: boolean,
    timeRegistration?: Date,
    resetToken?: string,
    role?: number
    _doc?: object
}

export interface CreateUserInput {
    username: string,
    password: string,
    email: string,
    id: string,
    activeCode: string
}
export interface IToken extends Document {
    token: string,
    username: string,
    type: string,
    expirs: Date
}

export interface CheckCredentials {
    userRole: number | null,
    userActive: boolean | null,
    success: boolean,
    userId: string,
}

export interface RequestData { 
    success: boolean;
    data: IUser | null;
    error?: any;
}