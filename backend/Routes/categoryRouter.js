const express = require("express");
const { authMiddleware, adminMiddleware } = require("../Middleware/authMiddleware");
const { createCategory, deleteCategory, editCategory, getAllCategories, getCategoryById } = require("../Controller/categoryController");
const categoryRouter = express.Router();


categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id",authMiddleware,adminMiddleware,getCategoryById);

categoryRouter.post("/",authMiddleware,adminMiddleware,createCategory);
categoryRouter.patch("/:id",authMiddleware,adminMiddleware,editCategory);

categoryRouter.delete("/:id",authMiddleware,adminMiddleware,deleteCategory);






module.exports = categoryRouter;