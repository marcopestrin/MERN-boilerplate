import express, { Response, Request, NextFunction } from "express";
import passport from "passport";
import user from "../controllers/user";
//import auth from "../controllers/auth";

const router: express.Router = express.Router();

// const middleware = async(req: Request, res: Response, next: NextFunction) => {
// 	const result = await auth.verifyToken(req, res, next);
// 	const validate = await auth.validateBody(req, res, next);
// 	next();
// };
const passportJWT = passport.authenticate('jwt', { session: false });


router.post("/update", passportJWT, user.updateUser);
router.post("/create", (req: Request, res: Response, next: NextFunction) => {
    try {
        user.createNewUser(req, res, next);
    } catch (error) {
        res.json(error);
    }
});
router.put("/active", passportJWT, user.toggleActiveUser);
router.put("/disable", passportJWT, user.toggleActiveUser);

router.delete("/delete", passportJWT, user.deleteUser);

router.get("/getAllUser", passportJWT, user.getAllUser);
router.get("/getUserById", passportJWT, user.getUserById);
router.get("/confirmEmail/:email/:activeCode", (req: Request, res: Response) => {
    try {
        user.confirmEmail(req, res);
    } catch (error) {
        res.json(error);
    }
});
module.exports = router;