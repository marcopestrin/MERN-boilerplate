import { Express, Response, Request, NextFunction } from "express";

export default function errorMiddlewares(app: Express): void {
	app.use((
        err: any,
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        const commonErrorStateCode = [404, 403, 401, 400];
		if ( commonErrorStateCode.includes(err.status)) {
            console.error(err);
        }
		let status = err.status ? err.status : 500;
		let errorMessage: {
            response: string;
            message: any;
            errors: any;
            status: any;
            stack?: any
        } = {
			response: "error",
			message: err.message,
			errors: err.errors,
			status,
		};
		res.status(status).send(errorMessage);
	});
}
