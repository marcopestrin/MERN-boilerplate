import express, { Response, Request, NextFunction } from "express";
import User from '../../models/user';

const router: express.Router = express.Router();
const user = new User();
const { createNewUser } = user;

const checkAuth = () => {}

const middleware = async(req: Request, res: Response, next: NextFunction) => {
	await checkAuth();
	next()
};

router.post("/create", middleware, createNewUser);


module.exports = router;
