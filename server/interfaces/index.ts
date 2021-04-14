import { Document } from "mongoose";

export interface MailOptions {
    from: string,
    to: string,
    subject: string,
    html: string,
    text: string,
};

export interface Tokens {
    accessToken: String,
    refreshToken: String
};

export interface Update {
    ok: Number,
    n: Number,
    nModified: Number
}

export interface IUser extends Document {
    username: String,
    password: String,
    email: String,
    id: String,
    active: Boolean,
    timeRegistration: Date,
    resetToken: String,
    activeCode: String,
    role: Number
}

export interface CheckCredentials {
    userRole: Number | null,
    userActive: Boolean | null,
    success: Boolean
}