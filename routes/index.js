"use strict";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  let obj = {
    title: 'welcome'
  };

  res.render('pages/index', obj);
});

module.exports = router;
