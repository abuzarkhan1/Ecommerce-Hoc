const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlerwares/authmiddleware");
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImages,
} = require("../controller/blogController");
const { blogImgResize, uploadPhoto } = require("../middlerwares/uploadimages");

router.post("/", authMiddleware, isAdmin,createBlog);
router.put("/upload-images/:id",authMiddleware, isAdmin,uploadPhoto.array('images',12),blogImgResize,uploadImages);

router.put("/likes", authMiddleware, likeBlog);
router.put("/dislikes", authMiddleware, dislikeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;
