'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LikeImageSchema = new Schema({
  email:String,
  like:[Number]
  //like:Object
});

module.exports = mongoose.model('LikeImage', LikeImageSchema);
