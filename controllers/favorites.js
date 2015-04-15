var express = require("express");
// var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var request = require("request");
var db = require('../models');


router.use(bodyParser.urlencoded({extended: false}));




// router.get("/", function(req, res) {
//   db.favorites.findAll().then(function(faves) {
//     res.render('pages/favorites', {faves:faves});
//   })
// })

router.get("/", function(req,res){
   if (req.getUser()) {
    db.favorite.findAll().then(function(faves) {
        // res.send({favoritedata:favoritedata});
       res.render('pages/favorites', {faves:faves});
       // res.send(faves);
     })
       } else {
      res.send("Please login to set up your Favorites page");

     }
   })


router.post("/", function(req,res) {
  var user= req.getUser();
  var ratings = Math.round(req.body.yelpRating);
  db.favorite.findOrCreate({where:{userId:user.id,name:req.body.name,address:req.body.address,phone:req.body.phone,yelpRating:ratings,FoodType:req.body.foodType}}).spread(function(favoritedata, created) {
     favoritedata.save().then(function() {
      res.redirect("/favorites");
    })
   })
   })








module.exports = router;


