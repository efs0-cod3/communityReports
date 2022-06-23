const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");


// User model
const User = require('../models/User')
// is authenticated
const {forwardAuthenticated} = require('../config/auth')

router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login");
});

router.get("/signup", forwardAuthenticated, (req, res) => {
  res.render("signup");
});


// register handle
router.post("/signup", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // check req fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "complete all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  // check pass length
  if (password.length < 6) {
    errors.push({ msg: "Passwords should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("signup", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
        //create a new instance of user
      User.findOne({ email: email }).then( user => {
              if(user){
                // user exist
                errors.push({ msg: 'Email is already submitted' })
                res.render("signup", {
                  errors,
                  name,
                    email,
                  password,
                  password2,
              });
              } else {
                const newUser = new User({
                  name,
                  email,
                  password
                });
        //  hasg password
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                // set password to hash
                newUser.password = hash
                // save user
                newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered, and can log in')
                  res.redirect('/users/login')
                })
                .catch(err => console.log(err));
              });
            });
          }
        });
       }
});


// login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/overview',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });

  // Logout
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    req.flash('success_msg', 'You are logged out');
    res.redirect('../users/login');
  });
  });

module.exports = router;
