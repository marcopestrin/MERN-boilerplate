import express, { Router, Request, Response } from 'express';
import path from "path";

const user = require('./routes/user');
const auth = require('./routes/auth');
const dev = require('./routes/dev');

export default function initializeRoutes(router: Router): void {
    //BACKEND ROUTES
    router.use("/v1/user", user);
    router.use("/v1/auth", auth);
    router.use("/v1/dev", dev);

    //FRONTEND ROUTES
    router.use(express.static("client/build"));
    router.get("*", (req, res) => {
        res.sendFile(path.resolve("client", "build", "index.html"));
        //res.sendFile(path.join(__dirname, "../client/build"));
    });

    // router.use((req: Request, res: Response) => {
    //     res.status(404).json({
    //         error: "page not found"
    //     })
    // })
}
