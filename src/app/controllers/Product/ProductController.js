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
    // For admin to add product
    post: async (req, res) => {
        const required = ["name", "price", "stock", "is_available", "description"];
        const {isValid, data} = Validator.validateExistance(req, required);
        if (isValid) {
            const product = Product.build({
                name: data.name || "DEFAULT NAME",
                slug: data.name || "DEFAULT NAME",
                price: data.price || 100,
                is_available: data.is_available || true,
                description: data.description,
                stock: data.stock
            });
            const {item, errors} = await ValidateInstanceSave.validateSave(product, Product);
            // TODO
            if (item) {
                return res.redirect("/");
            }
            return res.render("", {"layout": "template/template2", errors: errors});
        }
    },
    // Update product
    update: async (req, res) => {
        const required = ["slug", "price", "stock", "is_available", "description"];
        const {isValid, data} = Validator.validateExistance(req, required);
        if (isValid) {
            const product = await Product.findOne({where: {slug: data.slug}});
            if (product) {
                product.price = data.price || 100;
                product.stock = data.stock || 1;
                product.is_available = data.is_available || true;
                product.description = data.description;
                const isSaved = await product.save();
                if (isSaved) {
                    // TODO
                    return res.render("profile", {"layout": "template"});
                }
            }
        }
        // TODO
        return res.render("profile", {"layout": "template", errors: "Invalid data provided"});

    },
    // delete by slug
    delete: async (req, res) => {
        const required = ["slug"];
        const {isValid, data} = Validator.validateExistance(req, required);
        if (isValid) {
            const product = await Product.findOne({where: {slug: data.slug}});
            if(product){
                product.destroy();
            }
        }
    }
}
