import { Express, Response, Request, NextFunction } from "express";

export default function headersResponseMiddlewares(app: Express): void {
	app.use((
        err:any,
        req:Request,
        res:Response,
        next:NextFunction
    ): void => {
        res.header("Access-Control-Allow-Origin", "*"); //no cors
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", "0");
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
}
