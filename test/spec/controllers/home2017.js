'use strict';

describe('Controller: Home2017Ctrl', function () {

  // load the controller's module
  beforeEach(module('caminoAlExitoApp'));

  var Home2017Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Home2017Ctrl = $controller('Home2017Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(Home2017Ctrl.awesomeThings.length).toBe(3);
  });
});
