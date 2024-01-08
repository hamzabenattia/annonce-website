const User = require("../Models/userSchema");
const cloudinary = require('cloudinary').v2;

exports.getUserInformation = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).exec();
        if (user) {
            res.status(200).json(
                user
            );
        } else {
            res.status(404).json({
                message: "Utilisateur non trouvé",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération de l'utilisateur",
            error: error.message,
        });
    }
};

exports.updateUserInformation = async (req, res) => {
    try {
       // fin and update user information  that are passed in req.body the other data keep the same 
       const user =  await User.findById(req.user.id);
         if(user){
          user.firstname = req.body.firstname || user.firstname;
          user.lastname = req.body.lastname || user.lastname;
          user.email = req.body.email || user.email;
          user.phonenum = req.body.phonenum || user.phonenum;
            if (req.body.picture){
                if (user.picture.public_id){
                    await cloudinary.uploader.destroy(user.picture.public_id);
                }
                
                const result = await cloudinary.uploader.upload(req.body.picture, {
                    folder: "profile",
                    width: 150,
                    crop: "scale",
                });
                
    
                user.picture = {
                    url: result.secure_url,
                    public_id: result.public_id,
                };

            }

          user.save();

          res.status(200).json({
                message: "Utilisateur mis à jour avec succès",
                user: user,
          });
        }else{
            res.status(404).json({
                message: "Utilisateur non trouvé",
            });
            }

    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la mise à jour de l'utilisateur",
            error: error.message,
        });
    }
};