import express from "express";
import Dev from "../controllers/dev";

const router: express.Router = express.Router();

const dev = new Dev();

router.get("/version", dev.getVersion);

module.exports = router;