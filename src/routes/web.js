const express = require('express');
const route = express.Router();
const bodyParser = require("body-parser").urlencoded({extended: false});
const controller = require("../app/controllers/controller");

// TODO Web routes Written down there as follows

route.get("/", bodyParser, controller.homepage);

module.exports = route;
