var mongoose = require('mongoose');

var SongSchema = mongoose.Schema({
  title: String,
  location: String,
  owner: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
  song: [{ type: mongoose.Schema.ObjectId, ref: 'Song' }]
});

module.exports = mongoose.model('Clip', ClipSchema);

