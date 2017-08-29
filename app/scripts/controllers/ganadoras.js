'use strict';

/**
 * @ngdoc function
 * @name caminoAlExitoApp.controller:GanadorasCtrl
 * @description
 * # GanadorasCtrl
 * Controller of the caminoAlExitoApp
 */
angular.module('caminoAlExitoApp')
  .controller('GanadorasCtrl', function ($scope, $routeParams) {
    $scope.date = $routeParams.periodo;

    $scope.schools = [
      [
        {cct: '14EPR0451B', name: 'Escuela Primaria Francisco Márquez', geo: 'Guadalajara, Jalisco'},
        {cct: '10DPR0585W', name: 'Escuela Primaria Benito Juárez', geo: 'Indé, Durango'}
      ],
      [
        {cct: '15EES0569S', name: 'Escuela Secundaria Ofic. No. 0439 Aquiles Serdán', geo: 'Ecatepec, Estado de México'}
        ,{cct: '24DST0072L', name: 'Escuela Secundaria Técnica No. 65', geo: 'San Luis Potosí, San Luis Potosí'}
      ],
      [
        {cct: '31EES0080K', name: 'Escuela Secundaria Elmer Orlando Gorocica Lara ', geo: 'Ucú, Yucatán'}
        ,{cct: '31DES2016Y', name: 'Escuela Secundaria Roosevelt Ercé Barrón Pech', geo: 'Umán, Yucatán'}
      ],
      [
        {cct: '04DPR0693T', name: 'Escuela Primaria Niños Héroes', geo: 'San Francisco de Campeche, Campeche'}
        ,{cct: '26EJN0208D', name: 'Preescolar Adelina Encinas Ezre', geo: 'Hermosillo, Sonora'}
      ],
      [
        {cct: '30DTV0781K', name: 'Telesecundaria Sebastián Lerdo de Tejada ', geo: 'Xalapa, Veracruz'}
        ,{cct: '11ETV0320L', name: 'Telesecundaria No. 324', geo: 'San José de Ayala, Guanajuato'}
      ],
    ];

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
