export const isProduction = process.env.NODE_ENV === "production";
export const port = process.env.PORT ? process.env.PORT : 8000;
export const host = `http://localhost:${port}`;
export const logSettings = {
	"write": true,
	"rotate": {
		"size": "10K",
		"encoding": "utf8"
	},
	"path": { // remember: add string *.log to .gitignore
		"debug_log": "./debug.log",
		"error_log": "./errors.log",
	}
};
export const databaseName = "mern-boilerplate";
export const databasePort = "27017";
export const databaseServer = "localhost";
export const applicationDomain = "pes-mern-boilerplate";
export const expiresAccessToken =  900000; // millisecond

export const usernameDatabase = process.env.USERNAME_DATABASE;
export const passwordDatabase = process.env.PASSWORD_DATABASE;
export const hostDatabase = process.env.HOST_DATABASE;
export const nameDatabase = process.env.NAME_DATABASE;
export const urlDatabase = process.env.URL_DATABASE;