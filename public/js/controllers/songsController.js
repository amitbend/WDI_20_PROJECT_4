angular
.module('choir')
.controller('songsController', songsController)

songsController.$inject = ['$scope', 'Song', '$state', '$location', 'CurrentUser', 'appService', 'Upload'];

function songsController($scope, Song, $state, $location, CurrentUser, appService, Upload){

  var self          = this;
  $scope.newSong = {};
  $scope.newSong.channels = [];
  $scope.newSong.channelnumbers = "1";
  self.all          = null;
  self.getSongs     = getSongs;
  self.selectSong   = selectSong;
  self.selectedSong = appService.selectedSong
  self.file = null;
  console.log(appService.selectedSong)

  
  getSongs();

  function getSongs(){
    Song.query(function(data){
      self.all = data;
    });
  }

  this.addSong = function(){

    Song.save({song: $scope.newSong}, function(response){
      self.all.push($scope.newSong);
        // owner = CurrentUser.getuser();
        // owner.songs.push(self.newSong);
        $scope.newSong = {}
      });  
  }

  this.showSong = function(song) {
    this.songShow = song;
  }

  function editSong(song){
    self.editedSong = song;  
  }

  function updateSong(){
    index = self.all.indexOf(self.editedProject)
    $http.put('http://localhost:3000/songs/' + self.editedSong._id, {project: this.editedSong}).then(function(response){
      self.all[index] = self.editedSong;
    })
  }

  self.deleteSong = function(song){
    console.log("deleting")
    Song.delete({id: song._id}, function(err) {
      console.log(err)
      index = self.all.indexOf(song)
      self.all.splice(index, 1); 
      var user = CurrentUser.getUser();
      index2 = user.songs.indexOf(song)
      user.songs.splice(index2, 1); 
    })
  }


  self.addChannel = function(type) {
    console.log('adding channel');
    switch(type) {
      case "soprano":
      document.getElementById("choiceSoprano").style.opacity = 1;
      $scope.newSong.channels.push({type: "soprano", avatar:"img/soprano.png"})
      break;
      case "alto":
      document.getElementById("choiceAlto").style.opacity = 1;
      $scope.newSong.channels.push({type: "alto", avatar:"img/alto.png"})
      break;
      case "baritone":
      document.getElementById("choiceBaritone").style.opacity = 1;
      $scope.newSong.channels.push({type: "baritone", avatar:"img/baritone.png"})
      break;
    }
  }

  function selectSong(song){


    localStorage.setItem("song_id", song._id);
    appService.selectedSong = song;
    $state.go('play');
  }


  self.uploadSingle = function() {

   Upload.upload({
     url: 'http://localhost:3000/upload/single',
     data: { file: self.file }
   })
   .then(function(res) {
     console.log("Success!");
     console.log("File name");
     console.log(res.data.filename);
     $scope.newSong.score = res.data.filename;
     console.log(res);
   })
   .catch(function(err) {
     console.error(err);
   });
 }

}
