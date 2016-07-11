var Song = require("../models/song");
var User = require("../models/user");
var secret   = require('../config/config').secret
var jwt      = require('jsonwebtoken');


function songsIndex(req, res){
  Song.find({}, function(err, songs) {
    if (err) return res.status(404).send(err);
    res.status(200).send(songs);
  });
}

function songsCreate(req, res){
  var token = req.headers.authorization.split(' ')[1]
  var decoded = jwt.verify(token, secret);
  console.log(decoded._doc._id) 
  var song = new Song(req.body.song);
  song.owner = decoded._doc._id;
  User.findById({ _id: decoded._doc._id }, function(err, user) {
    user.songs.push(song);
    user.save(function(err, user) {
      res.status(201).send(song);
    });
  })
  song.save(function(err, song) {
    if (err) return res.status(500).send(err);
    console.log(song);
  });
}

module.exports = {
  songsIndex:  songsIndex,
  songsCreate: songsCreate,
};
