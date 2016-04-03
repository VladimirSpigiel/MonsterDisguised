'use strict';

var ctrl = angular.module('projetApp');



ctrl.controller('BattleCtrl', function($scope, $http, $location){
  $scope.state = "DENIED";
  $scope.user = {};
  $scope.currentMob = {};
  $scope.socket = {};
  $scope.gold = 0;
  $scope.opponentPseudo = "UNKNOWN";
  $scope.turn = false;


   
  var socket = io({'forceNew':true });



  $scope.matchmaking = function(){
    socket.emit("matchmaking_request")

  }

  $scope.sendAttack = function(atk){
  
    socket.emit("attack", atk)
  }

  $scope.switchMob = function(mob){
    if(mob.hp <= 0) return;
    
    if(mob){

      socket.emit("switchMob", mob);

    }else{
      socket.emit("nextMob");
    }
    
  }

  socket.on("connected", function(){
    $scope.$apply(function(){
      $scope.state = "LOADING";
    })
  });


  socket.on("user-data", function(data){
    $scope.$apply(function(){
      $scope.user = data.user;
    })
    
  })

  socket.on("ready", function(opponentPseudo){
    $scope.$apply(function(){
      $scope.state = "BATTLING";
      $scope.opponentPseudo = opponentPseudo;
    })
    
    $.growl.notice({ message: "An opponent has been found ! Good luck & have fun" });
    $.growl.warning({ message: "You may not quit the battle or it will count as a loose." });

  })

  socket.on("currentMob",function(mob){
    $scope.$apply(function(){
      $scope.currentMob = mob;
    })
    
  })

  socket.on("currentOpponentMob", function(mob){
    $scope.$apply(function(){
      $scope.currentOpponentMob = mob;
    })
    
  })

  socket.on("updateCurrentOpponentMob", function(mob){
     $scope.$apply(function(){
       $scope.currentOpponentMob = mob;
    })
    
  })

  socket.on("mobIsDead", function(mob){
    $.growl.warning({ message: mob.name +" has been killed." });

  })

  socket.on("updateCurrentMob", function(mob){
    $scope.$apply(function(){
       $scope.currentMob = mob;
    })
   
  })

  socket.on("updateTeam", function(team){
    $scope.user.team = team;
  })

  socket.on("winBattle", function(gold){
    $.growl.notice({ message: "You won the battle and earned 1500 gold !" });
    $scope.$apply(function(){
      $scope.state = "END";
      $scope.gold = gold;
    });
    
    socket.disconnect();
  })  

  socket.on("looseBattle", function(){
    console.log("YOU LOOSE")
    $scope.$apply(function(){
      $scope.state = "END";
    })
    socket.disconnect();
  })

  socket.on("missTarget", function(){
    $.growl.warning({ message: "You missed your target ..." });
  })

  socket.on("touchTarget", function(damage){
    $.growl.notice({ message: "Target successfully touched ! You made " +damage+" damages."  });
  })

  socket.on("yourTurn", function(){
    $.growl.notice({ message: "It's your turn."  });
    $scope.$apply(function(){
      $scope.turn = true;

    });

  })

  socket.on("opponentTurn", function(){
    $.growl.warning({ message: "It's your opponent turn."  });
    $scope.$apply(function(){
      $scope.turn = false;
    });

  })



  $scope.$on('$viewContentLoaded', function(){
    
    $scope.matchmaking();
  });


  $scope.$on("$locationChangeStart", function (event, next, current) {
    if ($scope.state == "BATTLING") {
        if (!confirm("If you leave the battle, it will count as a loose. You really want to quit the battle ?")) {
            event.preventDefault();
        }

        

        
    }

    socket.disconnect();
  });

});