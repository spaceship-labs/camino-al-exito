/* globals Firebase */
'use strict';

/**
 * @ngdoc function
 * @name caminoAlExitoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the caminoAlExitoApp
 */
angular.module('caminoAlExitoApp')
  .controller('MainCtrl', function($scope, $firebaseArray, $http, $mdDialog, $location, $anchorScroll) {
    var firebaseEntries = new Firebase('https://caminoalexito.firebaseio.com/').child('entries'); //
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
      $scope.file = file;
      if ($scope.file.size < 10000000) {
        $scope.story.signatures = e.target.result;
      } else {
        $scope.alertFileSize();
        $scope.file = null;
        $scope.story.signatrues = null;
      }
    };

    $scope.alertFileSize = function() {
      $mdDialog.show(
        $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('Imagen demasiado grande')
        .content('El tamaño maximo permitido es de 10mbs')
        .ok('Ok')
      );
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

    $scope.check = function(){
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

    //checkAndRevise('email', '15EES1075O');

    /*var alertNoFile = function(){
      $mdDialog.show(
        $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('No ingresaste firmas')
        .content('Las firmas son necesarias')
        .ok('Ok')
      );
    };*/

    $scope.save = function(selectedSchool) {
     /* if(!$scope.story.signatures){
        alertNoFile();
        return;
      }*/

      $scope.story.school = selectedSchool && selectedSchool.nombre || $scope.name_school;
      $scope.saving = true;
      firebaseEntries.push().set($scope.story, function(e) {
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
          email: email
        }
      }).then(function(res) {
        if(res && res.data && res.data.cct){
          console.log("toggle cct", res.data.cct);
        }else{
          console.log("No found cct.", cct, "email", email);
        }
      });
    }


    //toggleSchoolMTE("17DZS0003Z",'email@email.com');

    //update school name
    //no founds name:
    //["09DPR2564G", "12DEF0232L", "ES 354-85", "15EPRO723B", "26DZS0010R", undefined, "14EPR02221", "15EPR46272", "09AACOOO1M", "15DST017ID"]

    /*
    function getInfoByCCTAndUpdate(escuelas){
      var ccts = escuelas.map(function(es){
        return es.cct;
      });
      $http({
        method: 'GET',
        url: 'http://mte.spaceshiplabs.com/api/escuelas',
        params: {
          ccts: ccts.toString(),
        }
      }).then(function(res){
        if(res && res.data && res.data.escuelas){
          var founds = [];
          res.data.escuelas.forEach(function(school, i){
            var index = ccts.indexOf(school.cct),
            esc = escuelas[index];
            if(school.cct == esc.cct){
              founds.push(esc.cct);
              console.log("from server", school.cct, school.nombre);
              console.log("from firebase", esc.cct);
              console.log('index', index);
              console.log(esc.id, 'update', school.nombre);
              //fire.child('-JycCV2QjgzzilX3FvLk').update({name:'algo'})
              firebaseEntries.child(esc.id).update({school: school.nombre});
            }
          });
          console.log('No Found', escuelas.filter(function(es){return founds.indexOf(es.cct) == -1}).map(function(es){ return es.cct}));
        }
      });

    }

    firebaseEntries.limitToLast(100).on('value', function(snapshot){
      var snaps = snapshot.val(),
      escuelas = [];
      Object.keys(snaps).forEach(function(esc, i){
        if(snaps[esc].cct){
          snaps[esc].id = esc;
          escuelas.push(snaps[esc]);
        }
      });
      getInfoByCCTAndUpdate(escuelas);

    }, function(err){
      console.log('err', err.code);
    });
    */
    //intenta acctualizar todos los que pueda encontrar.
    window.actualiceFromFirebaseToMTE = function(){
      firebaseEntries.limitToLast(100).on('value', function(snapshot){
        var snaps = snapshot.val(),
        escuelas = [];
        Object.keys(snaps).forEach(function(esc){
          if(snaps[esc].cct){
            snaps[esc].id = esc;
            escuelas.push(snaps[esc]);
          }
        });
        escuelas.forEach(function(sc){
          toggleSchoolMTE(sc.cct, sc.email);
        });

      }, function(err){
        console.log('err', err.code);
      });
    };


  });
