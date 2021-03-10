import express, { Response, Request, NextFunction } from "express";
import passport from "passport";
import User from "../controllers/user";
//import Auth from "../controllers/auth";

const router: express.Router = express.Router();
const user = new User();

// const auth = new Auth();
// const middleware = async(req: Request, res: Response, next: NextFunction) => {
// 	const result = await auth.verifyToken(req, res, next);
// 	const validate = await auth.validateBody(req, res, next);
// 	next();
// };
const passportJWT = passport.authenticate('jwt', { session: false });

router.post("/create", passportJWT, user.createNewUser);
router.post("/update", passportJWT, user.updateUser);
router.put("/active", passportJWT, user.toggleActiveUser);
router.put("/disable", passportJWT, user.toggleActiveUser);
router.delete("/delete", passportJWT, user.deleteUser);

router.get("/getAllUser", passportJWT, user.getAllUser);
router.get("/getUserById", passportJWT, user.getUserById);

module.exports = router;