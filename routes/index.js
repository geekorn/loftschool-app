"use strict";

var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res) {
  let obj = {
    title: 'welcome'
  };

  res.render('pages/index', obj);
});

/* GET admin page. */
router.get('/admin', function (req, res) {
  let obj = {
    title: 'Панель админа'
  };

  res.render('pages/admin', obj);
});

/* GET my works page */
router.get('/works', function (req, res) {
  let obj = {
    title: 'Мои работы'
  };

  let Model = mongoose.model('work');

  Model.find().then(items => {
    Object.assign(obj, {items: items});
  res.render('pages/works', obj);
});
});

/* GET about page. */
router.get('/about', function(req, res) {
  let obj = {
    title: 'Обо мне'
  };
  let Model = mongoose.model('skill');

  Model.find().then(items => {
    Object.assign(obj, {items: items});
  res.render('pages/about', obj);
});
});

/* GET blog page */
router.get('/blog', function(req, res) {
  let obj = {
    title: 'Блог'
  };
  let Model = mongoose.model('blog');

  Model.find().then(items => {
    Object.assign(obj, {items: items});
  res.render('pages/blog', obj);
});
});


module.exports = router;
