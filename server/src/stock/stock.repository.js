// Repository untuk komunikasi dengan database

const prisma = require("../config/database");
const BranchRepository = require("../branch/branch.repository")


// Create Stock
const createStock = async (productId) => {
    const branches = await BranchRepository.getAllBranch();

    // Buat stok untuk setiap cabang dengan stok awal 0
    const stockEntries = branches.map((branch) => ({
        productId: productId,
        branchId : branch.id,
        stockQuantity: 0,
    }));

    // Buat stok untuk semua cabang dalam satu query
    const dataStock = await prisma.branchStock.createMany({
        data: stockEntries,
    });

    return dataStock;
};

// Delete Product for CRUD Admin
const deleteStock = async (idProduct) => {
    // Delete Stock
    await prisma.branchStock.deleteMany({
        where : {
            productId : idProduct
        }
    })

    return null
}

// Check Stock
const checkStock = async (idBranch, idProduct) => {
    const stock = await prisma.branchStock.findUnique({
        where: {
            productId_branchId: {
                productId: parseInt(idProduct),
                branchId: parseInt(idBranch),
            },
        },
    });
    return stock;
};

// Update Stock
const updateStock = async (stockQuantity, idBranch, idProduct) => {
    const updatedStock = await prisma.branchStock.update({
        where: {
            productId_branchId: {
                productId: parseInt(idProduct),
                branchId: parseInt(idBranch),
            },
        },
        data: {
            stockQuantity: parseInt(stockQuantity),
        },
    });

    return updatedStock;
};


module.exports = {
    deleteStock,
    createStock,
    checkStock,
    updateStock
}