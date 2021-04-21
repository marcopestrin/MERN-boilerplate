import mongoose, { Schema } from "mongoose";
import { IToken } from "../interfaces";

const TokenSchema: Schema = new Schema({
    token: { type: String, required: true, index: true },
    username: { type: String, required: true },
    type: { type: String, required: true },
    expires: { type: Date, required: true }
}, {
    timestamps: true
});

export default mongoose.model<IToken>('Token', TokenSchema);