'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TestImageSchema = new Schema({
  id: Number,
  name: String,
  url: String
});

module.exports = mongoose.model('TestImage', TestImageSchema);
