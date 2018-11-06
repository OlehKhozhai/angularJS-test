const app = angular.module('app', []);

app.controller('firstCtrl', function ($scope, $timeout) {
  $scope.dayDefault = 'Day';
  $scope.monthDefault = 'Month';
  $scope.monthArray = ['january','february', 'march', 'april', 'may', 'juli', 'julay'];

  $scope.dayArray = [];

  for(let i =1; i<=31; i++){
    $scope.dayArray.push(i)
  };

  $scope.blurClose = function () {
    $timeout(function () {
      $scope.show = false;
    }, 200);
  };
  $scope.inValid= false
  $scope.blurClosew = function () {
    $timeout(function () {
      $scope.showw = false;
    }, 200);
  };

  $scope.currentOption = function (dayDefault) {
    $scope.dayDefault = dayDefault;
  };

  $scope.setValue = function (value, text, index) {
    if(text === 'day'){
      $scope.dayDefault = value
    }
    if(text === 'month'){
      $scope.monthDefault = value
      console.log(index)
        if(!(index%2 == 0) && ($scope.dayDefault >30)){
          $scope.inValid= true
          console.log('!!!')
        }else{
          $scope.inValid= false
        }
       
      

    }

    
  };

});