const express = require("express");
const { authMiddleware, adminMiddleware } = require("../Middleware/authMiddleware");
const { getAllUsers, getUserById, editUser, getAllAds, getAdsById, deleteAds, acceptAds, deleteUser, refuseAds, dashboardStatestique } = require("../Controller/adminController");
const adminRouter = express.Router();



adminRouter.get("/users/",authMiddleware,adminMiddleware,getAllUsers);
adminRouter.get("/users/:id",authMiddleware,adminMiddleware,getUserById);
adminRouter.put("/users/:id",authMiddleware,adminMiddleware,editUser);
adminRouter.delete("/users/:id",authMiddleware,adminMiddleware,deleteUser);
adminRouter.get("/annonce/",authMiddleware,adminMiddleware,getAllAds);
adminRouter.get("/annonce/:id",authMiddleware,adminMiddleware,getAdsById);
adminRouter.delete("/annonce/:id",authMiddleware,adminMiddleware,deleteAds);
adminRouter.get("/annonce/refuse/:id",authMiddleware,adminMiddleware,refuseAds);
adminRouter.get("/annonce/accept/:id",authMiddleware,adminMiddleware,acceptAds);
adminRouter.get("/dashboard",authMiddleware,adminMiddleware,dashboardStatestique);











module.exports = adminRouter;