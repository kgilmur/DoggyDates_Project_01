var express = require("express");
// var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var request = require("request");
var db = require('../models');
var flash = require('connect-flash');


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
      // res.send("Please login to set up your Favorites page");
      req.flash("danger","Please login or signup to view your favorites page!");
      res.redirect("/dbsearch");

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


router.delete('/',function(req,res) {
  db.favorite.destroy({where:{id:req.body.id}}).then(function() {
    res.send({result:true});
  });
  res.send(req.body);
  console.log('test',req.body);
});






module.exports = router;


