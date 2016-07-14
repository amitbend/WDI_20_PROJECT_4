var mongoose = require('mongoose');

var clipSchema = mongoose.Schema({
  singer: { type: mongoose.Schema.ObjectId, ref: 'User' },
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
  score: String,
  channels: [channelSchema],
  owner: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});


module.exports = mongoose.model('Song', songSchema);

