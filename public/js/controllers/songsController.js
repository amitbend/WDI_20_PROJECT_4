angular
  .module('choir')
  .controller('songsController', songsController)

songsController.$inject = ['Song', '$state', '$location', 'CurrentUser'];

function songsController(Song, $state, $location, CurrentUser){

  var self          = this;
  self.newSong      = {};
  self.newSong.channels = [];
  self.all          = null;
  self.getSongs     = getSongs;
  self.selectedSong = null;
  self.selectSong   = selectSong;

  
getSongs();

function getSongs(){
  Song.query(function(data){
    self.all = data;
  });
}

this.addSong = function(){
    console.log("adding song" + self.all)
    self.newSong.channels.push({type:"Test type"})
    Song.save({song: self.newSong}, function(response){
        self.all.push(self.newSong);
        // owner = CurrentUser.getuser();
        // owner.songs.push(self.newSong);
        self.newSong = {}
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



  function selectSong(song){
    self.selectedSong = song
    }


}
