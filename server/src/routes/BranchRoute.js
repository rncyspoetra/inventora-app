const express = require("express");
const BranchController = require("../branch/branch.controller");
const UserMiddleware = require("../middleware/AuthUser")
const router = express.Router();

// GET - GET ALL BRANCH
router.get('/', /* UserMiddleware.verifyUsers, UserMiddleware.adminOnly, */ BranchController.getAllBranch)
// GET - GET BRANCH BY ID
router.get('/:id', /* UserMiddleware.verifyUsers, UserMiddleware.adminOnly, */ BranchController.getBranchById)
// POST - CREATE BRANCH
router.post('/addBranch', UserMiddleware.verifyUsers, UserMiddleware.adminOnly, BranchController.createBranch)
// PATCH - UPDATE BRANCH
router.patch('/updateBranch/:id', UserMiddleware.verifyUsers, UserMiddleware.adminOnly, BranchController.updateBranch)
// DELETE - DELETE BRANCH
router.delete('/:id', UserMiddleware.verifyUsers, UserMiddleware.adminOnly, BranchController.deleteBranch)

module.exports = router
