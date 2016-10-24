'use strict';

/**
 * @ngdoc function
 * @name caminoAlExitoApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the caminoAlExitoApp
 */
angular.module('caminoAlExitoApp')
  .controller('HomeCtrl', function($scope, $firebaseArray, $http, $mdDialog, $location, $anchorScroll, login) {
    //var firebaseEntries = new Firebase('https://educaccion-d635e.firebaseio.com/').child('entries'); //
    var ref = firebase.database().ref().child('entries');
    var firebaseEntries = $firebaseArray(ref);

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

      if ($scope.story && $scope.story.$id && $scope.registerList) {
        $scope.registerList.$save($scope.story).then(function() {
          $scope.saving = false;
          $scope.saved = true;
        });
        return ;
      }

      firebaseEntries.$add(angular.copy($scope.story)).then(function(obj) {
        $scope.saving = false;
        if(obj.key){
          $scope.saved = true;
          toggleSchoolMTE($scope.story.cct, $scope.story.email);
        } else {
          $scope.saved = false;
        }
      }).catch(function() {
        $scope.saving = false;
        $scope.saved = false;
      });
    };

    $scope.toDown = function(){
      $location.hash('registro');
      $anchorScroll();
    };

    function toggleSchoolMTE(cct, email){
      $http({
        method: 'GET',
        //url: 'http://mte.spaceshiplabs.com/api/suscribeEducacion',
        url: 'http://comparatuescuela/api/suscribeEducacion',
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

    var userLogin = login.getUser();

    if (userLogin) {
      $scope.showFormMain = true;
    }

    login.changeAuth(function(user) {
      if (user && user.email) {
        $scope.userLogin = user;
        $scope.showFormMain = true;
        loadRegisters(user.email);
      } else {
        $scope.userLogin = null;
        $scope.showFormMain = false;
        $scope.registerList = [];
      }
    });

    $scope.doLogin = login.showForm;

    function loadRegisters(email) {
      $scope.hasRegisters = true;
      $scope.loadingList = true;
      var query = ref.orderByChild("email").equalTo(email);
      var list = $firebaseArray(query);
      $scope.registerList = list;
      list.$loaded().then(function(l) {
        $scope.loadingList = false;
        if (l.length) {
          $scope.hasRegisters = true;
        } else {
          $scope.hasRegisters = false;
        }
      });
    }

    $scope.edit = function(reg) {
      $scope.story = reg;
      $scope.saved = false;
      restoreAutocomplete(reg.school);
      $scope.selectedSchool = {
        nombre: reg.school,
        cct: reg.cct
      };
      $scope.showForm = true;
    };

    $scope.newReg = function() {
      $scope.selectedSchool = null;
      $scope.searchText = '';
      $scope.story = {email: $scope.userLogin.email};
      $scope.saved = false;
      $scope.showFormMain = true;
      $scope.showForm = true;
      restoreAutocomplete();
    };


    //fuck
    function restoreAutocomplete(value) {
      value = value || '';
      var auto = window.document.querySelector('#auto-search-complete');
      if (auto) {
        auto.value = value;
      }
    }

  });
