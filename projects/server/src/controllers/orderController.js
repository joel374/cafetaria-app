const db = require("../models")

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { MenuId, notes, quantity, table_number } = req.body

      const findUser = await db.User.findOne({
        where: {
          id: req.user.id,
        },
      })

      if (!findUser) {
        return res.status(404).json({ message: "User not found" })
      }

      const order = await db.Order.create({
        MenuId,
        UserId: req.user.id,
        notes,
        quantity,
        table_number,
      })

      return res.status(200).json({
        message: "Order created successfully",
        data: order,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Server error" })
    }
  },
  getOrder: async (req, res) => {
    try {
      const order = await db.Order.findAll()

      return res
        .status(200)
        .json({ message: "Order created successfully", data: order })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Server error" })
    }
  },
  acceptOrder: async (req, res) => {
    try {
      const isAdmin = await db.User.findOne({
        where: {
          id: req.user.id,
        },
      })

      if (!isAdmin.is_admin) {
        return res.status(403).json({ message: "User not authorized" })
      }

      const order = await db.Order.findAll()

      return res
        .status(200)
        .json({ message: "Order created successfully", data: order })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

module.exports = orderController
