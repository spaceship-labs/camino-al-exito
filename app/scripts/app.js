'use strict';

/**
 * @ngdoc overview
 * @name caminoAlExitoApp
 * @description
 * # caminoAlExitoApp
 *
 * Main module of the application.
 */
angular
  .module('caminoAlExitoApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'firebase',
    'ngFileReader'
  ])
  .config(function($routeProvider) {
    //$locationProvider.html5Mode(true);

    $routeProvider
      .when('/back', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/', {
        templateUrl: 'views/update.html',
        controller: 'UpdateCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
