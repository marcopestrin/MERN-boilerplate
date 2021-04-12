import express from "express";
import http, { Server } from "http";
import { connect } from 'mongoose';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import { port, host, isProduction, urlDatabaseDevelopment, urlDatabaseProduction } from "../const";
import initializeRoutes from "./initializeRoutes";
import initializeCors from "./initializeCors";
import { applyPassportStrategy } from "./passportStrategy";
import swaggerDocument from "../swagger.json";
import errorMiddlewares from "./middlewares/error";
import headersResponseMiddlewares from "./middlewares/headers";

require('dotenv').config();

function connectDatabase() {
    if (isProduction ) {
        connect(`${urlDatabaseProduction}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } else {
        connect(urlDatabaseDevelopment);
    }
};

export function createServer(): void {
    const app = express();
    const router = express.Router();

    headersResponseMiddlewares(app);

    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
    app.use(cookieParser());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    connectDatabase();
    applyPassportStrategy();
    initializeRoutes(router);
    initializeCors(app);
    app.use(router);
    const server: Server = http.createServer(app);
    errorMiddlewares(app);
	server.listen(port, () => console.log(`App listening on ${host}`));

    // process.on('uncaughtException', function (error) {
    //     console.log(error.stack);
    //  });
    
};



