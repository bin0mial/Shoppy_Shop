'use strict';

const Models = require("../../../models");
const validator = require("../../../Helpers/ValidateRequestData");

module.exports = {
    get: (req, res) =>{
        res.render("profile", {"layout": "template"});
    },
    update: (req, res) => {
        const required = ["name", "email", "address", "date_of_birth", "gender"];
        const optional = ["picture"];
        const {isValid, data} = validator.validateExistance(req, required);
        if(isValid){
            // TODO Update user data.
        }
        // TODO if isnt valid
    }
}
