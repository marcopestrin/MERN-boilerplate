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