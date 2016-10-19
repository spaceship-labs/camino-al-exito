/* globals Firebase */
'use strict';

/**
 * @ngdoc function
 * @name caminoAlExitoApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the caminoAlExitoApp
 */
angular.module('caminoAlExitoApp')
  .controller('HomeCtrl', function($scope, $firebaseArray, $http, $mdDialog, $location, $anchorScroll) {
    var firebaseEntries = new Firebase('https://educaccion-d635e.firebaseio.com/').child('entries'); //
    console.log('new firebase...');
    /*$scope.stories = $firebaseArray(ref);

    $scope.stories.$loaded(function(data){
      console.log(data);
    });
*/
    $scope.story = {};
    $scope.showForm = false;
    $scope.saved = false;
    $scope.saving = false;
    $scope.readMethod = "readAsDataURL";

    $scope.onReaded = function(e, file) {
      var files = $scope.story.files || [];
      $scope.story.files = !files.length ? files : Object.keys(files).map(function(k){ return files[k];});
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

    $scope.openFile = function(raw) {
      window.open(raw);
    };

    $scope.selectSchool = function(school) {
      if (school) {
        $scope.story.cct = school.cct;
      } else {
        $scope.story.cct = null;
      }
    };
    $scope.getSchools = function(name) {
      $scope.name_school = name;
      return $http({
        method: 'GET',
        url: 'http://mte.spaceshiplabs.com/api/escuelas',
        params: {
          term: name,
          solr: true
        }
      }).then(function(res) {
        if (res.data && res.data.escuelas) {
          return res.data.escuelas;
        }
        return [];
      });
    };

    $scope.checkBACK = function(){
      if($scope.story.email && $scope.story.email.indexOf('.') !== -1 && $scope.story.cct){
        //$scope.story = { email: $scope.story.email };
        checkAndRevise($scope.story.email, $scope.story.cct);
      }
    };


    function checkAndRevise(email, cct){
      var exists = $firebaseArray(firebaseEntries.orderByChild("email").equalTo(email));
      exists.$loaded(function(data){
        data.some(function(story){
          if(story.cct === cct){
            $scope.story = exists.$getRecord(story.$id);
            console.log(story.$id);
            $scope.save = function(selectedSchool){
              $scope.saving = true;
              $scope.story.school = selectedSchool && selectedSchool.nombre || $scope.name_school;
              exists.$save($scope.story).then(function(){
                $scope.saving = false;
                $scope.saved = true;
              });
            };
            return true;
          }
        });

      });
    }

    $scope.save = function(selectedSchool) {
      if(!$scope.story.files){
        alertNoFile();
        return;
      }

      $scope.story.school = selectedSchool && selectedSchool.nombre || $scope.name_school;
      $scope.saving = true;
      firebaseEntries.push().set(angular.copy($scope.story), function(e) {
        $scope.saving = false;
        $scope.saved = !e ? true : false;
        $scope.$apply();
        if(!e){
          toggleSchoolMTE($scope.story.cct, $scope.story.email);
        }
      });
    };

    $scope.toDown = function(){
      $location.hash('registro');
      $anchorScroll();
    };

    function toggleSchoolMTE(cct, email){
      $http({
        method: 'GET',
        url: 'http://mte.spaceshiplabs.com/api/suscribeEducacion',
        params: {
          cct: cct,
          email: email,
          year: 2016
        }
      }).then(function(res) {
        if(res && res.data && res.data.cct){
          console.log("toggle cct", res.data.cct);
        }else{
          console.log("No found cct.", cct, "email", email);
        }
      });
    }

    function alertNoFile(){
      $mdDialog.show(
        $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('No ingresaste ni un archivo')
        .content('Los archivos de evidencias son necesarios')
        .ok('Ok')
      );
    }

  });
