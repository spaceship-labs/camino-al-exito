'use strict';

/**
 * @ngdoc function
 * @name caminoAlExitoApp.controller:Home2017Ctrl
 * @description
 * # Home2017Ctrl
 * Controller of the caminoAlExitoApp
 */
angular.module('caminoAlExitoApp')
  .controller('Home2017Ctrl', function ($scope, $http, winners) {
    console.log('winners', winners);
    $scope.center = {
        zoom:12
    };
    $scope.layers = {

    };

    $scope.options = {
      scrollWheelZoom: false
    };

    var mainLat = 25.24469595130604,
        mainLng = -100.9855409;

    function processMarkers() {
      var exists = {};
      return [exists, function(cct) {
        cct.message = cct.nombre;
        exists[cct.entidad] = true;
        cct.icon ={
          iconSize:[30, 45],
        };
        if (cct.p === '2015-2016') {
          cct.icon.iconUrl = '/images/2015-2016.png';
        } else {
          cct.icon.iconUrl = '/images/2016-2017.png';
          cct.message = '<a href="#!/escuela/'+cct.cct+'">'+cct.message+'</a>';
        }
        return cct;
      }];

    }

    function setP(p) {
      return function(cct) {
        cct.p = p;
        return cct;
      };
    }

    function loadMarkers(data) {
      var process = processMarkers();
      //var exists = process[0];
      var p1516 = data['2015-2016'].map(setP('2015-2016'));
      var p1617 = data['2016-2017'].map(setP('2016-2017'));

      p1516 = p1516.filter(function(cct) {
        return cct.ganadora;
      });
      var markers = p1516.map(process[1]);
      markers = markers.concat(p1617.map(process[1]));

      $scope.ccts = markers;

      /*
      var staticCoords = [
        {"lat" : 0, "lng" : 0},
        {"lat" : 21.8852562, "lng" : -102.2915677}, //Aguascalientes
        {"lat" : 30.8406338, "lng" : -115.2837585} , //Baja California
        {"lat" : 26.0444446, "lng" : -111.6660725 }, //Baja California Sur
        {"lat" : 19.8301251, "lng" : -90.5349087 } , //Campeche
        {"lat" : 27.058676, "lng" : -101.7068294 }, //Coahuila
        {"lat" : 19.2452342, "lng" : -103.7240868 }, //Colima
        {"lat" : 16.7569318, "lng" : -93.12923529999999}, //Chiapas
        {"lat" : 28.6329957,"lng" : -106.0691004}, //Chihuahua
        {"lat" : 19.2464696, "lng" : -99.10134979999999}, //Df
        {"lat" : 24.0277202, "lng" : -104.6531759 }, //Durango
        {"lat" : 21.0190145, "lng" : -101.2573586 }, //Guanajuato
        {"lat" : 17.4391926, "lng" : -99.54509739999999 }, //Guerrero
        {"lat" : 20.0910963, "lng" : -98.76238739999999 }, //Hidalgo
        {"lat" : 20.6595382, "lng" : -103.3494376 }, //Jalisco
        {"lat" : 19.4968732, "lng" : -99.72326729999999 }, //Estado de México
        {"lat" : 19.5665192, "lng" : -101.7068294 }, //Michoacán
        {"lat" : 18.6813049, "lng" : -99.10134979999999 }, //Morelos
        {"lat" : 21.7513844, "lng" : -104.8454619 }, //Nayarit
        {"lat" : 25.592172, "lng" : -99.99619469999999 }, //Nuevo León
        {"lat" : 17.0594169, "lng" : -96.7216219 }, //Oaxaca
        {"lat" : 19.0412893, "lng" : -98.192966}, //Puebla
        {"lat" : 20.5887932, "lng" : -100.3898881 }, //Querétaro
        {"lat" : 19.1817393, "lng" : -88.4791376 },//Quintana Roo
        {"lat" : 22.1564699, "lng" : -100.9855409 },//San Luis Potosí
        {"lat" : 25.1721091, "lng" : -107.4795173 },//Sinaloa
        {"lat" : 29.2972247, "lng" : -110.3308814 },//Sonora
        {"lat" : 17.8409173, "lng" : -92.6189273 },//Tabasco
        {"lat" : 24.26694, "lng" : -98.8362755 },//Tamaulipas
        {"lat" : 19.3181521, "lng" : -98.2375146 },//Tlaxcala
        {"lat" : 19.173773, "lng" : -96.1342241 },//Veracruz
        {"lat" : 20.7098786, "lng" : -89.0943377 },//Yucatán
        {"lat" : 22.7708555, "lng" : -102.5832426 }// Zacatecas
      ].map(function(cct, index){
        cct.entidad = index;
        return cct;
      }).filter(function(state, index) {
        return exists[index];
      });
      */

      angular.extend($scope,{
        center:{
          lat : mainLat,
          lng : mainLng,
          zoom: 5
        },
        markers:markers.filter(function(e){
          return e;
        }),
      });


      $scope.markersBack = $scope.markers.slice();
    }


    /*
    $scope.$on('leafletDirectiveMarker.map.click', function(event, args) {
      if (args && args.model && args.model.entidad && !args.model.nombre) {
        if (args.model.show) {
          $scope.center = {
            lat: mainLat,
            lng: mainLng,
            zoom: 5
          };
          console.log($scope.center);
          $scope.markers = $scope.markersBack.slice();
          args.model.show = false;

        }
        else {
          args.model.show = true;
          console.log(args.model);
          $scope.center = {
            lat: args.model.lat,
            lng: args.model.lng,
            zoom: 6
          };
          $scope.markers = $scope.markersBack.concat($scope.ccts.filter(function(cct){
            return args.model.entidad === cct.entidad;
          }));
        }

      }

    });
    */

    loadMarkers(winners);

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
