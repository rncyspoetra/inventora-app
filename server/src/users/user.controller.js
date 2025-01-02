// Controller Layer untuk handle request dan response

const UserService = require("./user.service");
const argon2 = require("argon2")

const getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
    
        if(!users) return res.status(404).send({
            message : "User Empty"
        })
    
        res.status(200).send({ 
            message: "Get All User Success",
            data : users
        });
    } catch (error) {
        res.status(500).send({
            message : error.message
        })
    }
};


const getUserById = async (req, res) => {
    try {
        const users = await UserService.getUserById(parseInt(req.params.id));

        if(!users) return res.status(404).send({
            message : "User Not Found"
        })
    
        res.status(200).send({
            message: "Get User Success",
            data : users,
        });
    } catch (error) {
        res.status(500).send({
            message : error.message
        })
    }
}

const createUser = async (req, res) => {

    const existUsername = await UserService.getUserByUsername(req.body.username);
    if(existUsername) return res.status(400).send({message : "Username Already Exists"})

    const { password } = req.body;
    const hashPassword = await argon2.hash(password);
    try {
        const users = await UserService.createUser(req.body,hashPassword);
        res.status(201).send({
            message : "Created User Success",
            data : users
        })
    } catch (error) {
        res.status(400).send({
            message : error.message
        })
    }
}

const updateUser = async (req, res) => {
    const findUser = await UserService.getUserById(parseInt(req.params.id));
    if(!findUser) return res.status(404).send({
        message : "User Not Found"
    })

    const { password } = req.body;
    let hashPassword = password;
    if(hashPassword) {
        hashPassword = await argon2.hash(password);;
    }
    try {
        const user = await UserService.updateUser(req.body,hashPassword,parseInt(req.params.id));
        res.status(201).send({
            message : "Updated User Success",
            data : user
        })
    } catch (error) {
        res.status(400).send({
            message : error.message
        })
    }
}

const deleteUser = async (req, res) => {
    const findUser = await UserService.getUserById(parseInt(req.params.id));
    if(!findUser) return res.status(404).send({
        message : "User Not Found"
    })

    try {
        const user = await UserService.deleteUser(parseInt(req.params.id));
        res.status(201).send({
            message : "Deleted User Success"
        })
    } catch (error) {
        res.status(400).send({
            message : error.message
        })
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}