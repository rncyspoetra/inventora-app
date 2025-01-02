const express = require("express");
const CategoryController = require("../category/category.controller");
const UserMiddleware = require("../middleware/AuthUser")
const router = express.Router();

// GET ALL CATEGORY
router.get('/', UserMiddleware.verifyUsers, CategoryController.getAllCategory)
// CREATE CATEGORY
router.post('/addCategory', UserMiddleware.verifyUsers, UserMiddleware.adminOnly, CategoryController.createCategory)
// GET CATEGORY BY ID
router.get('/:id', UserMiddleware.verifyUsers, UserMiddleware.adminOnly, CategoryController.getCategoryById)
// DELETE CATEGORY
router.delete('/:id', UserMiddleware.verifyUsers, UserMiddleware.adminOnly, CategoryController.deleteCategory)
// UPDATE CATEGORY
router.patch('/updateCategory/:id', UserMiddleware.verifyUsers, UserMiddleware.adminOnly, CategoryController.updateCategory)

module.exports = router