const generateToken = require("../utils/auth");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const User = require("../Models/userSchema");
const { emailConfirmation } = require("../template/emailConfirmation");
const { resetPassword } = require("../template/resetPassword");




exports.register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, phonenum } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({message:"L'utilisateur existe déjà"});
    } else if (!firstname || !lastname || !email || !password || !phonenum) {
      res.status(400).json({message:"Veuillez remplir tous les champs"});
    } else if (password.length < 8)
      res.status(400).json({message:"Le mot de passe doit contenir au moins 8 caractères"});
    else{
      const user = await User.create({
        firstname,
        lastname,
        email,
        password,
        phonenum,
      });
      if (user) {
        const confirmationToken = await user.getemailConfirmation();
        await user.save({ validateBeforeSave: false });
        const confirmationUrl = `https://tayara-clone.onrender.com/confirme/${confirmationToken}`;
        try {
          await sendEmail({
            email: user.email,
            subject: "Confirmation de votre compte",
            message: emailConfirmation(confirmationUrl)
          });

          // `<b>Votre lien de confirmation de compte est:</b> <a href="${confirmationUrl}">${confirmationUrl}<a>`
        } catch (error) {
          user.confirmationToken = undefined;
          user.confirmationExpire = undefined;
          await user.save({ validateBeforeSave: false });
          return next(new Error(error.message, 500));
        }
        res.status(201).json({message: "Utilisateur créé avec succès. Veuillez vérifier votre email pour confirmer votre compte"});
      } else {
        res.status(400).json({message:"inscription échoué"});
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur Serveur."
    });
  }


}


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Aucun compte trouvé avec cet email" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "mot de passe invalide" });
    }else
    {
    if (!user.emailConfirmed) {
      return res.status(400).json({ message: "Veuillez confirmer votre email pour continuer" });
    }

    if (!user.isActive) {
      return res.status(400).json({ message: "Votre compte a été désactivé" });
    }


    generateToken(res, user.id);
    res.status(200).json({
      message: "Connexion réussie.",
      user: {
        id: user.id,
        email: user.email,
        fullname: user.firstname + " " + user.lastname, 
        picture : user.picture,     
      },
    });
  }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

exports.confirmeEmail = async (req, res, next) => {
  try{
    const confirmationToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    confirmationToken,
    confirmationExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(404).json({ message: "Lien de confirmation invalide ou votre compte déjà confirmé" });
  }
  else{
    user.confirmationToken = undefined;
    user.confirmationExpire = undefined;
    user.emailConfirmed = true;
    await user.save({ validateBeforeSave: false });
    res.status(200).json("Compte confirmé avec succès !");
  }
}
  catch (error) {
    res.status(500).json({
      message: "Erreur Serveur.",
    });
  }
}



exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({message:"L'utilisateur non trouver"});
    }else{
      const resetToken = await user.getResetPasswordToken();
      await user.save({ validateBeforeSave: false });
      const resetPasswordUrl = `https://tayara-clone.onrender.com/reset-password/${resetToken}`;

    
      try {
        await sendEmail({
          email: user.email,
          subject: "Reset Password Tayara",
          message: resetPassword(resetPasswordUrl)
        });
        res.status(200).json({
          success: true,
          message: `Lien de réinitialisation du mot de passe envoyé à ${user.email} avec succès`,
        });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
    
        await user.save({ validateBeforeSave: false });
        return next(new Error(error.message, 500));
      }
    }
  
    
  } catch (error) {
    res.status(500).json({
      message: "Erreur Serveur.",
    });
  }
 
}


exports.resetPassword = async (req, res, next) => {
try {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(404).json({ message: "Code de réinitialisation de mot de passe invalide" });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  generateToken(res, user.id);
  res.status(201).json({
    message: "Mot de passe changé avec succès !",
    user: {
      id: user.id,
      email: user.email,
    },
  });
} catch (error) {
  res.status(500).json({
    message: "Erreur Serveur.",
  });
}
  
}


exports.logout = async (req, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Déconnecté avec succès" });
}