const express = require("express")
const menuController = require("../controllers/menuController")
const router = express.Router()
const { upload } = require("../lib/uploader")

router.get("/", menuController.getMenu)
router.post(
  "/createMenu",
  upload({
    acceptedFileTypes: ["jpg", "jpeg", "png"],
    filePrefix: "image_url",
  }).single("image_url"),
  menuController.createMenu
)

module.exports = router
