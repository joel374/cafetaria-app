require("dotenv/config")
const express = require("express")
const cors = require("cors")
const db = require("../src/models")
const fs = require("fs")

const PORT = process.env.PORT || 8000
const app = express()

app.use(cors())
app.use(express.json())

const userRouter = require("../src/routers/userRouter")

app.use("/users", userRouter)

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Hello, API!",
  })
})

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`)
  } else {
    db.sequelize.sync({ alter: true })
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public")
    }
    console.log(`APP RUNNING at ${PORT} ✅`)
  }
})
