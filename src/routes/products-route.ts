import { Router } from "express";
import { myMyMiddleware } from "../middlewares/my-middlewares";
import {ProductsRouter} from "../controllers/ProductsController";


const productsRouter = Router()
const productsController = new ProductsRouter();

productsRouter.get('/',productsController.index );

productsRouter.post('/', myMyMiddleware, productsController.create);

export {productsRouter};