'use strict';

const Models = require("../../../models");
const Product = Models.product
const Validator = require("../../../Helpers/ValidateRequestData")
const ValidateInstanceSave = require("../../../Helpers/ValidateModelSave")

module.exports = {
    // List all products
    list: async (req, res) => {
        const products = await Models.product.findAll({
            where: {is_available: true},
            include: [{model: Models.product_image, as: "images"}]
        });
        // TODO PRODUCT PAGE.
        res.render("home", {"layout": "template", products: products});
    },
    // get data of certian product
    get: async (req, res) => {
        const product = await Product.findOne({
            where: {slug: req.params.slug, is_available: true},
            include: [{model: Models.product_image, as: "images"}, {model: Models.product_review, as: "reviews"}]
        });
        if (product)
            return res.render("orders/itemsOrder", {"layout": "template", product: product});
        return res.status(404).send("Page not found");
    },
}
