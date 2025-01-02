// Repository untuk komunikasi dengan database

const prisma = require("../config/database");

const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    
    return users
};

const getUserById = async (idUser) => {
    const user = await prisma.user.findUnique({
        where : {
            id: idUser
        },
        include : {
            branch : true
        }
    });
    
    if(!user) return null

    return user
}

const getUserByUsername = async (username) => {
    const user = await prisma.user.findUnique({
        where : {
            username : username
        },
        include : {
            branch : true
        }
    });
    
    if(!user) return null

    return user
}

const createUser = async (body,hashPassword) => {
    const userData = await prisma.user.create({
        data: {
            username: body.username,
            password: hashPassword,
            role: body.role,
            branchId: body.branchId
          },
    })

    return userData
}

const updateUser = async (body, hashPassword, idUser) => {
    const userData = await prisma.user.update({
        where : {
            id : idUser
        },
        data: {
            username: body.username,
            password: hashPassword,
            role: body.role,
            branchId: body.branchId
          },
    })

    return userData
}

const deleteUser = async (idUser) => {
    const user = await prisma.user.delete({
        where: {
            id : idUser
        }
    })

    return null
}

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser
}