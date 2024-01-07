const Ads = require("../Models/adsSchema");
const Category = require("../Models/categorySchema");



exports.createCategory = async (req, res) => {
  const { categoryName, parentCategory } = req.body;

  try {
    if (!categoryName) {
      res.status(400).json({
        message: "Tous les champs sont requis",
      });
    } else {
      const category = await Category.create({
        categoryName,
        parentCategory,
      });
      if (category) {
        res.status(201).json({
          message: "Catégorie créée avec succès",
          category,
        });
      } else {
        res.status(400).json({
          message: "Erreur lors de la création de la catégorie",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erreur serveur",
    });
  }
}




exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    
    const category = await Category.findByIdAndDelete(id);

    if (category) {
      await Ads.deleteMany({ category: id });
      res.status(200).json({
        message: "Catégorie supprimée avec succès",
      });
    
    } else {
      res.status(400).json({
        message: "Erreur lors de la suppression de la catégorie",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erreur serveur",
    });
  }
}


exports.editCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryName, parentCategory } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        categoryName,
        parentCategory,
      },
      { new: true }
    );
    if (category) {
      res.status(200).json({
        message: "Catégorie modifiée avec succès",
        category,
      });
    } else {
      res.status(400).json({
        message: "Erreur lors de la modification de la catégorie",
      });
    }
  } catch (error) {

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
}


exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(
      categories,
    );
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
    });
  }
}


exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (category) {
      res.status(200).json({
        message: "Catégorie récupérée avec succès",
        category,
      });
    } else {
      res.status(400).json({
        message: "Erreur lors de la récupération de la catégorie",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
    });
  }
}