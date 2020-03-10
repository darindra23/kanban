"use strict";
const { hashed } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model {}
  User.init(
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      }
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          instance.password = hashed(instance.password);
        }
      },
      sequelize
    }
  );
  User.associate = function(models) {
    User.hasMany(models.Task);
  };
  return User;
};
