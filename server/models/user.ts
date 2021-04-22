import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces";

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: {type: String, required: true },
    id: { type: String, required: true },
    active: { type: Boolean, default: false },
    timeRegistration: { type : Date, default: Date.now },
    activeCode: { type: String },
    role: { type: Number, default: 1 } // 1 --> user, 2 --> admin
});

export default mongoose.model<IUser>('User', UserSchema);