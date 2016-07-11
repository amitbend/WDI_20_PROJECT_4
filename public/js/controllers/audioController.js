angular
  .module('choir')
  .controller('audioController', audioController)
  .config(function($mdIconProvider) {
      $mdIconProvider
        .iconSet("call", 'img/icons/sets/communication-icons.svg', 24)
        .iconSet("social", 'img/icons/sets/social-icons.svg', 24);
    })
 .directive('fileModel', ['$parse', function ($parse) {
      return {
          restrict: 'A',
          link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;
              
              element.bind('change', function(){
                  scope.$apply(function(){
                      modelSetter(scope, element[0].files[0]);
                  });
              });
          }
      };
  }])
  .service('fileUpload', ['$http', function ($http) {
      this.uploadFileToUrl = function(file, uploadUrl){
          var fd = new FormData();
          fd.append('file', file);
          $http.post(uploadUrl, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
          })
          .success(function(){
          })
          .error(function(){
          });
      }
  }]);

 
audioController.$inject = ['$state', '$location', '$mdDialog', '$scope', 'Upload', '$timeout', 'fileUpload'];

function audioController($state, $location, $mdDialog, $scope, Upload, $timeout, fileUpload){
 
  var self        = this;
  self.playSound  = playSound;
  self.stopSound  = stopSound;
  self.name       = 'John';
  self.select     = select; 
  var stems       = document.getElementsByClassName("stem");
  self.confirmed  = "poo";
  self.change     = change;
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



  PDFObject.embed("music/pdf/gonnasing-sheetmusic.pdf", "#pdf-container");

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
    document.getElementById("clip1").volume = this.verticalSlider1.value * 0.1
    document.getElementById("clip2").volume = this.verticalSlider2.value * 0.1
    document.getElementById("clip3").volume = this.verticalSlider3.value * 0.1
    document.getElementById("clip4").volume = this.verticalSlider4.value * 0.1 
  }


  this.upload = function(file) {
    console.log(Upload);
    console.log(file);
      file.upload = Upload.upload({
        url: 'img',
        data: {file: file},
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0)
          this.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
      }

  this.uploadFile = function(){
      var file = self.myFile;
      console.log('file is ' );
      console.dir(file);
      var uploadUrl = "/fileUpload";
      fileUpload.uploadFileToUrl(file, uploadUrl);
  };


}
