var express = require("express");
var bodyParser = require('body-parser');
// var moviesCtrl = require("./controllers/movies");
// var favoritesCtrl = require("./controllers/favorites");
var app = express();
// var db = require('/models');

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");
// app.use("/movies", moviesCtrl);
// app.use("/favorites", favoritesCtrl);


app.get("/", function(req, res) {
  res.render("pages/home")
})









app.listen(3000, function() {
  console.log("Server started on port 3000")
})