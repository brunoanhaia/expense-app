import { Router } from 'express';
import LoginRouter from "./modules/LoginRouter";
import IRouterBase from "../interfaces/IControllerBase.interface";

class ApiRouter implements IRouterBase {

    public path = '/api';
    public router = Router();

    constructor() {
        this.initRoutes();
    }

    private routes = [
        new LoginRouter()
    ]

    public initRoutes() {
        this.router.get('/', (req, res) => {
            return res.json({"message": `${this.path}: It works`});
        });

        this.routes.forEach( route => {
            this.router.use(route.path, route.router);
        });
    }
}

export default ApiRouter;
