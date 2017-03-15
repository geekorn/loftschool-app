'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Skills = new Schema({
  title: {
    type: String
  },
  percent: {
    type: String
  }
});

module.exports = mongoose.model('skill', Skills);