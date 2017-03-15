"use strict";

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const Model = mongoose.model('skill');

/* GET home page. */
router.get('/', function(req, res) {
  let obj = {
    title: 'Обо мне'
  };

  Model.find().then(items => {
    Object.assign(obj, {items: items});
    res.render('pages/about', obj);
  });
});


router.post('/', function (req, res) {

  Model.find().exec()
    .then( function() {
      for (let key in req.body) {

        Model.update({title: key}, {$set: {percent: req.body[key]}}, {insert: true})
      }
  })
    .then(
    (i) => {return res.json({status: 'Запись добавлена'});},
  (e) => {
    const error = Object
        .keys(e.errors)
        .map(key => {e.errors[key].message})
        .join(', ');
    res.json({status: 'При добавлении произошла ошибка: ' + error})
  });
});

module.exports = router;
