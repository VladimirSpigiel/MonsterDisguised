'use strict';

var projetApp  = angular.module('projetApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute'
  ]);

projetApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/manage_team', {
		    templateUrl: 'views/account/manage_team.html',
		    controller: 'ListTeamCtrl',
		    controllerAs: 'manageTeam'
	    })
      .when('/manage_base', {
        templateUrl: 'views/account/base/list.html',
        controller: 'ListBaseCtrl',
        controllerAs: 'manageBase'
      })

      .when('/manage_base/show/:id', {
        templateUrl: 'views/account/base/show.html',
        controller: 'ShowBaseCtrl',
        controllerAs: 'manageBase'
      })


      .when('/manage_monsters/list', {
        templateUrl: 'views/monsters/list.html',
        controller: 'ListMonstersCtrl',
        controllerAs: 'listMonsters'
      })
      .when('/manage_monsters/create', {
        templateUrl: 'views/monsters/create.html',
        controller: 'CreateMonstersCtrl',
        controllerAs: 'createMonsters'
      })
      .when('/manage_monsters/show/:id', {
        templateUrl: 'views/monsters/show.html',
        controller: 'ShowMonstersCtrl',
        controllerAs: 'showMonsters'
      })
      .when('/manage_monsters/edit/:id', {
        templateUrl: 'views/monsters/edit.html',
        controller: 'EditMonstersCtrl',
        controllerAs: 'editMonsters'
      })
      .when('/manage_monsters/delete/:id', {
        templateUrl: 'views/monsters/delete.html',
        controller: 'DeleteMonstersCtrl',
        controllerAs: 'deleteMonsters'
      })



      .when('/manage_attacks/list', {
        templateUrl: 'views/attacks/list.html',
        controller: 'ListAttacksCtrl',
        controllerAs: 'listAttacks'
      })
      .when('/manage_attacks/create', {
        templateUrl: 'views/attacks/create.html',
        controller: 'CreateAttacksCtrl',
        controllerAs: 'createAttacks'
      })
      .when('/manage_attacks/show/:id', {
        templateUrl: 'views/attacks/show.html',
        controller: 'ShowAttacksCtrl',
        controllerAs: 'showAttacks'
      })
      .when('/manage_attacks/edit/:id', {
        templateUrl: 'views/attacks/edit.html',
        controller: 'EditAttacksCtrl',
        controllerAs: 'editAttacks'
      })
      .when('/manage_attacks/delete/:id', {
        templateUrl: 'views/attacks/delete.html',
        controller: 'DeleteAttacksCtrl',
        controllerAs: 'deleteAttacks'
      })



      .when('/manage_users/list', {
        templateUrl: 'views/users/list.html',
        controller: 'ListUsersCtrl',
        controllerAs: 'listUsers'
      })
      .when('/manage_users/create', {
        templateUrl: 'views/users/create.html',
        controller: 'CreateUsersCtrl',
        controllerAs: 'createUsers'
      })
      .when('/manage_users/show/:id', {
        templateUrl: 'views/users/show.html',
        controller: 'ShowUsersCtrl',
        controllerAs: 'showUsers'
      })
      .when('/manage_users/edit/:id', {
        templateUrl: 'views/users/edit.html',
        controller: 'EditUsersCtrl',
        controllerAs: 'editUsers'
      })
      .when('/manage_users/delete/:id', {
        templateUrl: 'views/users/delete.html',
        controller: 'DeleteUsersCtrl',
        controllerAs: 'deleteUsers'
      })


      .when('/team', {
        templateUrl: 'views/account/manage_team.html',
        controller: 'ListTeamCtrl',
        controllerAs: 'listTeam'
      })

      .when('/battle', {
        templateUrl: 'views/account/battle.html',
        controller: 'BattleCtrl',
        controllerAs: 'battle'
      })


      .when('/login', {
        templateUrl: 'views/account/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/signup', {
        templateUrl: 'views/account/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signups'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

