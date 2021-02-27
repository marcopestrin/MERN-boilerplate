import express, { Response, Request, NextFunction } from "express";

const router: express.Router = express.Router();

router.get("/getUsers", async(req: Request, res: Response, next: NextFunction) => {
	try {
        res.json({
			'example': 'lorem ipsum'
		});
	} catch (e) {
		next(e);
	}
});

module.exports = router;
