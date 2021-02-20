'use strict';

const User = require("../../../models").User;
const validator = require("../../../Helpers/ValidateRequestData");

module.exports = {
    get: (req, res) =>{
        res.render("profile", {"layout": "template"});
    },
    update: async (req, res) => {
        const required = ["name", "email", "address", "date_of_birth", "gender"];
        const {isValid, data} = validator.validateExistance(req, required);
        if(isValid){
            const user = await User.findOne({where:{id: req.session.user.id}});
            user.name = data.name || user.name;
            user.email = data.email || user.email;
            user.address = data.address || null;
            user.date_of_birth = data.date_of_birth || null;
            user.gender = data.gender || user.gender;
            if(req.file)
                user.profile_picture = `${process.env.MEDIA_URL}images/${req.session.user.username}/profile/${req.file.filename}`;
            const saved = await user.save()
            if(saved){
                req.session.user = user;
                return res.render("profile", {"layout": "template"});
            }
        }
        return res.render("profile", {"layout": "template", errors:"Invalid data provided"});
    },

}
