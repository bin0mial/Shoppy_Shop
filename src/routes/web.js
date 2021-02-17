const express = require('express');
const route = express.Router();
const ejs = require("ejs");
const bodyParser = require("body-parser").urlencoded({extended: false});
const expressLayout = require("express-ejs-layouts");
const homepageController = require("../app/controllers/controller");

// TODO Web routes Written down there as follows
route.use(expressLayout);

route.get("/", bodyParser, homepageController.get);
// route.post("/", bodyParser, homepageController.post);

route.get("/register", bodyParser, homepageController.register);

// route.get("/profiles", bodyParser, profileController.list);
// route.post("/", bodyParser, homepageController.post);

module.exports = route;
