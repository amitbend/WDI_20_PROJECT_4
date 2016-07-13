angular
  .module('choir')
  .controller('audioController', audioController)
  .config(function($mdIconProvider) {
      $mdIconProvider
        .iconSet("call", 'img/icons/sets/communication-icons.svg', 24)
        .iconSet("social", 'img/icons/sets/social-icons.svg', 24)
        .iconSet("av", 'img/icons/sets/av-icons.svg', 36)
        .iconSet("av", 'img/icons/sets/navigation-icons.svg', 36);
    })

 
audioController.$inject = ['$scope', '$state', '$location', '$mdDialog', '$timeout'];

function audioController($scope, $state, $location,  $mdDialog, $timeout){

  console.log($scope)
  console.log(CurrentUser)
 
  var self        = this;
  self.playSound  = playSound;
  self.stopSound  = stopSound;
  var stems       = document.getElementsByClassName("stem");
  self.playicon   = "av:play_arrow";
  self.file       = null;
  self.sheetsource= "https://s3-eu-west-1.amazonaws.com/viktor-wdi20/48d30ed89ca9e0ba5fd32c81c8a491d1"

  
  self.verticalSlider1 = {
        value: 2,
        options: {
            floor: 0,
            ceil: 10,
            vertical: true
        }
    };

  self.verticalSlider2 = {value: 3};

  self.verticalSlider3 = {value: 0};

  self.verticalSlider4 = {value: 0};

  console.log(this.verticalSlider2.value)



  PDFObject.embed("music/pdf/gonnasing-sheetmusic.pdf", "#pdf-container");

  var source     = ["BgVoc1.wav", "BgVoc2.wav", "BgVoc3.wav"]

  function isAppLoaded() {
    alert('loaded')
  }

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

  function select(section, selector) {
    var section = document.getElementsByClassName(section);
    for (var i = section.length - 1; i >= 0; i--) {
      section[i].muted = true
    }
    document.getElementById(selector).muted = false;

  };

  function change() {
    document.getElementById("clip1").volume = this.verticalSlider1.value * 0.1
    document.getElementById("clip2").volume = this.verticalSlider2.value * 0.1
    document.getElementById("clip3").volume = this.verticalSlider3.value * 0.1
    document.getElementById("clip4").volume = this.verticalSlider4.value * 0.1 
  }

  if(document.getElementById('clip1').currentTime>2) {
    self.sheetsource = "https://s3-eu-west-1.amazonaws.com/viktor-wdi20/6daf0118829a6b246a3275121bf9c811"
  }





}

