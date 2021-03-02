import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
    username: String,
    password: String,
    email: String,
    id: String,
    active: Boolean
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: {type: String, required: true },
    id: { type: String, required: true },
    active: { type: Boolean, default: false }
});

export default mongoose.model<IUser>('User', UserSchema);