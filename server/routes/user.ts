import express, { Response, Request, NextFunction } from "express";
import User from '../../models/user';

const router: express.Router = express.Router();
const user = new User();
const { createNewUser, getAllUser, getUserById, toggleActiveUser, deleteUser } = user;

const checkAuth = () => {}

const middleware = async(req: Request, res: Response, next: NextFunction) => {
	await checkAuth();
	next()
};

router.post("/create", middleware, createNewUser);
router.put("/active", middleware, toggleActiveUser);
router.put("/disable", middleware, toggleActiveUser);
router.delete("/delete", middleware, deleteUser);

router.get("/getAllUser", middleware, getAllUser);
router.get("/getUserById", middleware, getUserById);

module.exports = router;
