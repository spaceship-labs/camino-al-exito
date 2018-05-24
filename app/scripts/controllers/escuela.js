'use strict';

/**
 * @ngdoc function
 * @name caminoAlExitoApp.controller:EscuelaCtrl
 * @description
 * # EscuelaCtrl
 * Controller of the caminoAlExitoApp
 */
angular.module('caminoAlExitoApp')
  .controller('EscuelaCtrl', function ($scope, $routeParams, winners) {
    $scope.date = $routeParams.periodo || "2016-2017";
    $scope.pathFiles = $scope.date==="2016-2017"?"":$scope.date+"/";
    var selected = winners[$scope.date].filter(function(c) {
      return c.cct === $routeParams.id;
    });
    $scope.sc = selected[0];
    if ($scope.sc.yt && !$scope.sc.yt.pop) {
      $scope.sc.yt = [$scope.sc.yt];
    }

    $scope.calcSlide = function($index, dir) {
      return nextIndex($index, $scope.sc.imgs.length, dir);
    };

    $scope.currentVideo = 0;
    $scope.nextVideo = function($index, dir) {
      var n = nextIndex($index, $scope.sc.yt.length, dir);
      $scope.currentVideo = n==2?1:n;
    };

    function nextIndex($index, len, dir){
      var i = len;
      if (dir === 'right') {
        i = ++$index%len;
      } else if ($index-1 >= 0) {
        i = --$index;
      }
      return i;
    }

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  });
