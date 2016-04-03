'use strict';

var ctrl = angular.module('projetApp');

ctrl.controller('LoginCtrl', function($scope, $http, $location){
		$scope.user={};
		$scope.name ="bleghhhh"


  		$scope.sendForm = function(){

			
  			if(!$scope.user.pseudo || !$scope.user.pseudo || $scope.user.pseudo == "" || $scope.user.password == ""){
  				$.growl.warning({ message: "Please fill the form" });
  				return;  				
  			}



  			$http.post('/account/login', $scope.user)
  			.success(function(data){
  				$.growl.notice({ message: "You're connected ! " });
  				$location.path('/home')
  		
  			}).error(function(err){
  				$.growl.error({ message: err });
  			})

			
		}

		$scope.$on('$viewContentLoaded', function(){
	   		
	  	});

	

  	});