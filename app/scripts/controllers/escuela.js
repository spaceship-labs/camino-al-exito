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
    var selected = winners["2016-2017"].filter(function(c) {
      return c.cct === $routeParams.id;
    });
    $scope.sc = selected[0];
    if ($scope.sc.yt && !$scope.sc.yt.pop) {
      $scope.sc.yt = [$scope.sc.yt];
    }

    $scope.calcSlide = function($index, dir) {
      var len = $scope.sc.imgs.length;
      var i = len;
      if (dir === 'right') {
        i = ++$index%len;
      } else if ($index-1 >= 0) {
        i = --$index;
      }
      return i;
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  });
