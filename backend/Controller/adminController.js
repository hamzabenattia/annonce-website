const Ads = require("../Models/adsSchema");
const User = require("../Models/userSchema");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        if (users) {
            res.status(201).json(users);
        } else {
            res.status(400).json({
                message: "Erreur lors de la récupération des utilisateurs",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération des utilisateurs",
            error: error.message,
        });
    }
}

exports.deleteUser = async (req, res) => { 
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(user)
        {
             await Ads.deleteMany({ createdBy: req.params.id });
            res.status(200).json("Utilisateur supprimé avec succès");

        }
        else
        {
            res.status(404).json({
                message: "Utilisateur non trouvé",
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la supprition de l'utilisateur",
            error: error.message,
        });
    }
}


exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(404).json("Utilisateur non trouvé");
        }
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération l'information de l'utilisateurs",
            error: error.message,
        });
    }
}

exports.editUser = async (req, res) => {
    try {
        const user = findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (user) {
            res.status(201).json("user modifié avec succès");
        }
        else {
            res.status(404).json("Utilisateur non trouvé");
        }
    } catch (error) {

        res.status(500).json({
            message: "Erreur lors de la modification de l'utilisateur",
            error: error.message,
        });

    }

}


exports.getAllAds = async (req, res) => {
    try {
        const ads = await Ads.find().populate("createdBy category", "categoryName firstname lastname email phonenum").sort({ createdAt: -1 });
        if (ads) {
            res.status(201).json(ads);
        } else {
            res.status(400).json({
                message: "Erreur lors de la récupération des annonces",
            });
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
        const ads = await Ads.findById(req.params.id).populate("createdBy category", "categoryName firstname lastname email phonenum");
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la création de l'annonce",
            error: error.message,
        });
    }
}

exports.deleteAds = async (req, res) => {
    try {
        const ads = await Ads.findByIdAndDelete(req.params.id);
        if(ads)
        {
            res.status(200).json("Annonce supprimée avec succès");

        }
        else
        {
            res.status(404).json("Annonce non trouvée");
        }
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la supprition de l'annonce",
            error: error.message,
        });
    }
}

exports.acceptAds = async (req, res) => {
    try {
       await Ads.findByIdAndUpdate(req.params.id, { isAccepted: true , status: "accepted"});
        res.status(200).json("Annonce acceptée avec succès");
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de l'acceptation de l'annonce",
            error: error.message,
        });
        console.log(error);

    }
}

exports.refuseAds = async (req, res) => {
    try {
       const {data} = await Ads.findByIdAndUpdate(req.params.id, { isAccepted: false , status: "refused"});
        res.status(200).json("Annonce refusée avec succès");
        console.log(data);

    } catch (error) {
        res.status(500).json({
            message: "Erreur lors du refus de l'annonce",
            error: error.message,
        });
    }
}


exports.dashboardStatestique = async (req, res) => {
    try {
        // Total Ads, Accepted Ads, Pending Ads, Rejected Ads
        const totalAds = await Ads.countDocuments();
        const acceptedAds = await Ads.countDocuments({ status: 'accepted' });
        const pendingAds = await Ads.countDocuments({ status: 'pending' });
        const rejectedAds = await Ads.countDocuments({ status: 'rejected' });
    
        // Monthly Ads
        const monthlyAds = await Ads.aggregate([
          {
            $group: {
              _id: { $month: '$createdAt' },
              count: { $sum: 1 },
            },
          },
        ]);
    
        const statistics = {
          totalAds,
          acceptedAds,
          pendingAds,
          rejectedAds,
          monthlyAds,
        };
    
        res.json(statistics);
      } catch (error) {
    
        res.status(500).json({
            message: "Erreur lors de la récupération des statistiques",
            error: error.message,
        });
      }

    }
