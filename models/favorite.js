"use strict";
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define("favorite", {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    yelpRating: DataTypes.INTEGER,
    FoodType: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.favorite.belongsTo(models.user)
      }
    }
  });
  return favorite;
};