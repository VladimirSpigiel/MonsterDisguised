'use strict';

var ctrl = angular.module('projetApp');

ctrl.controller('ListUsersCtrl', function($scope, $http, $location){
  $scope.users = [];

  $scope.getUsers = function(){
    $http.get('/user')

      .success(function(data){
        $scope.users = data;
      
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }

  $scope.$on('$viewContentLoaded', function(){

    $scope.getUsers();
        
  });

});


ctrl.controller('CreateUsersCtrl', function($scope, $http, $location,$routeParams){

  $scope.user = {};



   $scope.getUsers = function(){

    $http.get('/user')

      .success(function(data){
        $scope.users = data;
      
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }

   $scope.sendForm = function(){


        $http.post('/user/create', $scope.user)
        .success(function(data){
          $.growl.notice({ message: "Successfully created !" });
          $location.path('/manage_users/list')
      
        }).error(function(err){
          $.growl.error({ message: err });
        })

      
  }

  $scope.$on('$viewContentLoaded', function(){

    $scope.getUsers();
        
  });


});



ctrl.controller('ShowUsersCtrl', function($scope, $http, $location,$routeParams){


  $scope.showUser = function(id){

    $scope.user = {};

    $http.get('/user/show/'+ id)

      .success(function(data){
        $scope.user = data;
      
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }



  $scope.$on('$viewContentLoaded', function(){

    $scope.showUser($routeParams.id);

   



        
  });


});



ctrl.controller('EditUsersCtrl', function($scope, $http, $location,$routeParams){
  

  $scope.showUser = function(id){

    $scope.user = {};

    $http.get('/user/show/'+ id)

      .success(function(data){
        $scope.user = data;
      
      }).error(function(err){
        $.growl.error({ message: err });
    })
  }

  $scope.$on('$viewContentLoaded', function(){

    $scope.showUser($routeParams.id);

        
  });


  $scope.sendForm = function(){

        console.log($scope.user)

        $http.put('/user/update/' + $scope.user._id, $scope.user)
        .success(function(data){
          $.growl.notice({ message: "Successfully edited !" });
          $location.path('/manage_users/show/'+$scope.user._id)
      
        }).error(function(err){
          $.growl.error({ message: err });
        })

      
  }


});


ctrl.controller('DeleteUsersCtrl', function($scope, $http, $location,$routeParams){
  

  $scope.delete = function(){
    $http.delete('/user/delete/' + $routeParams.id)
        .success(function(data){
          $.growl.notice({ message: "Successfully deleted !" });
          $location.path('/manage_users/list');
      
        }).error(function(err){
          $.growl.error({ message: err });
    })
  }


});