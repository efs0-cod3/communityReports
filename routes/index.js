const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();

router.get("/", (req, res) => {
  res.render('index')
});

router.get("/overview", ensureAuthenticated, (req, res) => {
  res.render("overview",{
  name: req.user.name})
});

module.exports = router