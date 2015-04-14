var db = require('../models');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');


//GET /auth/signup ***** MODALS
//display sign up form
router.get('/',function(req,res){
    res.render('/');
});

//POST /auth/signup
//create new user in database
router.post('/',function(req,res){
    var userQuery = {email:req.body.email};
    var userData = {
        email:req.body.email,
        name:req.body.name,
        password:req.body.password
    };

    db.user.findOrCreate({where:userQuery,defaults:userData})
      .spread(function(user,created) {
          if(created) {
            res.redirect('/');
          } else {
            res.send("Your email already exists! Please log in");
          }
      })
      .catch(function(error) {
        console.log('error',error);
        res.send(error);
      })

    //do sign up here (add user to database)
    // res.send(req.body);


    //user is signed up forward them to the home page


    // res.redirect('/');
});

//GET /auth/login
//display login form
router.get('/',function(req,res){
    res.render('/');
});

//POST /login
//process login data and login user
router.post('/login',function(req,res){
    //do login here (check password and set session value)
    // res.send(req.body);
    db.user.find({where:{email:req.body.email}})
    .then(function(user) {
        if(user) {
              console.log(user);
          bcrypt.compare(req.body.password, user.password, function(err,result) {
            if(err) { throw err; }

            if(result) {

              //store user session!
              req.session.user = {
                  id:user.id,
                  email:user.email,
                  name:user.name
              };
              // res.send("Your password matched")
              // res.send(req.session.user)
              res.redirect("/")



            } else {
              res.send({error:  'Invalid password'})
            }
          })
        } else {
          res.send({error: 'Unknown user, Please check your information'})
        }
      })

    //user is logged in forward them to the home page
    // res.redirect('/');
});


//GET /auth/logout
//logout logged in user
router.get('/logout',function(req,res){

    // res.send('logged out');
    delete req.session.user;
    res.redirect('/');
});


module.exports = router;