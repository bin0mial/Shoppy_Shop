module.exports = (req, res, next) => {
    res.locals.session = req.session;
    return next();
}
