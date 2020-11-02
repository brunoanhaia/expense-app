import express from 'express';
import { Router } from 'express';
import IRouterBase from "../../interfaces/IControllerBase.interface";

class LoginRouter implements IRouterBase {
	public path = '/login';
	public router = Router();

	constructor() {
		this.initRoutes();
	}

	public initRoutes() {
		this.router.route('/')
			.get((req, res) => {
				return res.json({"message": `Login: It works`});
			});
	}
}

export default LoginRouter;
