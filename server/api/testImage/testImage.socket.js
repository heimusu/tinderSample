/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var TestImage = require('./testImage.model');

exports.register = function(socket) {
  TestImage.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  TestImage.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('testImage:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('testImage:remove', doc);
}