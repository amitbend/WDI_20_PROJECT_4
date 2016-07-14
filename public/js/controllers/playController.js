angular
  .module('choir')
  .controller('playController', playController)

  angular
    .module('choir')
      .directive("myaudio", function(){
          return function(scope, element, attrs){
              element.bind("timeupdate", function(){
                  scope.timeElapsed = element[0].currentTime;
                  scope.$apply();
              }); 
          }
      });

  angular
    .module('choir')
    .config(function (recorderServiceProvider) {
      recorderServiceProvider
        .forceSwf(false)
        //.setSwfUrl('/lib/recorder.swf')
        .withMp3Conversion(true)
      ;
    });


playController.$inject = ['$scope', 'CurrentUser', 'Upload', 'appService' , 'recorderService', 'Song'];
function playController($scope, CurrentUser, Upload, appService , recorderService, Song) {
  var self          = this;
  self.playSound    = playSound;
  self.stopSound    = stopSound;
  self.playicon     = "av:play_arrow";
  self.house        = CurrentUser.house;
  var stems         = document.getElementsByClassName("stem");
  self.sheetsource  = "https://s3-eu-west-1.amazonaws.com/viktor-wdi20/48d30ed89ca9e0ba5fd32c81c8a491d1"
  self.songs        = null;
  self.user         = CurrentUser.getUser();
console.log(CurrentUser.getUser())
  self.selectedSong = appService.selectedSong;
  self.newClip      = null;

console.log(appService.selectedVoice);


// <img src="https://s3-eu-west-1.amazonaws.com/viktor-wdi20/{{play.user.local.image}}">



  $scope.timeElapsed = 0;
  //record
  
  $scope.ch1 = {
        value: 10,
        options: {
            floor: 0,
            ceil: 10,
        }
    };

  $scope.ch2 = {value: 10};
  $scope.ch3 = {value: 10};
  $scope.$watch('timeElapsed', function() {

       if(document.getElementById('clip1').currentTime > 8.5) {
            self.sheetsource = "https://s3-eu-west-1.amazonaws.com/viktor-wdi20/6daf0118829a6b246a3275121bf9c811";
       }

       if(document.getElementById('clip1').currentTime > 17.4) {
            self.sheetsource = "https://s3-eu-west-1.amazonaws.com/viktor-wdi20/5f0995217dab426ca2b0115cc25b8126";
       }
       
   });


  $scope.$watch('ch1.value', function() {
       document.getElementById("clip1").volume = $scope.ch1.value * 0.1;
   });
  $scope.$watch('ch2.value', function() {
       document.getElementById("clip2").volume = $scope.ch2.value * 0.1;
   });
  $scope.$watch('ch3.value', function() {
       document.getElementById("clip3").volume = $scope.ch3.value * 0.1;
   });


  function playSound() {

    recorderService.controller("mainAudio").playbackResume();

    for (var i = stems.length - 1; i >= 0; i--) {
      stems[i].play()
    }
    self.playicon = "av:pause";
  }

  function stopSound() {

    recorderService.controller("mainAudio").stopRecord();
    for (var i = stems.length - 1; i >= 0; i--) {
      stems[i].load()
    }
    self.playicon = "av:play_arrow"
  }

  self.recSound = function() {

    recorderService.controller("mainAudio").startRecord();

    for (var i = stems.length - 1; i >= 0; i--) {
      stems[i].play()
    }
    self.playicon = "av:pause";
  }

  self.saveSound = function() {
    console.log("saving song");
    recorderService.controller("mainAudio").saveFile();

  }


  $scope.uploadRec = function(recordedFile) {
    Upload.upload({
      url: 'http://localhost:3000/upload/single',
      data: { file: recordedFile }
    })
    .then(function(res) {
      console.log("Success!");
      console.log("File name");
      console.log(res.data.filename);
      console.log(self.selectedSong._id)
      // var song = Song.get({title: "rr"}, function(data){

      //   console.log(data)}); 
    console.log(self.selectedSong.channels)
      var result = self.selectedSong.channels.filter(function(channel) {
                  return channel.type == "soprano";});
      console.log("MOFO RESULT");
      console.log(result);
      result[0].clips.push({singer: CurrentUser.getUser(), file: res.data.filename})
      Song.update({ id:self.selectedSong._id }, {song: self.selectedSong}, function(){
        
      });




    })
    .catch(function(err) {
      console.error(err);
    });
  }

  self.selectVoice = function(voice) {
    switch(voice) {
        case "soprano":
            document.getElementById("soprano").style.opacity = 0.2;

            break;
        case "alto":
            document.getElementById("alto").style.opacity = 0.2;
            
            break;
        case "baritone":
            document.getElementById("baritone").style.opacity = 0.2;
            
            break;
    }
  } 


  function getSongs(){
    Song.query(function(data){
      self.all = data;
      console.log = data;
    });
  }


}


