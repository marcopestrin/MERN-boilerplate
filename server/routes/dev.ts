import express from "express";
import dev from "../controllers/devController";

const router: express.Router = express.Router();

router.get("/version", dev.getVersion);

module.exports = router;