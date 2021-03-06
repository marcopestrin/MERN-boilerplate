import express, { Response, Request, NextFunction } from "express";
import User from '../../models/user';
import Auth from '../../models/auth';

const router: express.Router = express.Router();
const user = new User();
const auth = new Auth();

const {
	createNewUser,
	getAllUser,
	getUserById,
	toggleActiveUser,
	deleteUser,
	updateUser
} = user;

const middleware = async(req: Request, res: Response, next: NextFunction) => {
	console.log("inizio middleware degli user");
	const result = await auth.verifyToken(req, res, next);
	const validate = await auth.validateBody(req, res, next);
	console.log("fine middleware degli user", result, validate);
	next();
};

router.post("/create", middleware, createNewUser);
router.post("/update", middleware, updateUser);
router.put("/active", middleware, toggleActiveUser);
router.put("/disable", middleware, toggleActiveUser);
router.delete("/delete", middleware, deleteUser);

router.get("/getAllUser", middleware, getAllUser);
router.get("/getUserById", middleware, getUserById);

module.exports = router;
