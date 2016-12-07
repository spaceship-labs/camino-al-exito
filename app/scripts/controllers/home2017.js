'use strict';

/**
 * @ngdoc function
 * @name caminoAlExitoApp.controller:Home2017Ctrl
 * @description
 * # Home2017Ctrl
 * Controller of the caminoAlExitoApp
 */
angular.module('caminoAlExitoApp')
  .controller('Home2017Ctrl', function ($scope, $http) {
    $scope.center = {
        zoom:12
    };
    $scope.layers = {
        baselayers: {
            googleRoadmap: {
                name: 'Google Streets',
                layerType: 'ROADMAP',
                type: 'google'
            }
        }
    };


    $scope.stateByYears = {};

    $scope.loadMap = function(states){
        var static_coords = [
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
        ];
        $scope.ciclos = {};
        var markers = states.map(function(state){
            var mark = static_coords[state.id];
            mark.icon ={
                    iconUrl:'images/pin.png',
                    iconSize:[23, 33],
            };
            var selectYear = '',
                count_participa = state.count_participa;

            if (state.count_participa && state.count_participa.pop) {
                $scope.stateByYears['multiple'] = true;
                selectYear = '<select class="select-year" ng-change="changeYear(selectYear'+state.id+')" ng-model="selectYear'+state.id+'">'
                selectYear += state.count_participa
                .filter(function(data) {
                    return data._id != 0 && data._id != "";
                })
                .map(function(data) {
                    var scopeName = 'selectYear' + state.id,
                        selected = '';
                    if (!$scope.stateByYears[scopeName]) {
                        $scope.stateByYears[scopeName] = {};
                        selected = 'ng-selected="true"'
                        $scope[scopeName] = data._id;
                    }
                    $scope.stateByYears[scopeName][data._id] = data.count;
                    var showText = data._id;
                    if (data.is_ciclo && showText) {
                        showText = "Ciclo escolar: " + showText + "-" + (showText + 1);
                        $scope.ciclos['year_' + data._id] = showText;
                    }
                    return '<option value="'+ data._id +'" '+selected+'>'+ showText +'</option>'
                })
                .join('');
                selectYear += '</select>';
                count_participa = '{{stateByYears["selectYear'+state.id+'"][selectYear'+state.id+']}}';
            }



            var winner = ""

            if (state.count_per_link) {
                winner += "<a class='name winner'> - "+ state.count_per_link +" escuelas ganadoras</a>";
                mark.icon.iconUrl = "images/pinganador.png";
            }

            mark.message = "<div class='infoBox'>"+
                            "<a class='name' >"+
                            state.nombre+
                            selectYear+

                            "</a>"+
                            winner +
                            "<div class='address-popup'><p >Participa en "+count_participa+" escuelas</p><a href='http://mejoratuescuela.org/programas/index/45/#/?state="+state.id+"&name="+state.nombre.toLowerCase()+"'>Ver lista de escuelas</a></div>"+
                            ""+
                            "</div>";
            return mark;
        });

        $scope.changeYear = function(year) {
            $scope.skip = 0;
            $scope.currentState.id = '';
            $scope.currentState.name = '';
            $scope.noMoreLoader = false;
            $scope.escuelas = [];
        };

        angular.extend($scope,{
            center:{
                lat : 22.1564699,
                lng : -100.9855409,
                zoom: 5
            },
            dafaults:{
                scrollWheelZoom: false
            },
            markers:markers.filter(function(e){
                return e;
            })
        });
    };

    $http.get('http://mte.spaceshiplabs.com/api/get_map_info').then(function(res){
      if (res && res.data) {
        $scope.loadMap(res.data);
      }
    });

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
