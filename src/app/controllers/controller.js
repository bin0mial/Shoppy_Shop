const Models = require("../../models");
const User = Models.User;

module.exports = {
    homepage: async (req, res) => {
        let user = await User.findOne({where: {username: "john"}});
        console.log(await user.getProducts())
        let answered = false;
        // await User.create({
        //     name: "john",
        //     username: "john",
        //     password: "123",
        //
        // }).catch(response => {
        //     res.send(response.errors[0].message)
        //     answered = true
        // })
        // let user = await User.findOne({where: {username: "john"}});

        // let role = await user.getProducts()
        // console.log(user.getRole)
        if(!answered)
            res.status(200).send("");
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
    },
    home: (req, res) => {
        res.render("home", {"layout": "template","username":"test"});
    },
};
