'use strict'

var User = require('../../models/user');
var Attack = require('../../models/attack');
var Battle = require('./battle')

class MatchMaker{

	constructor(){
		this.waitingList = []
	
		this.launch();
	}





	launch(){

		setInterval(() => {
			console.log(this.waitingList.length)

			if(this.waitingList.length >= 2 ){
				MatchMaker.battles.push(new Battle(this.waitingList[0], this.waitingList[1]));
				this.removeUser(this.waitingList[0]);
				this.removeUser(this.waitingList[1]);
			}
		}, 500);
	}


	addUser(socket){


		User.findOne({_id: socket.request.user},function(err, user){

			socket.userSaved = JSON.parse(JSON.stringify(user));


			user.populateTeam(function(err, result){
				delete user.team.monsters;

				user.team.monsters = result;
				socket.user = user;
				socket.emit("user-data", {user: user});


			})	

		})

		this.waitingList.push(socket);
	}


	removeUser(socket){
		this.waitingList.splice(this.waitingList.indexOf(socket), 1);
	}

	findBattle(socket){

		for(var i=0; i < MatchMaker.battles.length; i++){
			if(socket == MatchMaker.battles[i].J1 || socket == MatchMaker.battles[i].J2)
				return MatchMaker.battles[i];
		}
		return null;		
	}
};

MatchMaker.battles = [];

module.exports = MatchMaker;


