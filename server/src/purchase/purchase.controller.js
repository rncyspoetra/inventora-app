const PurchaseRepository = require("./purchase.repository")

const getPurchaseById = async (req, res) => {
    try {
        const purchase = await PurchaseRepository.getPurchaseById(parseInt(req.params.id)); 
        if(!purchase) {
            return res.status(404).send({
                message: `Pembelian dengan ID ${parseInt(req.params.id)} tidak ditemukan.`,
            });
        }

        res.status(200).send({
            message : "Pembelian berhasil diambil.",
            data: purchase
        });
    } catch(error) {
        console.error("Error saat mengambil pembelian:", error);
        res.status(500).send({
            message: "Terjadi kesalahan saat mengambil pembelian.",
            error: error.message,
        });
    }
}

// Get all purchases
const getAllPurchases = async (req, res) => {
    try {
        const purchases = await PurchaseRepository.getAllPurchases();

        res.status(200).send({
            message: "Semua data pembelian berhasil diambil.",
            data: purchases,
        });
    } catch (error) {
        console.error("Error saat mengambil semua pembelian:", error);
        res.status(500).send({
            message: "Terjadi kesalahan saat mengambil semua pembelian.",
            error: error.message,
        });
    }
};

// Get purchases by branch
const getPurchaseByBranch = async (req, res) => {
    try {
        const purchase = await PurchaseRepository.getPurchaseByBranch(parseInt(req.params.id));

        if (purchase.length === 0) {
            return res.status(404).send({
                message: `Tidak ada pembelian ditemukan untuk cabang dengan ID ${parseInt(req.params.id)}.`,
            });
        }

        res.status(200).send({
            message: "Data pembelian berhasil diambil.",
            data: purchase,
        });
    } catch (error) {
        console.error("Error saat mengambil pembelian cabang:", error);
        res.status(500).send({
            message: "Terjadi kesalahan saat mengambil pembelian cabang.",
            error: error.message,
        });
    }
};

// Create Purchase
const createPurchase = async (req, res) => {
    try {
        const purchaseData = req.body;

        // Validasi input
        if (!purchaseData.productId || !purchaseData.branchId || !purchaseData.quantity) {
            return res.status(400).send({
                message: "Semua field (productId, branchId, quantity) wajib diisi.",
            });
        }

        const newPurchase = await PurchaseRepository.createPurchase(purchaseData);

        res.status(201).send({
            message: "Pembelian berhasil dibuat.",
            data: newPurchase,
        });
    } catch (error) {
        console.error("Error saat membuat pembelian:", error);
        res.status(500).send({
            message: "Terjadi kesalahan saat membuat pembelian.",
            error: error.message,
        });
    }
};

// Delete Purchase
const deletePurchase = async (req, res) => {
    try {

        const updatedStock = await PurchaseRepository.deletePurchase(parseInt(req.params.id));

        res.status(200).send({
            message: "Pembelian berhasil dihapus dan stok berhasil diperbarui.",
            data: updatedStock,
        });
    } catch (error) {
        console.error("Error saat menghapus pembelian:", error);
        res.status(500).send({
            message: "Terjadi kesalahan saat menghapus pembelian.",
            error: error.message,
        });
    }
};

// Update Purchase
const updatePurchase = async (req, res) => {
    try {
        const updatedPurchaseData = req.body;

        const result = await PurchaseRepository.updatePurchase(parseInt(req.params.id), updatedPurchaseData);

        res.status(200).send({
            message: "Pembelian berhasil diperbarui dan stok berhasil disesuaikan.",
            data: result,
        });
    } catch (error) {
        console.error("Error saat memperbarui pembelian:", error);
        res.status(500).send({
            message: "Terjadi kesalahan saat memperbarui pembelian.",
            error: error.message,
        });
    }
};

module.exports = {
    getPurchaseById,
    getAllPurchases,
    getPurchaseByBranch,
    createPurchase,
    deletePurchase,
    updatePurchase
}
