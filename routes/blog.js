"use strict";

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res) {
  let obj = {
    title: 'Блог'
  };
  const Model = mongoose.model('blog');

  Model.find().then(items => {
    Object.assign(obj, {items: items});
    res.render('pages/blog', obj);
  });
});


module.exports = router;