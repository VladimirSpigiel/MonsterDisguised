'use strict';

var ctrl = angular.module('projetApp');

ctrl.controller('ListAttacksCtrl', function($scope, $http, $location){
  $scope.attacks = [];

  $scope.getAttacks = function(){
    $http.get('/attack')

      .success(function(data){
        $scope.attacks = data;
      
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }

  $scope.$on('$viewContentLoaded', function(){

    $scope.getAttacks();
        
  });

});


ctrl.controller('CreateAttacksCtrl', function($scope, $http, $location,$routeParams){

  $scope.attack = {};

  $scope.attack.power = 100;
  $scope.attack.precision = 0.7;


   $scope.getAttacks = function(){

    $http.get('/attack')

      .success(function(data){
        $scope.attacks = data;
      
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }

   $scope.sendForm = function(){


        $http.post('/attack/create', $scope.attack)
        .success(function(data){
          $.growl.notice({ message: "Successfully created !" });
          $location.path('/manage_attacks/list')
      
        }).error(function(err){
          $.growl.error({ message: err });
        })

      
  }

  $scope.$on('$viewContentLoaded', function(){

    $scope.getAttacks();
        
  });


});



ctrl.controller('ShowAttacksCtrl', function($scope, $http, $location,$routeParams){


  $scope.showAttack = function(id){

    $scope.attack = {};

    $http.get('/attack/show/'+ id)

      .success(function(data){
        $scope.attack = data;
      
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }



  $scope.$on('$viewContentLoaded', function(){

    $scope.showAttack($routeParams.id);

   



        
  });


});



ctrl.controller('EditAttacksCtrl', function($scope, $http, $location,$routeParams){
  

  $scope.showAttack = function(id){

    $scope.attack = {};

    $http.get('/attack/show/'+ id)

      .success(function(data){
        $scope.attack = data;
      
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }

  $scope.$on('$viewContentLoaded', function(){

    $scope.showAttack($routeParams.id);

        
  });


  $scope.sendForm = function(){

        console.log($scope.attack)

        $http.put('/attack/update/' + $scope.attack._id, $scope.attack)
        .success(function(data){
          $.growl.notice({ message: "Successfully edited !" });
          $location.path('/manage_attacks/show/'+$scope.attack._id)
      
        }).error(function(err){
          $.growl.error({ message: err });
        })

      
  }


});


ctrl.controller('DeleteAttacksCtrl', function($scope, $http, $location,$routeParams){
  

  $scope.delete = function(){
    $http.delete('/attack/delete/' + $routeParams.id)
        .success(function(data){
          $.growl.notice({ message: "Successfully deleted !" });
          $location.path('/manage_attacks/list');
      
        }).error(function(err){
          $.growl.error({ message: err });
    })
  }


});