import express, { Response, Request, NextFunction } from "express";
import passport from "passport";
import http, { Server } from "http";
import { port, host } from '../const';
import initializeRoutes from './initializeRoutes';
import LoggerService from './logger';
import initializeCors from './initializeCors';
const logger = new LoggerService('server');

export function createServer() {
    logger.info("Starting server...", {});
    const app = express();
    const router = express.Router();

    initializeRoutes(router);
    initializeCors(app);

    app.use(passport.initialize());
    app.use(router);

    const server: Server = http.createServer(app);

	server.listen(port, () => logger.info(`App listening on ${host}`, {}));
}
