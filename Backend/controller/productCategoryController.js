const Category = require("../models/productCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");

const createCategory = asyncHandler(async(req,res)=>{
    try{
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    }catch(error){
        throw new Error(error);
    }
});

/* update Category */

const updateCategory = asyncHandler(async(req,res)=>{
    const {id} =req.params;
    validateMongoDbId(id);
    try{
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body,{
            new:true,
        });
        res.json(updatedCategory);
    }catch(error){
        throw new Error(error);
    }
});

/* fetch Category */

const getCategory = asyncHandler(async(req,res)=>{
    const {id} =req.params;
    validateMongoDbId(id);
    try{
        const getaCategory = await Category.findById(id);
        res.json(getaCategory);
    }catch(error){
        throw new Error(error);
    }
});

/* fetch all Category */

const getAllCategory = asyncHandler(async (req, res) => {
    try {
      const { category } = req.query;
      let categories;
      
      if (category) {
        categories = await Category.find({ category });
      } else {
        categories = await Category.find();
      }
  
      res.json(categories);
    } catch (error) {
      throw new Error(error);
    }
  });
/* delete Category */

const deleteCategory = asyncHandler(async(req,res)=>{
    const {id} =req.params;
    validateMongoDbId(id);
    try{
        const deletedCategory = await Category.findByIdAndDelete(id);
        res.json(deletedCategory);
    }catch(error){
        throw new Error(error);
    }
});


module.exports = {createCategory , updateCategory, getCategory, getAllCategory, deleteCategory};