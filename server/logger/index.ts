import * as winston from 'winston';

class LoggerService {

    route: string;
    logger: winston.Logger;

    constructor(route) {
        this.route = route
        const logger = winston.createLogger({
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: `./logs/${route}.log`
                })
            ],
            format: winston.format.printf((info) => {
                let message: string = `${new Date(Date.now()).toUTCString()} | ${info.level.toUpperCase()} | ${route}.log | ${info.message} | `;
                message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message;
                return message;
            })
        });
        this.logger = logger;
    }

    async info(message: string, obj: object) {
        if (Object.keys(obj).length) {
            this.logger.log('info', message, { obj });
        } else {
            this.logger.log('info', message);
        }
    }
}

export default LoggerService;