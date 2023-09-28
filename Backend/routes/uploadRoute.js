const express = require("express");
const {
  uploadImages,
  deleteImages,
} = require("../controller/uploadController");
const { isAdmin, authMiddleware } = require("../middlerwares/authmiddleware");
const {uploadPhoto,productImgResize, bannerImgResize} = require("../middlerwares/uploadimages")

const router = express.Router();
router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 12),
  productImgResize,
  uploadImages
);

router.post(
  "/images",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 12),
  bannerImgResize,
  uploadImages
);
router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
