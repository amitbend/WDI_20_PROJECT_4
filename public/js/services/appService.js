angular
  .module('choir')
  .service("appService", appService);

appService.$inject = ['Song'];
function appService(Song){

    var self = this;
    
    var song_id = window.localStorage.getItem("song_id");

    if(song_id) {

      self.selectedSong = Song.get({id: song_id});

    }

    self.selectedVoice = "baritone";

}