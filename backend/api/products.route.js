import express from 'express';
import ProductsController from './products.controller.js';

const router = express.Router();

router.get('/', ProductsController.apiGetProducts);
router.get('/id/:id', ProductsController.apiGetProductById);
router.post('/', ProductsController.apiPostProduct);
router.put('/id/:id', ProductsController.apiUpdateProduct);
router.delete('/id/:id', ProductsController.apiDeleteProduct);


export default router;