const express = require("express");
const authRouter = express.Router();
const { register, login, forgotPassword, resetPassword, logout, confirmeEmail } = require("../Controller/authController");



authRouter.post("/signup",register);

authRouter.get("/confirme/:token",confirmeEmail);

authRouter.post("/login",login);

authRouter.post("/password/forgot",forgotPassword);

authRouter.put("/password/reset/:token",resetPassword);

authRouter.get("/logout", logout);







module.exports = authRouter;
