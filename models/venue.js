"use strict";
module.exports = function(sequelize, DataTypes) {
  var venue = sequelize.define("venue", {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    yelpRating: DataTypes.INTEGER,
    foodType: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return venue;
};