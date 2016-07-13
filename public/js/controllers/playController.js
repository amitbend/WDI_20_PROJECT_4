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


playController.$inject = ['$scope', 'CurrentUser', 'Upload', 'appService'];
function playController($scope, CurrentUser, Upload, appService) {
  var self          = this;
  self.playSound    = playSound;
  self.stopSound    = stopSound;
  self.playicon     = "av:play_arrow";
  self.house        = CurrentUser.house;
  var stems         = document.getElementsByClassName("stem");
  self.sheetsource  = "https://s3-eu-west-1.amazonaws.com/viktor-wdi20/48d30ed89ca9e0ba5fd32c81c8a491d1"
  self.songs        = null;
  self.selectedSong = appService.selectedSong;




  $scope.timeElapsed = 0;
  //record
  $scope.timeLimit = 10;
  
  $scope.ker = function(){return "yoooooooKK";}
  $scope.ch1 = {
        value: 1,
        options: {
            floor: 0,
            ceil: 10,
        }
    };

  $scope.ch2 = {value: 3};
  $scope.ch3 = {value: 0};
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
    for (var i = stems.length - 1; i >= 0; i--) {
      stems[i].play()
    }
    self.playicon = "av:pause";
  }

  function stopSound() {
    for (var i = stems.length - 1; i >= 0; i--) {
      stems[i].load()
    }
    self.playicon = "av:play_arrow"
  }

  $scope.uploadRec = function(recordedFile) {
    console.log("yesssss")
    Upload.upload({
      url: 'http://localhost:3000/upload/single',
      data: { file: recordedFile }
    })
    .then(function(res) {
      console.log("Success!");
      console.log("File name");
      console.log(res.data.filename);
      console.log(res);
    })
    .catch(function(err) {
      console.error(err);
    });
  }


  function getSongs(){
    Song.query(function(data){
      self.all = data;
      console.log = data;
    });
  }


}


