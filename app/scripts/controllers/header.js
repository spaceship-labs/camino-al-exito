'use strict';

/**
 * @ngdoc function
 * @name caminoAlExitoApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the caminoAlExitoApp
 */
angular.module('caminoAlExitoApp')
  .controller('HeaderCtrl', function ($scope) {
    /*
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
    */
    $scope.winners = [
      {
        "nombre": "Bachillerato Gral. Francisco J. Mugica",
        "cct": "30EBH0383C",
        "estado": "Veracruz"
      },
      {
        "nombre": "CBTIS No. 62",
        "cct": "03DCT0232V",
        "estado": "Baja California Sur"
      },
      {
        "nombre": "Preescolar Indígena Chichen-Itzá",
        "cct": "04DCC0045J",
        "estado": "Campeche"
      },
      {
        "nombre": "Preescolar Sakpakal",
        "cct": "04DIN0014Q",
        "estado": "Campeche"
      },
      {
        "nombre": "Primaria Comunitaria Indígena",
        "cct": "24KPB0093V",
        "estado": "San Luis Potosí"
      },
      {
        "nombre": "Primaria Ford No 92",
        "cct": "28DPR1452L",
        "estado": " Tamaulipas"
      },
      {
        "nombre": "Primaria José Clemente Orozco",
        "cct": "15EPR4600T",
        "estado": "Estado de México"
      },
      {
        "nombre": "Primaria Lic. Juan Fernández Albarrán",
        "cct": "15EPR0613W",
        "estado": "Estado de México"
      },
      {
        "nombre": "Primaria Vicente Guerrero",
        "cct": "12DPR2372F",
        "estado": "Guerrero"
      },
      {
        "nombre": "Secundaria Técnica No. 100",
        "cct": "14DST0100K",
        "estado": "Jalisco"
      }
    ];

  });
