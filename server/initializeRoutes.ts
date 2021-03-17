import { Router, Request, Response } from 'express';
const user = require('./routes/user');
const auth = require('./routes/auth')
const dev = require('./routes/dev');

export default function initializeRoutes(router: Router): void {
    router.use("/v1/user", user);
    router.use("/v1/auth", auth);
    router.use("/v1/dev", dev);

    router.use((req: Request, res: Response) => {
        res.status(404).json({
            error: "page not found"
        })
    })
}
