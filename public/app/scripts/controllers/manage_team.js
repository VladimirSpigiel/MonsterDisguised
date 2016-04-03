'use strict';

var ctrl = angular.module('projetApp');

ctrl.controller('ListTeamCtrl', function($scope, $http, $location){
	$scope.team = {};



  $scope.getTeam = function(){

    $http.get('/account/team')

      .success(function(data){
        $scope.team = data;
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }

  $scope.fire = function(id){
  	$http.get('/account/team/fire/'+id)

      .success(function(data){
      	$.growl.notice({ message: "Successfully fired !" });
        $scope.getTeam();
      	
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }

  $scope.$on('$viewContentLoaded', function(){

    $scope.getTeam();
        
  });

});