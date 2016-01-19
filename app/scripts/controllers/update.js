'use strict';

/**
 * @ngdoc function
 * @name caminoAlExitoApp.controller:UpdateCtrl
 * @description
 * # UpdateCtrl
 * Controller of the caminoAlExitoApp
 */
angular.module('caminoAlExitoApp')
  .controller('UpdateCtrl', function($scope, $http, $firebaseArray, $mdDialog) {
    var firebaseEntries = new Firebase('https://caminoalexito.firebaseio.com/').child('entries');
    $scope.info = false;
    $scope.save = false;
    $scope.story = {};
    $scope.readMethod = "readAsDataURL";
    $scope.files = [];

    $scope.save = function() {
      if (!$scope.info) {
        if($scope.story.email) {
          $scope.searchBy('email', $scope.story.email);
        }else if($scope.story.cct) {
          $scope.searchBy('cct', $scope.story.cct);
        }
        return;
      }

      $scope.saving = true;
      $scope.exists.$save($scope.story).then(function() {
        $scope.saving = false;
        $scope.saved = true;

      });
    };

    $scope.openFile = function(raw) {
      window.open(raw);
    };

    $scope.onReaded = function(e, file) {
      var files = $scope.story.files || [];
      $scope.story.files = $scope.story.files.push ? files : Object.keys(files).map(function(k){ return files[k];});
      if (file.size < 10000000) {
        $scope.story.files.push({raw: e.target.result, name: file.name, size: file.size, type: file.type });
      } else {
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Archivo demasiado grande')
          .content('El tamaño maximo permitido es de 10mbs')
          .ok('Ok')
        );
      }
    };

    $scope.searchBy = function(field, value){
      $scope.searching = true;
      var exists = $firebaseArray(firebaseEntries.orderByChild(field).equalTo(value));
      exists.$loaded(function(data){
        console.log('data', data);
        data.reverse().some(function(story){
          $scope.story = exists.$getRecord(story.$id);
          $scope.info = true;
          $scope.exists = exists;
          console.log('found', story);
          return true;
        });
        $scope.searching = false;
      });
    };

    $scope.search = function() {
      if ($scope.story.cct && $scope.story.email) {
        $scope.searching = true;
        var exists = $firebaseArray(firebaseEntries.orderByChild("email").equalTo($scope.story.email));
        exists.$loaded(function(data){
          data.some(function(story){
            if(story.cct === $scope.story.cct){
              $scope.story = exists.$getRecord(story.$id);
              $scope.info = true;
              $scope.exists = exists;
              console.log('found', story);
              return true;
            }
          });
          $scope.searching = false;
        });
      }
    };

    $scope.getSchools = function(name) {
      console.log('get', name);
      $scope.name_school = name;
      return $http({
        method: 'GET',
        url: 'http://mte.spaceshiplabs.com/api/escuelas',
        params: {
          term: name,
          solr: true
        }
      }).then(function(res) {
        return res.data && res.data.escuelas || [];
      });
    };

    $scope.selectSchool = function(school) {
      if (school) {
        $scope.story.cct = school.cct;
      } else {
        $scope.story.cct = null;
      }
    };
  });
