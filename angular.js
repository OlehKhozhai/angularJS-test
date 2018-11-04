const app = angular.module('app', []);

app.controller('firstCtrl', function ($scope, $timeout) {
  $scope.day = 'Day';
  $scope.optionsArray = [];

  for(let i =1; i<=12; i++){
    $scope.optionsArray.push(i<=9? '0'+i:i)
  };

  $scope.blurClose = function () {
    $timeout(function () {
      $scope.show = false;
    }, 200);
  };


  $scope.currentOption = function (day) {
    $scope.day = day;
  };


});