var express = require("express");
var bodyParser = require('body-parser');
// var moviesCtrl = require("./controllers/movies");
var favoritesCtrl = require("./controllers/favorites");
var authCtrl = require('./controllers/auth');
var featureCtrl = require('./controllers/features');
var app = express();
var flash = require('connect-flash');
var session = require('express-session');
var db = require('./models');

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");


//SESSION
app.use(session({
  secret:'horsies',
  resave: false,
  saveUninitialized: true,
}))

app.use(flash());


//MIDDLEWARE
app.use(function(req,res,next){
  req.getUser = function() {
    return req.session.user || false;
  }
  next();
});

app.use(function(req,res,next){
  res.locals.currentUser = req.getUser();
  next();
});



app.get("/", function(req, res) {

  res.render("pages/home")

})

app.get("/dbsearchresults", function(req, res) {
  res.render("pages/dbsearchresults")
})

// app.get("/yelpsearchresults", function(req, res) {
//   res.render("pages/yelpsearchresults")
// })

// app.get("/favorites", function(req, res) {
//   if (req.getUser()) {
//   res.render("pages/favorites")
//   } else {
//     // req.flash('danger','You must be logged in to access that page')
//     res.send("Please login to view the Favorites page");
//   }
// })

// app.get("/yelpsearchresults", function(req, res) {
//   res.render("pages/yelpsearch")
// })

app.post("/yelptodb", function(req, res) {
  var ratings = Math.round(req.body.yelpRating);
  db.venue.findOrCreate({where:{name: req.body.name,address:req.body.address,phone:req.body.phone,yelpRating:ratings,foodType:req.body.foodType}}).spread(function(data, created) {
    // if(data.name == "") {
    data.save().then(function() {
      res.redirect("/");
    })
    // } else {
    //   res.send("Already Exists")
    // }
  })
})

app.get("/dbsearch", function(req, res) {
  var ratings = Math.round(req.body.yelpRating);
  db.venue.findAll().then(function(dbdata) {
    // console.log(data);
      res.render("pages/dbsearchresults",{dbdata:dbdata});
      // res.send(dbdata);
    })
  })




app.get("/yelpsearchpage", function(req, res) {
  res.render("pages/yelpsearchpage")
})


//ROUTES
// app.use('/auth/logout',require('./controllers/main.js'));
app.use('/auth',require('./controllers/auth.js'));
app.use('/yelp',require('./controllers/yelp.js'));
app.use('/features', require('./controllers/features.js'));
// app.use("/movies", moviesCtrl);
app.use("/favorites", favoritesCtrl);

// app.use('/auth', authCtrl);

app.listen(3000, function() {
  console.log("Server started on port 3000")
})