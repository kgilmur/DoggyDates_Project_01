
var db = require('./models');

db.feature.findAll({attributes:[[db.sequelize.fn('count','type'),'count'],'type'],group:['type']}).then(function(featureCount){
  featureCount.forEach(function(count){
    console.log('count',count.get());
  })

});


// db.feature.count({where:{type:1}}).then(function(featureCount){
//   console.log('count',featureCount);
// });



// console.log(process.env.YELP_CONSUMER_KEY)

// var yelp = require("yelp").createClient({
//   consumer_key: process.env.YELP_CONSUMER_KEY,
//   consumer_secret: process.env.YELP_CONSUMER_SECRET,
//   token: process.env.YELP_TOKEN,
//   token_secret: process.env.YELP_TOKEN_SECRET
// });

// // See http://www.yelp.com/developers/documentation/v2/search_api
// yelp.search({term: "dog-friendly", location: "Seattle"}, function(error, data) {
//   console.log(error);
//   console.log(data);
// });

// // See http://www.yelp.com/developers/documentation/v2/business
// yelp.business("Norm's", function(error, data) {
//   console.log(error);
//   console.log(data);
// });