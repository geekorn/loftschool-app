'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Skills = new Schema({
  title: {
    type: String
  },
  data: {
    type: []
  }
});

module.exports = mongoose.model('skill', Skills);