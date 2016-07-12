angular
  .module('choir')
  .controller('uploadController', uploadController);

uploadController.$inject = ['Upload'];
function uploadController(Upload) {
  var self = this;

  self.file = null;
  self.files = null;
  
  this.uploadSingle = function() {
    Upload.upload({
      url: 'http://localhost:3000/upload/single',
      data: { file: self.file }
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


}