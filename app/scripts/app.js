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
    'ngFileReader',
    'leaflet-directive',
    'angular-carousel',
    'btford.markdown',
    'youtube-embed'
  ])
  .config(function($routeProvider) {
    //$locationProvider.html5Mode(true);

    $routeProvider
      .when('/back', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/', {//home2016
        //templateUrl: 'views/update.html',
        templateUrl: 'views/main.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/ganadoras', {
        templateUrl: 'views/ganadoras.html',
        controller: 'GanadorasCtrl',
        controllerAs: 'ganadoras'
      })
      .when('/listado', {
        templateUrl: 'views/home2017.html',
        controller: 'Home2017Ctrl',
        controllerAs: 'home2017'
      })
      .when('/escuela/:id', {
        templateUrl: 'views/escuela.html',
        controller: 'EscuelaCtrl',
        controllerAs: 'escuela'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
