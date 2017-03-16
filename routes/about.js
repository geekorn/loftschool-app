"use strict";

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const Model = mongoose.model('skill');

// обновление навыков
router.post('/', function (req, res) {
  let item = new Model ({
    title: "skills",
    data: req.body
  });

  // Model.update({title: key}, {$set: {percent: req.body[key]}}, {insert: true})
  //     }
  // })
  item.save()
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
