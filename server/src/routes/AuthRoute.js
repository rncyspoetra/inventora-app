const express = require("express");
const authController = require("../Auth/auth.controller");
const router = express.Router();

router.get('/me', authController.Me)
router.post('/login',authController.Login)
router.delete('/logout', authController.LogOut)

module.exports = router