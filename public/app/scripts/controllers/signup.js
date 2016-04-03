'use strict';

/**
 * @ngdoc function
 * @name projetApp.controller:ManageTeamCtrl
 * @description
 * # ManageTeamCtrl
 * Controller of the projetApp
 */

var ctrl = angular.module('projetApp');

ctrl.controller('SignupCtrl', function($scope, $http, $location){
		$scope.user={};
		$scope.confirmPassword="";

  		$scope.sendForm = function(){
			
  			if($scope.user.pseudo == "" || $scope.user.password == "" || $scope.confirmPassword == ""){
  				$.growl.warning({ message: "Please fill the form" });
  				return;
  			}

			if($scope.user.password != $scope.confirmPassword){
				$.growl.warning({ message: "Your password doesn't match with your confirmation" });

				return;
			}
			

			$http.post('/account/register', $scope.user)
			.success(function(data){
				$.growl.notice({ message: "You're registered and connected ! " });
  				$location.path('/home')

			})
			.error(function(err){
				$.growl.error({ message: err });

			});
		}

  	});


