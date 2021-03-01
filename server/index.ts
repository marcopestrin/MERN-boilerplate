import express, { Response, Request, NextFunction } from "express";
import passport from "passport";
import http, { Server } from "http";
import { port, host } from '../const';
import initializeRoutes from './initializeRoutes';
import Logger from "@ptkdev/logger"
import { logSettings } from "../const";
require('dotenv').config()

const optionsLogger: object = logSettings;
const logger = new Logger(optionsLogger);

//import LoggerService from './logger';
import initializeCors from './initializeCors';
//const logger = new LoggerService('server');

export function createServer() {
    // logger.info('Creating serever... ');
    const app = express();
    const router = express.Router();

    //logger.info('Initialize routes...');
    initializeRoutes(router);
    //logger.info('Initialize CORS...');
    initializeCors(app);

    app.use(passport.initialize());
    app.use(router);

    const server: Server = http.createServer(app);

	server.listen(port, () => logger.info(`App listening on ${host}`));
}
