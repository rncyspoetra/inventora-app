const ProductRepository = require("./product.repository");
const BranchRepository = require("../branch/branch.repository");

const getAllProduct = async (req, res) => {
    try {
        const product = await ProductRepository.getAllProduct();
    
        if (!product) return res.status(404).send({
            message: "Produk tidak ditemukan"
        });
    
        res.status(200).send({ 
            message: "Berhasil mendapatkan semua produk",
            data: product
        });
    } catch (error) {
        res.status(500).send({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

const createProduct = async (req, res) => {
    const existProduct = await ProductRepository.getProductByName(req.body.name);
    if (existProduct) return res.status(400).send({
        message: "Nama produk sudah ada"
    });

    try {
        const product = await ProductRepository.createProduct(req.body);
        res.status(201).send({
            message: "Berhasil menambahkan produk",
            data: product
        });
    } catch (error) {
        res.status(400).send({
            message: "Gagal menambahkan produk",
            error: error.message
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await ProductRepository.getProductById(parseInt(req.params.id));

        if (!product) return res.status(404).send({
            message: "Produk tidak ditemukan"
        });
    
        res.status(200).send({
            message: "Berhasil mendapatkan data produk",
            data: product,
        });
    } catch (error) {
        res.status(500).send({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    const findProduct = await ProductRepository.getProductById(parseInt(req.params.id));
    if (!findProduct) return res.status(404).send({
        message: "Produk tidak ditemukan"
    });

    try {
        await ProductRepository.deleteProduct(parseInt(req.params.id));
        res.status(200).send({
            message: "Berhasil menghapus produk"
        });
    } catch (error) {
        res.status(400).send({
            message: "Gagal menghapus produk",
            error: error.message
        });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    const findProduct = await ProductRepository.getProductById(parseInt(req.params.id));
    if (!findProduct) return res.status(404).send({
        message: "Produk tidak ditemukan"
    });

    try {
        const product = await ProductRepository.updateProduct(req.body, parseInt(req.params.id));
        res.status(200).send({
            message: "Berhasil memperbarui produk",
            data: product
        });
    } catch (error) {
        res.status(400).send({
            message: "Gagal memperbarui produk",
            error: error.message
        });
    }
};

// Get All Product By Branch
const getAllProductByBranch = async (req, res) => {
    try {
        const checkBranch = await BranchRepository.getBranchById(parseInt(req.params.branchId));
        if (!checkBranch) {
            return res.status(404).send({
                message: "Cabang tidak ditemukan"
            });
        }

        const products = await ProductRepository.getAllProductByBranch(parseInt(req.params.branchId));

        if (!products || products.length === 0) {
            return res.status(404).send({
                message: "Tidak ada produk untuk cabang ini"
            });
        }

        return res.status(200).send({
            message: "Berhasil mendapatkan data produk untuk cabang ini",
            data: products,
        });
    } catch (error) {
        console.error("Error di getAllProductByBranch:", error.message);

        return res.status(500).send({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

module.exports = {
    getAllProduct,
    createProduct, 
    getProductById,
    deleteProduct,
    updateProduct,
    getAllProductByBranch
};
