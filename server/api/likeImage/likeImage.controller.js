'use strict';

var _ = require('lodash');
var LikeImage = require('./likeImage.model');

// Get list of likeImages
exports.index = function(req, res) {
  LikeImage.find(function (err, likeImages) {
    if(err) { return handleError(res, err); }
    return res.json(200, likeImages);
  });
};

// Get a single likeImage
exports.show = function(req, res) {
  LikeImage.findById(req.params.id, function (err, likeImage) {
    if(err) { return handleError(res, err); }
    if(!likeImage) { return res.send(404); }
    return res.json(likeImage);
  });
};

// Creates a new likeImage in the DB.
exports.create = function(req, res) {
  LikeImage.create(req.body, function(err, likeImage) {
    if(err) { return handleError(res, err); }
    return res.json(201, likeImage);
  });
};

// Updates an existing likeImage in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  LikeImage.findById(req.params.id, function (err, likeImage) {
    if (err) { return handleError(res, err); }
    if(!likeImage) { return res.send(404); }
    //var updated = _.merge(likeImage, req.body);
    var updated = _.extend(likeImage, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, likeImage);
    });
  });
};

// Deletes a likeImage from the DB.
exports.destroy = function(req, res) {
  LikeImage.findById(req.params.id, function (err, likeImage) {
    if(err) { return handleError(res, err); }
    if(!likeImage) { return res.send(404); }
    likeImage.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
