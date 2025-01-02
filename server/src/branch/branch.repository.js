// Repository untuk komunikasi dengan database

const prisma = require("../config/database");

const getAllBranch = async () => {
    const branch = await prisma.branch.findMany();
    
    return branch
};

const getBranchById = async (idBranch) => {
    const branch = await prisma.branch.findUnique({
        where : {
            id: idBranch
        }
    });
    
    if(!branch) return null

    return branch
}

const getBranchByName = async (branchName) => {
    const branch = await prisma.branch.findUnique({
        where : {
            name : branchName
        }
    });
    
    if(!branch) return null

    return branch
}

const createBranch = async (body) => {
    const branchData = await prisma.branch.create({
        data: {
            name: body.name,
            address: body.address
          },
    })

    return branchData
}

const updateBranch = async (body, idBranch) => {
    const branchData = await prisma.branch.update({
        where : {
            id : idBranch
        },
        data: {
            name: body.name,
            address: body.address
          },
    })

    return branchData
}

const deleteBranch = async (idBranch) => {
    const branch = await prisma.branch.delete({
        where: {
            id : idBranch
        }
    })

    return null
}

module.exports = {
    getAllBranch,
    createBranch,
    getBranchById,
    getBranchByName,
    updateBranch,
    deleteBranch
}