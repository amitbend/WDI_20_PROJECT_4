angular
  .module('choir', ['angular-jwt', 'ngResource', 'ui.router', 'ngMaterial', 'rzModule'])
  .constant('API', 'http://localhost:3000')
  .config(MainRouter)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('teal')
      .primaryPalette('indigo')
      .accentPalette('yellow');
  });

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "js/views/songs/play.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "js/views/authentications/login.html"
    })
    .state('register', {
      url: "/register",
      templateUrl: "js/views/authentications/register.html"
    })
    .state('users', {
      url: "/users",
      templateUrl: "js/views/users/index.html"
    })
    .state('profile', {
      url: "/myprofile",
      templateUrl: "js/views/users/profile.html"
    })
    .state('songs', {
      url: "/songs",
      templateUrl: "js/views/songs/index.html"
    })
    .state('new-song', {
      url: "/songs/new",
      templateUrl: "js/views/songs/new-song.html"
    })
    .state('play', {
      url: "/play",
      templateUrl: "js/views/songs/play.html"
    })
  
  $urlRouterProvider.otherwise("/");
}
