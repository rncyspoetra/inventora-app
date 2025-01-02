const CategoryRepository = require("./category.repository");

const getAllCategory = async (req, res) => {
    try {
        const category = await CategoryRepository.getAllCategory();
    
        if (!category) return res.status(404).send({
            message: "Kategori tidak ditemukan"
        });
    
        res.status(200).send({ 
            message: "Berhasil mendapatkan semua kategori",
            data: category
        });
    } catch (error) {
        res.status(500).send({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

const createCategory = async (req, res) => {
    const existCategory = await CategoryRepository.getCategoryByName(req.body.name);
    if (existCategory) return res.status(400).send({
        message: "Nama kategori sudah ada"
    });

    try {
        const category = await CategoryRepository.createCategory(req.body);
        res.status(201).send({
            message: "Berhasil menambahkan kategori",
            data: category
        });
    } catch (error) {
        res.status(400).send({
            message: "Gagal menambahkan kategori",
            error: error.message
        });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await CategoryRepository.getCategoryById(parseInt(req.params.id));

        if (!category) return res.status(404).send({
            message: "Kategori tidak ditemukan"
        });
    
        res.status(200).send({
            message: "Berhasil mendapatkan data kategori",
            data: category,
        });
    } catch (error) {
        res.status(500).send({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

const deleteCategory = async (req, res) => {
    const findCategory = await CategoryRepository.getCategoryById(parseInt(req.params.id));
    if (!findCategory) return res.status(404).send({
        message: "Kategori tidak ditemukan"
    });

    try {
        await CategoryRepository.deleteCategory(parseInt(req.params.id));
        res.status(200).send({
            message: "Berhasil menghapus kategori"
        });
    } catch (error) {
        res.status(400).send({
            message: "Gagal menghapus kategori",
            error: error.message
        });
    }
};

// Update Product
const updateCategory = async (req, res) => {
    const findCategory = await CategoryRepository.getCategoryById(parseInt(req.params.id));
    if (!findCategory) return res.status(404).send({
        message: "Kategori tidak ditemukan"
    });

    try {
        const category = await CategoryRepository.updateCategory(req.body, parseInt(req.params.id));
        res.status(200).send({
            message: "Berhasil memperbarui kategori",
            data: category
        });
    } catch (error) {
        res.status(400).send({
            message: "Gagal memperbarui kategori",
            error: error.message
        });
    }
};


module.exports = {
    getAllCategory,
    createCategory, 
    getCategoryById,
    deleteCategory,
    updateCategory
};
