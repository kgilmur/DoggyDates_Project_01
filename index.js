var express = require("express");
var bodyParser = require('body-parser');
// var moviesCtrl = require("./controllers/movies");
var favoritesCtrl = require("./controllers/favorites");
var authCtrl = require('./controllers/auth');
var featureCtrl = require('./controllers/features');
var app = express();
var session = require('express-session');
var flash = require('connect-flash');
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

app.use(function(req,res,next){
  res.locals.alerts=req.flash();
  next();
});

// app.use('*', function(req,res,next) {
//   var alerts = req.flash();
//   res.locals.alerts = alerts;
//   next();
// });



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
  db.venue.findOrCreate({
    where:{name: req.body.name,address:req.body.address},
    defaults:{name: req.body.name,address:req.body.address,phone:req.body.phone,yelpRating:ratings,foodType:req.body.foodType}
  }).spread(function(data, created) {
    if(created) {
      res.redirect("/");
    } else {
      req.flash("danger","This restaurant is already in our system! Please see the list of dog-friendly restaurants on this page!");
      res.redirect("/dbsearch");
      // res.send("Already Exists")
    // data.save().then(function() {
    //   res.send("Already Exists")
      // })
    }
  }).catch(function(err){
    res.send(err);
  })
})

// app.post("/yelptodb", function(req, res) {
//   var ratings = Math.round(req.body.yelpRating);
//   db.venue.find({where:{name: req.body.name}}).spread(function(data, found) {
//     if(found) {
//       res.send("Already Exists");
//     } else {
//       db.venue.create({where:{name: req.body.name,address:req.body.address,phone:req.body.phone,yelpRating:ratings,foodType:req.body.foodType}}).then(function() {
//           res.redirect("/");
//         })
//       }
//   })
// })





app.get("/dbsearch", function(req, res) {
  var ratings = Math.round(req.body.yelpRating);
  db.venue.findAll({
    include:[db.feature]
  }).then(function(dbdata) {

    // console.log(data);

    // res.send(dbdata);

    var counterlocals = {
      dbdata:dbdata
    };

    res.render("pages/dbsearchresults",counterlocals);


  })
})




app.get("/yelpsearchpage", function(req, res) {
  res.render("pages/yelpsearchpage")
})


app.get("/about", function(req, res) {
  res.render("pages/about")
})




//ROUTES
// app.use('/auth/logout',require('./controllers/main.js'));
app.use('/auth',require('./controllers/auth.js'));
app.use('/yelp',require('./controllers/yelp.js'));
app.use('/features', require('./controllers/features.js'));
app.use("/favorites", favoritesCtrl);

// app.use('/auth', authCtrl);

app.listen(3000, function() {
  console.log("Server started on port 3000")
})