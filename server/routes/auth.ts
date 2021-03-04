import express, { Response, Request, NextFunction } from "express";
import Auth from '../../models/auth';

const router: express.Router = express.Router();
const auth = new Auth();
const { login, logout } = auth;

router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
