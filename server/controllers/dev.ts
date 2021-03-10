import { Response, Request } from "express";

const packJson = require('../../package.json');

export default class Dev {

    getVersion(req: Request, res: Response) {
        return res.status(200)
        .json({
            version: packJson.version
        });
    }

};