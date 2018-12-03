var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.items = [];
  for (var i=0; i<100; i++) { $scope.items.push(i); }
});

app.directive('scrollOnClick', function() {
  return {
    restrict: 'EA',
    template:'<a title="Click here to go top" class="scrollup">Scroll</a>',
    link: function(scope, elm) {
		$(window).scroll(function () {
            if ($(this).scrollTop() > 300) {
                $('.scrollup').fadeIn();
            } else {
                $('.scrollup').fadeOut();
            }
    });   
      elm.on('click', function() {
        //alert('hello');
        $("html,body").animate({scrollTop: '0px'}, "slow");
      });
    }
  }
});

