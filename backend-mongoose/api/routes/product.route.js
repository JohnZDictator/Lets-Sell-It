const express = require('express');

const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/product.controller.js');

const verifyToken = require('../middlewares/verifyToken.middleware.js');
const { isSellerOrAdmin, isProductOwner } = require('../middlewares/authorization.middleware.js');

const router = express.Router();

router.post('/', verifyToken, isSellerOrAdmin, createProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.put('/:id', verifyToken, isSellerOrAdmin, isProductOwner, updateProduct);
router.delete('/:id', verifyToken, isSellerOrAdmin, isProductOwner, deleteProduct);


module.exports = router;