const express = require("express");
const SaleController = require("../sales/sale.controller");
const UserMiddleware = require("../middleware/AuthUser");

const router = express.Router();

// Route untuk mendapatkan semua sale
router.get("/", SaleController.getAllSales);

// Route untuk mendapatkan sale berdasarkan branchId
router.get("/branch/:branchId", UserMiddleware.verifyUsers, SaleController.getSaleByBranch);

// Route untuk mendapatkan sale berdasarkan ID
router.get("/:saleId", UserMiddleware.verifyUsers, UserMiddleware.adminOnly, SaleController.getSaleById);

// Route untuk membuat sale
router.post("/addSale/:branchId", UserMiddleware.verifyUsers, SaleController.createSale);
 
// Route untuk menghapus sale berdasarkan ID
router.delete("/:saleId",UserMiddleware.verifyUsers, UserMiddleware.adminOnly, SaleController.deleteSale);

// Route untuk memperbarui sale berdasarkan ID
router.patch("/updateSale/:saleId",UserMiddleware.verifyUsers, UserMiddleware.adminOnly, SaleController.updateSale);

module.exports = router;
