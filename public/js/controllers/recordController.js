angular
  .module('choir')
  .controller('recordController', recordController)


recordController.$inject = ['$scope'];
function recordController($scope, $timeout) {
      console.log("Loaded");
      $scope.timeLimit = 10;


    }






