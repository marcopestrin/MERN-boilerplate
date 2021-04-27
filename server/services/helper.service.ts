import crypto from "crypto";
export const encryptPassword = (password:string) => {
    return crypto
    .createHash("md5")
    .update(password)
    .digest("hex") as string
}

export const generateActiveCode = (password:string, email:string) => {
    return crypto
    .createHash("sha256")
    .update(password.concat(email))
    .digest("hex") as string
};

export const generateUserId = (email:string) => {
    return crypto
    .createHash("sha256")
    .update(email)
    .digest("hex") as string
}