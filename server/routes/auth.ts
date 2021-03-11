import express, { Response, Request, NextFunction } from "express";
import { logSettings } from "../../const";
import Auth from '../controllers/auth';

const router: express.Router = express.Router();
const auth = new Auth();

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
module.exports = router;