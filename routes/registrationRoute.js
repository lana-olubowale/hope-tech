const express = require("express")
const Router = express.Router()
const registrationController = require("../controllers/registrationController")

Router.post("/register", registrationController.signup)
Router.get("/renters/:page", registrationController.getRenters)
Router.get("/buyers/:page", registrationController.getBuyers)

module.exports = Router