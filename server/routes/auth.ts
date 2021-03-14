import express from "express";
import auth from '../controllers/auth';

const router: express.Router = express.Router();

router.post("/login", auth.login.bind(auth));
router.post("/reset", auth.reset.bind(auth));
router.post("/recoveryPassword", auth.recoveryPassword.bind(auth));

module.exports = router;
