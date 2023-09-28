const mongoose = require("mongoose");

var bannerSchema = new mongoose.Schema({
    images: [{
        public_id: String,
        url: String,
      }]},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Banner", bannerSchema);
