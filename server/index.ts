import express, { Response, Request, NextFunction } from "express";
import passport from "passport";
import http, { Server } from "http";
import { connect } from 'mongoose';
import Logger from "@ptkdev/logger"
import bodyParser from 'body-parser';

import { port, host, databaseName, databaseServer, databasePort, logSettings  } from '../const';
import initializeRoutes from './initializeRoutes';
import initializeCors from './initializeCors';

require('dotenv').config()

const optionsLogger: object = logSettings;
const logger = new Logger(optionsLogger);

//import LoggerService from './logger';
//const logger = new LoggerService('server');

function connectDatabase() {
    connect(`mongodb://${databaseServer}:${databasePort}/${databaseName}`);
}

export function createServer() {
    logger.info('Creating serever... ');
    const app = express();
    const router = express.Router();

    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

    logger.info('Connecting to database MongoDB...');
    connectDatabase();

    logger.info('Initialize routes...');
    initializeRoutes(router);

    logger.info('Initialize CORS...');
    initializeCors(app);

    app.use(passport.initialize());
    app.use(router);

    const server: Server = http.createServer(app);

	server.listen(port, () => logger.info(`App listening on ${host}`));
}
