var User = require("../models/user");

function usersIndex(req, res){
  User.find({}).populate('songs').exec(function(err, users) {
    if (err) return res.status(404).send(err);
    res.status(200).send(users);
  });
}



function usersShow(req, res){
  var id = req.params.id;
  User.findById({ _id: id }, function(err, user) {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send(err);
    res.status(200).send(user);
  });
}

function usersUpdate(req, res){
  var id = req.params.id;

  User.findByIdAndUpdate({ _id: id }, req.body.user, function(err, user){
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send(err);
    res.status(200).send(user);
  });
}

function usersDelete(req, res){
  var id = req.params.id;
  User.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
}

module.exports = {
  usersIndex:  usersIndex,
  usersShow:   usersShow,
  usersUpdate: usersUpdate,
  usersDelete: usersDelete
};
