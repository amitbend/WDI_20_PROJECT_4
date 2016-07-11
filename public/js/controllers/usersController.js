angular
.module('choir')
.controller('usersController', usersController);

usersController.$inject = ['User', 'TokenService', 'CurrentUser', '$state', '$location'];
function usersController(User, TokenService, CurrentUser, $state, $location){

  var self = this;

  self.all           = [];
  self.user          = null;
  self.currentUser   = null;
  self.selectedUser  = null;
  self.error         = null;
  self.getUsers      = getUsers;
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;
  self.showUser      = showUser;

self.currentUser = CurrentUser.getUser()
console.log(self.currentUser);

  function getUsers() {
    User.query(function(data){
      self.all = data;
    });
  }

  function handleLogin(res) {
   var token = res.token ? res.token : null;
   if (token) {
     self.getUsers();
     $state.go('songs');
   }
   self.currentUser = CurrentUser.getUser();
 }

 function handleError(e) {
  self.error = "Something went wrong.";
}

function register() {
  User.register(self.user, handleLogin, handleError);
}

function login() {
  User.login(self.user, handleLogin, handleError);
}

function logout() {
  self.all         = [];
  self.currentUser = null;
  CurrentUser.clearUser();
}

function checkLoggedIn() {
 self.currentUser = CurrentUser.getUser();
 return !!self.currentUser;
}

function showUser(user) {
  self.selectedUser = user;
  console.log("oooo")
  console.log(self.selectedUser);
  $state.go('user');
}

this.displayUser = function() {
  console.log(self.selectedUser)
}




if (checkLoggedIn()) {
  self.getUsers();
}

return self;
}
