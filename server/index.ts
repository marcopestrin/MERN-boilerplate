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

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); //no cors
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.header(
          "Content-Type",
          "application/x-www-form-urlencoded; charset=UTF-8"
        );
        next();
    });

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
	server.listen(port, () => console.log(`App listening on ${host}`));

    // process.on('uncaughtException', function (error) {
    //     console.log(error.stack);
    //  });
};



