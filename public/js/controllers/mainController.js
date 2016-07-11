angular
  .module('choir')
  .controller('mainController', mainController)

 
audioController.$inject = ['$state', '$location', 'CurrentUser'];

function mainController($state, $location, CurrentUser){
 
 var self           = this;
 self.currentUser   = null;

  this.checkLoggedIn = function() {
  self.currentUser = CurrentUser.getUser();
  return !!self.currentUser;
 }

 this.logout = function() {
   self.currentUser = null;
   CurrentUser.clearUser();
   
 }




}
