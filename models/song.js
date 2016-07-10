var mongoose = require('mongoose');

var SongSchema = mongoose.Schema({
  title: String,
  location: String,
  owner: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Song', SongSchema);

