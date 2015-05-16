'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LikeImageSchema = new Schema({
  id:String,
  like:{}
});

module.exports = mongoose.model('LikeImage', LikeImageSchema);
