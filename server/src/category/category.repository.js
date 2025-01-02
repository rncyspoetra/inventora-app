// Repository untuk komunikasi dengan database

const prisma = require("../config/database");

// All Category
const getAllCategory = async () => {
    const category = await prisma.category.findMany();
    
    return category
};
// Create Category
const createCategory = async (body) => {
    const categoryData = await prisma.category.create({
        data: {
            name: body.name
        },
    });

    return categoryData;
};


// Checked Duplicate Category Name
const getCategoryByName = async (categoryName) => {
    const category = await prisma.category.findUnique({
        where : {
            name : categoryName
        }
    });
    
    if(!category) return null

    return category
}

// Get Detail Category By Id 
const getCategoryById = async ( idCategory ) => {
    const category = await prisma.category.findUnique({
        where : {
            id: idCategory
        }
    });
    
    if(!category) return null

    return category
}

// Delete Category
const deleteCategory = async (idCategory) => {

    // Delete Category
    const category = await prisma.category.delete({
        where: {
            id : idCategory
        }
    })

    return null
}

// Update Category
const updateCategory = async (body, idCategory) => {
    const categoryData = await prisma.category.update({
        where : {
            id : idCategory
        },
        data: {
            name: body.name
          },
    })

    return categoryData
}

module.exports = {
    getAllCategory,
    createCategory,
    getCategoryByName,
    getCategoryById,
    deleteCategory,
    updateCategory
}