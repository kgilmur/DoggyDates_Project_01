"use strict";
module.exports = function(sequelize, DataTypes) {
  var feature = sequelize.define("feature", {
    userId: DataTypes.INTEGER,
    venueId: DataTypes.INTEGER,
    type: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.feature.belongsTo(models.user)
        models.feature.belongsTo(models.venue)
      }
    }
  });
  return feature;
};