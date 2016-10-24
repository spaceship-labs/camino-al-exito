'use strict';

/**
 * @ngdoc service
 * @name caminoAlExitoApp.login
 * @description
 * # login
 * Service in the caminoAlExitoApp.
 */
angular.module('caminoAlExitoApp')
  .service('login', function ($mdDialog, $firebaseAuth) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self = this;
    var authObj = $firebaseAuth();

    self.deshability = false;
    self.showForm = function() {
      if (self.deshability) {
        return ;
      }

      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        templateUrl: 'views/login.html',
        locals: {
          items: []
        },
        controller: DialogController
      });
    };

    function DialogController($scope, $mdDialog, items) {
      $scope.items = items;
      $scope.cancel = function($event, toLogin) {
        $event.preventDefault();
        $scope.errors = false;
        if (toLogin) {
          $scope.registerForm = false;
          return ;
        }
        $mdDialog.hide();
      };

      $scope.toRegister = function($event) {
        $event.preventDefault();
        $scope.registerForm = true;
      };

      $scope.register = function($event, data) {
        $event.preventDefault();
        $scope.showErrorPass = false;
        $scope.errors = false;
        /*
        if (data.passwordRepeat !== data.password) {
          $scope.showErrorPass = "Contraseñas distintas";
          return ;
        }
        */
        data.password = Math.random().toString(36).substring(7);

        if (data.password.length < 6) {
          $scope.showErrorPass = "La contraseña necesita ser de almenos 6 caracteres";
          return ;
        }

        authObj.$createUserWithEmailAndPassword(data.email, data.password)
          .then(function(user) {
            console.log('create', user);
            self.restorePassword(data.email);
            authObj.$signOut();
            $mdDialog.hide();
          })
          .catch(function(error) {
            $scope.errors = error.code;
          });

      };

      $scope.login = function(user) {
        authObj.$signInWithEmailAndPassword(user.email, user.password).then(function(user) {
          console.log('login', user);
          $mdDialog.hide();
        }).catch(function() {
        });
      };
    }

    self.getUser = function() {
      return authObj.$getAuth();
    };

    self.changeAuth = function(done) {
      authObj.$onAuthStateChanged(done);
    };

    self.changeAuth(function(user) {
      if (user && user.email) {
        self.deshability = true;
      } else {
        self.deshability = false;
      }
    });

    self.logout = authObj.$signOut;

    if (self.getUser) {
      self.deshability = true;
    }

    self.restorePassword = function(email) {
      authObj.$sendPasswordResetEmail(email).then(function() {
        showAlert('Ingresa a tu correo para confirmar tu cuenta');
      });
    };

    function showAlert(msg) {
      var alert = $mdDialog.alert({
        title: 'Atención',
        content: msg,
        ok: 'Aceptar'
      });

      $mdDialog
        .show(alert);

    }

    //self.restorePassword('aero.uriel@gmail.com');

  });
