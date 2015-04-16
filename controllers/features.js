var express = require("express");
var bodyParser = require('body-parser');
var router = express.Router();
var request = require("request");
var db = require('../models');


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


//vote patio only once per user or force user to login

router.post("/patioonly", function(req,res){
  var user= req.getUser();
  if (!user) { return res.send("Log in")}
  db.feature.count({where:{userId:user.id,venueId:req.body.venueId}}).then(function(count){
    console.log("COUNT!!!", count);
    if(count > 0){
      return res.send({error: "You have already voted"})
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
  if (!user) { return res.send("Please log in before voting")}
  db.feature.count({where:{userId:user.id,venueId:req.body.venueId}}).then(function(count){
    console.log("COUNT!!!", count);
    if(count > 0){
      return res.send({error: "You have already voted for this restaurant"})
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

// router.get("/", function(req, res) {
//   db.feature.findAndCountAll({where:{type:1}}).then(function(countpatio) {
//     countpatio.
//   })
// })




module.exports = router;


