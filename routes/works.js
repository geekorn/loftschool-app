"use strict";

var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const config = require('../config.json');
const smtpTransport = require('nodemailer-smtp-transport');

// отправка почты
router.post('/', function (req, res) {
  //validation
  let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
      user: config.mail.user,
      pass: config.mail.pass
    }
  }));

  let mailOptions = {
    from: req.body.email,
    to: config.mail.user,
    subject: config.mail.subject,
    text: req.body.text.trim().slice(0, 500)
  };

// send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({status: 'При отправке письма произошла ошибка'})
      }
      return res.json({status: 'Ваше письмо отправлено'})
    }
  );

  function sendMail(url, data, cb) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onload = function (e) {
      let result = JSON.parse(xhr.responseText);
      cb(result.status);
    };
    xhr.send(JSON.stringify(data));
  }
});


module.exports = router;