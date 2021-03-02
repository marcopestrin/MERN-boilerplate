import { Request, Response, NextFunction, Router } from 'express';
const user = require('./routes/user');

export default function initializeRoutes(router: Router): void {
    router.use("/v1/user", user);
}
