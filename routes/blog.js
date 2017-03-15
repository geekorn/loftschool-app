"use strict";

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// добавление записи в блог
router.post('/', function (req, res) {
  if (!req.body.title || !req.body.date || !req.body.text) {
    return res.json({status: 'Укажите данные'});
  }

  const Model = mongoose.model('blog');
  let item = new Model({
    title: req.body.title,
    date: req.body.date,
    body: req.body.text
  });

  item.save().then(
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