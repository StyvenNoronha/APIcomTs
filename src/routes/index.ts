import { Router } from 'express';
import { productsRouter } from './products-route';

const router = Router();
router.use("/produtos",productsRouter);

export {router};