angular
  .module('choir')
  .service("appService", appService);

appService.$inject = [];
function appService(){
    var self = this;
    
    self.selectedSong = "one";
    self.selectedVoice = "baritone";

}