import express from "express";
import http, { Server } from "http";
import { connect } from 'mongoose';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"

import { port, host, databaseName, databaseServer, databasePort } from "../const";
import initializeRoutes from "./initializeRoutes";
import initializeCors from "./initializeCors";
import { applyPassportStrategy } from "./passportStrategy";

require('dotenv').config()

function connectDatabase() {
    // METTERE LE CREDENZIALI DEL DATABASE
    connect(`mongodb://${databaseServer}:${databasePort}/${databaseName}`);
}

export function createServer(): void {
    const app = express();
    const router = express.Router();

    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
    app.use(cookieParser());

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

