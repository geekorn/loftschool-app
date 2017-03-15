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
      return res.json({status: 'Не удалось загрузить работу'})
    }

    const Model = mongoose.model('work');

    fs.rename(files.photo.path, path.join(config.upload, files.photo.name), function (err) {
      if (err) {
        fs.unlink(path.join(config.upload, files.photo.name));
        fs.unlink(path.join(files.photo.path, files.photo.name));
      }

      let dir = config.upload.substr(config.upload.indexOf('/'));
      const item = new Model({
        title: fields.name,
        technology: fields.tech,
        picture: path.join(dir, files.photo.name)
      });
      item.save().then(pic => {
        res.json({status: 'Работа загружена'})
      })
    })
  })
});





module.exports = router;