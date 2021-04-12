export const isProduction = process.env.NODE_ENV === "production";
export const port = process.env.PORT ? process.env.PORT : 8000;
export const host = `http://localhost:${port}`;
export const applicationDomain = "pes-mern-boilerplate";

const databaseName = "mern-boilerplate";
const databasePort = "27017";
const databaseServer = "localhost";

// export const usernameDatabase = process.env.USERNAME_DATABASE;
// export const passwordDatabase = process.env.PASSWORD_DATABASE;
// export const hostDatabase = process.env.HOST_DATABASE;
// export const nameDatabase = process.env.NAME_DATABASE;

export const urlDatabaseProduction = process.env.URL_DATABASE;
export const urlDatabaseDevelopment = `mongodb://${databaseServer}:${databasePort}/${databaseName}`