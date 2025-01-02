// Service layer untuk handle business logic
const UsersRepository = require("./user.repository")

const getAllUsers = async () => {
    const users = await UsersRepository.getAllUsers();

    return users;
}

const getUserById = async (id) => {
    const user = await UsersRepository.getUserById(id);

    return user;
}

const getUserByUsername = async (username) => {
    const user = await UsersRepository.getUserByUsername(username);

    return user;
}

const createUser = async (body,hashPassword) => {
    const users = await UsersRepository.createUser(body,hashPassword);

    return users;
}

const updateUser = async (body,hashPassword, id) => {
    const user = await UsersRepository.updateUser(body,hashPassword,id);

    return user;
}

const deleteUser = async (id) => {
    const users = await UsersRepository.deleteUser(id);

    return users;
}

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser
}