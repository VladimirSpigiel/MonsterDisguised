'use strict';

var ctrl = angular.module('projetApp');

ctrl.controller('ListMonstersCtrl', function($scope, $http, $location){
	$scope.monsters = [];

  $scope.getMonsters = function(){
    $http.get('/monster')

      .success(function(data){
        $scope.monsters = data;
      
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }

  $scope.$on('$viewContentLoaded', function(){

    $scope.getMonsters();
        
  });

});


ctrl.controller('CreateMonstersCtrl', function($scope, $http, $location,$routeParams){
  $scope.monster = {};
  $scope.monster.statistics = {};
  $scope.monster.attacks = [];

  $scope.monster.level = 1;
  $scope.monster.hp = 200;
  $scope.monster.rarity = 0.7;
  $scope.monster.statistics.attack = 400;
  $scope.monster.statistics.defense = 400;
  $scope.monster.statistics.speed = 400;


   $scope.getAttacks = function(){

    $http.get('/attack')

      .success(function(data){
        $scope.attacks = data;
      
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }

   $scope.sendForm = function(){

        console.log($scope.monster)

        $http.post('/monster/create', $scope.monster)
        .success(function(data){
          $.growl.notice({ message: "Successfully created !" });
          $location.path('/manage_monsters/list')
      
        }).error(function(err){
          $.growl.error({ message: err });
        })

      
  }

  $scope.$on('$viewContentLoaded', function(){

    $scope.getAttacks();
        
  });


});



ctrl.controller('ShowMonstersCtrl', function($scope, $http, $location,$routeParams){
  $scope.monsters = [];


  $scope.showMonster = function(id){

    $scope.monster = {};

    $http.get('/monster/show/'+ id)

      .success(function(data){
        $scope.monster = data;
        
      
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }



  $scope.$on('$viewContentLoaded', function(){

    $scope.showMonster($routeParams.id);

   



        
  });


});



ctrl.controller('EditMonstersCtrl', function($scope, $http, $location,$routeParams){
  
  $scope.attacks = [];

  $scope.showMonster = function(id){

    $scope.monster = {};

    $http.get('/monster/show/'+ id)

      .success(function(data){
        $scope.monster = data;
      
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }

  $scope.getAttacks = function(){

    $http.get('/attack')

      .success(function(data){
        $scope.attacks = data;
      
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }

  $scope.$on('$viewContentLoaded', function(){

    $scope.showMonster($routeParams.id);

     $scope.getAttacks();
        
  });


  $scope.sendForm = function(){

        console.log($scope.monster)

        $http.put('/monster/update/' + $scope.monster._id, $scope.monster)
        .success(function(data){
          $.growl.notice({ message: "Successfully edited !" });
          $location.path('/manage_monsters/show/'+$scope.monster._id)
      
        }).error(function(err){
          $.growl.error({ message: err });
        })

      
  }



});


ctrl.controller('DeleteMonstersCtrl', function($scope, $http, $location,$routeParams){
  

  $scope.delete = function(){
    $http.delete('/monster/delete/' + $routeParams.id)
        .success(function(data){
          $.growl.notice({ message: "Successfully deleted !" });
          $location.path('/manage_monsters/list');
      
        }).error(function(err){
          $.growl.error({ message: err });
    })
  }


});