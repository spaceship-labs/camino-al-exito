'use strict';

describe('Controller: UpdateCtrl', function () {

  // load the controller's module
  beforeEach(module('caminoAlExitoApp'));

  var UpdateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UpdateCtrl = $controller('UpdateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
