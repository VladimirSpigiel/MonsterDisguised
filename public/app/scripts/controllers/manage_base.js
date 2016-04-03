'use strict';

var ctrl = angular.module('projetApp');

ctrl.controller('ListBaseCtrl', function($scope, $http, $location){
	$scope.base = [];



  $scope.getBase = function(){

    $http.get('/account/base')

      .success(function(data){
        $scope.base = data;
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }

  $scope.hire = function(id){
  	$http.get('/account/team/hire/'+id)

      .success(function(data){
      	$.growl.notice({ message: "Successfully hired !" });
        $scope.getTeam();
      	
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }

  $scope.buy = function(){
  	$http.get('/account/buy/monster/')

      .success(function(data){
      	$.growl.notice({ message: "You've received : "+data.name+". Rarity : "+ data.rarity * 100 +"%" });
        $scope.getBase();
      	
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }

  $scope.begin = function(){
  	$http.get('/account/begin')

      .success(function(data){
      	$.growl.notice({ message: "You've received : "+data.name+". Rarity : "+ data.rarity * 100 +"%" });
        $scope.getBase();
      	
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }


  $scope.$on('$viewContentLoaded', function(){

    $scope.getBase();
        
  });

});



ctrl.controller('ShowBaseCtrl', function($scope, $http, $location, $routeParams){
	$scope.monster = {};


  $scope.hire = function(id){
  	$http.get('/account/team/hire/'+id)

      .success(function(data){
      	$.growl.notice({ message: "Successfully hired !" });
        $location("/manage_base")
      	
      }).error(function(err){
        $.growl.error({ message: err });
        $location("/manage_base")
    })
  }
  

  $scope.showMonster = function(){
  	$http.get('/account/base/show/'+ $routeParams.id)

      .success(function(data){
        $scope.monster = data;
      	
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }

  $scope.$on('$viewContentLoaded', function(){

    $scope.showMonster();
        
  });

});