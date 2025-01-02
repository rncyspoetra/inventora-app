const SaleRepository = require("../sales/sale.repository");
const StockRepository = require("../stock/stock.repository")

// Get sales by branch
const getSaleByBranch = async (req, res) => {
    const { branchId } = req.params; 
    try {
        const sales = await SaleRepository.getSaleByBranch(branchId);

        res.status(200).send({
            message: "Data penjualan berhasil diambil.",
            data: sales,
        });
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data penjualan:", error);
        res.status(500).send({
            message: "Terjadi kesalahan saat mengambil data penjualan.",
            error: error.message,
        });
    }
};

// Get sale by ID
const getSaleById = async (req, res) => {
    const { saleId } = req.params
    try {
        const sale = await SaleRepository.getSaleById(parseInt(saleId));

        if (!sale) {
            return res.status(404).send({
                message: `Data penjualan dengan ID ${saleId} tidak ditemukan.`,
            });
        }

        res.status(200).send({
            message: "Data penjualan berhasil diambil.",
            data: sale,
        });
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data penjualan:", error);
        res.status(500).send({
            message: "Terjadi kesalahan saat mengambil data penjualan.",
            error: error.message,
        });
    }
};

// Create Sale
const createSale = async (req, res) => {
    try {
        const saleData = req.body
        // Validasi input
        if (!saleData.productId || !saleData.branchId || !saleData.quantity || !saleData.totalAmount) {
            return res.status(400).send({
                message: "Semua kolom (productId, branchId, quantity, totalAmount) wajib diisi.",
            });
        }

        const checkStock = await StockRepository.checkStock(saleData.branchId , saleData.productId);
        if (checkStock.stockQuantity == 0 || checkStock.stockQuantity - saleData.quantity < 0) {
            return res.status(404).send({
                message: "Stok tidak tersedia untuk produk yang diminta."
            });
        }

        const newSale = await SaleRepository.createSale(saleData);

        res.status(201).send({
            message: "Penjualan berhasil dibuat.",
            data: newSale,
        });
    } catch (error) {
        console.error("Terjadi kesalahan saat membuat penjualan:", error);
        res.status(500).send({
            message: "Terjadi kesalahan saat membuat penjualan.",
            error: error.message,
        });
    }
};

// Get all sales
const getAllSales = async (req, res) => {
    try {
        const sales = await SaleRepository.getAllSales();

        res.status(200).send({
            message: "Semua data penjualan berhasil diambil.",
            data: sales,
        });
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil semua data penjualan:", error);
        res.status(500).send({
            message: "Terjadi kesalahan saat mengambil data penjualan.",
            error: error.message,
        });
    }
};

// Delete Sale
const deleteSale = async (req, res) => {
    try {
        const { saleId } = req.params;

        const updatedStock = await SaleRepository.deleteSale(saleId);

        res.status(200).send({
            message: "Data penjualan berhasil dihapus dan stok berhasil dikembalikan.",
            data: updatedStock,
        });
    } catch (error) {
        console.error("Terjadi kesalahan saat menghapus data penjualan:", error);
        res.status(500).send({
            message: "Terjadi kesalahan saat menghapus data penjualan.",
            error: error.message,
        });
    }
};

// Update Sale
const updateSale = async (req, res) => {
    try {
        const { saleId } = req.params;
        const updatedSaleData = req.body;

        const result = await SaleRepository.updateSale(saleId, updatedSaleData);

        res.status(200).send({
            message: "Data penjualan berhasil diperbarui dan stok telah disesuaikan.",
            data: result,
        });
    } catch (error) {
        console.error("Terjadi kesalahan saat memperbarui data penjualan:", error);
        res.status(500).send({
            message: "Terjadi kesalahan saat memperbarui data penjualan.",
            error: error.message,
        });
    }
};

module.exports = {
    createSale,
    deleteSale,
    updateSale,
    getAllSales,
    getSaleById,
    getSaleByBranch
};
