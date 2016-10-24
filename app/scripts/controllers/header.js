'use strict';

/**
 * @ngdoc function
 * @name caminoAlExitoApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the caminoAlExitoApp
 */
angular.module('caminoAlExitoApp')
  .controller('HeaderCtrl', function ($scope, $mdSidenav, login) {
    $scope.toggleLeft = function() {
      $mdSidenav('left').toggle();
    };

    var user = login.getUser();

    if (user) {
      $scope.user = user;
    }

    login.changeAuth(function(user) {
      if (user && user.email) {
        var name = user.email.split('@')[0];
        user.name = name;
        $scope.user = user;
      } else {
        $scope.user = null;
      }
    });

    $scope.doLogin = login.showForm;

    $scope.logout = login.logout;

  });
