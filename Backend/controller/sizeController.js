const Size = require("../models/sizeModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");

const createSize= asyncHandler(async(req,res)=>{
    try{
        const newSize= await Size.create(req.body);
        res.json(newSize);
    }catch(error){
        throw new Error(error);
    }
});

/* update Size */

const updateSize= asyncHandler(async(req,res)=>{
    const {id} =req.params;
    validateMongoDbId(id);
    try{
        const updatedSize= await Size.findByIdAndUpdate(id, req.body,{
            new:true,
        });
        res.json(updatedSize);
    }catch(error){
        throw new Error(error);
    }
});

/* fetch Size */

const getSize= asyncHandler(async(req,res)=>{
    const {id} =req.params;
    validateMongoDbId(id);
    try{
        const getaSize= await Size.findById(id);
        res.json(getaSize);
    }catch(error){
        throw new Error(error);
    }
});

/* fetch all Size */

const getAllSize= asyncHandler(async(req,res)=>{
    try{
        const getallSize= await Size.find();
        res.json(getallSize);
    }catch(error){
        throw new Error(error);
    }
});
/* delete Size */

const deleteSize= asyncHandler(async(req,res)=>{
    const {id} =req.params;
    validateMongoDbId(id);
    try{
        const deletedSize= await Size.findByIdAndDelete(id);
        res.json(deletedSize);
    }catch(error){
        throw new Error(error);
    }
});


module.exports = {createSize, updateSize, getSize, getAllSize, deleteSize};