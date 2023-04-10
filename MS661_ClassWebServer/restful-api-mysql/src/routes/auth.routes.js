const express = require("express");

// const controller = require("../controllers/auth.controller");

const {
    registerUser,
    loginUser,
    token,
    logoutUser,
} = require("../controllers/auth.controller");

const authRoutes = express.Router();

// authRoutes.post("/register", controller.registerUser);

// authRoutes.post("/login", controller.loginUser);

authRoutes.post("/register", registerUser);

authRoutes.post("/login", loginUser);

authRoutes.post("/token", token);

authRoutes.post("/logout", logoutUser);

module.exports = authRoutes;

