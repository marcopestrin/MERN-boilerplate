import express from "express";
import passport from "passport";
import user from "../controllers/userController";
import validate from "../middlewares/validate";
import schema from "../validations/user";

const router: express.Router = express.Router();

const passportJWT = passport.authenticate('jwt', { session: false });

router
.post("/update", validate(schema.updateUser), passportJWT, user.updateUser)
.post("/create", validate(schema.createNewUser), user.createNewUser.bind(user))

.put("/active", validate(schema.toggleActiveUser), passportJWT, user.toggleActiveUser)
.put("/disable", validate(schema.toggleActiveUser), passportJWT, user.toggleActiveUser)

.delete("/delete", validate(schema.deleteUser), passportJWT, user.deleteUser)

.get("/getAllUsers", passportJWT, user.getAllUsers)
.get("/getUserById", validate(schema.getUserById), passportJWT, user.getUserById)
.get("/confirmEmail/:activeCode", validate(schema.confirmEmail), user.confirmEmail.bind(user))

module.exports = router;