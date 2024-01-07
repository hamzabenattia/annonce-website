const express = require("express");
const { createAds, getAdsById, getAllAds, findAllAdsByUser, findAdsByUserById, addToFavorites, searchAds, editAds } = require("../Controller/adsController");
const { authMiddleware } = require("../Middleware/authMiddleware");
const { deleteAds } = require("../Controller/adminController");
const adsRouter = express.Router();



adsRouter.post("/",authMiddleware,createAds);

adsRouter.get("/mylist/:id",authMiddleware,findAdsByUserById);
adsRouter.get("/mylist",authMiddleware,findAllAdsByUser);
adsRouter.patch("/addtofavorites/:id",authMiddleware,addToFavorites);
adsRouter.delete("/:id",authMiddleware,deleteAds);
adsRouter.get("/search",searchAds);
adsRouter.get("/",getAllAds);
adsRouter.get("/:id",getAdsById);
adsRouter.put("/:id",authMiddleware,editAds);







module.exports = adsRouter;