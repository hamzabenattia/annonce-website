const Ads = require("../Models/adsSchema");
const Category = require("../Models/categorySchema");
const User = require("../Models/userSchema");
const cloudinary = require('cloudinary').v2;    




exports.createAds = async (req, res) => {
    try {
        const { title, category, location, description, price } = req.body;

        if (!title || !category || !location || !description || !price) {
            res.status(400).json({
                message: "Tous les champs sont requis"
            })
        }

        else {
            
            let images = [];
            if (typeof req.body.images === "string") {
                images.push(req.body.images);
            } else {
                images = req.body.images;
            }
        
            const imagesLink = [];
        
            for (const element of images) {
                const result = await cloudinary.uploader.upload(element, {
                    folder: `annonce/${title}/${req.user._id}}`,
                });
        
                imagesLink.push(result.secure_url);
            }

            const ads = await Ads.create({
                title,
                category,
                location,
                description,
                price,
                images: imagesLink,
                createdBy: req.user._id,
                createdAt: new Date().toISOString(),
                expiredDay: new Date().toISOString(),
            });
    
    
            if (ads) {
                res.status(201).json({
                    message: "Annonce créée avec succès",
                    ads,
                });
            } else {
                res.status(400).json({
                    message: "Erreur lors de la création de l'annonce",
                });
            }
    
        } 
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la création de l'annonce",
            error: error.message,
        });
    }
    
}


exports.getAdsById = async (req, res) => {
    try {
        const ads = await Ads.findById(req.params.id).populate("createdBy category", "categoryName firstname lastname email phonenum").exec();
    if (ads) {
        res.status(200).json(
            ads,
        );
    } else {
        res.status(404).json({
            message: "Annonce non trouvée",
        });
    }
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération de l'annonce",
            error: error.message,
        });  
    }
    
}


exports.getAllAds = async (req, res) => {

    const query = req.query;


    try {
        const ads = query ?  await Ads.find(query).populate("createdBy", "firstname lastname email phonenum").populate("category","categoryName").sort({_id : -1})
        : 
          await Ads.find(/*{isAccepted : true}*/).populate("createdBy", "firstname lastname email phonenum").populate("category","categoryName")
        .sort({_id : -1}).exec();
    if (ads) {
        res.status(200).json(
            ads,
        );
    } else {
        res.status(404).json({
            message: "Annonce non trouvée",
        });
    } 
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération de l'annonce",
            error: error.message,
        });  
    }
   
}


exports.findAllAdsByUser = async (req, res) => {
    try {
        const ads = await Ads.find({createdBy : req.user._id}).populate("createdBy", "firstname lastname email phone").sort({
            _id : -1
        }).exec();
        if (ads) {
            res.status(200).json(
                ads,
            );
        } else {
            res.status(404).json({
                message: "Annonce non trouvée",
            });
        }  
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération de l'annonce",
            error: error.message,
        });  
    }
  
}


exports.findAdsByUserById = async (req, res) => {
    try {
        const ads = await Ads.find({createdBy : req.user._id , _id : req.params.id }).exec();
    if (ads) {
        res.status(200).json(
              ads
        );
    } else {
        res.status(404).json({
            message: "Annonce non trouvée",
        });
    }
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération de l'annonce",
            error: error.message,
        });  
    }
    
}


exports.addToFavorites = async (req, res) => {
    try {
        const ads = await Ads.findById(req.params.id);
        if (ads) {
            const user = await User.findById(req.user._id);
            if (user) {
                user.favoritesAds.push(ads);
                await user.save();
                res.status(200).json({
                    message: "Annonce ajoutée aux favoris",
                });
            } else {
                res.status(404).json({
                    message: "vous n'êtes pas autorisé à effectuer cette action",
                });
            }
      
    } 
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors l'ajoute de l'annonce au favorite",
            error: error.message,
        });
        
    }
    
}

exports.searchAds = async (req, res) => {
    try {
        const {
          title,
          location,
          minPrice,
          maxPrice,
          category,
        } = req.query;
    
        // Construire un objet de filtre en fonction des critères de recherche fournis
        const filter = {};
        if (title) {
          filter.title = { $regex: title, $options: 'i' }; // Utilise une expression régulière pour la recherche insensible à la casse
        }
        if (location) {
          filter.location = location;
        }
        if (category) {
            const categoryFiltred = await Category.findOne({ categoryName :{ $regex: category, $options: 'i'} });
            if (categoryFiltred)
            {
                filter.category = categoryFiltred._id;
            }
            else{
                filter.category = null;
            }


           
        }
        if (minPrice || maxPrice) {
          filter.price = {};
          if (minPrice) {
            filter.price.$gte = parseInt(minPrice);
          }
          if (maxPrice) {
            filter.price.$lte = parseInt(maxPrice);
          }
        }

        filter.isAccepted = true;
    
        // Effectuer la recherche avec les filtres
        const ads = await Ads.find(filter)
          .populate('createdBy', 'firstname lastname') 
          .populate('category', 'categoryName').sort({
            _id : -1
           })
    
        res.status(201).json(ads);
      } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la recherche.' });
      }

   
}


exports.editAds = async (req, res) => {
    try {


        let images = [];
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

    
        const imagesLink = [];
        
    
        for (const element of images) {
            const result = await cloudinary.uploader.upload(element, {
                folder: `annonce/${req.body.title}/${req.user._id}}`,
            });
    
            imagesLink.push(result.secure_url);
        }


        const ads = await Ads.findById(req.params.id);
        if (ads) {
            ads.title = req.body.title || ads.title;
            ads.category = req.body.category || ads.category;
            ads.location = req.body.location || ads.location;
            ads.description = req.body.description || ads.description;
            ads.price = req.body.price || ads.price;
            if (imagesLink.length > 0)
            {
                ads.images = imagesLink;
            }
            else
            {
                ads.images = ads.images;
            }

            const updatedAds = await ads.save();
            if (updatedAds)
            {
                res.status(200).json({
                    message: "Annonce mise à jour avec succès",
                    updatedAds,
                });
            
            }else{
                res.status(400).json({
                    message: "Erreur lors de la mise à jour de l'annonce",
                });
            }
           
        } else {
            res.status(404).json({
                message: "Annonce non trouvée",
            });
        }
}
catch (error) {
    res.status(500).json({
        message: "Erreur lors de la mise à jour de l'annonce",
        error: error.message,
    });
}
}
