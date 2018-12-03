angular.module('app', [])

  .controller('goodPicCtrl', function ($scope) {

    let defaultImg = './ww.jpg';
    let defaultImg2 = './qq.jpg';

    $scope.originalImages = [];
    $scope.picArr = [defaultImg];
    $scope.momo = function(){
      return Math.random()
    }
    // $scope.$watch('picArr', function (value) {
    //   // value = value.map(el => el + '?' + Date.now());
    //   if (Array.isArray(value) && !value.length) {
    //     $scope.picArr = [defaultImg2];
    //   } 

    //    if (value[0].toString() !== value.toString()) {
    //       // $scope.picArr = value;
    //   console.log(' $scope.picArr',  $scope.picArr);

    //     }
      
    //   console.log('value111', value);
    //   // return $scope.picArr
    // });



    // $scope.$watch('coverPic', function (value) {
    //   console.log('valuevaluevalue', value)
    //   if (!value) {
    //     $scope.coverPic = 0;
    //   }
    // });


  })


  .directive('goodPic', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        "picArr": "=",
        "coverPic": "="
      },
      templateUrl: './index3.html',
      controller: goodPicCtrl
    }
  })