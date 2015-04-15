var express = require("express");
var router = express.Router();
var request = require("request");
var db = require('../models');

var yelp = require("yelp").createClient({
consumer_key: process.env.YELP_CONSUMER_KEY,
consumer_secret: process.env.YELP_CONSUMER_SECRET,
token: process.env.YELP_TOKEN,
token_secret: process.env.YELP_TOKEN_SECRET
})


router.get("/", function(req, res) {
  res.render("pages/yelpsearch")
})

router.get("/search", function(req, res) {

  var query = req.query.q
  yelp.search({term: "dog-friendly " + query, location: "Seattle"}, function(error, data) {
    // console.log('data',error,data);
    // res.send(data);
    info = data.businesses.map(function(data){
      return {
        name: data.name,
        address: data.location.display_address,
        phone: data.display_phone,
        rating: data.rating,
        categories: data.categories,
        neighborhood: data.location.neighborhoods
      };
    });
    res.render('pages/yelpsearchresults',{yelpResults:info});


    // console.log(info[0].location)
    // console.log(error);
    // console.log(yelpdata);
    // res.render("./pages/yelpsearchresults", yelpdata);
  })
});

module.exports = router;

