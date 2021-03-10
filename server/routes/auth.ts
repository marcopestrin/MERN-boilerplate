import express, { Response, Request, NextFunction } from "express";
import { logSettings } from "../../const";
import Auth from '../controllers/auth';

const router: express.Router = express.Router();
const auth = new Auth();

router.post("/login", auth.login);
module.exports = router;