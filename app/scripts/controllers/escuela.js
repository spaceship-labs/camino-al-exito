'use strict';

/**
 * @ngdoc function
 * @name caminoAlExitoApp.controller:EscuelaCtrl
 * @description
 * # EscuelaCtrl
 * Controller of the caminoAlExitoApp
 */
angular.module('caminoAlExitoApp')
  .controller('EscuelaCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.imgs = ['http://lorempixel.com/450/300/people/0', 'http://lorempixel.com/450/300/people/1', 'http://lorempixel.com/450/300/people/2', 'http://lorempixel.com/450/300/people/3']
  });
