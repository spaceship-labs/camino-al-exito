'use strict';

describe('Controller: EscuelaCtrl', function () {

  // load the controller's module
  beforeEach(module('caminoAlExitoApp'));

  var EscuelaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EscuelaCtrl = $controller('EscuelaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
