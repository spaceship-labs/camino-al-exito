'use strict';

/**
 * @ngdoc function
 * @name caminoAlExitoApp.controller:GanadorasCtrl
 * @description
 * # GanadorasCtrl
 * Controller of the caminoAlExitoApp
 */
angular.module('caminoAlExitoApp')
  .controller('GanadorasCtrl', function ($scope, $routeParams, winners) {
    $scope.date = $routeParams.periodo;

    $scope.winners = winners;
    $scope.schools = [
      [
        {cct: '14EPR0451B', name: 'Escuela Primaria Francisco Márquez', geo: 'Guadalajara, Jalisco', img: '/images/fichas2/1.png'},
        {cct: '10DPR0585W', name: 'Escuela Primaria Benito Juárez', geo: 'Indé, Durango',  img: '/images/fichas2/2.png'}
      ],
      [
        {cct: '15EES0569S', name: 'Escuela Secundaria Ofic. No. 0439 Aquiles Serdán', geo: 'Ecatepec, Estado de México',  img: '/images/fichas2/3.png'},
        {cct: '24DST0072L', name: 'Escuela Secundaria Técnica No. 65', geo: 'San Luis Potosí, San Luis Potosí',  img: '/images/fichas2/4.png'}
      ],
      [
        {cct: '31EES0080K', name: 'Escuela Secundaria Elmer Orlando Gorocica Lara ', geo: 'Ucú, Yucatán',  img: '/images/fichas2/5.png'},
        {cct: '31DES2016Y', name: 'Escuela Secundaria Roosevelt Ercé Barrón Pech', geo: 'Umán, Yucatán',  img: '/images/fichas2/6.png'}
      ],
      [
        {cct: '04DPR0693T', name: 'Escuela Primaria Niños Héroes', geo: 'San Francisco de Campeche, Campeche',  img: '/images/fichas2/7.png'},
        {cct: '26EJN0208D', name: 'Preescolar Adelina Encinas Ezre', geo: 'Hermosillo, Sonora',  img: '/images/fichas2/8.png'}
      ],
      [
        {cct: '30DTV0781K', name: 'Telesecundaria Sebastián Lerdo de Tejada ', geo: 'Xalapa, Veracruz',  img: '/images/fichas2/9.png'},
        {cct: '11ETV0320L', name: 'Telesecundaria No. 324', geo: 'San José de Ayala, Guanajuato',  img: '/images/fichas2/10.png'}
      ],
    ];

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
