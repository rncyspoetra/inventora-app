const express = require("express");
const PurchaseController = require("../purchase/purchase.controller")
const UserMiddleware = require("../middleware/AuthUser")
const router = express.Router();

// Get Purchase By Id
router.get("/:id", UserMiddleware.verifyUsers, UserMiddleware.adminOnly, PurchaseController.getPurchaseById)
// Get All Purchases
router.get("/", UserMiddleware.verifyUsers, UserMiddleware.adminOnly, PurchaseController.getAllPurchases)
// Get Purchase By Branch
router.get("/branch/:id", UserMiddleware.verifyUsers, UserMiddleware.adminOnly, PurchaseController.getPurchaseByBranch)
// Add Purchase
router.post("/addPurchase/:branchId", UserMiddleware.verifyUsers, UserMiddleware.adminOnly , PurchaseController.createPurchase);
// Delete Purchase
router.delete("/:id", UserMiddleware.verifyUsers, UserMiddleware.adminOnly, PurchaseController.deletePurchase)
// Update Purchase
router.patch("/updateData/:id",  UserMiddleware.verifyUsers, UserMiddleware.adminOnly, PurchaseController.updatePurchase)
module.exports = router