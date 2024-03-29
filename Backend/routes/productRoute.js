const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
} = require("../controller/productController");
const { isAdmin, authMiddleware } = require("../middlerwares/authmiddleware");

const router = express.Router();
router.post("/", authMiddleware, isAdmin,createProduct);
router.get("/:id", getaProduct);
router.put("/wishlist",authMiddleware,addToWishlist);
router.put("/rating",authMiddleware,rating);

router.put("/:productId",  authMiddleware, isAdmin,  updateProduct);
router.delete("/:id", authMiddleware, isAdmin,deleteProduct);

router.get("/", getAllProduct);

module.exports = router;
