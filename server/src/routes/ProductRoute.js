const express = require("express");
const ProductController = require("../product/product.controller");
const StockController = require("../stock/stock.controller");
const UserMiddleware = require("../middleware/AuthUser")
const router = express.Router();

// GET ALL PRODUCT
router.get('/', UserMiddleware.verifyUsers, ProductController.getAllProduct)
// CREATE PRODUCT
router.post('/addProduct', UserMiddleware.verifyUsers, UserMiddleware.adminOnly, ProductController.createProduct)
// GET PRODUCT BY ID
router.get('/:id', UserMiddleware.verifyUsers, UserMiddleware.adminOnly, ProductController.getProductById)
// DELETE PRODUCT
router.delete('/:id', UserMiddleware.verifyUsers, UserMiddleware.adminOnly, ProductController.deleteProduct)
// UPDATE PRODUCT
router.patch('/updateProduct/:id', UserMiddleware.verifyUsers, UserMiddleware.adminOnly, ProductController.updateProduct)
// GET ALL PRODUCT BY BRANCH
router.get('/stock/:branchId', UserMiddleware.verifyUsers, ProductController.getAllProductByBranch)
// UPDATE STOCK BY PRODUCT
router.patch('/stock/:branchId/:productId', UserMiddleware.verifyUsers, UserMiddleware.adminOnly, StockController.updateStock)

module.exports = router