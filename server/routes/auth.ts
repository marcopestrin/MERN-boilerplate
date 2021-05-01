import express from "express";
import auth from "../controllers/authController";
import validate from "../middlewares/validate";
import schema from "../validations/auth";

const router: express.Router = express.Router();

router
.post("/login", validate(schema.login), auth.login.bind(auth))
.post("/logout", validate(schema.logout), auth.logout.bind(auth))
.post("/reset", validate(schema.reset), auth.reset.bind(auth))
.post("/requestNewToken", validate(schema.requestNewToken), auth.requestNewToken.bind(auth))
.post("/recoveryPassword", validate(schema.recoveryPassword), auth.recoveryPassword.bind(auth))

module.exports = router;
