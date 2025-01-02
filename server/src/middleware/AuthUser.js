const UserService = require("../users/user.service");

const verifyUsers = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).send({ message: "Login to your account !" });
    }

    try {
        const user = await UserService.getUserById(req.session.userId);
        if (!user) return res.status(404).send({ message: "User Not Found" });
        
        req.userId = user.id;
        req.role = user.role;
        next()
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

const adminOnly = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).send({ message: "Login to your account !" });
    }

    try {
        const user = await UserService.getUserById(req.session.userId);
        if (!user) return res.status(404).send({ message: "User Not Found" });
        if(user.role !== "admin") return res.status(403).send({message : "Acces Denied"})
        next()
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }

}

module.exports = {
    verifyUsers,
    adminOnly
}