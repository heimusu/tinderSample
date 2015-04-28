'use strict';

var _ = require('lodash');
var TestImage = require('./testImage.model');

// Get list of testImages
exports.index = function(req, res) {
  TestImage.find(function (err, testImages) {
    if(err) { return handleError(res, err); }
    return res.json(200, testImages);
  });
};

// Get a single testImage
exports.show = function(req, res) {
  TestImage.findById(req.params.id, function (err, testImage) {
    if(err) { return handleError(res, err); }
    if(!testImage) { return res.send(404); }
    return res.json(testImage);
  });
};

// Creates a new testImage in the DB.
exports.create = function(req, res) {
  TestImage.create(req.body, function(err, testImage) {
    if(err) { return handleError(res, err); }
    return res.json(201, testImage);
  });
};

// Updates an existing testImage in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  TestImage.findById(req.params.id, function (err, testImage) {
    if (err) { return handleError(res, err); }
    if(!testImage) { return res.send(404); }
    var updated = _.merge(testImage, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, testImage);
    });
  });
};

// Deletes a testImage from the DB.
exports.destroy = function(req, res) {
  TestImage.findById(req.params.id, function (err, testImage) {
    if(err) { return handleError(res, err); }
    if(!testImage) { return res.send(404); }
    testImage.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}