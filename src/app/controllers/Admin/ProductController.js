'use strict';

const Models = require("../../../models");
const Product = Models.product
const Validator = require("../../../Helpers/ValidateRequestData")
const ValidateInstanceSave = require("../../../Helpers/ValidateModelSave")

module.exports = {
    getAddPage: async (req, res) => {
        res.render("admin/add", {"layout": "template/template2"});
    },
    getUpdatePage: async (req, res) => {
        const product = await Product.findOne({where: {slug: req.params.slug, is_available: true}});
        if (product)
            return res.render("admin/edit", {"layout": "template/template2", product: product});
        return res.status(404).send("Page not found");
    },
    addProduct: async (req, res) => {
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
    updateProduct: async (req, res) => {
        const required = ["slug", "price", "stock", "is_available", "description"];
        const {isValid, data} = Validator.validateExistance(req, required);
        if (isValid) {
            const product = await Product.findOne({where: {slug: req.params.slug}});
            if (product) {
                product.price = data.price || 100;
                product.stock = data.stock || 1;
                product.is_available = data.is_available || true;
                product.description = data.description;
                const isSaved = await product.save();
                if (isSaved) {
                    // TODO
                    return res.render("admin/edit", {"layout": "template/template2"});
                }
            }
        }
        // TODO
        return res.render("profile", {"layout": "template", errors: "Invalid data provided"});

    },
    deleteProduct: async (req, res) => {
        const required = ["slug"];
        const {isValid, data} = Validator.validateExistance(req, required);
        if (isValid) {
            const product = await Product.findOne({where: {slug: req.params.slug}});
            if(product){
                product.destroy();
            }
        }
    }
}
