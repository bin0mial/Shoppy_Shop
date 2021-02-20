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
        res.render("auth/RegisterPage",{"layout": "template/template2"});
    },

    login: (req, res) => {
        res.render("auth/LoginPage",{"layout": "template/template2"});
    },

    orders: async (req, res) => {
        const product = await Models.product.findOne({where:{slug: req.params.slug}, include:[{model:Models.product_image, as: "images"}]});
        if(product)
            return res.render("orders/itemsOrder", {"layout": "template", product:product});
        return res.status(404).send("Page not found");
    },

    home: async (req, res) => {
        const user = await User.findOne({where: {id: 1}});
        const products = await Models.product.findAll({ limit:6,order:[['createdAt','DESC']], include: [{model:Models.product_image, as: "images"}]});

        // console.log(products);
        // res.send(products);
        res.render("home", {"layout": "template", "username": user.username, products: products});
    },

    profile: (req, res) => {
        res.render("profile", {"layout": "template"});
    },
    adminAdd: (req, res) => {
        res.render("admin/add", {"layout": "template"});
    },

    mycart: (req, res) => {  
        res.render("orders/cartPage", {"layout": "template"});
    },

    admin: (req, res) => {  
        res.render("orders/adminLogin", {"layout": "template/template2"});
    },

};
