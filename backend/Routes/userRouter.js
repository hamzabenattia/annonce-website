const express = require("express");
const { updateUserInformation,getUserInformation, disableUserAccount } = require("../Controller/userController");
const { authMiddleware } = require("../Middleware/authMiddleware");
const userRouter = express.Router();


userRouter.get("/",authMiddleware, getUserInformation);
userRouter.patch("/update",authMiddleware,updateUserInformation);






module.exports = userRouter;