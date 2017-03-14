"use strict";

const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config = require('../config.json');

/* GET home page. */
router.get('/', function (req, res) {
  let obj = {
    title: 'Панель админа'
  };

  res.render('pages/admin', obj);
});


router.post('/', function (req, res) {
  let form = new formidable.IncomingForm();
  form.uploadDir = config.upload;

  form.parse(req, function (err, fields, files) {
    if (err) {
      //res.statusCode = 500;
      return res.json({status: 'Не удалось загрузить'})
    }
    fs.rename(files.photo.path, path.join(config.upload, files.photo.name), function (err) {
      if (err) {
        fs.unlink(path.join(config.upload, files.photo.name));
        fs.unlink(path.join(files.photo.path, files.photo.name));
      }
      res.json({status: 'Картинка загружена'})
    })
  })
});



router.post('/', function (req, res) {
  //требуем наличия заголовка, даты и текста

  console.log(req);
  if (!req.body.title) {
    return res.json({status: 'Укажите данные'});
  }
  const Model = mongoose.model('blog');
  let item = new Model({
    title: req.body.title,
    date: req.body.date,
    text: req.body.text
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