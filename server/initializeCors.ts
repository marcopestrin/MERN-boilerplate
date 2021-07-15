import cors, { CorsOptions } from "cors";
import { isProduction } from "../const";
import { Express } from "express";

export default function initializeCors(app: Express): void {
	let whitelist: string[];
	if (isProduction) {
		whitelist = [ process.env.FRONTEND_URL as string ];
	} else {
		whitelist = [
			`https://localhost:9000`,
			`https://localhost:3000`,
			`http://localhost:9000`,
			`http://localhost:3000`,
			`https://mern-boilerplate-pes.herokuapp.com`,
			`http://mern-boilerplate-pes.herokuapp.com`,
		];
	}
	const corsOptions: CorsOptions = {
		credentials: true,
		origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
			console.log("origin", origin);
			console.log("whitelist", whitelist);
			if (!origin) {
				console.log("NON consentito 1")
				callback(null, true);
			} else if (whitelist.indexOf(origin) !== -1) {
				console.log("consentito 2")
				callback(null, true);
			} else {
				console.log("NON consentito 3")
				callback(new Error(`${origin} is not allowed by CORS`));
			}
		},
	};

	app.use(cors(corsOptions));
}
