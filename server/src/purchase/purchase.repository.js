const prisma = require("../config/database");
const StockRepository = require("../stock/stock.repository")

// Get purchase by ID with product and branch names
const getPurchaseById = async (purchaseId) => {
    const purchase = await prisma.purchase.findUnique({
        where: {
            id : purchaseId
        },
        include: {
            product: {
                select: { name: true },
            },
            branch: {
                select: { name: true },
            },
        },
    });
    return purchase;
};

// Get all purchases with product and branch names
const getAllPurchases = async () => {
    const purchases = await prisma.purchase.findMany({
        include: {
            product: {
                select: { name: true },
            },
            branch: {
                select: { name: true },
            },
        },
    });
    return purchases;
};

const getPurchaseByBranch = async (branchId) => {
    const purchases = await prisma.purchase.findMany({
        where: { 
            branchId: parseInt(branchId) 
        },
        include: {
            product: {
                select: { name: true },
            },
            branch: {
                select: { name: true },
            },
        },
    });
    return purchases;
};

// Create Purchase
const createPurchase = async (purchaseData) => {
    // Simpan data penjualan ke database
    const newPurchase = await prisma.purchase.create({
        data: purchaseData,
    });

    // Tambah stok berdasarkan jumlah penjualan
    await prisma.branchStock.update({
        where: {
            productId_branchId: {
                productId: purchaseData.productId,
                branchId: purchaseData.branchId,
            },
        },
        data: {
            stockQuantity: {
                increment: purchaseData.quantity,
            },
        },
    });

    return newPurchase;
};

// Delete purchase
const deletePurchase = async (purchaseId) => {
    // Cari data Pembelian berdasarkan ID
    const purchase = await prisma.purchase.findUnique({
        where: { 
            id: parseInt(purchaseId) 
        },
    });

    if (!purchase) {
        throw new Error("Purchase not found.");
    }

    // Hapus Pembelian
    await prisma.purchase.delete({
        where: { 
            id: parseInt(purchaseId) 
        },
    });

    // Hapus stok yang dibeli
    const updatedStock = await prisma.branchStock.update({
        where: {
            productId_branchId: {
                productId: purchase.productId,
                branchId: purchase.branchId,
            },
        },
        data: {
            stockQuantity: {
                decrement: purchase.quantity,
            },
        },
    });

    return null;
};

// Update Purchase
const updatePurchase = async (purchaseId, updatedPurchaseData) => {
    // Cari data pembelian lama
    const existingPurchase = await prisma.purchase.findUnique({
        where: { id: parseInt(purchaseId) },
    });

    if (!existingPurchase) {
        throw new Error("Purchase not found.");
    }

    if(updatedPurchaseData.quantity){
        // Cek Stok Produk Lama
        const stockProduct = await StockRepository.checkStock(existingPurchase.branchId, existingPurchase.productId) 

        const newStock = stockProduct.stockQuantity - existingPurchase.quantity + updatedPurchaseData.quantity

        await StockRepository.updateStock(newStock, existingPurchase.branchId, existingPurchase.productId )
    }

    // Update data penjualan
    const updatedPurchase = await prisma.purchase.update({
        where: { id: parseInt(purchaseId) },
        data: {
            productId: updatedPurchaseData.productId,
            branchId: updatedPurchaseData.branchId,
            quantity: updatedPurchaseData.quantity
        },
    });

    return { updatedPurchase };
};


module.exports = {
    getPurchaseById,
    getAllPurchases,
    getPurchaseByBranch,
    createPurchase,
    deletePurchase,
    updatePurchase
};