angular
  .module('choir')
  .controller('songsController', songsController)

songsController.$inject = ['Song', '$state', '$location', 'CurrentUser'];

function songsController(Song, $state, $location, CurrentUser){

  var self          = this;
  self.newSong      = null;
  self.all          = null;
  self.getSongs     = getSongs;
  self.selectedSong = null;
  self.selectSong   = selectSong;
  
getSongs();

function getSongs(){
  Song.query(function(data){
    console.log(data)
    self.all = data;
  });
}

this.addSong = function(){
    console.log("adding song" + self.all)
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

  function deleteSong(song){
        $http.delete('http://localhost:3000/songs/' + song._id).then(function(response){
          index = self.all.indexOf(song)
          self.all.splice(index, 1)
        })
    }

  function selectSong(song){
    self.selectedSong = song
    }


}
