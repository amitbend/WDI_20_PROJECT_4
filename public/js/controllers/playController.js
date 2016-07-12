angular
  .module('choir')
  .controller('playController', playController)
  .config(function($mdIconProvider) {
      $mdIconProvider
        .iconSet("call", 'img/icons/sets/communication-icons.svg', 24)
        .iconSet("social", 'img/icons/sets/social-icons.svg', 24)
        .iconSet("av", 'img/icons/sets/av-icons.svg', 36);
    });


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


playController.$inject = ['$scope'];
function playController($scope) {
  var self        = this;
  self.playSound  = playSound;
  self.stopSound  = stopSound;
  self.playicon   = "av:play_arrow";
  var stems       = document.getElementsByClassName("stem");
  self.sheetsource= "https://s3-eu-west-1.amazonaws.com/viktor-wdi20/48d30ed89ca9e0ba5fd32c81c8a491d1"
  $scope.timeElapsed = 0;

  $scope.$watch('timeElapsed', function() {
       console.log('hey, myVar has changed!');

       if(document.getElementById('clip1').currentTime>2) {
         self.sheetsource = "https://s3-eu-west-1.amazonaws.com/viktor-wdi20/6daf0118829a6b246a3275121bf9c811"
       }
   });

  this.verticalSlider1 = {
        value: self.changethis,
        options: {
            floor: 0,
            ceil: 10,
            vertical: true
        }
    };

  this.verticalSlider2 = {value: 3};

  this.verticalSlider3 = {value: 0};

  this.verticalSlider4 = {value: 0};

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


}