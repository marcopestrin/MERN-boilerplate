import { Request, Response, NextFunction, Router } from 'express';
const user = require('./routes/user');
const auth = require('./routes/auth')

export default function initializeRoutes(router: Router): void {
    router.use("/v1/user", user);
    router.use("/v1/auth", auth);
}
