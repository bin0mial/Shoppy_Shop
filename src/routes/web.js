const express = require('express');
const route = express.Router();
const ejs = require("ejs");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require("body-parser").urlencoded({extended: false});
const expressLayout = require("express-ejs-layouts");
const middlewares = require("../app/middlewares");

const registerController = require("../app/controllers/Auth/RegisterController")
const loginController = require("../app/controllers/Auth/loginController")
const homepageController = require("../app/controllers/controller");


route.use(cookieParser());
route.use(session({
    name:"SHOPPYSHOP_SESSID",
    secret: process.env.APP_KEY,
    resave: false,
    saveUninitialized: true
}));

route.use(expressLayout);
route.use(middlewares["SessionMiddleware"]);

// TODO Web routes Written down there as follows
route.get("/home", bodyParser, homepageController.home);

route.get("/", bodyParser, homepageController.get);
route.get("/profile", middlewares["AuthMiddleware"], bodyParser, homepageController.profile);
route.get("/admin/addproduct", bodyParser, homepageController.adminAdd);

route.get("/", bodyParser, middlewares["AuthMiddleware"], homepageController.get);

// route.post("/", bodyParser, homepageController.post);

// route.get("/register", bodyParser, homepageController.register);
route.get("/register", middlewares["GuestMiddleware"], registerController.get);
route.post("/register", middlewares["GuestMiddleware"] ,bodyParser, registerController.post);

route.get("/login", middlewares["GuestMiddleware"], loginController.get);
route.post("/login", middlewares["GuestMiddleware"], bodyParser, loginController.post);

route.get("/orders", bodyParser, homepageController.orders);
route.get("/RegisterPage.html", bodyParser, homepageController.register);
route.get("/LoginPage.html", bodyParser, homepageController.login);
route.get("/mycart", bodyParser, homepageController.mycart);


// route.get("/profiles", bodyParser, profileController.list);
// route.post("/", bodyParser, homepageController.post);

module.exports = route;
