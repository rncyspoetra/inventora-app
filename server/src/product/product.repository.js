// Repository untuk komunikasi dengan database

const prisma = require("../config/database");
const StockRepository = require("../stock/stock.repository");

// Just All Product For Admin
const getAllProduct = async () => {
    const product = await prisma.product.findMany({
        include: {
            category: true,
        },
    });
    
    return product;
};

// Create Product
const createProduct = async (body) => {
    const productData = await prisma.product.create({
        data: {
            name: body.name,
            sellPrice: parseInt(body.sellPrice),
            buyPrice: parseInt(body.buyPrice),
            categoryId: parseInt(body.categoryId)
        },
    });

    await StockRepository.createStock(parseInt(productData.id));

    return productData;
};

// Checked Duplicate Product Name
const getProductByName = async (productName) => {
    const product = await prisma.product.findUnique({
        where: {
            name: productName,
        },
        include: {
            category: true,
        },
    });
    
    if (!product) return null;

    return product;
};

// Get Detail Product By Id For CRUD Admin
const getProductById = async (idProduct) => {
    const product = await prisma.product.findUnique({
        where: {
            id: idProduct,
        },
        include: {
            category: true,
        },
    });
    
    if (!product) return null;

    return product;
};

// Delete Product for CRUD Admin
const deleteProduct = async (idProduct) => {
    // Delete Stock
    await StockRepository.deleteStock(idProduct);

    // Delete Product
    const product = await prisma.product.delete({
        where: {
            id: idProduct,
        },
    });

    return null;
};

// Update Product
const updateProduct = async (body, idProduct) => {
    const productData = await prisma.product.update({
        where: {
            id: idProduct,
        },
        data: {
            name: body.name,
            sellPrice: parseInt(body.sellPrice),
            buyPrice: parseInt(body.buyPrice),
            categoryId: parseInt(body.categoryId)
        },
    });

    return productData;
};

// Get all product by branch
const getAllProductByBranch = async (idBranch) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                stocks: {
                    some: {
                        branchId: idBranch,
                    },
                },
            },
            include: {
                stocks: {
                    where: {
                        branchId: idBranch,
                    },
                },
                category: true,
            },
        });

        return products;
    } catch (error) {
        console.error("Error fetching products by branch:", error);
        throw error;
    }
};

module.exports = {
    getAllProduct,
    createProduct,
    getProductByName,
    getProductById,
    deleteProduct,
    updateProduct,
    getAllProductByBranch,
};
