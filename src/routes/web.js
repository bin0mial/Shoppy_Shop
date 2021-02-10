const express = require('express');
const route = express.Router();
const bodyParser = require("body-parser").urlencoded({extended: false});

// TODO Web routes Written down there as follows

route.get("/", bodyParser, (req, res) => (res.send("Hello from Web")));

module.exports = route;
