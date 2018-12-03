angular.module('anchorScrollOffsetExample', [])
  .controller('headerCtrl', ['$anchorScroll', '$location', '$scope',
    function ($anchorScroll, $location, $scope) {
      $anchorScroll.yOffset = 60;
      $scope.gotoAnchor = function (x) {
        var newHash = 'anchor' + x;
        if ($location.hash() !== newHash) {
          $location.hash('anchor' + x);
        } else {
          $anchorScroll();
        }
      };
    }
  ]);