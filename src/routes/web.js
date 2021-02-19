const express = require('express');
const route = express.Router();
const ejs = require("ejs");
const bodyParser = require("body-parser").urlencoded({extended: false});
const expressLayout = require("express-ejs-layouts");
const homepageController = require("../app/controllers/controller");

// TODO Web routes Written down there as follows
route.use(expressLayout);

route.get("/home", bodyParser, homepageController.home);
route.get("/", bodyParser, homepageController.get);
route.get("/profile", bodyParser, homepageController.profile);
route.get("/admin/addproduct", bodyParser, homepageController.adminAdd);
// route.post("/", bodyParser, homepageController.post);

route.get("/register", bodyParser, homepageController.register);
route.get("/login", bodyParser, homepageController.login);
route.get("/orders", bodyParser, homepageController.orders);
route.get("/RegisterPage.html", bodyParser, homepageController.register);
route.get("/LoginPage.html", bodyParser, homepageController.login);


// route.get("/profiles", bodyParser, profileController.list);
// route.post("/", bodyParser, homepageController.post);

module.exports = route;
