angular
  .module('choir')
  .controller('audioController', audioController)
  .config(function($mdIconProvider) {
      $mdIconProvider
        .iconSet("call", 'img/icons/sets/communication-icons.svg', 24)
        .iconSet("social", 'img/icons/sets/social-icons.svg', 24);
    })
 
audioController.$inject = ['$state', '$location', '$mdDialog', '$scope'];

function audioController($state, $location, $mdDialog, $scope){
 
  var self       = this;
  self.playSound = playSound;
  self.stopSound = stopSound;
  self.name      = 'John';
  self.select    = select; 
  var stems      = document.getElementsByClassName("stem");
  self.confirmed = "poo";
  self.change = change;
  self.changethis = 4;
 

  
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

  console.log(this.verticalSlider2.value)



  PDFObject.embed("music/pdf/gonnasing-sheetmusic.pdf", "#my-container");

  var source     = ["BgVoc1.wav", "BgVoc2.wav", "BgVoc3.wav"]

  function isAppLoaded() {
    alert('loaded')
  }

  function playSound() {
    for (var i = stems.length - 1; i >= 0; i--) {
      stems[i].play()
    }
  }

  function stopSound() {
    for (var i = stems.length - 1; i >= 0; i--) {
      stems[i].load()
    }
  }

  function select(section, selector) {
    var section = document.getElementsByClassName(section);
    for (var i = section.length - 1; i >= 0; i--) {
      section[i].muted = true
    }
    document.getElementById(selector).muted = false;

  };

  function change() {
    console.log("yo")
    // document.getElementById("clip1").volume = self.changethis/10
    document.getElementById("clip1").volume = this.verticalSlider1.value * 0.1
    document.getElementById("clip2").volume = this.verticalSlider2.value * 0.1
    document.getElementById("clip3").volume = this.verticalSlider3.value * 0.1
    document.getElementById("clip4").volume = this.verticalSlider4.value * 0.1
    
  }




}
