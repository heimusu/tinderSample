/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var LikeImage = require('./likeImage.model');

exports.register = function(socket) {
  LikeImage.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  LikeImage.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('likeImage:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('likeImage:remove', doc);
}