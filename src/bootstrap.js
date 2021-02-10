const express = require('express');
const path = require('path');
const routes = require('./routes')

module.exports = app => {

    // App public directories
    app.use("/static", express.static(path.join(__dirname, "/public/static_root")));
    app.use("/media", express.static(path.join(__dirname, "/public/media_root")));

    // Template Engine and Views Directory
    app.set('views', path.join(__dirname, '/views'));
    app.set("view engine", "ejs");

    // Routes
    app.use("/api", routes.apiRouter)
    app.use("/", routes.webRouter);
};
