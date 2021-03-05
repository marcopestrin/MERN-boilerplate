import express, { Response, Request, NextFunction } from "express";
import { logSettings } from "../../const";
import Auth from '../../models/auth';

const router: express.Router = express.Router();
const auth = new Auth();

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    try {
        auth.login(req, res, next);
    } catch (error) {
        res.json(error);
    }
});
router.post("/logout", (req: Request, res: Response, next: NextFunction) => auth.logout(req, res, next));

module.exports = router;