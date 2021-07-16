export const isProduction = process.env.NODE_ENV === "production";
export const port = process.env.PORT ? process.env.PORT : 8000;
export const host = `http://localhost:${port}`;
export const applicationDomain = "pes-mern-boilerplate";

const databaseName = "mern-boilerplate";
const databasePort = "27017";
const databaseServer = "localhost"; 

// tokens
export const secretKeyAccessToken = process.env.ACCESS_TOKEN_SECRET !== null && process.env.ACCESS_TOKEN_SECRET !== undefined ? process.env.ACCESS_TOKEN_SECRET : applicationDomain;
export const secretKeyRefreshToken = process.env.REFRESH_TOKEN_SECRET !== null && process.env.REFRESH_TOKEN_SECRET !== undefined ? process.env.REFRESH_TOKEN_SECRET : applicationDomain;
export const accessTokenLife = process.env.ACCESS_TOKEN_LIFE !== null && process.env.ACCESS_TOKEN_LIFE !== undefined ? process.env.ACCESS_TOKEN_LIFE : "86400";
export const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE !== null && process.env.REFRESH_TOKEN_LIFE !== undefined ? process.env.REFRESH_TOKEN_LIFE : "2592000";

export const urlDatabaseProduction = process.env.URL_DATABASE;
export const urlDatabaseDevelopment = `mongodb://${databaseServer}:${databasePort}/${databaseName}`