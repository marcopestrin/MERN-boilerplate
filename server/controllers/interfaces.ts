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
