'use strict';

const {Op} = require("sequelize");
const Models = require("../../../models");
const validator = require("../../../Helpers/ValidateRequestData");
const Product = Models.product;

module.exports = {
    get: async (req, res) => {
        const userCart = await Models.cart.findAll({
            where: {customer_id: req.session.user.id},
            include: [
                {model: Models.product, as: "product"}
            ]
        });
        res.render("orders/cartPage", {"layout": "template",carts: userCart});
    },
    post: async (req, res) => {
        const required = ["product_id", "quantity"];
        const {isValid, data} = validator.validateExistance(required);
        const user = await Models.User.findOne({
            where: {id: req.session.user.id},
            include: [{model: Models.role, as: "role"}]
        });
        if (isValid && user.role.role !== "admin") {
            const product = Product.findOne({where: {id: data.product_id, is_available:true , stock: {[Op.gte]: data.quantity}}});
            if (product) {
                const cart = await Models.cart.create({
                    product_id: product.id,
                    customer_id: user.id,
                    quantity: data.quantity
                });
                if (cart) {
                    product.stock -= data.quantity;
                    product.is_available = product.is_available? data.quantity>0: false;
                    product.save();
                    return res.render("orders/cartPage", {"layout": "template", message: "Product added to stock successfully!"});
                }
            }
        }
        return res.render("orders/cartPage", {"layout": "template", message: "Failed to add product to stock!"});
    }
}
