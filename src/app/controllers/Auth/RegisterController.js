const Models = require("../../../models");
const User = Models.User;
const Helper = require("./Helpers");

const buildUserFromRequest = async (req) => {
    const customer = await Models.role.findOne({where: {role: "customer"}})
    return User.build({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role_id: customer.id,
    })
}

const validateRegistration = (req) => {
    const errors = {};
    const passwords = [];
    for(let key of Object.keys(req.body)) {
        req.body[key] = !key.endsWith("password")?req.body[key].trim(): req.body[key];
        if(req.body[key]==="") errors[key] = `${key.toUpperCase()} cannot be Empty`;
        if(key.endsWith("password")) passwords.push(req.body[key]);
    }
    if(!(passwords.length===2 && passwords[0] === passwords[1]) && !errors[passwords]) errors["password"] = "Password and confirmation not match";
    return errors
}

module.exports = {
    get: (req, res) => {
        res.render("auth/RegisterPage",{"layout": "template/template2"});
    },

    post: async (req, res) => {
        const errors = validateRegistration(req);
        let isValid = false;
        if(!Object.keys(errors).length) {
            let user = await buildUserFromRequest(req);

            await user.validate()
                .then((usr) => {
                     user = usr.save()
                        .then(res => res)
                        .catch(errs => {
                            errs.errors.forEach(error => {
                                errors[error.path.substring(User.tableName.length+1)] = error.message.substring(User.tableName.length+1);
                            });
                        })
                })
                .catch(errs => {
                    errs.errors.forEach(error => {
                        errors[error.path.substring(User.tableName.length+1)] = error.message.substring(User.tableName.length+1);
                    });
                })
                user = await user;
            if(user){
                Helper.authenticate(req, user);
                return res.status(302).redirect("/");
            }
        }

        return res.render("auth/RegisterPage",{"layout": "template/template2", errors: errors});
    }
}
