import express, { Response, Request, NextFunction } from "express";
import auth from '../controllers/auth';

const router: express.Router = express.Router();

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    try {
        auth.login(req, res, next);
    } catch (error) {
        res.json(error);
    }
});

router.post("/reset", (req: Request, res: Response, next: NextFunction) => {
    try {
        auth.reset(req, res, next);
    } catch (error) {
        res.json(error);
    }
});

router.post("/recoveryPassword", (req: Request, res: Response, next: NextFunction) => {
    try {
        auth.recoveryPassword(req, res, next);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
