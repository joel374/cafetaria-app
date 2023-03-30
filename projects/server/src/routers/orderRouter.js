const express = require("express")
const orderController = require("../controllers/orderController")
const { verifyToken } = require("../middlewares/authMiddleware")
const router = express.Router()

router.post("/createOrder", verifyToken, orderController.createOrder)
router.post("/getOrder", verifyToken, orderController.getOrder)

module.exports = router
