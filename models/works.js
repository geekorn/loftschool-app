'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WorkSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Укажите название']
  },
  technology: {
    type: String,
    required: [true, 'Укажите технологии']
  },
  picture: {
    type: String
  }
});

mongoose.model('works', WorkSchema);