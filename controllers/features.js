var express = require("express");
var bodyParser = require('body-parser');
var router = express.Router();
var request = require("request");
var db = require('../models');
var flash = require('connect-flash');



router.use(bodyParser.urlencoded({extended: false}));


//WORKS - creates vote
// router.post("/patioonly", function(req,res){
//   var user= req.getUser();
//   db.feature.findOrCreate({where:{userId:user.id,venueId:req.body.venueId,type:req.body.patioonlyinput}}).spread(function(featureData, created) {
//     featureData.save().then(function() {
//     res.redirect("/dbsearch");
//   })
//   })
// })


//vote patio only once per user or tell user to login

router.post("/patioonly", function(req,res){
  var user= req.getUser();
  console.log("LOGGED IN USER", user);
  if (!user) {
    req.flash("danger","You are not logged in, please login or sign up in order to vote!")
    res.redirect("/dbsearch");
  };
  db.feature.count({where:{userId:user.id,venueId:req.body.venueId}}).then(function(count){
    console.log("COUNT!!!", count);
    if(count > 0){
      console.log(count);
      // return res.send({error: "You have already voted"})
      // alert("already voted")
      req.flash("danger","You have already voted for this restaurant!");
      res.redirect("/dbsearch");
    }else{
      db.feature.findOrCreate({where:{userId:user.id,venueId:req.body.venueId,type:req.body.patioonlyinput}})
        .spread(function(featureData, created){
          // console.log("test");
          // return res.send({vote: created});
          res.redirect("/dbsearch");
          // res.send("/dbsearch");
      }).catch(function(error) {
        console.log("error:",error);
      })
    }
  })
})

//vote once for inside or force to login

router.post("/inside", function(req,res){
  var user= req.getUser();
  if (!user) {
    req.flash("danger","You are not logged in, please login or sign up in order to vote!")
    res.redirect("/dbsearch");
  };
  db.feature.count({where:{userId:user.id,venueId:req.body.venueId}}).then(function(count){
    console.log("COUNT!!!", count);
    if(count > 0){
      req.flash("danger","You have already voted for this restaurant!");
      res.redirect("/dbsearch");
    }else{
      db.feature.findOrCreate({where:{userId:user.id,venueId:req.body.venueId,type:req.body.insideinput}})
        .spread(function(featureData, created){
          // console.log("test");
          // return res.send({vote: created});
          res.redirect("/dbsearch");
          // res.send("/dbsearch");
      }).catch(function(error) {
        console.log("error:",error);
      })
    }
  })
})


// router.post("/inside", function(req,res){
//   var user= req.getUser();
//   db.feature.findOrCreate({where:{userId:user.id,venueId:req.body.venueId,type:req.body.insideinput}}).spread(function(featureData, created) {
//     featureData.save().then(function() {
//     res.redirect("/dbsearch");
//   })
//   })
// })






module.exports = router;


