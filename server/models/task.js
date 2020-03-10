"use strict";
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Task extends Model {}
  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      description: DataTypes.STRING,
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      UserId: DataTypes.INTEGER
    },
    { sequelize }
  );

  Task.associate = function(models) {
    Task.belongsTo(models.User);
  };
  return Task;
};
