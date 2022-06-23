const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");


const app = express();

// passport config
require('./config/passport')(passport)

// db config
const db = require("./config/keys").MongoURI;

mongoose
  .connect(db, { useNewUrlParser: true }, { useUnifiedTopology: true })
  .then(() => console.log("💻 Mondodb Connected"))
  .catch((err) => console.error(err));

//   ejs
app.set("view engine", "ejs");

// static public
app.use(express.static("public"));

// Body parser
app.use(express.urlencoded({ extended: false }))

// express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// global vars
app.use((req, res, next) => {
  res.locals.success_msg =  req.flash('success_msg')
  res.locals.error_msg =  req.flash('error_msg')
  res.locals.error =  req.flash('error')
  next()
})

// routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port port 🔥`);
