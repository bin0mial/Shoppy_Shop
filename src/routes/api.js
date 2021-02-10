const express = require('express');
const route = express.Router();
const jsonBodyParser = require("body-parser").json();

// TODO API routes Written down there as follows

route.get("/", jsonBodyParser, (req, res) => (res.send("Hello from API")));

module.exports = route;
