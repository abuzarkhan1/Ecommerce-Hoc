const Banner= require ("../models/BannerModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");

const createBanner = async (req, res) => {
  const { images } = req.body;
  console.log('Received images:', images); 
  try {
    const newBanner = await Banner.create({ images });
    console.log('New banner:', newBanner); 
    res.json(newBanner);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


   const getAllBanners = asyncHandler(async (req, res) => {
    try {
      const banners = await Banner.find();
      console.log(banners)
      res.json(banners);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
    const updateBanner = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedBanner = await Banner.findByIdAndUpdate(
        id,
        {
          images,
        },
        { new: true }
      );
      if (!updatedBanner) {
        return res.status(404).json({ error: 'Banner not found' });
      }
      res.json(updatedBanner);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  const getBanner= asyncHandler(async(req,res)=>{
    const {id} =req.params;
    validateMongoDbId(id);
    try{
        const getaBanner= await Banner.findById(id);
        res.json(getaBanner);
    }catch(error){
        throw new Error(error);
    }
});
  
    const deleteBanner = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBanner = await Banner.findByIdAndDelete(id);
      if (!deletedBanner) {
        return res.status(404).json({ error: 'Banner not found' });
      }
      res.json({ message: 'Banner deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = {createBanner, updateBanner, getBanner, getAllBanners, deleteBanner};