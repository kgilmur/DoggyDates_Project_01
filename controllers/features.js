var express = require("express");
// var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var request = require("request");
var db = require('../models');


router.use(bodyParser.urlencoded({extended: false}));


router.post("/patioonly", function(req,res){
  var user= req.getUser();
    db.feature.findOrCreate({where:{userId:user.id,venueId:req.body.venueId,type:req.body.patioonlyinput}}).spread(function(featureData, created) {
      featureData.save().then(function() {
    // res.render("/", {foundVenue:foundVenue, featureData:featureData});
    res.redirect({featureData:featureData, user:user});
    })
})
})






module.exports = router;


