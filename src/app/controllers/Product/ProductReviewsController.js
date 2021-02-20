'use strict';

const Models = require("../../../models");
const Review = Models.product_review
const Cart = Models.cart
const Product = Models.product
const Validator = require("../../../Helpers/ValidateRequestData")
const ValidateInstanceSave = require("../../../Helpers/ValidateModelSave")

module.exports = {
    post: async (req, res) => {
        const required = ["product_id", "rate", "comment"];
        const {isValid, data} = Validator.validateExistance(req, required);
        if (isValid) {
            const cart = Cart.findOne({
                where: {
                    product_id: data.product_id,
                    user_id: req.session.user.id,
                    is_checkout: true,
                    review: false
                }
            });
            if (cart) {
                const review = Review.build({
                    product_id: cart.product_id,
                    customer_id: req.session.user.id,
                    rate: data.rate || 0,
                    comment: data.comment || ""
                });
                const {item, errors} = await ValidateInstanceSave.validateSave(product, Product);
                if(item){
                    return res.redirect(req.url);
                }
            }
        }
        // TODO Failed
        return res.redirect(req.url);
    }
}
