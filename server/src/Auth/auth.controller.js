const argon2 = require("argon2");
const UserServices = require("../users/user.service");
const { user } = require("../config/database");

const Login = async (req, res) => {
    try {
        const user = await UserServices.getUserByUsername(req.body.username);
        if (!user) return res.status(404).send({ message: "User Not Found" });

        // Verifikasi password menggunakan argon2
        const match = await argon2.verify(user.password, req.body.password);
        if (!match) return res.status(400).send({ message: "Wrong Password !" });

        req.session.userId = user.id;

        res.status(200).send({
            message: "Login Success",
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const Me = async (req, res) => {
    // Periksa apakah user sudah login berdasarkan session userId
    if (!req.session.userId) {
        return res.status(401).send({ message: "Login to your account !" });
    }

    try {
        const user = await UserServices.getUserById(req.session.userId);
        if (!user) return res.status(404).send({ message: "User Not Found" });
        
        res.status(200).send({ 
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const LogOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).send({ message: "Can't Logged Out" });
        res.status(200).send({ message: "You Have Logged Out" });
    });
};

module.exports = {
    Login,
    Me,
    LogOut
};
