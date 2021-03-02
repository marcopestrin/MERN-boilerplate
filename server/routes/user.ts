import express, { Response, Request, NextFunction } from "express";
import User from '../../models/user';

const router: express.Router = express.Router();
const user = new User();
const { createNewUser } = user;

router.post("/create", async(req: Request, res: Response, next: NextFunction) => {
	try {
        const result: any = await createNewUser(req.body);
		res.json(result);

	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
