const mongoose = require("mongoose");



const adsSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [{
      type: String,
      required: true,
    }],
    expiredDay: {
      type: Date,
      default: Date.now()+30*24*60*60*1000,

    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    isAccepted: {
      type: Boolean,
      required: true,
      default: false,
    },
    
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
  },
  {
    timestamps: true,
  }
);

const Ads = mongoose.model("Ads", adsSchema);

module.exports = Ads;
