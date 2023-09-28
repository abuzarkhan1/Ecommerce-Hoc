const mongoose = require("mongoose");
var cartSchema = new mongoose.Schema(
  {
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref : "User"
   },
   productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref : "Product"
   },
   quantity:{
    type : Number,
    require : true,
   },
   price:{
    type : Number,
    require : true,
   },
   color:{
    type:mongoose.Schema.Types.ObjectId,
    ref : "Color"
   }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
