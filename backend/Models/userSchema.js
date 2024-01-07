const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Ads = require("./adsSchema");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      require: [true, "Please Enter Your First Name"],
    },
    lastname: {
      type: String,
      trim: true,
      require: [true, "Please Enter Your Last Name"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      require: [true, "Please Enter Your Email Adresse"],
    },
    emailConfirmed: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      require: [true, "Please Enter Your Password"],
    },
    phonenum: {
      type: String,
      required: true,
    },
    favoritesAds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ads",
    }],
    picture: {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
    confirmationExpire: Date,
    confirmationToken: String,
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Login
userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Register
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.pre('remove', async function (next) {
  const user = this;

  try {
    await mongoose.model('Ads').deleteMany({ createdBy: user._id });
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.getResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

userSchema.methods.getemailConfirmation = async function () {
  const confirmationToken = crypto.randomBytes(20).toString("hex");
  this.confirmationToken = crypto
    .createHash("sha256")
    .update(confirmationToken)
    .digest("hex");
  this.confirmationExpire = Date.now() + 15 * 60 * 1000;
  return confirmationToken;
};





const User = mongoose.model("User", userSchema);

module.exports = User;
