import crypto from "crypto";
export const encryptPassword = (password: string) => {
    return crypto
    .createHash("md5")
    .update(password)
    .digest("hex")
};

export const generateRecoveryToken = () => {
    return crypto
    .randomBytes(32)
    .toString("hex")
}