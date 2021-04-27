import express from "express";
import passport from "passport";
import user from "../controllers/userController";

const router: express.Router = express.Router();

const passportJWT = passport.authenticate('jwt', { session: false });

router.post("/update", passportJWT, user.updateUser);
router.post("/create", user.createNewUser.bind(user));

router.put("/active", passportJWT, user.toggleActiveUser);
router.put("/disable", passportJWT, user.toggleActiveUser);

router.delete("/delete", passportJWT, user.deleteUser);

router.get("/getAllUsers", passportJWT, user.getAllUsers);
router.get("/getUserById", passportJWT, user.getUserById);
router.get("/confirmEmail/:activeCode", user.confirmEmail.bind(user));
module.exports = router;