const prisma = require("../config/database");
const StockRepository = require("../stock/stock.repository");

// Get sale by ID with product and branch names
const getSaleById = async (saleId) => {
    const sale = await prisma.sale.findUnique({
        where: { 
            id : saleId
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
    return sale;
};

const getSaleByBranch = async (branchId) => {
    const sales = await prisma.sale.findMany({
        where: { branchId: parseInt(branchId) },
        include: {
            product: {
                select: { name: true },
            },
            branch: {
                select: { name: true },
            },
        },
    });
    return sales;
};

// Create Sale
const createSale = async (saleData) => {
    // Simpan data penjualan ke database
    const newSale = await prisma.sale.create({
        data: saleData,
    });

    // Kurangi stok berdasarkan jumlah penjualan
    await prisma.branchStock.update({
        where: {
            productId_branchId: {
                productId: saleData.productId,
                branchId: saleData.branchId,
            },
        },
        data: {
            stockQuantity: {
                decrement: saleData.quantity,
            },
        },
    });

    return newSale;
};

// Get all sales with product and branch names
const getAllSales = async () => {
    const sales = await prisma.sale.findMany({
        include: {
            product: {
                select: { name: true },
            },
            branch: {
                select: { name: true },
            },
        },
    });
    return sales;
};

// Delete Sale
const deleteSale = async (saleId) => {
    // Cari data penjualan berdasarkan ID
    const sale = await prisma.sale.findUnique({
        where: { id: parseInt(saleId) },
    });

    if (!sale) {
        throw new Error("Data penjualan tidak ditemukan.");
    }

    // Hapus penjualan
    await prisma.sale.delete({
        where: { id: parseInt(saleId) },
    });

    // Kembalikan stok yang terjual
    const updatedStock = await prisma.branchStock.update({
        where: {
            productId_branchId: {
                productId: sale.productId,
                branchId: sale.branchId,
            },
        },
        data: {
            stockQuantity: {
                increment: sale.quantity,
            },
        },
    });

    return updatedStock;
};

// Update Sale
const updateSale = async (saleId, updatedSaleData) => {
    // Cari data penjualan lama
    const existingSale = await prisma.sale.findUnique({
        where: { id: parseInt(saleId) },
    });

    if (!existingSale) {
        throw new Error("Data penjualan tidak ditemukan.");
    }

    // Cek Stok Produk Lama
    const stockProduct = await StockRepository.checkStock(existingSale.branchId, existingSale.productId);

    const newStock = stockProduct.stockQuantity + existingSale.quantity - updatedSaleData.quantity;

    if (newStock < 0) {
        throw new Error("Stok tidak mencukupi.");
    }

    // Update data penjualan
    const updatedSale = await prisma.sale.update({
        where: { id: parseInt(saleId) },
        data: {
            productId: updatedSaleData.productId,
            branchId: updatedSaleData.branchId,
            quantity: updatedSaleData.quantity,
            totalAmount: updatedSaleData.totalAmount,
        },
    });

    await StockRepository.updateStock(newStock, existingSale.branchId, existingSale.productId);

    return { updatedSale };
};

module.exports = {
    createSale,
    deleteSale,
    updateSale,
    getAllSales,
    getSaleById,
    getSaleByBranch,
};