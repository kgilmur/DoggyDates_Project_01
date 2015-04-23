"use strict";

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    name: DataTypes.STRING,
    email: {
     type:DataTypes.STRING,
     validate:{
       isEmail:{
         msg:"Please enter a valid email address."
       }
     }
   },
    password: {
      type: DataTypes.STRING,
    validate: {
      len: {
        args: [6,200],
        msg: 'Password must be at least 6 characters long'
      }
    }
  }
  }, {
    hooks: {
      beforeCreate: function(user,options,sendback) {
        bcrypt.hash(user.password,10,function(err,hash) {
          if(err){ throw err; }
          user.password = hash;
          sendback(null,user);
        });
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.hasMany(models.favorite)
        models.user.hasMany(models.feature)

      }
    }
  });
  return user;
};