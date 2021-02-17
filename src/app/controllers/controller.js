const db = require("../../models");
const User = require("../../models/user")(db.sequelize, db.Sequelize);

module.exports = {
    homepage: async (req, res) => {

        await User.create({
            name: "john",
            username: "john",
            password: "123",

        }).catch(response => res.send(response.errors[0].message))
        let user = await User.findOne({where: {username: "john"}});
        res.status(200).send(user);
    },
    get: (req, res) => {
        res.render("profile", {"layout": "template"});
    },
    register: (req, res) => {
        data = {
            a:"a",
            b: "b"
        }
        res.render("auth/RegisterPage", {"layout": "template", ...data});
    }
};
