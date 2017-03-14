"use strict";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  let obj = {
    title: 'Обо мне'
  };

  res.render('pages/about', obj);
});

module.exports = router;
