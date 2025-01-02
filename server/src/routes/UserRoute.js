const express = require("express");
const userController = require("../users/user.controller");
const UserMiddleware = require("../middleware/AuthUser")
const router = express.Router();

// GET - GET ALL USER 
router.get('/', UserMiddleware.verifyUsers, UserMiddleware.adminOnly, userController.getAllUsers)
// GET - GET USER BY ID
router.get('/:id', UserMiddleware.verifyUsers, UserMiddleware.adminOnly, userController.getUserById)
// POST - CREATE USER
router.post('/addUser', UserMiddleware.verifyUsers, UserMiddleware.adminOnly, userController.createUser)
// PATCH - UPDATE USER
router.patch('/updateUser/:id', UserMiddleware.verifyUsers, UserMiddleware.adminOnly, userController.updateUser)
// DELETE - DELETE USER
router.delete('/:id', UserMiddleware.verifyUsers, UserMiddleware.adminOnly, userController.deleteUser)

module.exports = router