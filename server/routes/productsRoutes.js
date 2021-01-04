const express = require("express");
const router = express.Router();
const { findAllProducts, updateProduct, newProduct } = require('../requests/ProductsAPI');
router.get('/all-products', findAllProducts);
router.post('/update-products', updateProduct);
router.post('/add-new-product', newProduct);

module.exports = router;