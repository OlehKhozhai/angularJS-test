const app = angular.module('app', []);

app.controller('firstCtrl', function ($scope, $timeout) {
  $scope.dayDefault = 'Day';
  $scope.monthDefault = 'Month';
  $scope.yearDefault = 'Year';
  $scope.monthArray = {
    first: ['january', 'february', 'march', 'april', 'may', 'juli', 'julay'],
    second: ['august', 'september', 'october', 'november', 'december']
  };
  console.log($scope.monthArray)
  $scope.dayArray = [];

  for (let i = 1; i <= 31; i++) {
    $scope.dayArray.push(i)
  };

  $scope.yearArray = [];
  for (let i = 2008; i >= 1940; i--) {
    $scope.yearArray.push(i)
  };

  $scope.blurClose = function () {
    $timeout(function () {
      $scope.show = false;
    }, 200);
  };
  $scope.inValid = false
  $scope.blurClosew = function () {
    $timeout(function () {
      $scope.showw = false;
    }, 200);
  };

  $scope.currentOption = function (dayDefault) {
    $scope.dayDefault = dayDefault;
  };


  $scope.setValue = function (value, text, index) {
    // switch($scope.monthArray.indexOf($scope.monthDefault)){
    // case 7: 
    // }
    if (text === 'day') {
      $scope.dayDefault = value
      if (($scope.yearDefault % 4 !== 0) && $scope.monthDefault === 'february' && $scope.dayDefault > 28 && $scope.yearDefault !== 'Year' ||
        ($scope.yearDefault % 4 === 0) && $scope.monthDefault === 'february' && $scope.dayDefault > 29 && $scope.yearDefault !== 'Year' ||
        $scope.monthArray.first.indexOf($scope.monthDefault) % 2 !== 0 && $scope.monthArray.second.indexOf($scope.monthDefault) % 2 !== 0 &&
        ($scope.dayDefault > 30) && $scope.yearDefault !== 'Year') {
        $scope.inValid = true;
      } else {
        $scope.inValid = false;
      };
    };

    if (text === 'month') {
      $scope.monthDefault = value;
      if (($scope.yearDefault % 4 !== 0) && $scope.monthDefault === 'february' && $scope.dayDefault > 28 && $scope.yearDefault !== 'Year' ||
        (($scope.monthDefault === 'february') && ($scope.dayDefault > 29)) ||
        ((index % 2 === 0) && ($scope.dayDefault > 30))) {
        $scope.inValid = true
      } else {
        $scope.inValid = false
      }
    };

    if (text === 'year') {
      $scope.yearDefault = value;
      if (value % 4 !== 0 && $scope.monthDefault === 'february' && $scope.dayDefault > 28 ||
        $scope.monthDefault === 'february' && $scope.dayDefault > 29 ||
        $scope.monthArray.first.indexOf($scope.monthDefault) % 2 !== 0 && $scope.monthArray.second.indexOf($scope.monthDefault) % 2 !== 0 &&
        $scope.dayDefault > 30) {


        $scope.inValid = true
      } else {
        $scope.inValid = false
      }
    }


  };

});