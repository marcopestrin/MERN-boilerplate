import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { isProduction } from "../const";

const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.1",
		host: process.env.BACKEND_URL,
		info: {
			title: "MERN Boilerplate by Marco Pestrin"
		},
		components: {
			securitySchemes: {
				refreshToken: {
					type: "apiKey",
					in: "header",
					name: "refreshToken",
					description: "Refresh token required",
				},
				accessToken: {
					type: "apiKey",
					in: "header",
					name: "accessToken",
					description: "Access token required",
				}
			},
		},
		servers: [
			{
				url: process.env.BACKEND_URL,
				description: "Main API Server",
			},
		],
	},
	apis: [
		"./server/routes/*.ts",
		"./server/controllers/*.ts"
	],
};

export default function initializeSwagger(app: Express): void {
	if (isProduction) return;
	const specs = swaggerJsdoc(swaggerOptions);
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
