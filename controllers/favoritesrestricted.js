var db = require('../models');
var express = require('express');
var router = express.Router();

//GET /
//home page of site
// router.get('/',function(req,res){
//   var user = req.getUser();
//   var alerts = req.flash();
//     res.render('/',{user:user,alerts:alerts});
// });

//GET /restricted
//an example restricted page
router.get('/favorites',function(req,res){

  if(req.getUser()) {
    console.log("USER", req.getUser())
    res.render('pages/favorites');
  } else {
    // res.send('ACCESS DENIED');
    alert('You must be logged in to access that page')
    res.redirect('/');
  }
});


module.exports = router;