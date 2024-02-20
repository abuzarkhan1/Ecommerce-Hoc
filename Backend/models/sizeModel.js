const mongoose = require('mongoose'); 

var sizeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        index:true,
    },
},{
    timestamps : true,
});

module.exports = mongoose.model('Size', sizeSchema);