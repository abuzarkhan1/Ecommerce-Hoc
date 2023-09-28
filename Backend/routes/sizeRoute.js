const express = require("express");
const { createSize ,updateSize, deleteSize, getSize, getAllSize } = require("../controller/sizeController");
const { authMiddleware, isAdmin } = require("../middlerwares/authmiddleware");
const router = express.Router();

router.post("/",authMiddleware,isAdmin,createSize);
router.put("/:id",authMiddleware,isAdmin,updateSize);
router.delete("/:id",authMiddleware,isAdmin,deleteSize);
router.get("/:id",getSize);
router.get("/",getAllSize);

module.exports = router;