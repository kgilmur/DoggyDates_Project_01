"use strict";
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define("favorite", {
    venueId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favorite;
};