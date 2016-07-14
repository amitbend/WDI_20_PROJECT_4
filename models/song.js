var mongoose = require('mongoose');

var clipSchema = mongoose.Schema({
  singer: String,
  file: String
})

var channelSchema = mongoose.Schema({
  type: String,
  avatar: String,
  file: String,
  clips: [clipSchema]
})

var songSchema = mongoose.Schema({
  title: String,
  channels: [channelSchema],
  owner: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});


module.exports = mongoose.model('Song', songSchema);

