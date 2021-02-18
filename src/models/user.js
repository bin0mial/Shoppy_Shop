'use strict';
const crypto = require("crypto");


const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasOne(models.role, {as: "role", sourceKey: "role_id", foreignKey: "id"});
            this.belongsTo(models.product, {as: "products", foreignKey: "id", targetKey: "owner_id"});
            this.belongsTo(models.cart, {as: "cart", foreignKey: "id", targetKey: "customer_id"});
        }
    }

    console.log(User.associations)
    User.init({
        id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false},
        name: {type: DataTypes.STRING(50)},
        username: {type: DataTypes.STRING(16), allowNull: false, unique: true,},
        password: {
            type: DataTypes.STRING,
            set(value) {
                const md5 = crypto.createHash('md5');
                this.setDataValue('password', md5.update(value).digest('hex'));
            }
        },
        email: {type: DataTypes.STRING, unique: true},
        phone_number: {type: DataTypes.STRING(15)},
        credit_card: {type: DataTypes.STRING(15), unique: true},
        profile_picture: {type: DataTypes.STRING},
        role_id:
            {
                type: DataTypes.BIGINT,
                after: "id",
                references: {
                    model: 'roles',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },

    }, {
        sequelize,
        modelName: 'User',
        defaultScope: {
            attributes: {exclude: ['password']},
        }
    });

    return User;
};
