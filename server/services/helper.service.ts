import crypto from "crypto";
export const encryptPassword = (password:string) => {
    return crypto
    .createHash("md5")
    .update(password)
    .digest("hex")
}
