const express = require("express");
// const userController = require("../controllers/user.controller");
// const authController = require("../controllers/auth.controller");

const { getUser, updateUser } = require("../controllers/user.controller");

const canAccess = require("../middleware/auth.middleware");

const userRoutes = express.Router();

// userRoutes.get("/me", userController.displayUser);

// userRoutes.post("/me/update", verifyToken, authController.updateUser);

userRoutes.get("/me", canAccess, getUser);

userRoutes.put("/me/update", canAccess, updateUser);


module.exports = userRoutes;