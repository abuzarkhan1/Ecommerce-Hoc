const express = require("express");
const { createBanner ,updateBanner, deleteBanner, getBanner, getAllBanners } = require("../controller/BannerCtrl");
const router = express.Router();

router.post("/",createBanner);
router.put("/:id",updateBanner);
router.delete("/:id",deleteBanner);
router.get("/:id",getBanner);
router.get("/",getAllBanners);

module.exports = router;