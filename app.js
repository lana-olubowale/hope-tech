const bodyParser = require("body-parser")
const express = require("express")
// ROUTES
const registrationRoute = require("./routes/registrationRoute")


const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use("/", registrationRoute)


module.exports = app
