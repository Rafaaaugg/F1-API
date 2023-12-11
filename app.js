const express = require("express")
const path = require("path")
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('./swagger_doc.json')
const installRouter = require("./routes/installAPI")
const loginRouter = require("./routes/userAPI")
const seasonRouter = require("./routes/seasonAPI")
const driverChampRouter = require("./routes/driverChampAPI")
const constructorChampRouter = require("./routes/constructorChampAPI")
const racesRouter = require("./routes/racesAPI")
require("dotenv").config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/install", installRouter)
app.use("/login", loginRouter)
app.use("/season", seasonRouter)
app.use("/driver", driverChampRouter)
app.use("/constructor", constructorChampRouter)
app.use("/races", racesRouter)
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  res.status(err.status || 500)
  res.render("error")
})

module.exports = app